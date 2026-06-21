import type { Habit } from "../../../shared/types/Habit";
import type { CheckIn } from "../../../shared/types/CheckIn";
import type { Category } from "../../../shared/types/Category";
import type { HabitStat } from "../../../shared/types/Statistics";
import {
  getCurrentStreak,
  getLongestStreak,
  getDailySummary,
  getLast7DaysCompletionProgressWithoutGoal,
} from "../../habit/calculators/GoalCalculator";
import { getHabitRisk } from "../../habit/calculators/riskDetector";

/* HÀM THUẦN: nhận habits/checkIns/categories từ outlet context
   (cùng nguồn Goal/Dashboard) -> đồng bộ. Mọi chỉ số tính từ check-in,
   "mục tiêu" = đạt targetPerDay mỗi ngày (KHÔNG đụng ERD/Goal entity). */

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

const deriveHabitStat = (
  habit: Habit,
  allCheckIns: CheckIn[],
  categories: Category[]
): HabitStat => {
  const target = Math.max(1, Number(habit.targetPerDay) || 1);
  const habitCheckIns = (allCheckIns ?? []).filter((c) => c.habitId === habit.id);

  const summary = getDailySummary(habitCheckIns, target);
  const entries = Object.values(summary);

  const totalCompletions = entries.filter((d) => d.completed).length; // số ngày đạt mục tiêu
  const daysTracked = entries.filter((d) => d.count > 0).length;      // số ngày có check-in
  const goalRate = daysTracked ? Math.round((totalCompletions / daysTracked) * 100) : 0;

  const todayCount = summary[toKey(new Date())]?.count ?? 0;
  const todayRate = Math.min(100, Math.round((todayCount / target) * 100));

  const currentStreak = getCurrentStreak(habitCheckIns, target);
  const longestStreak = getLongestStreak(habitCheckIns, target);

  const last7Days = getLast7DaysCompletionProgressWithoutGoal(habitCheckIns, target).map(
    (d) => d.completionPercentage
  );

  const completedInLast7 = last7DateKeys().filter(
    (dk) => (summary[dk]?.count ?? 0) >= target
  ).length;
  const completionRate = Math.round((completedInLast7 / 7) * 100);

  const completedToday = todayCount >= target;
  const riskLevel = getHabitRisk(completionRate, currentStreak, completedToday);

  const category = (categories ?? []).find((c) => c.id === habit.categoryId)?.name ?? "—";

  return {
    id: habit.id,
    name: habit.name,
    category,
    categoryId: habit.categoryId,
    priority: habit.priority,
    targetPerDay: target,
    todayCount,
    todayRate,
    totalCompletions,
    goalRate,
    currentStreak,
    longestStreak,
    completionRate,
    riskLevel,
    last7Days,
    checkIns: habitCheckIns,
  };
};

export const getHabitStats = (
  habits: Habit[],
  checkIns: CheckIn[],
  categories: Category[]
): HabitStat[] => {
  return (habits ?? [])
    .filter((h) => h.status === "ACTIVE")
    .map((h) => deriveHabitStat(h, checkIns, categories));
};