// MainLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
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

export default function MainLayout() {
  const currentUser = JSON.parse(
    localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}",
  ) as User;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { t } = useTranslation();

  const habitData = useHabits(currentUser.phone);
  const habitSchedule = useHabitSchedule(habitData.habits);
  const categoryData = useCategories();

  const goalData = useGoals();
  const checkInData = useCheckIns();

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
