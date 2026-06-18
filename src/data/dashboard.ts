import {
    type SummaryCardType,
    type HabitStatisticsType,
    type CategoryOverviewType,
    type GoalProgressType
} from "../shared/types/Dashboard.ts";

export const SUMMARY_CARDS: SummaryCardType[] = [
    {
        id: 1,
        title: "dashboard.completedToday",
        completed: 6,
        total: 8,
    },
    {
        id: 2,
        title: "dashboard.activeHabits",
        value: 8,
    },
    {
        id: 3,
        title: "dashboard.currentStreak",
        value: "12 Days",
    },
    {
        id: 4,
        title: "dashboard.longestStreak",
        value: "28 Days",
    },
];

export const HABIT_STATISTICS: HabitStatisticsType[] = [
    { day: "Mon", rate: 70 },
    { day: "Tue", rate: 80 },
    { day: "Wed", rate: 60 },
    { day: "Thu", rate: 90 },
    { day: "Fri", rate: 75 },
    { day: "Sat", rate: 85 },
    { day: "Sun", rate: 95 },
];

export const CATEGORY_OVERVIEW: CategoryOverviewType[] = [
    {
        id: "1",
        category: "Health",
        progress: 85,
    },
    {
        id: "2",
        category: "Learning",
        progress: 70,
    },
    {
        id: "3",
        category: "Productivity",
        progress: 65,
    },
];

export const GOAL_PROGRESS: GoalProgressType[] = [
    {
        id: "1",
        title: "Read 15 books this month",
        progress: 60,
    },
    {
        id: "2",
        title: "Workout 20 times this month",
        progress: 70,
    },
    {
        id: "3",
        title: "Drink 2L water daily",
        progress: 58,
    },
];