import type { Priority } from "./Habit";

export type RiskLevel = "SAFE" | "WARNING" | "AT_RISK";

export type HabitStat = {
  id: string;
  name: string;
  category: string;     // tên category (để hiển thị)
  categoryId: string;   // id category (để lọc)
  priority: Priority;   // để lọc theo mức ưu tiên
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // %
  riskLevel: RiskLevel;
  last7Days: number[];    // 7 số, % mỗi ngày (0–100)
};