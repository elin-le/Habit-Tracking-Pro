import {
    type SummaryCardType,
    type HabitStatisticsType,
    type CategoryOverviewType,
    type GoalProgressType
} from "../features/dashboard/Dashboard.type.ts";

export const SUMMARY_CARDS: SummaryCardType[] = [
    {
        id: 1,
        title: "Completed Today",
        value: 6,
    },
    {
        id: 2,
        title: "Active Habits",
        value: 8,
    },
    {
        id: 3,
        title: "At Risk Habits",
        value: 2,
    },
];

export const HABIT_STATISTICS: HabitStatisticsType = {
    currentStreak: 12,
    longestStreak: 28,
    completionRate: 78,
};

export const CATEGORY_OVERVIEW: CategoryOverviewType[] = [
    {
        id: 1,
        category: "Health",
        progress: 85,
    },
    {
        id: 2,
        category: "Learning",
        progress: 70,
    },
    {
        id: 3,
        category: "Productivity",
        progress: 65,
    },
];

export const GOAL_PROGRESS: GoalProgressType[] = [
    {
        id: 1,
        title: "Read 15 books this month",
        progress: 60,
    },
    {
        id: 2,
        title: "Workout 20 times this month",
        progress: 70,
    },
    {
        id: 3,
        title: "Drink 2L water daily",
        progress: 58,
    },
];