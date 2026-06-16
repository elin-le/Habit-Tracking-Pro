export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type FrequencyType = "DAY_OF_WEEK" | "DAILY";
export type HabitStatus = "PAUSED" | "ARCHIVED" | "ACTIVE";

export interface Habit {
  id: string;
  name: string;
  frequencyType: FrequencyType;
  targetPerDay: number;
  status: HabitStatus;
  priority: Priority;
  categoryId: string;
  userId: string;
}
