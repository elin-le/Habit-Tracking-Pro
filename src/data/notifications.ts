import type { AppNotification } from '../features/notifications/types';
export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'notifications.goal_80.title',
    message: 'notifications.goal_80.message',
    type: 'GOAL_80',
    isRead: false,
    createdAt: new Date().toISOString(),
    relatedEntityId: 'goal-123',
    relatedEntityType: 'GOAL',
    params: { habitName: 'habit_form.Study' }
  },
  {
    id: 'notif-2',
    title: 'notifications.streak_risk.title',
    message: 'notifications.streak_risk.message',
    type: 'STREAK_RISK',
    isRead: false,
    createdAt: new Date().toISOString(),
    relatedEntityId: 'habit-456',
    relatedEntityType: 'HABIT',
    params: { habitName: 'habit_form.Health', streakCount: 5 }
  }
];