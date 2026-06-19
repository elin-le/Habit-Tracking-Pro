import type { Habit } from "../shared/types/Habit";

// ================================================================
// MOCK HABITS — 7 users, chênh lệch rõ rệt
//
// Phân bổ:
//   ngoc     (*888*9194*)  — SIÊU ACTIVE  : 28 habits
//   elin     (*839**3848)  — ACTIVE       : 15 habits
//   truc     (*8592*4715)  — ACTIVE       : 12 habits
//   thuyanh  (*7*3634817)  — MODERATE     : 10 habits
//   vy       (*3436231*8)  — MODERATE     :  8 habits
//   baohanh  (*767181815)  — LIGHT        :  4 habits
//   ngan     (*819248*9*)  — LIGHT        :  3 habits
//
// Total: 80 habits
// ================================================================
export const mockHabits: Habit[] = [

  // ══════════════════════════════════════════════════════════════
  // THANH NGỌC (*888*9194*) — SIÊU ACTIVE — 28 habits
  // Mix: nhiều DAILY + DAY_OF_WEEK, nhiều category, nhiều status
  // ══════════════════════════════════════════════════════════════

  // --- Health (10) ---
  { id: "habit-ngoc-1",  name: "Uống 2L nước",           frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-2",  name: "Chạy bộ buổi sáng",      frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-3",  name: "Tập gym",                 frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-4",  name: "Ăn sáng đủ chất",        frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-5",  name: "Không ăn đồ ngọt",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-6",  name: "Ngủ trước 23h",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-7",  name: "Đi bộ 10,000 bước",      frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-8",  name: "Yoga buổi tối",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-9",  name: "Uống vitamin",            frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*888*9194*" },
  { id: "habit-ngoc-10", name: "Không dùng điện thoại trước ngủ", frequencyType: "DAILY", targetPerDay: 1, status: "ACTIVE", priority: "HIGH",  categoryId: "cat_health",      userId: "*888*9194*" },

  // --- Study (8) ---
  { id: "habit-ngoc-11", name: "Học lập trình",           frequencyType: "DAILY",       targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-12", name: "Đọc sách 30 phút",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-13", name: "Luyện tiếng Anh",        frequencyType: "DAY_OF_WEEK", targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-14", name: "Xem tin tức công nghệ",  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-15", name: "Học design đồ họa",      frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-16", name: "Làm bài tập thuật toán", frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-17", name: "Học tiếng Nhật",         frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_study",       userId: "*888*9194*" },
  { id: "habit-ngoc-18", name: "Xem khoá học online",    frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_study",       userId: "*888*9194*" },

  // --- Mindfulness (4) ---
  { id: "habit-ngoc-19", name: "Thiền 10 phút",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "*888*9194*" },
  { id: "habit-ngoc-20", name: "Viết nhật ký",           frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*888*9194*" },
  { id: "habit-ngoc-21", name: "Hít thở sâu buổi sáng", frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*888*9194*" },
  { id: "habit-ngoc-22", name: "Không lướt MXH trước ngủ", frequencyType: "DAILY",    targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "*888*9194*" },

  // --- Work (4) ---
  { id: "habit-ngoc-23", name: "Lên kế hoạch ngày mới", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "*888*9194*" },
  { id: "habit-ngoc-24", name: "Review task cuối ngày",  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "*888*9194*" },
  { id: "habit-ngoc-25", name: "Đọc tin ngành",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_work",        userId: "*888*9194*" },
  { id: "habit-ngoc-26", name: "Ghi chú meeting",        frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_work",        userId: "*888*9194*" },

  // --- Other (2) ---
  { id: "habit-ngoc-27", name: "Dọn bàn làm việc",      frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "*888*9194*" },
  { id: "habit-ngoc-28", name: "Chụp ảnh nghệ thuật",   frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "*888*9194*" },

  // ══════════════════════════════════════════════════════════════
  // LÊ ĐAN / ELIN (*839**3848) — ACTIVE — 15 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-elin-1",  name: "Uống nước đủ 8 ly",      frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*839**3848" },
  { id: "habit-elin-2",  name: "Yoga buổi sáng",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*839**3848" },
  { id: "habit-elin-3",  name: "Chạy bộ",                 frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*839**3848" },
  { id: "habit-elin-4",  name: "Ngủ đủ 8 tiếng",         frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*839**3848" },
  { id: "habit-elin-5",  name: "Không ăn khuya",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*839**3848" },
  { id: "habit-elin-6",  name: "Đọc sách 20 trang",      frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*839**3848" },
  { id: "habit-elin-7",  name: "Luyện tiếng Anh",        frequencyType: "DAY_OF_WEEK", targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*839**3848" },
  { id: "habit-elin-8",  name: "Học tiếng Hàn",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_study",       userId: "*839**3848" },
  { id: "habit-elin-9",  name: "Thiền 10 phút",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "*839**3848" },
  { id: "habit-elin-10", name: "Viết nhật ký biết ơn",   frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*839**3848" },
  { id: "habit-elin-11", name: "Lên kế hoạch ngày mới",  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "*839**3848" },
  { id: "habit-elin-12", name: "Review công việc cuối ngày", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE", priority: "MEDIUM", categoryId: "cat_work",     userId: "*839**3848" },
  { id: "habit-elin-13", name: "Vẽ phác thảo",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "*839**3848" },
  { id: "habit-elin-14", name: "Học đàn guitar",         frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_other",       userId: "*839**3848" },
  { id: "habit-elin-15", name: "Chụp ảnh mỗi ngày",     frequencyType: "DAILY",       targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "*839**3848" },

  // ══════════════════════════════════════════════════════════════
  // THANH TRÚC (*8592*4715) — ACTIVE — 12 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-truc-1",  name: "Đi bộ 8,000 bước",       frequencyType: "DAILY",       targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*8592*4715" },
  { id: "habit-truc-2",  name: "Tập gym",                 frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*8592*4715" },
  { id: "habit-truc-3",  name: "Không uống nước ngọt",   frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*8592*4715" },
  { id: "habit-truc-4",  name: "Ngủ đúng giờ",           frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*8592*4715" },
  { id: "habit-truc-5",  name: "Hoàn thành khoá học online", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE", priority: "MEDIUM", categoryId: "cat_study",    userId: "*8592*4715" },
  { id: "habit-truc-6",  name: "Đọc trước khi ngủ",      frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*8592*4715" },
  { id: "habit-truc-7",  name: "Thiền 10 phút",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*8592*4715" },
  { id: "habit-truc-8",  name: "Lên kế hoạch ngày mai", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "*8592*4715" },
  { id: "habit-truc-9",  name: "Ghi chú ý tưởng",        frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_work",        userId: "*8592*4715" },
  { id: "habit-truc-10", name: "Học đàn guitar",         frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "*8592*4715" },
  { id: "habit-truc-11", name: "Nấu ăn lành mạnh",       frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_other",       userId: "*8592*4715" },
  { id: "habit-truc-12", name: "Học vẽ",                  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "*8592*4715" },

  // ══════════════════════════════════════════════════════════════
  // THÚY ANH (*7*3634817) — MODERATE — 10 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-thuyanh-1", name: "Uống 2L nước",          frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*7*3634817" },
  { id: "habit-thuyanh-2", name: "Yoga buổi sáng",        frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*7*3634817" },
  { id: "habit-thuyanh-3", name: "Không ăn khuya",        frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*7*3634817" },
  { id: "habit-thuyanh-4", name: "Đọc sách 20 trang",    frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_study",       userId: "*7*3634817" },
  { id: "habit-thuyanh-5", name: "Luyện tiếng Anh",      frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*7*3634817" },
  { id: "habit-thuyanh-6", name: "Viết nhật ký biết ơn", frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "*7*3634817" },
  { id: "habit-thuyanh-7", name: "Thiền buổi tối",        frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "*7*3634817" },
  { id: "habit-thuyanh-8", name: "Lên kế hoạch ngày mai", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",  priority: "HIGH",   categoryId: "cat_work",        userId: "*7*3634817" },
  { id: "habit-thuyanh-9", name: "Dọn phòng",             frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "*7*3634817" },
  { id: "habit-thuyanh-10", name: "Chụp ảnh nghệ thuật", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "*7*3634817" },

  // ══════════════════════════════════════════════════════════════
  // THỤY VY (*3436231*8) — MODERATE — 8 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-vy-1", name: "Uống nước đủ ngày",          frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*3436231*8" },
  { id: "habit-vy-2", name: "Đi bộ buổi tối",             frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*3436231*8" },
  { id: "habit-vy-3", name: "Đọc sách",                   frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*3436231*8" },
  { id: "habit-vy-4", name: "Luyện IELTS",                frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "*3436231*8" },
  { id: "habit-vy-5", name: "Thiền",                      frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*3436231*8" },
  { id: "habit-vy-6", name: "Ngủ trước 23h",              frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*3436231*8" },
  { id: "habit-vy-7", name: "Vẽ phác thảo",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_other",       userId: "*3436231*8" },
  { id: "habit-vy-8", name: "Chụp ảnh",                   frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "*3436231*8" },

  // ══════════════════════════════════════════════════════════════
  // BẢO HẠNH (*767181815) — LIGHT — 4 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-baohanh-1", name: "Uống nước",              frequencyType: "DAILY",       targetPerDay: 5, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*767181815" },
  { id: "habit-baohanh-2", name: "Tập thể dục nhẹ",       frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*767181815" },
  { id: "habit-baohanh-3", name: "Đọc sách",              frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_study",       userId: "*767181815" },
  { id: "habit-baohanh-4", name: "Viết nhật ký",          frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "*767181815" },

  // ══════════════════════════════════════════════════════════════
  // BẢO NGÂN (*819248*9*) — LIGHT — 3 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-ngan-1", name: "Uống nước",                 frequencyType: "DAILY",       targetPerDay: 6, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "*819248*9*" },
  { id: "habit-ngan-2", name: "Giãn cơ buổi sáng",        frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "*819248*9*" },
  { id: "habit-ngan-3", name: "Đọc 30 phút",              frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "*819248*9*" },
];