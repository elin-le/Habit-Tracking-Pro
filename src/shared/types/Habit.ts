export interface Habit {
    id: string;
    name: string;
    priority:Priority,
    frequencyType: FrequencyType,
    status: HabitStatus,
    targetPerDay: number;
}

type Priority = "LOW" | "MEDIUM" | "HIGHT"
type FrequencyType = "DAY_OF_WEEK" | "DAILY"
type HabitStatus = "PAUSED" | "RESUMED" | "ARCHIVED" | "ACTIVE"
