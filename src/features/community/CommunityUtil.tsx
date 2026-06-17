import type { CommunityMember, Habit } from './CommunityTypes';

/** Highest current streak across all of a member's habits (0 if none). */
export function getTopStreak(member: CommunityMember): number {
  if (member.habits.length === 0) return 0;
  return Math.max(...member.habits.map((h) => h.currentStreak));
}

/** The habit currently carrying a member's longest active streak. */
export function getTopHabit(member: CommunityMember): Habit | null {
  if (member.habits.length === 0) return null;
  return [...member.habits].sort((a, b) => b.currentStreak - a.currentStreak)[0];
}

export function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
}

export function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}