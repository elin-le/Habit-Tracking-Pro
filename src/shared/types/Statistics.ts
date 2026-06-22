import type { Priority } from "./Habit";
import type { CheckIn } from "./CheckIn";
import type { TargetType, GoalStatus } from "./Goal";

/** Today habit */
export type TodayStatus =
  | "COMPLETED_TODAY" // complete = target
  | "IN_PROGRESS"     // has check in but complete < target
  | "NOT_STARTED";    // no check in

/** Goal in Statistics. AT_RISK */
export type StatGoalStatus = GoalStatus | "AT_RISK";

export interface StatGoalInfo {
  goalId: string;
  goalType: TargetType;          // 'STREAK' | 'TOTAL_COMPLETIONS'
  targetValue: number;
  currentValue: number;          // = progress.currentProgress
  progressRate: number;          // = progress.progressPercent (0–100)
  remainingValue: number;        // max(targetValue - currentValue, 0)
  status: StatGoalStatus;        // NOT_STARTED|IN_PROGRESS|COMPLETED|AT_RISK
  hasDeadline: boolean;          // true nếu có endDate
  expectedProgressRate?: number; // chỉ có khi hasDeadline: % kỳ vọng tới hôm nay
  endDate?: string;
}

export type HabitStat = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  priority: Priority;
  targetPerDay: number;

  // Today
  todayCount: number;
  todayRate: number;            // % completion (0–100)
  todayStatus: TodayStatus;

  // Streak = consistent (not streak in goal)
  consecutiveDays: number;      
  bestRun: number;             
  completedDays: number;        

  // 7 days
  last7Days: number[];          
  sevenDayConsistency: number;  // total days get 100% trong 7 ngày (0–7)

  // history and goals
  checkIns: CheckIn[];
  goal?: StatGoalInfo;          
};