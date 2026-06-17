// ============================================================================
// community.types.ts
// Shared types for the read-only Community section of Habit Tracking Pro.
// ============================================================================

/**
 * The app's full user record. Kept here for reference/reuse across the app,
 * but the Community feature only ever works with `PublicUser` below —
 * `password` (and the raw `phone` key, which is sensitive PII) are never
 * sent to, or rendered by, anything in this feature.
 */
export interface User {
  phone: string; // primary key
  username: string;
  password: string;
  avatar: string;
}

/** What the Community feature is actually allowed to see/render about a user. */
export type PublicUser = Omit<User, 'password'>;

export type HabitCategory = 'health' | 'study' | 'mindfulness' | 'productivity' | 'other';

export interface Habit {
  id: string;
  ownerPhone: string;
  name: string;
  emoji: string;
  category: HabitCategory;
  frequency: 'daily' | 'weekly';
  currentStreak: number;
  bestStreak: number;
  /** Completion rate over the last 30 days, 0-100. */
  completionRate: number;
}

export type GoalStatus = 'on_track' | 'at_risk' | 'completed';

export interface Goal {
  id: string;
  ownerPhone: string;
  title: string;
  unit: string;
  current: number;
  target: number;
  /** ISO date string. */
  deadline: string;
  status: GoalStatus;
}

/**
 * Activity level for one day in the streak trail:
 * 0 = no check-in, 1-2 = partial/typical activity, 3 = a standout day.
 */
export type DayIntensity = 0 | 1 | 2 | 3;

export interface UserStats {
  ownerPhone: string;
  /** ISO date string. */
  memberSince: string;
  totalHabits: number;
  longestStreak: number;
  /** Overall completion rate, 0-100. */
  completionRate: number;
  totalCheckIns: number;
  /** Last 7 days, oldest first. */
  last7Days: DayIntensity[];
}

export interface CommunityMember {
  user: PublicUser;
  stats: UserStats;
  habits: Habit[];
  goals: Goal[];
}

export const CATEGORY_LABEL: Record<HabitCategory, string> = {
  health: 'Sức khỏe',
  study: 'Học tập',
  mindfulness: 'Tinh thần',
  productivity: 'Năng suất',
  other: 'Khác',
};

export const CATEGORY_EMOJI: Record<HabitCategory, string> = {
  health: '🏃',
  study: '📚',
  mindfulness: '🧘',
  productivity: '💼',
  other: '🌙',
};