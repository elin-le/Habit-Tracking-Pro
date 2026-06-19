import type { HabitSchedule } from "../shared/types/HabitSchedule";

// ================================================================
// MOCK HABIT SCHEDULES
// Chỉ habits có frequencyType: "DAY_OF_WEEK" mới có schedules
// ================================================================
export const mockHabitSchedules: HabitSchedule[] = [

  // ══════════════════════════════════════════════════════════════
  // NGỌC — 14 DAY_OF_WEEK habits
  // ══════════════════════════════════════════════════════════════

  // habit-ngoc-2: Chạy bộ buổi sáng — Mon Wed Fri Sat
  { id: "ngoc-s-2-1",  habitId: "habit-ngoc-2",  dayOfWeek: "MONDAY" },
  { id: "ngoc-s-2-2",  habitId: "habit-ngoc-2",  dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-2-3",  habitId: "habit-ngoc-2",  dayOfWeek: "FRIDAY" },
  { id: "ngoc-s-2-4",  habitId: "habit-ngoc-2",  dayOfWeek: "SATURDAY" },

  // habit-ngoc-3: Tập gym — Mon Wed Fri
  { id: "ngoc-s-3-1",  habitId: "habit-ngoc-3",  dayOfWeek: "MONDAY" },
  { id: "ngoc-s-3-2",  habitId: "habit-ngoc-3",  dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-3-3",  habitId: "habit-ngoc-3",  dayOfWeek: "FRIDAY" },

  // habit-ngoc-8: Yoga buổi tối — Tue Thu Sun
  { id: "ngoc-s-8-1",  habitId: "habit-ngoc-8",  dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-8-2",  habitId: "habit-ngoc-8",  dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-8-3",  habitId: "habit-ngoc-8",  dayOfWeek: "SUNDAY" },

  // habit-ngoc-13: Luyện tiếng Anh — Tue Thu Sat
  { id: "ngoc-s-13-1", habitId: "habit-ngoc-13", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-13-2", habitId: "habit-ngoc-13", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-13-3", habitId: "habit-ngoc-13", dayOfWeek: "SATURDAY" },

  // habit-ngoc-14: Xem tin tức công nghệ — Mon Tue Wed Thu Fri
  { id: "ngoc-s-14-1", habitId: "habit-ngoc-14", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-14-2", habitId: "habit-ngoc-14", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-14-3", habitId: "habit-ngoc-14", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-14-4", habitId: "habit-ngoc-14", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-14-5", habitId: "habit-ngoc-14", dayOfWeek: "FRIDAY" },

  // habit-ngoc-15: Học design đồ họa — Tue Thu Sat Sun
  { id: "ngoc-s-15-1", habitId: "habit-ngoc-15", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-15-2", habitId: "habit-ngoc-15", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-15-3", habitId: "habit-ngoc-15", dayOfWeek: "SATURDAY" },
  { id: "ngoc-s-15-4", habitId: "habit-ngoc-15", dayOfWeek: "SUNDAY" },

  // habit-ngoc-17: Học tiếng Nhật — Wed Sat (PAUSED)
  { id: "ngoc-s-17-1", habitId: "habit-ngoc-17", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-17-2", habitId: "habit-ngoc-17", dayOfWeek: "SATURDAY" },

  // habit-ngoc-18: Xem khoá học online — Sun (ARCHIVED)
  { id: "ngoc-s-18-1", habitId: "habit-ngoc-18", dayOfWeek: "SUNDAY" },

  // habit-ngoc-23: Lên kế hoạch ngày mới — Mon Tue Wed Thu Fri
  { id: "ngoc-s-23-1", habitId: "habit-ngoc-23", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-23-2", habitId: "habit-ngoc-23", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-23-3", habitId: "habit-ngoc-23", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-23-4", habitId: "habit-ngoc-23", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-23-5", habitId: "habit-ngoc-23", dayOfWeek: "FRIDAY" },

  // habit-ngoc-24: Review task cuối ngày — Mon Tue Wed Thu Fri
  { id: "ngoc-s-24-1", habitId: "habit-ngoc-24", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-24-2", habitId: "habit-ngoc-24", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-24-3", habitId: "habit-ngoc-24", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-24-4", habitId: "habit-ngoc-24", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-24-5", habitId: "habit-ngoc-24", dayOfWeek: "FRIDAY" },

  // habit-ngoc-25: Đọc tin ngành — Mon Wed Fri
  { id: "ngoc-s-25-1", habitId: "habit-ngoc-25", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-25-2", habitId: "habit-ngoc-25", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-25-3", habitId: "habit-ngoc-25", dayOfWeek: "FRIDAY" },

  // habit-ngoc-26: Ghi chú meeting — Mon Tue Wed Thu Fri (PAUSED)
  { id: "ngoc-s-26-1", habitId: "habit-ngoc-26", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-26-2", habitId: "habit-ngoc-26", dayOfWeek: "TUESDAY" },
  { id: "ngoc-s-26-3", habitId: "habit-ngoc-26", dayOfWeek: "WEDNESDAY" },
  { id: "ngoc-s-26-4", habitId: "habit-ngoc-26", dayOfWeek: "THURSDAY" },
  { id: "ngoc-s-26-5", habitId: "habit-ngoc-26", dayOfWeek: "FRIDAY" },

  // habit-ngoc-27: Dọn bàn làm việc — Mon Fri
  { id: "ngoc-s-27-1", habitId: "habit-ngoc-27", dayOfWeek: "MONDAY" },
  { id: "ngoc-s-27-2", habitId: "habit-ngoc-27", dayOfWeek: "FRIDAY" },

  // habit-ngoc-28: Chụp ảnh nghệ thuật — Sat Sun (ARCHIVED)
  { id: "ngoc-s-28-1", habitId: "habit-ngoc-28", dayOfWeek: "SATURDAY" },
  { id: "ngoc-s-28-2", habitId: "habit-ngoc-28", dayOfWeek: "SUNDAY" },

  // ══════════════════════════════════════════════════════════════
  // ELIN — 7 DAY_OF_WEEK habits
  // ══════════════════════════════════════════════════════════════

  // habit-elin-2: Yoga buổi sáng — Mon Wed Fri
  { id: "elin-s-2-1",  habitId: "habit-elin-2",  dayOfWeek: "MONDAY" },
  { id: "elin-s-2-2",  habitId: "habit-elin-2",  dayOfWeek: "WEDNESDAY" },
  { id: "elin-s-2-3",  habitId: "habit-elin-2",  dayOfWeek: "FRIDAY" },

  // habit-elin-3: Chạy bộ — Tue Thu Sat
  { id: "elin-s-3-1",  habitId: "habit-elin-3",  dayOfWeek: "TUESDAY" },
  { id: "elin-s-3-2",  habitId: "habit-elin-3",  dayOfWeek: "THURSDAY" },
  { id: "elin-s-3-3",  habitId: "habit-elin-3",  dayOfWeek: "SATURDAY" },

  // habit-elin-7: Luyện tiếng Anh — Tue Thu Sat
  { id: "elin-s-7-1",  habitId: "habit-elin-7",  dayOfWeek: "TUESDAY" },
  { id: "elin-s-7-2",  habitId: "habit-elin-7",  dayOfWeek: "THURSDAY" },
  { id: "elin-s-7-3",  habitId: "habit-elin-7",  dayOfWeek: "SATURDAY" },

  // habit-elin-8: Học tiếng Hàn — Wed Sat Sun (PAUSED)
  { id: "elin-s-8-1",  habitId: "habit-elin-8",  dayOfWeek: "WEDNESDAY" },
  { id: "elin-s-8-2",  habitId: "habit-elin-8",  dayOfWeek: "SATURDAY" },
  { id: "elin-s-8-3",  habitId: "habit-elin-8",  dayOfWeek: "SUNDAY" },

  // habit-elin-11: Lên kế hoạch ngày mới — Mon Tue Wed Thu Fri
  { id: "elin-s-11-1", habitId: "habit-elin-11", dayOfWeek: "MONDAY" },
  { id: "elin-s-11-2", habitId: "habit-elin-11", dayOfWeek: "TUESDAY" },
  { id: "elin-s-11-3", habitId: "habit-elin-11", dayOfWeek: "WEDNESDAY" },
  { id: "elin-s-11-4", habitId: "habit-elin-11", dayOfWeek: "THURSDAY" },
  { id: "elin-s-11-5", habitId: "habit-elin-11", dayOfWeek: "FRIDAY" },

  // habit-elin-12: Review công việc — Mon Tue Wed Thu Fri
  { id: "elin-s-12-1", habitId: "habit-elin-12", dayOfWeek: "MONDAY" },
  { id: "elin-s-12-2", habitId: "habit-elin-12", dayOfWeek: "TUESDAY" },
  { id: "elin-s-12-3", habitId: "habit-elin-12", dayOfWeek: "WEDNESDAY" },
  { id: "elin-s-12-4", habitId: "habit-elin-12", dayOfWeek: "THURSDAY" },
  { id: "elin-s-12-5", habitId: "habit-elin-12", dayOfWeek: "FRIDAY" },

  // habit-elin-13: Vẽ phác thảo — Sat Sun
  { id: "elin-s-13-1", habitId: "habit-elin-13", dayOfWeek: "SATURDAY" },
  { id: "elin-s-13-2", habitId: "habit-elin-13", dayOfWeek: "SUNDAY" },

  // habit-elin-14: Học đàn guitar — Wed Sat (PAUSED)
  { id: "elin-s-14-1", habitId: "habit-elin-14", dayOfWeek: "WEDNESDAY" },
  { id: "elin-s-14-2", habitId: "habit-elin-14", dayOfWeek: "SATURDAY" },

  // ══════════════════════════════════════════════════════════════
  // TRÚC — 5 DAY_OF_WEEK habits
  // ══════════════════════════════════════════════════════════════

  // habit-truc-2: Tập gym — Mon Wed Fri
  { id: "truc-s-2-1",  habitId: "habit-truc-2",  dayOfWeek: "MONDAY" },
  { id: "truc-s-2-2",  habitId: "habit-truc-2",  dayOfWeek: "WEDNESDAY" },
  { id: "truc-s-2-3",  habitId: "habit-truc-2",  dayOfWeek: "FRIDAY" },

  // habit-truc-5: Hoàn thành khoá học online — Tue Thu Sat
  { id: "truc-s-5-1",  habitId: "habit-truc-5",  dayOfWeek: "TUESDAY" },
  { id: "truc-s-5-2",  habitId: "habit-truc-5",  dayOfWeek: "THURSDAY" },
  { id: "truc-s-5-3",  habitId: "habit-truc-5",  dayOfWeek: "SATURDAY" },

  // habit-truc-8: Lên kế hoạch ngày mai — Mon Tue Wed Thu Fri
  { id: "truc-s-8-1",  habitId: "habit-truc-8",  dayOfWeek: "MONDAY" },
  { id: "truc-s-8-2",  habitId: "habit-truc-8",  dayOfWeek: "TUESDAY" },
  { id: "truc-s-8-3",  habitId: "habit-truc-8",  dayOfWeek: "WEDNESDAY" },
  { id: "truc-s-8-4",  habitId: "habit-truc-8",  dayOfWeek: "THURSDAY" },
  { id: "truc-s-8-5",  habitId: "habit-truc-8",  dayOfWeek: "FRIDAY" },

  // habit-truc-10: Học đàn guitar — Sat Sun
  { id: "truc-s-10-1", habitId: "habit-truc-10", dayOfWeek: "SATURDAY" },
  { id: "truc-s-10-2", habitId: "habit-truc-10", dayOfWeek: "SUNDAY" },

  // habit-truc-11: Nấu ăn lành mạnh — Sat Sun
  { id: "truc-s-11-1", habitId: "habit-truc-11", dayOfWeek: "SATURDAY" },
  { id: "truc-s-11-2", habitId: "habit-truc-11", dayOfWeek: "SUNDAY" },

  // habit-truc-12: Học vẽ — Sun (ARCHIVED)
  { id: "truc-s-12-1", habitId: "habit-truc-12", dayOfWeek: "SUNDAY" },

  // ══════════════════════════════════════════════════════════════
  // THÚY ANH — 4 DAY_OF_WEEK habits
  // ══════════════════════════════════════════════════════════════

  // habit-thuyanh-2: Yoga buổi sáng — Mon Wed Fri Sun
  { id: "thuyanh-s-2-1",  habitId: "habit-thuyanh-2",  dayOfWeek: "MONDAY" },
  { id: "thuyanh-s-2-2",  habitId: "habit-thuyanh-2",  dayOfWeek: "WEDNESDAY" },
  { id: "thuyanh-s-2-3",  habitId: "habit-thuyanh-2",  dayOfWeek: "FRIDAY" },
  { id: "thuyanh-s-2-4",  habitId: "habit-thuyanh-2",  dayOfWeek: "SUNDAY" },

  // habit-thuyanh-5: Luyện tiếng Anh — Tue Thu Sat
  { id: "thuyanh-s-5-1",  habitId: "habit-thuyanh-5",  dayOfWeek: "TUESDAY" },
  { id: "thuyanh-s-5-2",  habitId: "habit-thuyanh-5",  dayOfWeek: "THURSDAY" },
  { id: "thuyanh-s-5-3",  habitId: "habit-thuyanh-5",  dayOfWeek: "SATURDAY" },

  // habit-thuyanh-8: Lên kế hoạch ngày mai — Mon Tue Wed Thu Fri
  { id: "thuyanh-s-8-1",  habitId: "habit-thuyanh-8",  dayOfWeek: "MONDAY" },
  { id: "thuyanh-s-8-2",  habitId: "habit-thuyanh-8",  dayOfWeek: "TUESDAY" },
  { id: "thuyanh-s-8-3",  habitId: "habit-thuyanh-8",  dayOfWeek: "WEDNESDAY" },
  { id: "thuyanh-s-8-4",  habitId: "habit-thuyanh-8",  dayOfWeek: "THURSDAY" },
  { id: "thuyanh-s-8-5",  habitId: "habit-thuyanh-8",  dayOfWeek: "FRIDAY" },

  // habit-thuyanh-9: Dọn phòng — Sunday only
  { id: "thuyanh-s-9-1",  habitId: "habit-thuyanh-9",  dayOfWeek: "SUNDAY" },

  // habit-thuyanh-10: Chụp ảnh nghệ thuật — Sat Sun (ARCHIVED)
  { id: "thuyanh-s-10-1", habitId: "habit-thuyanh-10", dayOfWeek: "SATURDAY" },
  { id: "thuyanh-s-10-2", habitId: "habit-thuyanh-10", dayOfWeek: "SUNDAY" },

  // ══════════════════════════════════════════════════════════════
  // VY — 4 DAY_OF_WEEK habits
  // ══════════════════════════════════════════════════════════════

  // habit-vy-2: Đi bộ buổi tối — Mon Wed Fri Sun
  { id: "vy-s-2-1",  habitId: "habit-vy-2",  dayOfWeek: "MONDAY" },
  { id: "vy-s-2-2",  habitId: "habit-vy-2",  dayOfWeek: "WEDNESDAY" },
  { id: "vy-s-2-3",  habitId: "habit-vy-2",  dayOfWeek: "FRIDAY" },
  { id: "vy-s-2-4",  habitId: "habit-vy-2",  dayOfWeek: "SUNDAY" },

  // habit-vy-4: Luyện IELTS — Tue Thu Sat
  { id: "vy-s-4-1",  habitId: "habit-vy-4",  dayOfWeek: "TUESDAY" },
  { id: "vy-s-4-2",  habitId: "habit-vy-4",  dayOfWeek: "THURSDAY" },
  { id: "vy-s-4-3",  habitId: "habit-vy-4",  dayOfWeek: "SATURDAY" },

  // habit-vy-7: Vẽ phác thảo — Wed Sat (PAUSED)
  { id: "vy-s-7-1",  habitId: "habit-vy-7",  dayOfWeek: "WEDNESDAY" },
  { id: "vy-s-7-2",  habitId: "habit-vy-7",  dayOfWeek: "SATURDAY" },

  // habit-vy-8: Chụp ảnh — Sat Sun (ARCHIVED)
  { id: "vy-s-8-1",  habitId: "habit-vy-8",  dayOfWeek: "SATURDAY" },
  { id: "vy-s-8-2",  habitId: "habit-vy-8",  dayOfWeek: "SUNDAY" },

  // ══════════════════════════════════════════════════════════════
  // BẢO HẠNH — 1 DAY_OF_WEEK habit
  // ══════════════════════════════════════════════════════════════

  // habit-baohanh-2: Tập thể dục nhẹ — Mon Wed Fri
  { id: "baohanh-s-2-1", habitId: "habit-baohanh-2", dayOfWeek: "MONDAY" },
  { id: "baohanh-s-2-2", habitId: "habit-baohanh-2", dayOfWeek: "WEDNESDAY" },
  { id: "baohanh-s-2-3", habitId: "habit-baohanh-2", dayOfWeek: "FRIDAY" },

  // ══════════════════════════════════════════════════════════════
  // NGÂN — 1 DAY_OF_WEEK habit
  // ══════════════════════════════════════════════════════════════

  // habit-ngan-2: Giãn cơ buổi sáng — Mon Wed Fri
  { id: "ngan-s-2-1", habitId: "habit-ngan-2", dayOfWeek: "MONDAY" },
  { id: "ngan-s-2-2", habitId: "habit-ngan-2", dayOfWeek: "WEDNESDAY" },
  { id: "ngan-s-2-3", habitId: "habit-ngan-2", dayOfWeek: "FRIDAY" },
];