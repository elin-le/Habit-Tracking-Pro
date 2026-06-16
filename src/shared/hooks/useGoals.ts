import { useState, useEffect, useCallback, useMemo } from "react";
import type { Goal, GoalWithDerived } from "../types/Goal";
import {
  getAllGoalsWithProgress,
  createGoal as serviceCreateGoal,
  updateGoal as serviceUpdateGoal,
  deleteGoal as serviceDeleteGoal,
} from "../../features/goal/services/GoalService";

export type StatusFilter =
  | "ALL"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_STARTED"
  | "NEAR_COMPLETION";
export type TypeFilter = "ALL" | "STREAK" | "TOTAL_COMPLETIONS";

export const useGoals = () => {
  const [goals, setGoals] = useState<GoalWithDerived[]>([]);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");

  // hàm load lại dữ liệu
  const refreshGoals = useCallback(() => {
    setGoals(getAllGoalsWithProgress());
  }, []);

  //tự động load lần đầu khi mở app
  useEffect(() => {
    refreshGoals();
  }, [refreshGoals]);

  // danh sách đã lọc (tự động update khi goals hoặc filter thay đổi)
  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "NEAR_COMPLETION"
          ? g.progress.progressPercent >= 80 &&
            g.progress.status !== "COMPLETED"
          : g.progress.status === statusFilter);
      const matchType = typeFilter === "ALL" || g.targetType === typeFilter;

      return matchStatus && matchType;
    });
  }, [goals, statusFilter, typeFilter]);

  // các hàm CRUD, gọi xong tự động refresh lại màn hình
  const createGoal = (goalData: Omit<Goal, "id">) => {
    const newGoal = serviceCreateGoal(goalData);
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
    filteredGoals,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    createGoal,
    updateGoal,
    deleteGoal,
    refreshGoals,
  };
};
