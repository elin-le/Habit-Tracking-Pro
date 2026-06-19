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

export type StatusFilter =
  | "ALL"
  | "TRACKING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_STARTED"
  | "NEAR_COMPLETION";
export type TypeFilter = "ALL" | "STREAK" | "TOTAL_COMPLETIONS";

export const useGoals = (userHabits: Habit[] = [], checkIns: CheckIn[] = []) => {
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
    const newGoal = serviceCreateGoal(goalData, userHabits, checkIns);
    refreshGoals();
    return newGoal;
  };

  const updateGoal = (id: string, goalData: Partial<Goal>) => {
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
