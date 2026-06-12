import type { HabitRisk } from "./riskDetector";
import type { MockGoal, CheckIn } from "./goalCalculator";
import { getCurrentStreak, getLongestStreak, getCompletionRate, getStreakProgress, getTotalCompletionProgress } from "./goalCalculator";
import { getHabitRisk } from "./riskDetector"

export type HabitDashboardMetrics = {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    riskLevel: HabitRisk;
    goalProgress: number;
};

export const getHabitDashboardMetrics = (
    goal: MockGoal,
    checkins: CheckIn[],
    targetPerDay: number
): HabitDashboardMetrics => {
    const currentStreak =
        getCurrentStreak(checkins, targetPerDay);

    const longestStreak =
        getLongestStreak(checkins, targetPerDay);

    const completionRate =
        getCompletionRate(
            goal.startedDate,
            goal.endDate,
            checkins,
            targetPerDay
        );

    const riskLevel =
        getHabitRisk(completionRate);

    const goalProgress =
        goal.targetType === "STREAK"
            ? getStreakProgress(
                goal,
                targetPerDay,
                checkins
            )
            : getTotalCompletionProgress(
                goal,
                targetPerDay,
                checkins
            );

    return {
        currentStreak,
        longestStreak,
        completionRate,
        riskLevel,
        goalProgress,
    };
};