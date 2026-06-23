import { useMemo } from "react";
import { getHabitStats } from "../../features/statistics/services/StatisticsService";
import type { Habit } from "../types/Habit";
import type { CheckIn } from "../types/CheckIn";
import type { Category } from "../types/Category";
import type { GoalWithDerived } from "../types/Goal";

export const useHabitStats = (
  habits: Habit[],
  checkIns: CheckIn[],
  categories: Category[],
  goals: GoalWithDerived[] = []
) => {
  return useMemo(
    () => getHabitStats(habits ?? [], checkIns ?? [], categories ?? [], goals ?? []),
    [habits, checkIns, categories, goals]
  );
};