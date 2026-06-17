import { useState, useEffect, useCallback } from "react";
import type { HabitStat } from "../types/Statistics";
import { getHabitStats } from "../../features/statistics/services/StatisticsService";

export const useHabitStats = () => {
  const [stats, setStats] = useState<HabitStat[]>([]);

  const refreshStats = useCallback(() => {
    setStats(getHabitStats());
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, refreshStats };
};