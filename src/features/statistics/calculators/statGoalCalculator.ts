import type { GoalWithDerived } from "../../../shared/types/Goal";
import type { StatGoalInfo, TodayStatus, StatGoalStatus } from "../../../shared/types/Statistics";

const toKey = (d: Date) => d.toISOString().split("T")[0];

const computeExpectedProgressRate = (
  startedDate: string,
  endDate?: string
): number | undefined => {
  if (!endDate) return undefined;
  const start = new Date(startedDate).getTime();
  const end = new Date(endDate).getTime();
  const today = new Date(toKey(new Date())).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return undefined;
  if (today <= start) return 0;
  if (today >= end) return 100;
  return Math.round(((today - start) / (end - start)) * 100);
};

/**
 * Derived progress from GoalService, added remaining/expected/at-risk.
 * AT_RISK: not completed, progress < expected.
 */
export const toStatGoalInfo = (goal: GoalWithDerived): StatGoalInfo => {
  const currentValue = goal.progress.currentProgress;
  const progressRate = goal.progress.progressPercent;
  const remainingValue = Math.max(goal.targetValue - currentValue, 0);
  const hasDeadline = Boolean(goal.endDate);
  const expectedProgressRate = computeExpectedProgressRate(goal.startedDate, goal.endDate);

  let status: StatGoalStatus = goal.progress.status;
  if (
    hasDeadline &&
    goal.progress.status !== "COMPLETED" &&
    expectedProgressRate !== undefined &&
    progressRate < expectedProgressRate
  ) {
    status = "AT_RISK";
  }

  return {
    goalId: goal.id,
    goalType: goal.targetType,
    targetValue: goal.targetValue,
    currentValue,
    progressRate,
    remainingValue,
    status,
    hasDeadline,
    expectedProgressRate,
    endDate: goal.endDate,
  };
};

/** TODAY */
export const deriveTodayStatus = (
  todayCount: number,
  targetPerDay: number
): TodayStatus => {
  if (todayCount >= targetPerDay) return "COMPLETED_TODAY";
  if (todayCount > 0) return "IN_PROGRESS";
  return "NOT_STARTED";
};