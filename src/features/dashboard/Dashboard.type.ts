export interface SummaryCardType {
    id: number;
    title: string;
    value: number;
}

export interface HabitStatisticsType {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
}

export interface CategoryOverviewType {
    id: number;
    category: string;
    progress: number;
}

export interface GoalProgressType {
    id: number;
    title: string;
    progress: number;
}