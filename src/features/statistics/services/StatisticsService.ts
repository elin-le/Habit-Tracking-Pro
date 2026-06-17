import { STORAGE_KEY } from "../../../shared/constants/appConstants";
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

/* ============================================================
 *  StatisticsService đọc dữ liệu THẬT từ localStorage và suy ra
 *  số liệu thống kê cho từng habit.
 *  Dùng engine của Đan (đã đọc completionCount) để tính streak.
 *
 *  TODO: khi Đan merge getLast7DaysCompletionProgress, thay khối
 *  tính last7Days bên dưới bằng:
 *    getLast7DaysCompletionProgress(habitCheckIns, target)
 *      .map((d) => d.completionPercentage)
 * ============================================================ */

const readList = <T>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (e) {
    console.error("Failed to parse", key, e);
    return [];
  }
};

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// 7 ngày gần nhất (cũ → mới), dạng "YYYY-MM-DD"
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

// 1 ngày xem là hoàn thành nếu đủ target (giống DashboardService.isHabitCompletedOnDate)
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
  const target = Math.max(1, habit.targetPerDay);
  const habitCheckIns = allCheckIns.filter((c) => c.habitId === habit.id);

  // streak — dùng engine của Đan (đã đọc completionCount)
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

  const riskLevel = getHabitRisk(completionRate); // engine của Đan
  const category = categories.find((c) => c.id === habit.categoryId)?.name ?? "—";

  return {
    id: habit.id,
    name: habit.name,
    category,
    currentStreak,
    longestStreak,
    totalCompletions,
    completionRate,
    riskLevel,
    last7Days,
  };
};

// đọc raw từ localStorage + suy ra thống kê (giống getAllGoalsWithProgress / getDashboardData)
export const getHabitStats = (): HabitStat[] => {
  const habits = readList<Habit>(STORAGE_KEY.USER_HABITS).filter(
    (h) => h.status === "ACTIVE"
  );
  const checkIns = readList<CheckIn>(STORAGE_KEY.USER_CHECKINS);
  const categories = readList<Category>(STORAGE_KEY.CATEGORYS);

  return habits.map((h) => deriveHabitStat(h, checkIns, categories));
};