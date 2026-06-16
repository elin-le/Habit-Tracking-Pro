import type { HabitRisk } from "./riskDetector";
import type { CheckIn } from "./GoalCalculator";
import { getCurrentStreak, getLongestStreak, getCompletionRate, getStreakProgress, getTotalCompletionProgress } from "./GoalCalculator";
import { getHabitRisk } from "./riskDetector"
import type { Goal } from "../../../shared/types/Goal"

export type HabitDashboardMetrics = {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    riskLevel: HabitRisk;
    goalProgress: number;
};

export const getHabitDashboardMetrics = (
    goal: Goal,
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
        goal.goalType === "STREAK"
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