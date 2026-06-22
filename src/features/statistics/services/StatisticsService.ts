import type { Habit } from "../../../shared/types/Habit";
import type { CheckIn } from "../../../shared/types/CheckIn";
import type { Category } from "../../../shared/types/Category";
import type { GoalWithDerived } from "../../../shared/types/Goal";
import type { HabitStat } from "../../../shared/types/Statistics";
import {
  getCurrentStreak,
  getLongestStreak,
  getDailySummary,
  getLast7DaysCompletionProgressWithoutGoal,
} from "../../habit/calculators/GoalCalculator";
import { toStatGoalInfo, deriveTodayStatus } from "../calculators/statGoalCalculator";

const toKey = (d: Date) => d.toISOString().split("T")[0];

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
  categories: Category[],
  goals: GoalWithDerived[]
): HabitStat => {
  const target = Math.max(1, Number(habit.targetPerDay) || 1);
  const habitCheckIns = (allCheckIns ?? []).filter((c) => c.habitId === habit.id);

  const summary = getDailySummary(habitCheckIns, target);
  const entries = Object.values(summary);
  const completedDays = entries.filter((d) => d.completed).length;

  const todayCount = summary[toKey(new Date())]?.count ?? 0;
  const todayRate = Math.min(100, Math.round((todayCount / target) * 100));
  const todayStatus = deriveTodayStatus(todayCount, target);

  const consecutiveDays = getCurrentStreak(habitCheckIns, target);
  const bestRun = getLongestStreak(habitCheckIns, target);

  const last7Days = getLast7DaysCompletionProgressWithoutGoal(habitCheckIns, target).map(
    (d) => d.completionPercentage
  );
  const sevenDayConsistency = last7DateKeys().filter(
    (dk) => (summary[dk]?.count ?? 0) >= target
  ).length;

  const category = (categories ?? []).find((c) => c.id === habit.categoryId)?.name ?? "—";

  const habitGoals = (goals ?? []).filter((g) => g.habitId === habit.id);
  const activeGoal =
    habitGoals.find((g) => g.progress.status !== "COMPLETED") ?? habitGoals[0];
  const goal = activeGoal ? toStatGoalInfo(activeGoal) : undefined;

  return {
    id: habit.id,
    name: habit.name,
    category,
    categoryId: habit.categoryId,
    priority: habit.priority,
    targetPerDay: target,
    todayCount,
    todayRate,
    todayStatus,
    consecutiveDays,
    bestRun,
    completedDays,
    last7Days,
    sevenDayConsistency,
    checkIns: habitCheckIns,
    goal,
  };
};

export const getHabitStats = (
  habits: Habit[],
  checkIns: CheckIn[],
  categories: Category[],
  goals: GoalWithDerived[] = []
): HabitStat[] => {
  return (habits ?? [])
    .filter((h) => h.status === "ACTIVE")
    .map((h) => deriveHabitStat(h, checkIns, categories, goals));
};