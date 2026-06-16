// src/features/notifications/types.ts

export type NotificationType = 'GOAL_80' | 'GOAL_ACHIEVED' | 'MISSED_HABIT' | 'STREAK_RISK';

// Định nghĩa entity liên quan là gì (Habit hay Goal)
export type RelatedEntityType = 'HABIT' | 'GOAL' | 'CHECKIN';

export interface AppNotification {
  id: string;
  title: string;          // Tiêu đề thông báo
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string; 
  relatedEntityId: string;   // ID của Habit hoặc Goal gây ra thông báo này
  relatedEntityType: RelatedEntityType; // Để biết cái ID ở trên là của bảng nào
  params?: Record<string, string | number>;
}