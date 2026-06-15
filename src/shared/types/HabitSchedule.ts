export type DaysOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export interface HabitSchedule {
  id: string;
  habitId: string;
  dayOfWeek: DaysOfWeek;
}
