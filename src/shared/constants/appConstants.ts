import type { DaysOfWeek } from "../types/HabitSchedule";

export const ROUTES = {
  DASHBOARD: "/dashboard",
  HABITS: "habits",
  GOALS: "goals",
  STATISTICS: "/statistics",
  NOTIFICATIONS: "/notifications",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  COMMUNITY: "/community"
} as const;

export const APP_NAME = "Habit Tracker Pro" as const;
export const STORAGE_KEY = {
  CATEGORYS: "htp_categories",
  USERS: "htp_users",
  CURRENT_USER: "htp_current_user",
  USER_HABITS: "htp_current_user_habits",
  USER_HABIT_SCHEDULES: "htp_current_user_habit_schedules",
  USER_GOALS: "htp_current_user_goals",
  USER_CHECKINS: "htp_current_user_checkins",
} as const;

export const PAGINATION_ELLIPSIS = "...";
export const HABITS_PER_PAGE = 6;

export const DAY_LABELS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const DAY_OF_WEEK_MAP: DaysOfWeek[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const CATEGORY_ICONS: Record<string, string> = {
  cat_health: "💪",
  cat_study: "📚",
  cat_work: "💼",
  cat_mindfulness: "🧘",
  cat_other: "⭐",
};

export const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#94a3b8",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
};

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e", // Green
  PAUSED: "#f59e0b", // Amber
  ARCHIVED: "#64748b", // Slate
};

export const DAYS = [
  { key: 0, label: "Su" },
  { key: 1, label: "Mo" },
  { key: 2, label: "Tu" },
  { key: 3, label: "We" },
  { key: 4, label: "Th" },
  { key: 5, label: "Fr" },
  { key: 6, label: "Sa" },
];
