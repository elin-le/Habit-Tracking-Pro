import type { HabitSchedule } from "../shared/types/HabitSchedule";

export const mockHabitSchedules: HabitSchedule[] = [
  // Morning Workout: Mon, Wed, Fri
  { id: "sched-1", habitId: "habit-baohanh-2", dayOfWeek: "MONDAY" }, //1
  { id: "sched-2", habitId: "habit-baohanh-2", dayOfWeek: "WEDNESDAY" }, //3
  { id: "sched-3", habitId: "habit-baohanh-2", dayOfWeek: "FRIDAY" }, //5

  // Sleep Early: every day except weekend (Mon-Fri)
  { id: "sched-4", habitId: "habit-baohanh-5", dayOfWeek: "MONDAY" }, //1
  { id: "sched-5", habitId: "habit-baohanh-5", dayOfWeek: "TUESDAY" }, //2
  { id: "sched-6", habitId: "habit-baohanh-5", dayOfWeek: "WEDNESDAY" }, //3
  { id: "sched-7", habitId: "habit-baohanh-5", dayOfWeek: "THURSDAY" }, //4
  { id: "sched-8", habitId: "habit-baohanh-5", dayOfWeek: "FRIDAY" }, //5

  // No Sugar: weekdays only (Mon-Fri)
  { id: "sched-9", habitId: "habit-baohanh-6", dayOfWeek: "MONDAY" },
  { id: "sched-10", habitId: "habit-baohanh-6", dayOfWeek: "TUESDAY" },
  { id: "sched-11", habitId: "habit-baohanh-6", dayOfWeek: "WEDNESDAY" },
  { id: "sched-12", habitId: "habit-baohanh-6", dayOfWeek: "THURSDAY" },
  { id: "sched-13", habitId: "habit-baohanh-6", dayOfWeek: "FRIDAY" },

  // Learn Spanish: Tue, Thu, Sat
  { id: "sched-14", habitId: "habit-baohanh-8", dayOfWeek: "TUESDAY" },
  { id: "sched-15", habitId: "habit-baohanh-8", dayOfWeek: "THURSDAY" },
  { id: "sched-16", habitId: "habit-baohanh-8", dayOfWeek: "SATURDAY" },

  // Morning Yoga: Mon Wed Fri
  {
    id: "elin-sched-1",
    habitId: "habit-elin-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "elin-sched-2",
    habitId: "habit-elin-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "elin-sched-3",
    habitId: "habit-elin-2",
    dayOfWeek: "FRIDAY",
  },

  // Practice English: Tue Thu Sat
  {
    id: "elin-sched-4",
    habitId: "habit-elin-5",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "elin-sched-5",
    habitId: "habit-elin-5",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "elin-sched-6",
    habitId: "habit-elin-5",
    dayOfWeek: "SATURDAY",
  },

  // Sleep Before 11 PM: Mon-Fri
  {
    id: "elin-sched-7",
    habitId: "habit-elin-6",
    dayOfWeek: "MONDAY",
  },
  {
    id: "elin-sched-8",
    habitId: "habit-elin-6",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "elin-sched-9",
    habitId: "habit-elin-6",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "elin-sched-10",
    habitId: "habit-elin-6",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "elin-sched-11",
    habitId: "habit-elin-6",
    dayOfWeek: "FRIDAY",
  },

  // Learn Korean: Tue Thu Sun
  {
    id: "elin-sched-12",
    habitId: "habit-elin-8",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "elin-sched-13",
    habitId: "habit-elin-8",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "elin-sched-14",
    habitId: "habit-elin-8",
    dayOfWeek: "SUNDAY",
  },

  // Gym Workout: Mon Wed Fri
  {
    id: "truc-sched-1",
    habitId: "habit-truc-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "truc-sched-2",
    habitId: "habit-truc-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "truc-sched-3",
    habitId: "habit-truc-2",
    dayOfWeek: "FRIDAY",
  },

  // Complete Online Course: Tue Thu Sat
  {
    id: "truc-sched-4",
    habitId: "habit-truc-3",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "truc-sched-5",
    habitId: "habit-truc-3",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "truc-sched-6",
    habitId: "habit-truc-3",
    dayOfWeek: "SATURDAY",
  },

  // Plan Tomorrow Tasks: Mon-Fri
  {
    id: "truc-sched-7",
    habitId: "habit-truc-6",
    dayOfWeek: "MONDAY",
  },
  {
    id: "truc-sched-8",
    habitId: "habit-truc-6",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "truc-sched-9",
    habitId: "habit-truc-6",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "truc-sched-10",
    habitId: "habit-truc-6",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "truc-sched-11",
    habitId: "habit-truc-6",
    dayOfWeek: "FRIDAY",
  },

  // Learn Guitar: Sat Sun
  {
    id: "truc-sched-12",
    habitId: "habit-truc-8",
    dayOfWeek: "SATURDAY",
  },
  {
    id: "truc-sched-13",
    habitId: "habit-truc-8",
    dayOfWeek: "SUNDAY",
  },

  // Morning Yoga: Mon Wed Fri Sun
  {
    id: "thuyanh-sched-1",
    habitId: "habit-thuyanh-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "thuyanh-sched-2",
    habitId: "habit-thuyanh-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "thuyanh-sched-3",
    habitId: "habit-thuyanh-2",
    dayOfWeek: "FRIDAY",
  },
  {
    id: "thuyanh-sched-4",
    habitId: "habit-thuyanh-2",
    dayOfWeek: "SUNDAY",
  },

  // Practice English: Tue Thu Sat
  {
    id: "thuyanh-sched-5",
    habitId: "habit-thuyanh-4",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "thuyanh-sched-6",
    habitId: "habit-thuyanh-4",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "thuyanh-sched-7",
    habitId: "habit-thuyanh-4",
    dayOfWeek: "SATURDAY",
  },

  // Weekly Room Cleaning: Sunday only
  {
    id: "thuyanh-sched-8",
    habitId: "habit-thuyanh-6",
    dayOfWeek: "SUNDAY",
  },

  // Photography Practice: Sat Sun
  {
    id: "thuyanh-sched-9",
    habitId: "habit-thuyanh-8",
    dayOfWeek: "SATURDAY",
  },
  {
    id: "thuyanh-sched-10",
    habitId: "habit-thuyanh-8",
    dayOfWeek: "SUNDAY",
  },

  // Morning Run: Mon Wed Fri Sat
  {
    id: "ngoc-sched-1",
    habitId: "habit-ngoc-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "ngoc-sched-2",
    habitId: "habit-ngoc-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "ngoc-sched-3",
    habitId: "habit-ngoc-2",
    dayOfWeek: "FRIDAY",
  },
  {
    id: "ngoc-sched-4",
    habitId: "habit-ngoc-2",
    dayOfWeek: "SATURDAY",
  },

  // Read Industry News: Mon-Fri
  {
    id: "ngoc-sched-5",
    habitId: "habit-ngoc-4",
    dayOfWeek: "MONDAY",
  },
  {
    id: "ngoc-sched-6",
    habitId: "habit-ngoc-4",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "ngoc-sched-7",
    habitId: "habit-ngoc-4",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "ngoc-sched-8",
    habitId: "habit-ngoc-4",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "ngoc-sched-9",
    habitId: "habit-ngoc-4",
    dayOfWeek: "FRIDAY",
  },

  // Update Daily Tasks: Mon-Fri
  {
    id: "ngoc-sched-10",
    habitId: "habit-ngoc-6",
    dayOfWeek: "MONDAY",
  },
  {
    id: "ngoc-sched-11",
    habitId: "habit-ngoc-6",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "ngoc-sched-12",
    habitId: "habit-ngoc-6",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "ngoc-sched-13",
    habitId: "habit-ngoc-6",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "ngoc-sched-14",
    habitId: "habit-ngoc-6",
    dayOfWeek: "FRIDAY",
  },

  // Learn Graphic Design: Tue Thu Sun
  {
    id: "ngoc-sched-15",
    habitId: "habit-ngoc-8",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "ngoc-sched-16",
    habitId: "habit-ngoc-8",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "ngoc-sched-17",
    habitId: "habit-ngoc-8",
    dayOfWeek: "SUNDAY",
  },

  // Evening Walk: Mon Wed Fri Sun
  {
    id: "vy-sched-1",
    habitId: "habit-vy-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "vy-sched-2",
    habitId: "habit-vy-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "vy-sched-3",
    habitId: "habit-vy-2",
    dayOfWeek: "FRIDAY",
  },
  {
    id: "vy-sched-4",
    habitId: "habit-vy-2",
    dayOfWeek: "SUNDAY",
  },

  // Practice IELTS: Tue Thu Sat
  {
    id: "vy-sched-5",
    habitId: "habit-vy-4",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "vy-sched-6",
    habitId: "habit-vy-4",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "vy-sched-7",
    habitId: "habit-vy-4",
    dayOfWeek: "SATURDAY",
  },

  // Sketch Drawing: Wed Sat
  {
    id: "vy-sched-8",
    habitId: "habit-vy-6",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "vy-sched-9",
    habitId: "habit-vy-6",
    dayOfWeek: "SATURDAY",
  },

  // Photography: Sat Sun
  {
    id: "vy-sched-10",
    habitId: "habit-vy-8",
    dayOfWeek: "SATURDAY",
  },
  {
    id: "vy-sched-11",
    habitId: "habit-vy-8",
    dayOfWeek: "SUNDAY",
  },

  // Morning Stretching: Mon Wed Fri
  {
    id: "ngan-sched-1",
    habitId: "habit-ngan-2",
    dayOfWeek: "MONDAY",
  },
  {
    id: "ngan-sched-2",
    habitId: "habit-ngan-2",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "ngan-sched-3",
    habitId: "habit-ngan-2",
    dayOfWeek: "FRIDAY",
  },

  // Learn English Vocabulary: Tue Thu Sat
  {
    id: "ngan-sched-4",
    habitId: "habit-ngan-4",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "ngan-sched-5",
    habitId: "habit-ngan-4",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "ngan-sched-6",
    habitId: "habit-ngan-4",
    dayOfWeek: "SATURDAY",
  },

  // Plan Tomorrow: Mon-Fri
  {
    id: "ngan-sched-7",
    habitId: "habit-ngan-6",
    dayOfWeek: "MONDAY",
  },
  {
    id: "ngan-sched-8",
    habitId: "habit-ngan-6",
    dayOfWeek: "TUESDAY",
  },
  {
    id: "ngan-sched-9",
    habitId: "habit-ngan-6",
    dayOfWeek: "WEDNESDAY",
  },
  {
    id: "ngan-sched-10",
    habitId: "habit-ngan-6",
    dayOfWeek: "THURSDAY",
  },
  {
    id: "ngan-sched-11",
    habitId: "habit-ngan-6",
    dayOfWeek: "FRIDAY",
  },

  // Learn Canva Design: Sat Sun
  {
    id: "ngan-sched-12",
    habitId: "habit-ngan-8",
    dayOfWeek: "SATURDAY",
  },
  {
    id: "ngan-sched-13",
    habitId: "habit-ngan-8",
    dayOfWeek: "SUNDAY",
  },
];
