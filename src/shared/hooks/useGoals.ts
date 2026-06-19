import { useState, useEffect, useCallback } from "react";
import type { Goal, GoalWithDerived } from "../types/Goal";
import type { Habit } from "../types/Habit";
import type { CheckIn } from "../types/CheckIn";
import {
  getAllGoalsWithProgress,
  createGoal as serviceCreateGoal,
  updateGoal as serviceUpdateGoal,
  deleteGoal as serviceDeleteGoal,
} from "../../features/goal/services/GoalService";
import { ToastService } from "@/routes/services/toastService";
import { useTranslation } from "react-i18next";

export type StatusFilter =
  | "ALL"
  | "TRACKING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_STARTED"
  | "NEAR_COMPLETION";
export type TypeFilter = "ALL" | "STREAK" | "TOTAL_COMPLETIONS";

export const useGoals = (userHabits: Habit[] = [], checkIns: CheckIn[] = []) => {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<GoalWithDerived[]>([]);

  // hàm load lại dữ liệu
  const refreshGoals = useCallback(() => {
    setGoals(getAllGoalsWithProgress(userHabits, checkIns));
  }, [userHabits, checkIns]);

  //tự động load lần đầu khi mở app
  useEffect(() => {
    refreshGoals();
  }, [refreshGoals]);

  // các hàm CRUD, gọi xong tự động refresh lại màn hình
  const createGoal = (goalData: Omit<Goal, "id">) => {
    const activeGoal = goals.find(g => 
        g.habitId === goalData.habitId && 
        (g.progress.status === 'IN_PROGRESS' || g.progress.status === 'NOT_STARTED')
    );
    
    if (activeGoal) {
        ToastService.error(t("goals.active_goal_exists"));
        return null;
    }

    const newGoal = serviceCreateGoal(goalData);
    refreshGoals();
    return newGoal;
  };

  const updateGoal = (id: string, goalData: Partial<Goal>) => {
    const activeGoal = goals.find(g => 
      g.id !== id &&
      g.habitId === goalData.habitId &&
      (g.progress.status === 'IN_PROGRESS' || g.progress.status === 'NOT_STARTED')
    );

    if (activeGoal) {
      ToastService.error(t("goals.active_goal_exists"));
      return null;
    }

    const updated = serviceUpdateGoal(id, goalData);
    refreshGoals();
    return updated;
  };

  const deleteGoal = (id: string) => {
    serviceDeleteGoal(id);
    refreshGoals();
  };

  return {
    goals,
    createGoal,
    updateGoal,
    deleteGoal,
    refreshGoals,
  };
};
