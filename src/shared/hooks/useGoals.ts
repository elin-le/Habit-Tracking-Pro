import { useState, useEffect, useCallback, useMemo } from "react";
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

  const [statusFilters, setStatusFilters] = useState<StatusFilter[]>(["ALL"]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");

  const toggleStatusFilter = useCallback((filter: StatusFilter) => {
    if (filter === "ALL") {
      setStatusFilters(["ALL"]);
      return;
    }

    if (filter === "TRACKING") {
      setStatusFilters(["TRACKING"]);
      return;
    }

    setStatusFilters((prev) => {
      let next = [...prev];
      if (next.includes("ALL") || next.includes("TRACKING")) {
        next = [filter];
      } else {
        if (next.includes(filter)) {
          next = next.filter((f) => f !== filter);
        } else {
          next.push(filter);
        }
      }

      if (next.length === 0) return ["ALL"];

      const hasInProgress = next.includes("IN_PROGRESS");
      const hasNotStarted = next.includes("NOT_STARTED");
      const hasCompleted = next.includes("COMPLETED");

      if (hasInProgress && hasNotStarted && hasCompleted) {
        return ["ALL"];
      }

      return next;
    });
  }, []);

  // hàm load lại dữ liệu
  const refreshGoals = useCallback(() => {
    setGoals(getAllGoalsWithProgress(userHabits, checkIns));
  }, [userHabits, checkIns]);

  //tự động load lần đầu khi mở app
  useEffect(() => {
    refreshGoals();
  }, [refreshGoals]);

  // danh sách đã lọc (tự động update khi goals hoặc filter thay đổi)
  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      let matchStatus = false;
      if (statusFilters.includes("ALL")) {
        matchStatus = true;
      } else {
        if (
          (statusFilters.includes("IN_PROGRESS") ||
            statusFilters.includes("TRACKING")) &&
          g.progress.status === "IN_PROGRESS"
        )
          matchStatus = true;
        if (
          (statusFilters.includes("NOT_STARTED") ||
            statusFilters.includes("TRACKING")) &&
          g.progress.status === "NOT_STARTED"
        )
          matchStatus = true;
        if (
          statusFilters.includes("COMPLETED") &&
          g.progress.status === "COMPLETED"
        )
          matchStatus = true;
        if (
          statusFilters.includes("NEAR_COMPLETION") &&
          g.progress.progressPercent >= 80 &&
          g.progress.status !== "COMPLETED"
        )
          matchStatus = true;
      }

      const matchType = typeFilter === "ALL" || g.targetType === typeFilter;

      return matchStatus && matchType;
    });
  }, [goals, statusFilters, typeFilter]);

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
    filteredGoals,
    statusFilters,
    setStatusFilters,
    toggleStatusFilter,
    typeFilter,
    setTypeFilter,
    createGoal,
    updateGoal,
    deleteGoal,
    refreshGoals,
  };
};
