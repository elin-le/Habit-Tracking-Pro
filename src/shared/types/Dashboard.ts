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
    id: string;
    category: string;
    progress: number;
}

export interface GoalProgressType {
    id: string;
    title: string;
    progress: number;
}

export interface WeeklyCategoryProgressType {
    day: string;
    [categoryName: string]: number | string;
}
