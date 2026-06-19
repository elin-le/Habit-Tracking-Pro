// MainLayout.tsx
import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import BottomTabBar from "./components/BottomTabBar";
import { useTranslation } from "react-i18next";
import { useHabitSchedule } from "../shared/hooks/useHabitSchedule";
import { useHabits } from "../shared/hooks/useHabit";
import { useCategories } from "@/shared/hooks/useCategory";
import { STORAGE_KEY } from "@/shared/constants/appConstants";
import type { User } from "@/shared/types/User";
import { useGoals } from "@/shared/hooks/useGoals";
import { useCheckIns } from "@/shared/hooks/useCheckIns";
import { NotificationContext } from "../features/notifications/context/NotificationContext";
import {
  getCurrentStreak,
  getStreakProgress,
  getTotalCompletionProgress,
} from "../features/habit/calculators/GoalCalculator";

export default function MainLayout() {
  const currentUser = JSON.parse(
    localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}",
  ) as User;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { t } = useTranslation();

  const habitData = useHabits(currentUser?.phone);
  const habitSchedule = useHabitSchedule(currentUser?.phone);
  const categoryData = useCategories();

  const checkInData = useCheckIns();
  const goalData = useGoals(habitData.habits, checkInData.checkIns);

  // Filter goals và checkIns theo habits của current user
  const userHabitIds = useMemo(
    () => habitData.habits.map((h) => h.id),
    [habitData.habits],
  );

  const userGoals = useMemo(
    () => goalData.goals.filter((g) => userHabitIds.includes(g.habitId)),
    [goalData.goals, userHabitIds],
  );

  const userCheckIns = useMemo(
    () => checkInData.checkIns.filter((c) => userHabitIds.includes(c.habitId)),
    [checkInData.checkIns, userHabitIds],
  );

  const deleteGoalsByHabitId = useCallback(
    (habitId: string) => {
      const goals = goalData.goals.filter((g) => g.habitId === habitId);
      goals.forEach((g) => goalData.deleteGoal(g.id));
    },
    [goalData],
  );

  const { addNotification, notifications } = useContext(NotificationContext);

  const [storageTrigger, setStorageTrigger] = useState(0);

  // Hook into localStorage.setItem to dispatch custom event on same-window updates
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key, value } }));
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Listen to storage changes to trigger re-evaluation of notifications
  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (
        e.detail.key === STORAGE_KEY.USER_CHECKINS ||
        e.detail.key === STORAGE_KEY.USER_GOALS ||
        e.detail.key === STORAGE_KEY.USER_HABITS ||
        e.detail.key === 'notifications'
      ) {
        setStorageTrigger(prev => prev + 1);
      }
    };
    window.addEventListener('local-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('local-storage-update', handleStorageUpdate);
  }, []);

  useEffect(() => {
    // Read directly from localStorage to guarantee absolute freshness across hook instances
    const rawHabits = localStorage.getItem(STORAGE_KEY.USER_HABITS);
    const rawGoals = localStorage.getItem(STORAGE_KEY.USER_GOALS);
    const rawCheckins = localStorage.getItem(STORAGE_KEY.USER_CHECKINS);

    if (!rawHabits || !rawGoals || !rawCheckins) return;

    const allHabits = JSON.parse(rawHabits) as any[];
    const habits = allHabits.filter((h: any) => h.userId === currentUser?.phone);
    const goals = JSON.parse(rawGoals) as any[];
    const checkIns = JSON.parse(rawCheckins) as any[];

    // Helper to get notifications list directly from localStorage to avoid stale state and race conditions
    const getFreshNotifications = () => {
      try {
        return JSON.parse(localStorage.getItem('notifications') || '[]') as any[];
      } catch {
        return [];
      }
    };

    // 1. Goal 80% & Goal Achieved
    goals.forEach((goal: any) => {
      const habit = habits.find((h: any) => h.id === goal.habitId);
      if (!habit) return; // Defensive check: Skip goals not belonging to current user's habits

      const targetPerDay = typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const habitName = habit.name;

      const goalCheckins = checkIns.filter((c: any) => c.habitId === goal.habitId);
      let progressPercent = 0;
      if (goal.targetType === 'STREAK') {
        progressPercent = getStreakProgress(goal, targetPerDay, goalCheckins);
      } else if (goal.targetType === 'TOTAL_COMPLETIONS') {
        progressPercent = getTotalCompletionProgress(goal, targetPerDay, goalCheckins);
      }

      const currentNotifs = getFreshNotifications();

      if (progressPercent >= 100) {
        const hasAchievedNotif = currentNotifs.some(
          (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_ACHIEVED'
        );
        if (!hasAchievedNotif) {
          addNotification(
            "GOAL_ACHIEVED",
            "notifications.goal_achieved.title",
            "notifications.goal_achieved.message",
            { habitName },
            goal.id,
            "GOAL",
          );
        }
      } else if (progressPercent >= 80) {
        const has80Notif = currentNotifs.some(
          (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_80'
        );
        if (!has80Notif) {
          addNotification(
            "GOAL_80",
            "notifications.goal_80.title",
            "notifications.goal_80.message",
            { habitName },
            goal.id,
            "GOAL",
          );
        }
      }
    });

    // 2. Streak Risk
    habits.forEach((habit: any) => {
      if (habit.status !== 'ACTIVE') return; // Defensive check: Skip inactive habits

      const habitCheckins = checkIns.filter((c: any) => c.habitId === habit.id);
      const targetPerDay = typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const currentStreakVal = getCurrentStreak(habitCheckins, targetPerDay);

      if (currentStreakVal >= 3) {
        const todayKey = new Date().toISOString().split("T")[0];
        const todaySummary = habitCheckins.filter(
          (c: any) => c.checkedAt === todayKey,
        ).length;
        const isCompletedToday = todaySummary >= targetPerDay;

        if (!isCompletedToday) {
          const currentNotifs = getFreshNotifications();
          const todayNotifExists = currentNotifs.some(
            (n: any) =>
              n.relatedEntityId === habit.id &&
              n.type === "STREAK_RISK" &&
              n.createdAt.startsWith(todayKey),
          );
          if (!todayNotifExists) {
            addNotification(
              "STREAK_RISK",
              "notifications.streak_risk.title",
              "notifications.streak_risk.message",
              { habitName: habit.name, streakCount: currentStreakVal },
              habit.id,
              "HABIT",
            );
          }
        }
      }
    });

    // 3. Missed Habit
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split("T")[0];
    const todayKey = new Date().toISOString().split("T")[0];

    habits.forEach((habit: any) => {
      if (habit.status !== 'ACTIVE') return; // Defensive check: Skip inactive habits

      const habitCheckins = checkIns.filter((c: any) => c.habitId === habit.id);
      const targetPerDay = typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const yesterdaySummary = habitCheckins.filter((c: any) => c.checkedAt === yesterdayKey).length;
      const isCompletedYesterday = yesterdaySummary >= targetPerDay;

      // Only fire missed habit if they have at least checked in once (not new habit)
      if (habitCheckins.length > 0 && !isCompletedYesterday) {
        const currentNotifs = getFreshNotifications();
        const yesterdayNotifExists = currentNotifs.some(
          (n: any) =>
            n.relatedEntityId === habit.id &&
            n.type === "MISSED_HABIT" &&
            n.createdAt.startsWith(todayKey),
        );
        if (!yesterdayNotifExists) {
          addNotification(
            "MISSED_HABIT",
            "notifications.missed_habit.title",
            "notifications.missed_habit.message",
            { habitName: habit.name },
            habit.id,
            "HABIT",
          );
        }
      }
    });
  }, [currentUser?.phone, notifications, addNotification, storageTrigger]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] playfair-display-normal">
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          title={t("header.greeting")}
          subtitle={t("header.subtitle")}
          onMenuOpen={() => setSidebarOpen(true)}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          createHabit={habitData.createHabit}
          createHabitSchedules={habitSchedule.createHabitSchedules}
        />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet
            context={{
              // Habit
              habits: habitData.habits,
              createHabit: habitData.createHabit,
              updateHabit: habitData.updateHabit,
              deleteHabit: habitData.deleteHabit,
              habitSchedules: habitSchedule.habitSchedules,
              createHabitSchedules: habitSchedule.createHabitSchedules,
              replaceHabitSchedules: habitSchedule.replaceHabitSchedules,
              deleteHabitSchedulesByHabitId:
                habitSchedule.deleteHabitSchedulesByHabitId,
              categories: categoryData.categories,
              showAddForm,
              setShowAddForm,

              // Goal
              goals: goalData.goals,
              userGoals: userGoals,
              filteredGoals: goalData.filteredGoals,
              statusFilters: goalData.statusFilters,
              setStatusFilters: goalData.setStatusFilters,
              toggleStatusFilter: goalData.toggleStatusFilter,
              typeFilter: goalData.typeFilter,
              setTypeFilter: goalData.setTypeFilter,
              createGoal: goalData.createGoal,
              updateGoal: goalData.updateGoal,
              deleteGoal: goalData.deleteGoal,
              deleteGoalsByHabitId: deleteGoalsByHabitId,
              refreshGoals: goalData.refreshGoals,

              // Checkin
              userCheckIns: userCheckIns,
            }}
          />
        </main>

        <button
          className="md:hidden fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer mb-2"
          style={{ background: "var(--primary)", color: "#fff" }}
          onClick={() => setShowAddForm(true)}
          aria-label="Tạo thói quen mới"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <BottomTabBar />
      </div>
    </div>
  );
}
