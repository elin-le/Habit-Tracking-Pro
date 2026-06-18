import type { Habit } from "../../../shared/types/Habit";
import type { CheckIn } from "../../../shared/types/CheckIn";
import type { Category } from "../../../shared/types/Category";
import type { HabitStat } from "../../../shared/types/Statistics";
import {
  getCurrentStreak,
  getLongestStreak,
  getDailySummary,
} from "../../habit/calculators/GoalCalculator";
import { getHabitRisk } from "../../habit/calculators/riskDetector";

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const last7DateKeys = (): string[] => {
  const out: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(toKey(d));
  }
  return out;
};

const isCompletedOnDate = (
  habitCheckIns: CheckIn[],
  target: number,
  dateKey: string
): boolean => {
  const c = habitCheckIns.find((ci) => ci.checkedAt === dateKey);
  return (c?.completionCount ?? 0) >= target;
};

const deriveHabitStat = (
  habit: Habit,
  allCheckIns: CheckIn[],
  categories: Category[]
): HabitStat => {
  // targetPerDay có thể là "" (form cho nhập rỗng) -> ép về số
  const target = Math.max(1, Number(habit.targetPerDay) || 1);
  const habitCheckIns = allCheckIns.filter((c) => c.habitId === habit.id);

  // streak — dùng engine của Đan
  const currentStreak = getCurrentStreak(habitCheckIns, target);
  const longestStreak = getLongestStreak(habitCheckIns, target);

  // tổng số ngày hoàn thành — từ getDailySummary của engine
  const summary = getDailySummary(habitCheckIns, target);
  const totalCompletions = Object.values(summary).filter((d) => d.completed).length;

  // 7 ngày qua: % hoàn thành mỗi ngày (cho mini bar chart)
  const last7Days = last7DateKeys().map((dateKey) => {
    const c = habitCheckIns.find((ci) => ci.checkedAt === dateKey);
    return Math.min(100, Math.round(((c?.completionCount ?? 0) / target) * 100));
  });

  // tỷ lệ hoàn thành 7 ngày = số ngày đủ target / 7 (giống DashboardService)
  const completedInLast7 = last7DateKeys().filter((dk) =>
    isCompletedOnDate(habitCheckIns, target, dk)
  ).length;
  const completionRate = Math.round((completedInLast7 / 7) * 100);

  // "at risk" = có chuỗi nhưng hôm nay chưa hoàn thành 
  const completedToday = isCompletedOnDate(habitCheckIns, target, toKey(new Date()));
  const riskLevel = getHabitRisk(completionRate, currentStreak, completedToday);

  const category = categories.find((c) => c.id === habit.categoryId)?.name ?? "—";

  return {
    id: habit.id,
    name: habit.name,
    category,
    categoryId: habit.categoryId,
    priority: habit.priority,
    currentStreak,
    longestStreak,
    totalCompletions,
    completionRate,
    riskLevel,
    last7Days,
  };
};

export const getHabitStats = (
  habits: Habit[],
  checkIns: CheckIn[],
  categories: Category[]
): HabitStat[] => {
  return habits
    .filter((h) => h.status === "ACTIVE")
    .map((h) => deriveHabitStat(h, checkIns, categories));
};