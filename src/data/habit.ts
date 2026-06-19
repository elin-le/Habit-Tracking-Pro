import type { Habit } from "../shared/types/Habit";

// ================================================================
// MOCK HABITS — 7 users, distinct differences
//
// Distribution:
//   ngoc     (0888091940) — SUPER ACTIVE : 28 habits
//   elin     (0839003848) — ACTIVE       : 15 habits
//   truc     (0859204715) — ACTIVE       : 12 habits
//   thuyanh  (0703634817) — MODERATE     : 10 habits
//   vy       (0343623108) — MODERATE     :  8 habits
//   baohanh  (0767181815) — LIGHT        :  4 habits
//   ngan     (0819248090) — LIGHT        :  3 habits
//
// Total: 80 habits
// ================================================================
export const mockHabits: Habit[] = [

  // ══════════════════════════════════════════════════════════════
  // THANH NGOC (0888091940) — SUPER ACTIVE — 28 habits
  // Mix: many DAILY + DAY_OF_WEEK, multiple categories, multiple statuses
  // ══════════════════════════════════════════════════════════════

  // --- Health (10) ---
  { id: "habit-ngoc-1",  name: "Drink 2L of water",          frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-2",  name: "Morning jogging",            frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-3",  name: "Gym workout",                frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-4",  name: "Eat a nutritious breakfast", frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-5",  name: "No sweets/sugar",            frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-6",  name: "Sleep before 11 PM",         frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-7",  name: "Walk 10,000 steps",          frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-8",  name: "Evening yoga",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-9",  name: "Take vitamins",              frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0888091940" },
  { id: "habit-ngoc-10", name: "No phone before bed",        frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0888091940" },

  // --- Study (8) ---
  { id: "habit-ngoc-11", name: "Learn programming",          frequencyType: "DAILY",       targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-12", name: "Read books for 30 mins",     frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-13", name: "Practice English",           frequencyType: "DAY_OF_WEEK", targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-14", name: "Read tech news",              frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-15", name: "Learn graphic design",       frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-16", name: "Practice algorithms",        frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-17", name: "Learn Japanese",             frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_study",       userId: "0888091940" },
  { id: "habit-ngoc-18", name: "Watch online courses",       frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_study",       userId: "0888091940" },

  // --- Mindfulness (4) ---
  { id: "habit-ngoc-19", name: "Meditate for 10 mins",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "0888091940" },
  { id: "habit-ngoc-20", name: "Write in journal",           frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0888091940" },
  { id: "habit-ngoc-21", name: "Morning deep breathing",     frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0888091940" },
  { id: "habit-ngoc-22", name: "No social media before bed", frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "0888091940" },

  // --- Work (4) ---
  { id: "habit-ngoc-23", name: "Plan the new day",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "0888091940" },
  { id: "habit-ngoc-24", name: "Review tasks at end of day", frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "0888091940" },
  { id: "habit-ngoc-25", name: "Read industry news",         frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_work",        userId: "0888091940" },
  { id: "habit-ngoc-26", name: "Take meeting notes",         frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_work",        userId: "0888091940" },

  // --- Other (2) ---
  { id: "habit-ngoc-27", name: "Clean desk",                 frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "0888091940" },
  { id: "habit-ngoc-28", name: "Art photography",            frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "0888091940" },

  // ══════════════════════════════════════════════════════════════
  // LE DAN / ELIN (0839003848) — ACTIVE — 15 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-elin-1",  name: "Drink 8 glasses of water",   frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0839003848" },
  { id: "habit-elin-2",  name: "Morning yoga",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0839003848" },
  { id: "habit-elin-3",  name: "Running",                    frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0839003848" },
  { id: "habit-elin-4",  name: "Get 8 hours of sleep",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0839003848" },
  { id: "habit-elin-5",  name: "No late-night snacks",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0839003848" },
  { id: "habit-elin-6",  name: "Read 20 pages of a book",    frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0839003848" },
  { id: "habit-elin-7",  name: "Practice English",           frequencyType: "DAY_OF_WEEK", targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0839003848" },
  { id: "habit-elin-8",  name: "Learn Korean",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_study",       userId: "0839003848" },
  { id: "habit-elin-9",  name: "Meditate for 10 mins",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "0839003848" },
  { id: "habit-elin-10", name: "Write gratitude journal",    frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0839003848" },
  { id: "habit-elin-11", name: "Plan the new day",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "0839003848" },
  { id: "habit-elin-12", name: "Review work at end of day",  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_work",        userId: "0839003848" },
  { id: "habit-elin-13", name: "Sketching",                  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "0839003848" },
  { id: "habit-elin-14", name: "Learn guitar",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_other",       userId: "0839003848" },
  { id: "habit-elin-15", name: "Take photos every day",      frequencyType: "DAILY",       targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "0839003848" },

  // ══════════════════════════════════════════════════════════════
  // THANH TRUC (0859204715) — ACTIVE — 12 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-truc-1",  name: "Walk 8,000 steps",           frequencyType: "DAILY",       targetPerDay: 2, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0859204715" },
  { id: "habit-truc-2",  name: "Gym workout",                frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0859204715" },
  { id: "habit-truc-3",  name: "No soft drinks",             frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0859204715" },
  { id: "habit-truc-4",  name: "Sleep on time",              frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0859204715" },
  { id: "habit-truc-5",  name: "Complete online course",     frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0859204715" },
  { id: "habit-truc-6",  name: "Read before bed",            frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0859204715" },
  { id: "habit-truc-7",  name: "Meditate for 10 mins",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0859204715" },
  { id: "habit-truc-8",  name: "Plan for tomorrow",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "0859204715" },
  { id: "habit-truc-9",  name: "Note down ideas",            frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_work",        userId: "0859204715" },
  { id: "habit-truc-10", name: "Learn guitar",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "0859204715" },
  { id: "habit-truc-11", name: "Healthy cooking",            frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_other",       userId: "0859204715" },
  { id: "habit-truc-12", name: "Learn drawing",              frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "0859204715" },

  // ══════════════════════════════════════════════════════════════
  // THUY ANH (0703634817) — MODERATE — 10 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-thuyanh-1", name: "Drink 2L of water",          frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0703634817" },
  { id: "habit-thuyanh-2", name: "Morning yoga",               frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0703634817" },
  { id: "habit-thuyanh-3", name: "No late-night snacks",       frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0703634817" },
  { id: "habit-thuyanh-4", name: "Read 20 pages of a book",    frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_study",       userId: "0703634817" },
  { id: "habit-thuyanh-5", name: "Practice English",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0703634817" },
  { id: "habit-thuyanh-6", name: "Write gratitude journal",    frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "0703634817" },
  { id: "habit-thuyanh-7", name: "Evening meditation",         frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "MEDIUM", categoryId: "cat_mindfulness", userId: "0703634817" },
  { id: "habit-thuyanh-8", name: "Plan for tomorrow",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_work",        userId: "0703634817" },
  { id: "habit-thuyanh-9", name: "Clean room",                 frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_other",       userId: "0703634817" },
  { id: "habit-thuyanh-10", name: "Art photography",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "0703634817" },

  // ══════════════════════════════════════════════════════════════
  // THUY VY (0343623108) — MODERATE — 8 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-vy-1", name: "Drink enough water daily", frequencyType: "DAILY",       targetPerDay: 8, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0343623108" },
  { id: "habit-vy-2", name: "Evening walk",             frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0343623108" },
  { id: "habit-vy-3", name: "Read books",               frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0343623108" },
  { id: "habit-vy-4", name: "Practice IELTS",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_study",       userId: "0343623108" },
  { id: "habit-vy-5", name: "Meditate",                 frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0343623108" },
  { id: "habit-vy-6", name: "Sleep before 11 PM",         frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0343623108" },
  { id: "habit-vy-7", name: "Sketching",                  frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_other",       userId: "0343623108" },
  { id: "habit-vy-8", name: "Photography",              frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ARCHIVED", priority: "LOW",    categoryId: "cat_other",       userId: "0343623108" },

  // ══════════════════════════════════════════════════════════════
  // BAO HANH (0767181815) — LIGHT — 4 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-baohanh-1", name: "Drink water",              frequencyType: "DAILY",       targetPerDay: 5, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0767181815" },
  { id: "habit-baohanh-2", name: "Light exercise",           frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0767181815" },
  { id: "habit-baohanh-3", name: "Read books",               frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "LOW",    categoryId: "cat_study",       userId: "0767181815" },
  { id: "habit-baohanh-4", name: "Write in journal",         frequencyType: "DAILY",       targetPerDay: 1, status: "PAUSED",   priority: "LOW",    categoryId: "cat_mindfulness", userId: "0767181815" },

  // ══════════════════════════════════════════════════════════════
  // BAO NGAN (0819248090) — LIGHT — 3 habits
  // ══════════════════════════════════════════════════════════════

  { id: "habit-ngan-1", name: "Drink water",                 frequencyType: "DAILY",       targetPerDay: 6, status: "ACTIVE",   priority: "HIGH",   categoryId: "cat_health",      userId: "0819248090" },
  { id: "habit-ngan-2", name: "Morning stretching",          frequencyType: "DAY_OF_WEEK", targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_health",      userId: "0819248090" },
  { id: "habit-ngan-3", name: "Read for 30 mins",            frequencyType: "DAILY",       targetPerDay: 1, status: "ACTIVE",   priority: "MEDIUM", categoryId: "cat_study",       userId: "0819248090" },
];