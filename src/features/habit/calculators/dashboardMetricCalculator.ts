import type { HabitRisk } from "./riskDetector";
import type { CheckIn } from "../../../shared/types/CheckIn";
import { getCurrentStreak, getLongestStreak, getCompletionRate, getStreakProgress, getTotalCompletionProgress, getDailySummary } from "./GoalCalculator";
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

    const todayKey = new Date().toISOString().split("T")[0];
    const summary = getDailySummary(checkins, targetPerDay);
    const completedToday = summary[todayKey]?.completed ?? false;

    const riskLevel =
        getHabitRisk(completionRate, currentStreak, completedToday);

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