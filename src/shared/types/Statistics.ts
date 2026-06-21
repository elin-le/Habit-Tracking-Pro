import type { Priority } from "./Habit";
import type { CheckIn } from "./CheckIn";

export type RiskLevel = "SAFE" | "WARNING" | "AT_RISK";

export type HabitStat = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  priority: Priority;
  targetPerDay: number;     // target/ngày (đã ép về số)
  todayCount: number;       // số lần check-in hôm nay
  todayRate: number;        // % hoàn thành hôm nay (capped 100)
  totalCompletions: number; // tổng số ngày đạt mục tiêu
  goalRate: number;         // % ngày đạt mục tiêu / số ngày có check-in
  currentStreak: number;
  longestStreak: number;
  completionRate: number;   // tỷ lệ 7 ngày gần nhất
  riskLevel: RiskLevel;
  last7Days: number[];
  checkIns: CheckIn[];      // check-in của riêng habit (cho lịch sử)
};