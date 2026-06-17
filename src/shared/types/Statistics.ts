/* Kiểu dữ liệu cho module Statistics.
   RiskLevel khớp với HabitRisk trong engine của Đan */

export type RiskLevel = "SAFE" | "WARNING" | "AT_RISK";

export type HabitStat = {
  id: string;
  name: string;
  category: string;        // chỉ là dữ liệu hiển thị, không cần dịch
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;  // %
  riskLevel: RiskLevel;
  last7Days: number[];     // 7 số, % mỗi ngày (0–100)
};