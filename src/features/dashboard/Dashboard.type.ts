export interface SummaryCardType {
    id: number;
    title: string;
    value?: number | string;
    completed?: number;
    total?: number;
}

export interface HabitStatisticsType {
    day: string;
    rate: number;
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
