import { DAY_OF_WEEK_MAP } from "../constants/appConstants";
import type { Habit } from "../types/Habit";
import type { HabitSchedule } from "../types/HabitSchedule";

export function isExpectedToday(
  habit: Habit,
  schedules: HabitSchedule[],
  today: Date = new Date(),
): boolean {
  if (habit.status !== "ACTIVE") return false;
  if (habit.frequencyType === "DAILY") return true;

  const dow = DAY_OF_WEEK_MAP[today.getDay()];
  return schedules.some((s) => s.habitId === habit.id && s.dayOfWeek === dow);
}
