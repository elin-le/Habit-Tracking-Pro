import type { Goal } from "../../../shared/types/Goal";

export interface CheckIn {
    id: string;
    habitId: string;
    checkedAt: string;
}

type DailySummary = {
    count: number;
    completed: boolean;
};

const getDateKey = (date: string | Date | undefined | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
};

const isDateInRange = (
    date: string,
    startDate: string,
    endDate: string
) => {
    const dateKey = getDateKey(date);
    const startKey = getDateKey(startDate);
    const endKey = getDateKey(endDate);

    if (!endKey) {
        return dateKey >= startKey;
    }

    return (
        dateKey >= startKey &&
        dateKey <= endKey
    );
};

// Group checkins theo ngày
export const getDailySummary = (
    habitCheckins: CheckIn[],
    targetPerDay: number
): Record<string, DailySummary> => {
    const summary: Record<
        string,
        DailySummary
    > = {};

    for (const checkin of habitCheckins) {
        const dateKey = getDateKey(
            checkin.checkedAt
        );

        if (!summary[dateKey]) {
            summary[dateKey] = {
                count: 0,
                completed: false,
            };
        }

        summary[dateKey].count++;
    }

    for (const date in summary) {
        summary[date].completed =
            summary[date].count >=
            targetPerDay;
    }

    return summary;
};

export const getCurrentStreak = (
    habitCheckins: CheckIn[],
    targetPerDay: number
): number => {
    const summary = getDailySummary(
        habitCheckins,
        targetPerDay
    );

    const today = new Date();
    const todayKey = getDateKey(today);

    let streak = 0;

    // Nếu hôm nay chưa complete thì bắt đầu từ hôm qua
    let cursor = new Date(today);

    if (!summary[todayKey]?.completed) {
        cursor.setDate(
            cursor.getDate() - 1
        );
    }

    while (true) {
        const dateKey =
            getDateKey(cursor);

        if (
            !summary[dateKey]?.completed
        ) {
            break;
        }

        streak++;

        cursor.setDate(
            cursor.getDate() - 1
        );
    }

    return streak;
};
export const getLongestStreak = (
    habitCheckins: CheckIn[],
    targetPerDay: number
): number => {
    const summary = getDailySummary(
        habitCheckins,
        targetPerDay
    );

    const completedDates = Object.entries(summary)
        .filter(([, value]) => value.completed)
        .map(([date]) => date)
        .sort();

    if (completedDates.length === 0) {
        return 0;
    }

    let longest = 1;
    let current = 1;

    for (let i = 1; i < completedDates.length; i++) {
        const prev = new Date(completedDates[i - 1]);
        const curr = new Date(completedDates[i]);

        const diffDays = Math.round(
            (curr.getTime() - prev.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            current++;
        } else {
            longest = Math.max(longest, current);
            current = 1;
        }
    }

    return Math.max(longest, current);
};

export const getCurrentStreakInRange = (
    goal: Goal,
    habitCheckins: CheckIn[],
    targetPerDay: number
): number => {

    const summary = getDailySummary(
        habitCheckins,
        targetPerDay
    );

    const today = new Date();
    const todayKey = getDateKey(today);

    let streak = 0;
    let cursor = new Date(today);

    // Nếu hôm nay chưa complete thì bắt đầu từ hôm qua
    if (!summary[todayKey]?.completed) {
        cursor.setDate(cursor.getDate() - 1);
    }

    while (true) {
        const dateKey = getDateKey(cursor);

        // Không được vượt khỏi startDate của goal
        if (
            !isDateInRange(
                dateKey,
                goal.startedDate,
                goal.endDate
            )
        ) {
            break;
        }

        if (!summary[dateKey]?.completed) {
            break;
        }

        streak++;

        cursor.setDate(
            cursor.getDate() - 1
        );
    }

    return streak;
};
export const getStreakProgress = (
    goal: Goal,
    targetPerDay: number,
    checkins: CheckIn[]
): number => {
    if (
        goal.targetType !== "STREAK" ||
        goal.targetValue <= 0
    ) {
        return -1;
    }
    const currentStreak =
        getCurrentStreakInRange(
            goal,
            checkins,
            targetPerDay
        );

    return Math.min(
        Math.round(
            (currentStreak / goal.targetValue) * 100
        ),
        100
    );
};
export const getTotalCompletion = (
    goal: Goal,
    targetPerDay: number,
    checkins: CheckIn[]
): number => {
    if (
        goal.targetType !== "TOTAL_COMPLETIONS" ||
        goal.targetValue <= 0
    ) {
        return -1;
    }

    const summary = getDailySummary(
        checkins,
        targetPerDay
    );

    return Object.entries(summary)
        .filter(
            ([date, value]) =>
                value.completed &&
                isDateInRange(
                    date,
                    goal.startedDate,
                    goal.endDate
                )
        )
        .length;
};

export const getTotalCompletionProgress = (
    goal: Goal,
    targetPerDay: number,
    checkins: CheckIn[]
): number => {
    if (
        goal.targetType !== "TOTAL_COMPLETIONS" ||
        goal.targetValue <= 0
    ) {
        return -1;
    }

    const completedCount =
        getTotalCompletion(
            goal,
            targetPerDay,
            checkins
        );

    return Math.min(
        Math.round(
            (completedCount /
                goal.targetValue) *
            100
        ),
        100
    );
};

export const getCompletionRate = (
    startedDate: string,
    endDate: string,
    checkins: CheckIn[],
    targetPerDay: number
): number => {
    const summary = getDailySummary(
        checkins,
        targetPerDay
    );

    const today = new Date();

    const effectiveEnd =
        new Date(endDate) < today
            ? new Date(endDate)
            : today;

    const start = new Date(startedDate);

    const totalDays =
        Math.floor(
            (effectiveEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

    if (totalDays <= 0) return 0;

    const completedDays =
        Object.entries(summary).filter(
            ([date, value]) =>
                value.completed &&
                isDateInRange(
                    date,
                    startedDate,
                    getDateKey(effectiveEnd)
                )
        ).length;

    return Math.round(
        (completedDays / totalDays) *
        100
    );
};