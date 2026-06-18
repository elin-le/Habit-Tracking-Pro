// MainLayout.tsx
import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
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
import { getCurrentStreak, getStreakProgress, getTotalCompletionProgress } from "../features/habit/calculators/GoalCalculator";

export default function MainLayout() {
  const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}") as User
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { t } = useTranslation();

  const habitData = useHabits(currentUser?.phone);
  const habitSchedule = useHabitSchedule(currentUser?.phone);
  const categoryData = useCategories();

  const goalData = useGoals();
  const checkInData = useCheckIns();

  const { addNotification, notifications } = useContext(NotificationContext);

  useEffect(() => {
    if (!habitData.habits || !goalData.goals || !checkInData.checkIns || !notifications) return;

    // 1. Goal 80% & Goal Achieved
    goalData.goals.forEach((goal: any) => {
      const habit = habitData.habits.find((h: any) => h.id === goal.habitId);
      const targetPerDay = habit && typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const habitName = habit ? habit.name : 'Mục tiêu';

      let progressPercent = 0;
      if (goal.targetType === 'STREAK') {
        progressPercent = getStreakProgress(goal, targetPerDay, checkInData.checkIns);
      } else if (goal.targetType === 'TOTAL_COMPLETIONS') {
        progressPercent = getTotalCompletionProgress(goal, targetPerDay, checkInData.checkIns);
      }

      if (progressPercent >= 100) {
        const hasAchievedNotif = notifications.some(
          (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_ACHIEVED'
        );
        if (!hasAchievedNotif) {
          addNotification(
            'GOAL_ACHIEVED',
            'notifications.goal_achieved.title',
            'notifications.goal_achieved.message',
            { habitName },
            goal.id,
            'GOAL'
          );
        }
      } else if (progressPercent >= 80) {
        const has80Notif = notifications.some(
          (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_80'
        );
        if (!has80Notif) {
          addNotification(
            'GOAL_80',
            'notifications.goal_80.title',
            'notifications.goal_80.message',
            { habitName },
            goal.id,
            'GOAL'
          );
        }
      }
    });

    // 2. Streak Risk
    habitData.habits.forEach((habit: any) => {
      const habitCheckins = checkInData.checkIns.filter((c: any) => c.habitId === habit.id);
      const targetPerDay = typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const currentStreakVal = getCurrentStreak(habitCheckins, targetPerDay);

      if (currentStreakVal >= 3) {
        const todayKey = new Date().toISOString().split('T')[0];
        const todaySummary = habitCheckins.filter((c: any) => c.checkedAt === todayKey).length;
        const isCompletedToday = todaySummary >= targetPerDay;

        if (!isCompletedToday) {
          const todayNotifExists = notifications.some(
            (n: any) =>
              n.relatedEntityId === habit.id &&
              n.type === 'STREAK_RISK' &&
              n.createdAt.startsWith(todayKey)
          );
          if (!todayNotifExists) {
            addNotification(
              'STREAK_RISK',
              'notifications.streak_risk.title',
              'notifications.streak_risk.message',
              { habitName: habit.name, streakCount: currentStreakVal },
              habit.id,
              'HABIT'
            );
          }
        }
      }
    });

    // 3. Missed Habit
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split('T')[0];
    const todayKey = new Date().toISOString().split('T')[0];

    habitData.habits.forEach((habit: any) => {
      const habitCheckins = checkInData.checkIns.filter((c: any) => c.habitId === habit.id);
      const targetPerDay = typeof habit.targetPerDay === 'number' ? habit.targetPerDay : 1;
      const yesterdaySummary = habitCheckins.filter((c: any) => c.checkedAt === yesterdayKey).length;
      const isCompletedYesterday = yesterdaySummary >= targetPerDay;
      
      // Only fire missed habit if they have at least checked in once (not new habit)
      if (habitCheckins.length > 0 && !isCompletedYesterday) {
        const yesterdayNotifExists = notifications.some(
          (n: any) =>
            n.relatedEntityId === habit.id &&
            n.type === 'MISSED_HABIT' &&
            n.createdAt.startsWith(todayKey)
        );
        if (!yesterdayNotifExists) {
          addNotification(
            'MISSED_HABIT',
            'notifications.missed_habit.title',
            'notifications.missed_habit.message',
            { habitName: habit.name },
            habit.id,
            'HABIT'
          );
        }
      }
    });
  }, [habitData.habits, goalData.goals, checkInData.checkIns, notifications, addNotification]);

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

        <main className="flex-1 p-6 overflow-auto mb-13">
          <Outlet
            context={{
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
              goals: goalData.goals, // Sửa nhé
              checkIns: checkInData.checkIns, // Sửa nhé
            }}
          />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}