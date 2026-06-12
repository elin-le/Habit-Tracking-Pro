export const ROUTES = {
  DASHBOARD: "/dashboard",
  HABITS: "habits",
  GOALS: "/goals",
  STATISTICS: "/statistics",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",

  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
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
