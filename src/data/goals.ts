import type { Goal } from "../shared/types/Goal";

// ================================================================
// MOCK GOALS — tỷ lệ goal theo số habit
//
//   ngoc    : 14 goals (nhiều nhất, siêu active)
//   elin    :  8 goals
//   truc    :  6 goals
//   thuyanh :  5 goals
//   vy      :  3 goals
//   baohanh :  2 goals
//   ngan    :  1 goal
//
// Diversity:
//   - Mix STREAK vs TOTAL_COMPLETIONS
//   - Thời gian: 1 tháng / 2 tháng / 3 tháng
//   - Có goal đã qua (past endDate → COMPLETED/FAILED)
//   - Có goal mới bắt đầu (NOT_STARTED hoặc IN_PROGRESS early)
//   - targetValue đa dạng
// ================================================================
export const mockGoals: Goal[] = [

  // ══════════════════════════════════════════════════════════════
  // NGỌC — 14 goals (siêu active)
  // ══════════════════════════════════════════════════════════════

  // Health habits
  {
    id: "goal-ngoc-1",
    habitId: "habit-ngoc-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 240,            // 8 ly/ngày × 30 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-2",
    habitId: "habit-ngoc-2",
    targetType: "STREAK",
    targetValue: 20,             // streak chạy bộ 20 ngày liên tiếp
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-3",
    habitId: "habit-ngoc-3",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 36,             // gym Mon/Wed/Fri × 3 tháng
    startedDate: "2026-04-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-4",
    habitId: "habit-ngoc-4",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 30,             // ăn sáng 30 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-5",
    habitId: "habit-ngoc-5",
    targetType: "STREAK",
    targetValue: 30,             // không ăn ngọt cả tháng
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-6",
    habitId: "habit-ngoc-6",
    targetType: "STREAK",
    targetValue: 21,             // ngủ trước 23h 21 ngày liên tiếp
    startedDate: "2026-05-25",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-7",
    habitId: "habit-ngoc-7",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 30,             // đi bộ 10k bước 30 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },

  // Study habits
  {
    id: "goal-ngoc-11",
    habitId: "habit-ngoc-11",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 60,             // học lập trình 2 lần/ngày × 30 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-12",
    habitId: "habit-ngoc-12",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 90,             // đọc sách 3 tháng
    startedDate: "2026-04-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-13",
    habitId: "habit-ngoc-13",
    targetType: "STREAK",
    targetValue: 10,             // luyện tiếng Anh 10 tuần liên tiếp (Tue/Thu/Sat)
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-16",
    habitId: "habit-ngoc-16",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 50,             // làm bài thuật toán
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },

  // Mindfulness
  {
    id: "goal-ngoc-19",
    habitId: "habit-ngoc-19",
    targetType: "STREAK",
    targetValue: 30,             // thiền liên tiếp cả tháng
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-ngoc-22",
    habitId: "habit-ngoc-22",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 25,             // không lướt MXH trước ngủ
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },

  // Work
  {
    id: "goal-ngoc-23",
    habitId: "habit-ngoc-23",
    targetType: "STREAK",
    targetValue: 15,             // lên kế hoạch 15 ngày làm việc liên tiếp
    startedDate: "2026-06-02",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // ELIN — 8 goals
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-elin-1",
    habitId: "habit-elin-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 180,            // uống nước 8 ly/ngày × 2 tháng (~22)
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-2",
    habitId: "habit-elin-2",
    targetType: "STREAK",
    targetValue: 12,             // yoga 12 buổi liên tiếp (Mon/Wed/Fri)
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-3",
    habitId: "habit-elin-3",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 20,             // chạy bộ 20 buổi (Tue/Thu/Sat)
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-4",
    habitId: "habit-elin-4",
    targetType: "STREAK",
    targetValue: 21,             // ngủ đủ 8 tiếng 21 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-6",
    habitId: "habit-elin-6",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 30,             // đọc sách cả tháng
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-7",
    habitId: "habit-elin-7",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 24,             // luyện tiếng Anh 2 lần × 12 buổi
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-9",
    habitId: "habit-elin-9",
    targetType: "STREAK",
    targetValue: 30,             // thiền cả tháng không gián đoạn
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-elin-11",
    habitId: "habit-elin-11",
    targetType: "STREAK",
    targetValue: 20,             // lên kế hoạch 20 ngày làm việc liên tiếp
    startedDate: "2026-05-25",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // TRÚC — 6 goals
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-truc-1",
    habitId: "habit-truc-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 30,
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-truc-2",
    habitId: "habit-truc-2",
    targetType: "STREAK",
    targetValue: 8,              // gym 8 buổi liên tiếp (Mon/Wed/Fri)
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-truc-3",
    habitId: "habit-truc-3",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 15,             // không uống nước ngọt 15 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-truc-5",
    habitId: "habit-truc-5",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 12,             // khoá học 12 buổi (Tue/Thu/Sat × 1 tháng)
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-truc-8",
    habitId: "habit-truc-8",
    targetType: "STREAK",
    targetValue: 12,             // lên kế hoạch 12 ngày làm việc
    startedDate: "2026-06-08",
    endDate: "2026-06-30",
  },
  {
    id: "goal-truc-9",
    habitId: "habit-truc-9",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 20,
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // THÚY ANH — 5 goals
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-thuyanh-1",
    habitId: "habit-thuyanh-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 120,            // uống nước 2 tháng
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-thuyanh-2",
    habitId: "habit-thuyanh-2",
    targetType: "STREAK",
    targetValue: 10,
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-thuyanh-3",
    habitId: "habit-thuyanh-3",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 20,             // không ăn khuya 20 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-thuyanh-5",
    habitId: "habit-thuyanh-5",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 12,             // luyện tiếng Anh 12 buổi
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-thuyanh-6",
    habitId: "habit-thuyanh-6",
    targetType: "STREAK",
    targetValue: 21,             // viết nhật ký 21 ngày liên tiếp
    startedDate: "2026-05-20",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // VY — 3 goals
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-vy-1",
    habitId: "habit-vy-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 60,
    startedDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-vy-4",
    habitId: "habit-vy-4",
    targetType: "STREAK",
    targetValue: 6,              // luyện IELTS 6 buổi liên tiếp
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-vy-6",
    habitId: "habit-vy-6",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 25,             // ngủ trước 23h 25 ngày
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // BẢO HẠNH — 2 goals (light user)
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-baohanh-1",
    habitId: "habit-baohanh-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 20,
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  {
    id: "goal-baohanh-2",
    habitId: "habit-baohanh-2",
    targetType: "STREAK",
    targetValue: 6,              // tập thể dục 6 buổi liên tiếp (Mon/Wed/Fri × 2 tuần)
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },

  // ══════════════════════════════════════════════════════════════
  // NGÂN — 1 goal (light user)
  // ══════════════════════════════════════════════════════════════

  {
    id: "goal-ngan-1",
    habitId: "habit-ngan-1",
    targetType: "TOTAL_COMPLETIONS",
    targetValue: 30,
    startedDate: "2026-06-01",
    endDate: "2026-06-30",
  },
];