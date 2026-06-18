import { useMemo } from "react";
import { getHabitStats } from "../../features/statistics/services/StatisticsService";
import type { Habit } from "../types/Habit";
import type { CheckIn } from "../types/CheckIn";
import type { Category } from "../types/Category";

export const useHabitStats = (
  habits: Habit[],
  checkIns: CheckIn[],
  categories: Category[]
) => {
  return useMemo(
    () => getHabitStats(habits, checkIns, categories),
    [habits, checkIns, categories]
  );
};