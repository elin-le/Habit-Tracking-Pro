import type { CheckIn } from "@/shared/types/CheckIn";

// ================================================================
// MOCK CHECK-INS — density tỷ lệ với số habit
//
//   ngoc    : ~120 checkins — siêu active, gần như hằng ngày
//   elin    :  ~75 checkins — active, consistent
//   truc    :  ~55 checkins — active, regular
//   thuyanh :  ~35 checkins — moderate
//   vy      :  ~25 checkins — moderate, có gaps
//   baohanh :  ~12 checkins — light, thưa
//   ngan    :   ~8 checkins — light, rất thưa
//
// Ngày hiện tại: 2026-06-19
// ================================================================
export const mockCheckIns: CheckIn[] = [

  // ════════════════════════════════════════════════════════════
  // NGỌC — ~120 checkins, siêu active
  // Hầu hết habits checkin gần như mỗi ngày trong tháng 6
  // ════════════════════════════════════════════════════════════

  // --- habit-ngoc-1: Uống 2L nước (DAILY, target 8) — dense ---
  { id: "ci-ngoc-1-01",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-19", completionCount: 8 },
  { id: "ci-ngoc-1-02",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-18", completionCount: 8 },
  { id: "ci-ngoc-1-03",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-17", completionCount: 7 },
  { id: "ci-ngoc-1-04",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-16", completionCount: 8 },
  { id: "ci-ngoc-1-05",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-15", completionCount: 8 },
  { id: "ci-ngoc-1-06",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-14", completionCount: 8 },
  { id: "ci-ngoc-1-07",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-13", completionCount: 8 },
  { id: "ci-ngoc-1-08",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-12", completionCount: 6 },
  { id: "ci-ngoc-1-09",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-11", completionCount: 8 },
  { id: "ci-ngoc-1-10",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-10", completionCount: 8 },
  { id: "ci-ngoc-1-11",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-09", completionCount: 8 },
  { id: "ci-ngoc-1-12",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-08", completionCount: 7 },
  { id: "ci-ngoc-1-13",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-07", completionCount: 8 },
  { id: "ci-ngoc-1-14",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-05", completionCount: 8 },
  { id: "ci-ngoc-1-15",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-04", completionCount: 8 },
  { id: "ci-ngoc-1-16",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-03", completionCount: 8 },
  { id: "ci-ngoc-1-17",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-02", completionCount: 8 },
  { id: "ci-ngoc-1-18",  habitId: "habit-ngoc-1",  checkedAt: "2026-06-01", completionCount: 8 },
  { id: "ci-ngoc-1-19",  habitId: "habit-ngoc-1",  checkedAt: "2026-05-25", completionCount: 8 },
  { id: "ci-ngoc-1-20",  habitId: "habit-ngoc-1",  checkedAt: "2026-04-10", completionCount: 8 },

  // --- habit-ngoc-2: Chạy bộ (DAY_OF_WEEK: Mon Wed Fri Sat) ---
  { id: "ci-ngoc-2-01",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-2-02",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-2-03",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-2-04",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-ngoc-2-05",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-2-06",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-2-07",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-ngoc-2-08",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-06", completionCount: 1 },
  { id: "ci-ngoc-2-09",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-05", completionCount: 1 },
  { id: "ci-ngoc-2-10",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-03", completionCount: 1 },
  { id: "ci-ngoc-2-11",  habitId: "habit-ngoc-2",  checkedAt: "2026-06-01", completionCount: 1 },

  // --- habit-ngoc-3: Tập gym (DAY_OF_WEEK: Mon Wed Fri) ---
  { id: "ci-ngoc-3-01",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-3-02",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-3-03",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-3-04",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-3-05",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-3-06",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-ngoc-3-07",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-05", completionCount: 1 },
  { id: "ci-ngoc-3-08",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-03", completionCount: 1 },
  { id: "ci-ngoc-3-09",  habitId: "habit-ngoc-3",  checkedAt: "2026-06-01", completionCount: 1 },
  { id: "ci-ngoc-3-10",  habitId: "habit-ngoc-3",  checkedAt: "2026-05-29", completionCount: 1 },
  { id: "ci-ngoc-3-11",  habitId: "habit-ngoc-3",  checkedAt: "2026-05-27", completionCount: 1 },
  { id: "ci-ngoc-3-12",  habitId: "habit-ngoc-3",  checkedAt: "2026-04-17", completionCount: 1 },

  // --- habit-ngoc-4: Ăn sáng đủ chất (DAILY) ---
  { id: "ci-ngoc-4-01",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-4-02",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-4-03",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-4-04",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-4-05",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-4-06",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-4-07",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-4-08",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-4-09",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-4-10",  habitId: "habit-ngoc-4",  checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-ngoc-5: Không ăn đồ ngọt (DAILY) ---
  { id: "ci-ngoc-5-01",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-5-02",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-5-03",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-5-04",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-5-05",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-5-06",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-5-07",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-ngoc-5-08",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-5-09",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-5-10",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-5-11",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-ngoc-5-12",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-ngoc-5-13",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-07", completionCount: 1 },
  { id: "ci-ngoc-5-14",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-06", completionCount: 1 },
  { id: "ci-ngoc-5-15",  habitId: "habit-ngoc-5",  checkedAt: "2026-06-05", completionCount: 1 },

  // --- habit-ngoc-6: Ngủ trước 23h (DAILY) ---
  { id: "ci-ngoc-6-01",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-6-02",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-6-03",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-6-04",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-6-05",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-6-06",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-6-07",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-ngoc-6-08",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-6-09",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-6-10",  habitId: "habit-ngoc-6",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-6-11",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-31", completionCount: 1 },
  { id: "ci-ngoc-6-12",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-30", completionCount: 1 },
  { id: "ci-ngoc-6-13",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-29", completionCount: 1 },
  { id: "ci-ngoc-6-14",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-28", completionCount: 1 },
  { id: "ci-ngoc-6-15",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-27", completionCount: 1 },
  { id: "ci-ngoc-6-16",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-26", completionCount: 1 },
  { id: "ci-ngoc-6-17",  habitId: "habit-ngoc-6",  checkedAt: "2026-05-25", completionCount: 1 },

  // --- habit-ngoc-7: Đi bộ 10,000 bước (DAILY) ---
  { id: "ci-ngoc-7-01",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-7-02",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-7-03",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-7-04",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-7-05",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-7-06",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-7-07",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-7-08",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-7-09",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-ngoc-7-10",  habitId: "habit-ngoc-7",  checkedAt: "2026-06-08", completionCount: 1 },

  // --- habit-ngoc-11: Học lập trình (DAILY, target 2) ---
  { id: "ci-ngoc-11-01", habitId: "habit-ngoc-11", checkedAt: "2026-06-19", completionCount: 2 },
  { id: "ci-ngoc-11-02", habitId: "habit-ngoc-11", checkedAt: "2026-06-18", completionCount: 2 },
  { id: "ci-ngoc-11-03", habitId: "habit-ngoc-11", checkedAt: "2026-06-17", completionCount: 2 },
  { id: "ci-ngoc-11-04", habitId: "habit-ngoc-11", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-11-05", habitId: "habit-ngoc-11", checkedAt: "2026-06-15", completionCount: 2 },
  { id: "ci-ngoc-11-06", habitId: "habit-ngoc-11", checkedAt: "2026-06-14", completionCount: 2 },
  { id: "ci-ngoc-11-07", habitId: "habit-ngoc-11", checkedAt: "2026-06-13", completionCount: 2 },
  { id: "ci-ngoc-11-08", habitId: "habit-ngoc-11", checkedAt: "2026-06-12", completionCount: 2 },
  { id: "ci-ngoc-11-09", habitId: "habit-ngoc-11", checkedAt: "2026-06-11", completionCount: 2 },
  { id: "ci-ngoc-11-10", habitId: "habit-ngoc-11", checkedAt: "2026-06-10", completionCount: 2 },
  { id: "ci-ngoc-11-11", habitId: "habit-ngoc-11", checkedAt: "2026-06-09", completionCount: 2 },
  { id: "ci-ngoc-11-12", habitId: "habit-ngoc-11", checkedAt: "2026-06-08", completionCount: 2 },
  { id: "ci-ngoc-11-13", habitId: "habit-ngoc-11", checkedAt: "2026-06-07", completionCount: 2 },
  { id: "ci-ngoc-11-14", habitId: "habit-ngoc-11", checkedAt: "2026-06-06", completionCount: 2 },
  { id: "ci-ngoc-11-15", habitId: "habit-ngoc-11", checkedAt: "2026-06-05", completionCount: 2 },
  { id: "ci-ngoc-11-16", habitId: "habit-ngoc-11", checkedAt: "2026-06-04", completionCount: 2 },
  { id: "ci-ngoc-11-17", habitId: "habit-ngoc-11", checkedAt: "2026-06-03", completionCount: 2 },
  { id: "ci-ngoc-11-18", habitId: "habit-ngoc-11", checkedAt: "2026-06-02", completionCount: 2 },
  { id: "ci-ngoc-11-19", habitId: "habit-ngoc-11", checkedAt: "2026-06-01", completionCount: 2 },

  // --- habit-ngoc-12: Đọc sách 30 phút (DAILY) ---
  { id: "ci-ngoc-12-01", habitId: "habit-ngoc-12", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-12-02", habitId: "habit-ngoc-12", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-12-03", habitId: "habit-ngoc-12", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-12-04", habitId: "habit-ngoc-12", checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-ngoc-12-05", habitId: "habit-ngoc-12", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-12-06", habitId: "habit-ngoc-12", checkedAt: "2026-05-30", completionCount: 1 },
  { id: "ci-ngoc-12-07", habitId: "habit-ngoc-12", checkedAt: "2026-05-20", completionCount: 1 },
  { id: "ci-ngoc-12-08", habitId: "habit-ngoc-12", checkedAt: "2026-04-12", completionCount: 1 },

  // --- habit-ngoc-13: Luyện tiếng Anh (DAY_OF_WEEK Tue Thu Sat, target 2) ---
  { id: "ci-ngoc-13-01", habitId: "habit-ngoc-13", checkedAt: "2026-06-17", completionCount: 2 },
  { id: "ci-ngoc-13-02", habitId: "habit-ngoc-13", checkedAt: "2026-06-14", completionCount: 2 },
  { id: "ci-ngoc-13-03", habitId: "habit-ngoc-13", checkedAt: "2026-06-12", completionCount: 2 },
  { id: "ci-ngoc-13-04", habitId: "habit-ngoc-13", checkedAt: "2026-06-10", completionCount: 2 },
  { id: "ci-ngoc-13-05", habitId: "habit-ngoc-13", checkedAt: "2026-06-07", completionCount: 2 },
  { id: "ci-ngoc-13-06", habitId: "habit-ngoc-13", checkedAt: "2026-06-05", completionCount: 2 },
  { id: "ci-ngoc-13-07", habitId: "habit-ngoc-13", checkedAt: "2026-06-03", completionCount: 2 },
  { id: "ci-ngoc-13-08", habitId: "habit-ngoc-13", checkedAt: "2026-05-30", completionCount: 2 },
  { id: "ci-ngoc-13-09", habitId: "habit-ngoc-13", checkedAt: "2026-05-28", completionCount: 2 },
  { id: "ci-ngoc-13-10", habitId: "habit-ngoc-13", checkedAt: "2026-05-26", completionCount: 1 },

  // --- habit-ngoc-16: Làm bài tập thuật toán (DAILY) ---
  { id: "ci-ngoc-16-01", habitId: "habit-ngoc-16", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-16-02", habitId: "habit-ngoc-16", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-16-03", habitId: "habit-ngoc-16", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-16-04", habitId: "habit-ngoc-16", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-16-05", habitId: "habit-ngoc-16", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-16-06", habitId: "habit-ngoc-16", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-16-07", habitId: "habit-ngoc-16", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-16-08", habitId: "habit-ngoc-16", checkedAt: "2026-05-25", completionCount: 1 },
  { id: "ci-ngoc-16-09", habitId: "habit-ngoc-16", checkedAt: "2026-05-20", completionCount: 1 },
  { id: "ci-ngoc-16-10", habitId: "habit-ngoc-16", checkedAt: "2026-05-10", completionCount: 1 },

  // --- habit-ngoc-19: Thiền 10 phút (DAILY) ---
  { id: "ci-ngoc-19-01", habitId: "habit-ngoc-19", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-19-02", habitId: "habit-ngoc-19", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-19-03", habitId: "habit-ngoc-19", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-19-04", habitId: "habit-ngoc-19", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-19-05", habitId: "habit-ngoc-19", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-19-06", habitId: "habit-ngoc-19", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-19-07", habitId: "habit-ngoc-19", checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-ngoc-19-08", habitId: "habit-ngoc-19", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-19-09", habitId: "habit-ngoc-19", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-19-10", habitId: "habit-ngoc-19", checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-19-11", habitId: "habit-ngoc-19", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-ngoc-19-12", habitId: "habit-ngoc-19", checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-ngoc-19-13", habitId: "habit-ngoc-19", checkedAt: "2026-06-07", completionCount: 1 },
  { id: "ci-ngoc-19-14", habitId: "habit-ngoc-19", checkedAt: "2026-06-06", completionCount: 1 },
  { id: "ci-ngoc-19-15", habitId: "habit-ngoc-19", checkedAt: "2026-06-05", completionCount: 1 },

  // --- habit-ngoc-20: Viết nhật ký (DAILY) ---
  { id: "ci-ngoc-20-01", habitId: "habit-ngoc-20", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-20-02", habitId: "habit-ngoc-20", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-20-03", habitId: "habit-ngoc-20", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-20-04", habitId: "habit-ngoc-20", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-ngoc-20-05", habitId: "habit-ngoc-20", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-20-06", habitId: "habit-ngoc-20", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-ngoc-20-07", habitId: "habit-ngoc-20", checkedAt: "2026-06-07", completionCount: 1 },

  // --- habit-ngoc-22: Không lướt MXH trước ngủ (DAILY) ---
  { id: "ci-ngoc-22-01", habitId: "habit-ngoc-22", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-22-02", habitId: "habit-ngoc-22", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-22-03", habitId: "habit-ngoc-22", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-22-04", habitId: "habit-ngoc-22", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-22-05", habitId: "habit-ngoc-22", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-22-06", habitId: "habit-ngoc-22", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-22-07", habitId: "habit-ngoc-22", checkedAt: "2026-06-10", completionCount: 1 },

  // --- habit-ngoc-23: Lên kế hoạch ngày mới (DAY_OF_WEEK Mon–Fri) ---
  { id: "ci-ngoc-23-01", habitId: "habit-ngoc-23", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-23-02", habitId: "habit-ngoc-23", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-23-03", habitId: "habit-ngoc-23", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-23-04", habitId: "habit-ngoc-23", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-23-05", habitId: "habit-ngoc-23", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-23-06", habitId: "habit-ngoc-23", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-23-07", habitId: "habit-ngoc-23", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-23-08", habitId: "habit-ngoc-23", checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-23-09", habitId: "habit-ngoc-23", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-ngoc-23-10", habitId: "habit-ngoc-23", checkedAt: "2026-06-08", completionCount: 1 },

  // --- habit-ngoc-24: Review task cuối ngày (DAY_OF_WEEK Mon–Fri) ---
  { id: "ci-ngoc-24-01", habitId: "habit-ngoc-24", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-24-02", habitId: "habit-ngoc-24", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngoc-24-03", habitId: "habit-ngoc-24", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-24-04", habitId: "habit-ngoc-24", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-ngoc-24-05", habitId: "habit-ngoc-24", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-24-06", habitId: "habit-ngoc-24", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-24-07", habitId: "habit-ngoc-24", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-ngoc-24-08", habitId: "habit-ngoc-24", checkedAt: "2026-06-10", completionCount: 1 },

  // --- habit-ngoc-25: Đọc tin ngành (DAY_OF_WEEK Mon Wed Fri) ---
  { id: "ci-ngoc-25-01", habitId: "habit-ngoc-25", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngoc-25-02", habitId: "habit-ngoc-25", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-ngoc-25-03", habitId: "habit-ngoc-25", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-ngoc-25-04", habitId: "habit-ngoc-25", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-ngoc-25-05", habitId: "habit-ngoc-25", checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-ngoc-25-06", habitId: "habit-ngoc-25", checkedAt: "2026-06-08", completionCount: 1 },

  // ARCHIVED/PAUSED — vài checkin cũ
  { id: "ci-ngoc-17-01", habitId: "habit-ngoc-17", checkedAt: "2026-05-10", completionCount: 1 },
  { id: "ci-ngoc-18-01", habitId: "habit-ngoc-18", checkedAt: "2026-04-20", completionCount: 1 },
  { id: "ci-ngoc-28-01", habitId: "habit-ngoc-28", checkedAt: "2026-05-03", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // ELIN — ~75 checkins, active
  // ════════════════════════════════════════════════════════════

  // --- habit-elin-1: Uống nước (DAILY, target 8) ---
  { id: "ci-elin-1-01",  habitId: "habit-elin-1",  checkedAt: "2026-06-19", completionCount: 8 },
  { id: "ci-elin-1-02",  habitId: "habit-elin-1",  checkedAt: "2026-06-18", completionCount: 8 },
  { id: "ci-elin-1-03",  habitId: "habit-elin-1",  checkedAt: "2026-06-17", completionCount: 7 },
  { id: "ci-elin-1-04",  habitId: "habit-elin-1",  checkedAt: "2026-06-15", completionCount: 8 },
  { id: "ci-elin-1-05",  habitId: "habit-elin-1",  checkedAt: "2026-06-14", completionCount: 8 },
  { id: "ci-elin-1-06",  habitId: "habit-elin-1",  checkedAt: "2026-06-12", completionCount: 6 },
  { id: "ci-elin-1-07",  habitId: "habit-elin-1",  checkedAt: "2026-06-10", completionCount: 8 },
  { id: "ci-elin-1-08",  habitId: "habit-elin-1",  checkedAt: "2026-06-08", completionCount: 8 },
  { id: "ci-elin-1-09",  habitId: "habit-elin-1",  checkedAt: "2026-06-05", completionCount: 8 },
  { id: "ci-elin-1-10",  habitId: "habit-elin-1",  checkedAt: "2026-06-01", completionCount: 8 },
  { id: "ci-elin-1-11",  habitId: "habit-elin-1",  checkedAt: "2026-05-28", completionCount: 7 },
  { id: "ci-elin-1-12",  habitId: "habit-elin-1",  checkedAt: "2026-05-20", completionCount: 8 },

  // --- habit-elin-2: Yoga buổi sáng (DAY_OF_WEEK Mon Wed Fri) ---
  { id: "ci-elin-2-01",  habitId: "habit-elin-2",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-2-02",  habitId: "habit-elin-2",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-2-03",  habitId: "habit-elin-2",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-elin-2-04",  habitId: "habit-elin-2",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-elin-2-05",  habitId: "habit-elin-2",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-elin-2-06",  habitId: "habit-elin-2",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-elin-2-07",  habitId: "habit-elin-2",  checkedAt: "2026-06-06", completionCount: 1 },
  { id: "ci-elin-2-08",  habitId: "habit-elin-2",  checkedAt: "2026-06-04", completionCount: 1 },
  { id: "ci-elin-2-09",  habitId: "habit-elin-2",  checkedAt: "2026-06-01", completionCount: 1 },

  // --- habit-elin-3: Chạy bộ (DAY_OF_WEEK Tue Thu Sat) ---
  { id: "ci-elin-3-01",  habitId: "habit-elin-3",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-3-02",  habitId: "habit-elin-3",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-3-03",  habitId: "habit-elin-3",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-3-04",  habitId: "habit-elin-3",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-elin-3-05",  habitId: "habit-elin-3",  checkedAt: "2026-06-07", completionCount: 1 },
  { id: "ci-elin-3-06",  habitId: "habit-elin-3",  checkedAt: "2026-06-05", completionCount: 1 },
  { id: "ci-elin-3-07",  habitId: "habit-elin-3",  checkedAt: "2026-06-02", completionCount: 1 },
  { id: "ci-elin-3-08",  habitId: "habit-elin-3",  checkedAt: "2026-05-30", completionCount: 1 },

  // --- habit-elin-4: Ngủ đủ 8 tiếng (DAILY) ---
  { id: "ci-elin-4-01",  habitId: "habit-elin-4",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-4-02",  habitId: "habit-elin-4",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-4-03",  habitId: "habit-elin-4",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-4-04",  habitId: "habit-elin-4",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-elin-4-05",  habitId: "habit-elin-4",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-elin-4-06",  habitId: "habit-elin-4",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-4-07",  habitId: "habit-elin-4",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-elin-4-08",  habitId: "habit-elin-4",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-4-09",  habitId: "habit-elin-4",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-elin-4-10",  habitId: "habit-elin-4",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-elin-4-11",  habitId: "habit-elin-4",  checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-elin-5: Không ăn khuya (DAILY) ---
  { id: "ci-elin-5-01",  habitId: "habit-elin-5",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-5-02",  habitId: "habit-elin-5",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-5-03",  habitId: "habit-elin-5",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-5-04",  habitId: "habit-elin-5",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-elin-5-05",  habitId: "habit-elin-5",  checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-elin-6: Đọc sách (DAILY) ---
  { id: "ci-elin-6-01",  habitId: "habit-elin-6",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-6-02",  habitId: "habit-elin-6",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-6-03",  habitId: "habit-elin-6",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-elin-6-04",  habitId: "habit-elin-6",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-6-05",  habitId: "habit-elin-6",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-6-06",  habitId: "habit-elin-6",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-elin-6-07",  habitId: "habit-elin-6",  checkedAt: "2026-06-07", completionCount: 1 },
  { id: "ci-elin-6-08",  habitId: "habit-elin-6",  checkedAt: "2026-06-05", completionCount: 1 },

  // --- habit-elin-7: Luyện tiếng Anh (DAY_OF_WEEK Tue Thu Sat, target 2) ---
  { id: "ci-elin-7-01",  habitId: "habit-elin-7",  checkedAt: "2026-06-17", completionCount: 2 },
  { id: "ci-elin-7-02",  habitId: "habit-elin-7",  checkedAt: "2026-06-14", completionCount: 2 },
  { id: "ci-elin-7-03",  habitId: "habit-elin-7",  checkedAt: "2026-06-12", completionCount: 2 },
  { id: "ci-elin-7-04",  habitId: "habit-elin-7",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-elin-7-05",  habitId: "habit-elin-7",  checkedAt: "2026-06-07", completionCount: 2 },
  { id: "ci-elin-7-06",  habitId: "habit-elin-7",  checkedAt: "2026-06-05", completionCount: 2 },

  // --- habit-elin-9: Thiền 10 phút (DAILY) ---
  { id: "ci-elin-9-01",  habitId: "habit-elin-9",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-9-02",  habitId: "habit-elin-9",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-9-03",  habitId: "habit-elin-9",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-9-04",  habitId: "habit-elin-9",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-elin-9-05",  habitId: "habit-elin-9",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-elin-9-06",  habitId: "habit-elin-9",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-9-07",  habitId: "habit-elin-9",  checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-elin-9-08",  habitId: "habit-elin-9",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-9-09",  habitId: "habit-elin-9",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-elin-9-10",  habitId: "habit-elin-9",  checkedAt: "2026-06-10", completionCount: 1 },

  // --- habit-elin-10: Viết nhật ký biết ơn (DAILY) ---
  { id: "ci-elin-10-01", habitId: "habit-elin-10", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-10-02", habitId: "habit-elin-10", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-10-03", habitId: "habit-elin-10", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-10-04", habitId: "habit-elin-10", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-elin-10-05", habitId: "habit-elin-10", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-elin-10-06", habitId: "habit-elin-10", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-10-07", habitId: "habit-elin-10", checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-elin-11: Lên kế hoạch (DAY_OF_WEEK Mon–Fri) ---
  { id: "ci-elin-11-01", habitId: "habit-elin-11", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-elin-11-02", habitId: "habit-elin-11", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-elin-11-03", habitId: "habit-elin-11", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-elin-11-04", habitId: "habit-elin-11", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-elin-11-05", habitId: "habit-elin-11", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-elin-11-06", habitId: "habit-elin-11", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-elin-11-07", habitId: "habit-elin-11", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-elin-11-08", habitId: "habit-elin-11", checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-elin-11-09", habitId: "habit-elin-11", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-elin-11-10", habitId: "habit-elin-11", checkedAt: "2026-05-29", completionCount: 1 },
  { id: "ci-elin-11-11", habitId: "habit-elin-11", checkedAt: "2026-05-28", completionCount: 1 },

  // ARCHIVED/PAUSED
  { id: "ci-elin-8-01",  habitId: "habit-elin-8",  checkedAt: "2026-05-15", completionCount: 1 },
  { id: "ci-elin-15-01", habitId: "habit-elin-15", checkedAt: "2026-04-10", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // TRÚC — ~55 checkins, active
  // ════════════════════════════════════════════════════════════

  // --- habit-truc-1: Đi bộ 8,000 bước (DAILY, target 2) ---
  { id: "ci-truc-1-01",  habitId: "habit-truc-1",  checkedAt: "2026-06-19", completionCount: 2 },
  { id: "ci-truc-1-02",  habitId: "habit-truc-1",  checkedAt: "2026-06-18", completionCount: 2 },
  { id: "ci-truc-1-03",  habitId: "habit-truc-1",  checkedAt: "2026-06-17", completionCount: 2 },
  { id: "ci-truc-1-04",  habitId: "habit-truc-1",  checkedAt: "2026-06-16", completionCount: 2 },
  { id: "ci-truc-1-05",  habitId: "habit-truc-1",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-truc-1-06",  habitId: "habit-truc-1",  checkedAt: "2026-06-14", completionCount: 2 },
  { id: "ci-truc-1-07",  habitId: "habit-truc-1",  checkedAt: "2026-06-12", completionCount: 2 },
  { id: "ci-truc-1-08",  habitId: "habit-truc-1",  checkedAt: "2026-06-11", completionCount: 2 },
  { id: "ci-truc-1-09",  habitId: "habit-truc-1",  checkedAt: "2026-06-10", completionCount: 2 },
  { id: "ci-truc-1-10",  habitId: "habit-truc-1",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-truc-1-11",  habitId: "habit-truc-1",  checkedAt: "2026-06-01", completionCount: 5 },

  // --- habit-truc-2: Tập gym (DAY_OF_WEEK Mon Wed Fri) ---
  { id: "ci-truc-2-01",  habitId: "habit-truc-2",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-2-02",  habitId: "habit-truc-2",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-2-03",  habitId: "habit-truc-2",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-truc-2-04",  habitId: "habit-truc-2",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-truc-2-05",  habitId: "habit-truc-2",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-truc-2-06",  habitId: "habit-truc-2",  checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-truc-2-07",  habitId: "habit-truc-2",  checkedAt: "2026-06-05", completionCount: 1 },
  { id: "ci-truc-2-08",  habitId: "habit-truc-2",  checkedAt: "2026-06-03", completionCount: 1 },

  // --- habit-truc-3: Không uống nước ngọt (DAILY) ---
  { id: "ci-truc-3-01",  habitId: "habit-truc-3",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-3-02",  habitId: "habit-truc-3",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-truc-3-03",  habitId: "habit-truc-3",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-truc-3-04",  habitId: "habit-truc-3",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-truc-3-05",  habitId: "habit-truc-3",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-truc-3-06",  habitId: "habit-truc-3",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-truc-3-07",  habitId: "habit-truc-3",  checkedAt: "2026-06-07", completionCount: 1 },

  // --- habit-truc-4: Ngủ đúng giờ (DAILY) ---
  { id: "ci-truc-4-01",  habitId: "habit-truc-4",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-4-02",  habitId: "habit-truc-4",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-truc-4-03",  habitId: "habit-truc-4",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-4-04",  habitId: "habit-truc-4",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-truc-4-05",  habitId: "habit-truc-4",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-truc-4-06",  habitId: "habit-truc-4",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-truc-4-07",  habitId: "habit-truc-4",  checkedAt: "2026-06-10", completionCount: 1 },

  // --- habit-truc-5: Khoá học online (DAY_OF_WEEK Tue Thu Sat) ---
  { id: "ci-truc-5-01",  habitId: "habit-truc-5",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-5-02",  habitId: "habit-truc-5",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-truc-5-03",  habitId: "habit-truc-5",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-truc-5-04",  habitId: "habit-truc-5",  checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-truc-5-05",  habitId: "habit-truc-5",  checkedAt: "2026-06-07", completionCount: 1 },

  // --- habit-truc-7: Thiền (DAILY) ---
  { id: "ci-truc-7-01",  habitId: "habit-truc-7",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-7-02",  habitId: "habit-truc-7",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-7-03",  habitId: "habit-truc-7",  checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-truc-7-04",  habitId: "habit-truc-7",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-truc-7-05",  habitId: "habit-truc-7",  checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-truc-8: Lên kế hoạch ngày mai (DAY_OF_WEEK Mon–Fri) ---
  { id: "ci-truc-8-01",  habitId: "habit-truc-8",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-8-02",  habitId: "habit-truc-8",  checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-truc-8-03",  habitId: "habit-truc-8",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-8-04",  habitId: "habit-truc-8",  checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-truc-8-05",  habitId: "habit-truc-8",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-truc-8-06",  habitId: "habit-truc-8",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-truc-8-07",  habitId: "habit-truc-8",  checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-truc-8-08",  habitId: "habit-truc-8",  checkedAt: "2026-06-10", completionCount: 1 },
  { id: "ci-truc-8-09",  habitId: "habit-truc-8",  checkedAt: "2026-06-09", completionCount: 1 },

  // --- habit-truc-9: Ghi chú ý tưởng (DAILY) ---
  { id: "ci-truc-9-01",  habitId: "habit-truc-9",  checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-truc-9-02",  habitId: "habit-truc-9",  checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-truc-9-03",  habitId: "habit-truc-9",  checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-truc-9-04",  habitId: "habit-truc-9",  checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-truc-9-05",  habitId: "habit-truc-9",  checkedAt: "2026-06-10", completionCount: 1 },

  // PAUSED/ARCHIVED
  { id: "ci-truc-6-01",  habitId: "habit-truc-6",  checkedAt: "2026-05-20", completionCount: 1 },
  { id: "ci-truc-12-01", habitId: "habit-truc-12", checkedAt: "2026-04-15", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // THÚY ANH — ~35 checkins, moderate
  // ════════════════════════════════════════════════════════════

  { id: "ci-thuyanh-1-01", habitId: "habit-thuyanh-1", checkedAt: "2026-06-19", completionCount: 6 },
  { id: "ci-thuyanh-1-02", habitId: "habit-thuyanh-1", checkedAt: "2026-06-18", completionCount: 8 },
  { id: "ci-thuyanh-1-03", habitId: "habit-thuyanh-1", checkedAt: "2026-06-16", completionCount: 7 },
  { id: "ci-thuyanh-1-04", habitId: "habit-thuyanh-1", checkedAt: "2026-06-14", completionCount: 8 },
  { id: "ci-thuyanh-1-05", habitId: "habit-thuyanh-1", checkedAt: "2026-06-12", completionCount: 5 },
  { id: "ci-thuyanh-1-06", habitId: "habit-thuyanh-1", checkedAt: "2026-06-09", completionCount: 8 },
  { id: "ci-thuyanh-1-07", habitId: "habit-thuyanh-1", checkedAt: "2026-06-05", completionCount: 3 },
  { id: "ci-thuyanh-1-08", habitId: "habit-thuyanh-1", checkedAt: "2026-06-01", completionCount: 2 },
  { id: "ci-thuyanh-1-09", habitId: "habit-thuyanh-1", checkedAt: "2026-05-20", completionCount: 8 },

  { id: "ci-thuyanh-2-01", habitId: "habit-thuyanh-2", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-thuyanh-2-02", habitId: "habit-thuyanh-2", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-thuyanh-2-03", habitId: "habit-thuyanh-2", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-thuyanh-2-04", habitId: "habit-thuyanh-2", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-thuyanh-2-05", habitId: "habit-thuyanh-2", checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-thuyanh-2-06", habitId: "habit-thuyanh-2", checkedAt: "2026-06-01", completionCount: 1 },

  { id: "ci-thuyanh-3-01", habitId: "habit-thuyanh-3", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-thuyanh-3-02", habitId: "habit-thuyanh-3", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-thuyanh-3-03", habitId: "habit-thuyanh-3", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-thuyanh-3-04", habitId: "habit-thuyanh-3", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-thuyanh-3-05", habitId: "habit-thuyanh-3", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-thuyanh-3-06", habitId: "habit-thuyanh-3", checkedAt: "2026-06-05", completionCount: 1 },

  { id: "ci-thuyanh-4-01", habitId: "habit-thuyanh-4", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-thuyanh-4-02", habitId: "habit-thuyanh-4", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-thuyanh-4-03", habitId: "habit-thuyanh-4", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-thuyanh-4-04", habitId: "habit-thuyanh-4", checkedAt: "2026-06-10", completionCount: 1 },

  { id: "ci-thuyanh-5-01", habitId: "habit-thuyanh-5", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-thuyanh-5-02", habitId: "habit-thuyanh-5", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-thuyanh-5-03", habitId: "habit-thuyanh-5", checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-thuyanh-5-04", habitId: "habit-thuyanh-5", checkedAt: "2026-06-05", completionCount: 1 },

  { id: "ci-thuyanh-6-01", habitId: "habit-thuyanh-6", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-thuyanh-6-02", habitId: "habit-thuyanh-6", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-thuyanh-6-03", habitId: "habit-thuyanh-6", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-thuyanh-6-04", habitId: "habit-thuyanh-6", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-thuyanh-6-05", habitId: "habit-thuyanh-6", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-thuyanh-6-06", habitId: "habit-thuyanh-6", checkedAt: "2026-06-09", completionCount: 1 },

  { id: "ci-thuyanh-8-01", habitId: "habit-thuyanh-8", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-thuyanh-8-02", habitId: "habit-thuyanh-8", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-thuyanh-8-03", habitId: "habit-thuyanh-8", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-thuyanh-8-04", habitId: "habit-thuyanh-8", checkedAt: "2026-06-16", completionCount: 1 },
  { id: "ci-thuyanh-8-05", habitId: "habit-thuyanh-8", checkedAt: "2026-06-15", completionCount: 1 },

  // PAUSED/ARCHIVED
  { id: "ci-thuyanh-7-01",  habitId: "habit-thuyanh-7",  checkedAt: "2026-05-10", completionCount: 1 },
  { id: "ci-thuyanh-10-01", habitId: "habit-thuyanh-10", checkedAt: "2026-04-20", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // VY — ~25 checkins, moderate với gaps
  // ════════════════════════════════════════════════════════════

  { id: "ci-vy-1-01", habitId: "habit-vy-1", checkedAt: "2026-06-19", completionCount: 6 },
  { id: "ci-vy-1-02", habitId: "habit-vy-1", checkedAt: "2026-06-17", completionCount: 8 },
  { id: "ci-vy-1-03", habitId: "habit-vy-1", checkedAt: "2026-06-15", completionCount: 7 },
  { id: "ci-vy-1-04", habitId: "habit-vy-1", checkedAt: "2026-06-12", completionCount: 4 },
  { id: "ci-vy-1-05", habitId: "habit-vy-1", checkedAt: "2026-06-07", completionCount: 8 },
  { id: "ci-vy-1-06", habitId: "habit-vy-1", checkedAt: "2026-05-20", completionCount: 8 },

  { id: "ci-vy-2-01", habitId: "habit-vy-2", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-vy-2-02", habitId: "habit-vy-2", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-vy-2-03", habitId: "habit-vy-2", checkedAt: "2026-06-13", completionCount: 1 },
  { id: "ci-vy-2-04", habitId: "habit-vy-2", checkedAt: "2026-06-08", completionCount: 1 },
  { id: "ci-vy-2-05", habitId: "habit-vy-2", checkedAt: "2026-05-22", completionCount: 1 },

  { id: "ci-vy-3-01", habitId: "habit-vy-3", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-vy-3-02", habitId: "habit-vy-3", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-vy-3-03", habitId: "habit-vy-3", checkedAt: "2026-06-12", completionCount: 2 },
  { id: "ci-vy-3-04", habitId: "habit-vy-3", checkedAt: "2026-06-07", completionCount: 1 },

  { id: "ci-vy-4-01", habitId: "habit-vy-4", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-vy-4-02", habitId: "habit-vy-4", checkedAt: "2026-06-12", completionCount: 1 },
  { id: "ci-vy-4-03", habitId: "habit-vy-4", checkedAt: "2026-06-09", completionCount: 1 },
  { id: "ci-vy-4-04", habitId: "habit-vy-4", checkedAt: "2026-05-03", completionCount: 1 },

  { id: "ci-vy-5-01", habitId: "habit-vy-5", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-vy-5-02", habitId: "habit-vy-5", checkedAt: "2026-06-15", completionCount: 1 },
  { id: "ci-vy-5-03", habitId: "habit-vy-5", checkedAt: "2026-06-09", completionCount: 1 },

  { id: "ci-vy-6-01", habitId: "habit-vy-6", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-vy-6-02", habitId: "habit-vy-6", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-vy-6-03", habitId: "habit-vy-6", checkedAt: "2026-06-14", completionCount: 1 },
  { id: "ci-vy-6-04", habitId: "habit-vy-6", checkedAt: "2026-06-10", completionCount: 1 },

  // PAUSED/ARCHIVED
  { id: "ci-vy-7-01", habitId: "habit-vy-7", checkedAt: "2026-05-15", completionCount: 1 },
  { id: "ci-vy-8-01", habitId: "habit-vy-8", checkedAt: "2026-04-20", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // BẢO HẠNH — ~12 checkins, thưa, light user
  // ════════════════════════════════════════════════════════════

  { id: "ci-baohanh-1-01", habitId: "habit-baohanh-1", checkedAt: "2026-06-19", completionCount: 3 },
  { id: "ci-baohanh-1-02", habitId: "habit-baohanh-1", checkedAt: "2026-06-15", completionCount: 4 },
  { id: "ci-baohanh-1-03", habitId: "habit-baohanh-1", checkedAt: "2026-06-10", completionCount: 2 },
  { id: "ci-baohanh-1-04", habitId: "habit-baohanh-1", checkedAt: "2026-06-05", completionCount: 5 },

  { id: "ci-baohanh-2-01", habitId: "habit-baohanh-2", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-baohanh-2-02", habitId: "habit-baohanh-2", checkedAt: "2026-06-17", completionCount: 1 },
  { id: "ci-baohanh-2-03", habitId: "habit-baohanh-2", checkedAt: "2026-06-10", completionCount: 1 },

  { id: "ci-baohanh-3-01", habitId: "habit-baohanh-3", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-baohanh-3-02", habitId: "habit-baohanh-3", checkedAt: "2026-06-11", completionCount: 1 },
  { id: "ci-baohanh-3-03", habitId: "habit-baohanh-3", checkedAt: "2026-06-04", completionCount: 1 },

  // PAUSED
  { id: "ci-baohanh-4-01", habitId: "habit-baohanh-4", checkedAt: "2026-05-20", completionCount: 1 },
  { id: "ci-baohanh-4-02", habitId: "habit-baohanh-4", checkedAt: "2026-05-10", completionCount: 1 },

  // ════════════════════════════════════════════════════════════
  // NGÂN — ~8 checkins, rất thưa, light user
  // ════════════════════════════════════════════════════════════

  { id: "ci-ngan-1-01", habitId: "habit-ngan-1", checkedAt: "2026-06-19", completionCount: 5 },
  { id: "ci-ngan-1-02", habitId: "habit-ngan-1", checkedAt: "2026-06-14", completionCount: 4 },
  { id: "ci-ngan-1-03", habitId: "habit-ngan-1", checkedAt: "2026-06-07", completionCount: 6 },
  { id: "ci-ngan-1-04", habitId: "habit-ngan-1", checkedAt: "2026-05-25", completionCount: 5 },

  { id: "ci-ngan-2-01", habitId: "habit-ngan-2", checkedAt: "2026-06-19", completionCount: 1 },
  { id: "ci-ngan-2-02", habitId: "habit-ngan-2", checkedAt: "2026-06-15", completionCount: 1 },

  { id: "ci-ngan-3-01", habitId: "habit-ngan-3", checkedAt: "2026-06-18", completionCount: 1 },
  { id: "ci-ngan-3-02", habitId: "habit-ngan-3", checkedAt: "2026-06-11", completionCount: 1 },
];