import type { HabitSchedule } from "../shared/types/HabitSchedule";

export const mockHabitSchedules: HabitSchedule[] = [
  // Morning Workout: Mon, Wed, Fri
  { id: "sched-1", habitId: "habit-2", dayOfWeek: "MONDAY" }, //1
  { id: "sched-2", habitId: "habit-2", dayOfWeek: "WEDNESDAY" }, //3
  { id: "sched-3", habitId: "habit-2", dayOfWeek: "FRIDAY" }, //5

  // Sleep Early: every day except weekend (Mon-Fri)
  { id: "sched-4", habitId: "habit-5", dayOfWeek: "MONDAY" }, //1
  { id: "sched-5", habitId: "habit-5", dayOfWeek: "TUESDAY" }, //2
  { id: "sched-6", habitId: "habit-5", dayOfWeek: "WEDNESDAY" }, //3
  { id: "sched-7", habitId: "habit-5", dayOfWeek: "THURSDAY" }, //4
  { id: "sched-8", habitId: "habit-5", dayOfWeek: "FRIDAY" }, //5

  // No Sugar: weekdays only (Mon-Fri)
  { id: "sched-9", habitId: "habit-6", dayOfWeek: "MONDAY" },
  { id: "sched-10", habitId: "habit-6", dayOfWeek: "TUESDAY" },
  { id: "sched-11", habitId: "habit-6", dayOfWeek: "WEDNESDAY" },
  { id: "sched-12", habitId: "habit-6", dayOfWeek: "THURSDAY" },
  { id: "sched-13", habitId: "habit-6", dayOfWeek: "FRIDAY" },

  // Learn Spanish: Tue, Thu, Sat
  { id: "sched-14", habitId: "habit-8", dayOfWeek: "TUESDAY" },
  { id: "sched-15", habitId: "habit-8", dayOfWeek: "THURSDAY" },
  { id: "sched-16", habitId: "habit-8", dayOfWeek: "SATURDAY" },
];
