// src/features/notifications/types.ts
export type NotificationType = 'goal_80' | 'goal_achieved' | 'missed_habit' | 'streak_risk';

// Định nghĩa entity liên quan là gì (Habit hay Goal)
export type RelatedEntityType = 'Habit' | 'Goal' | 'CheckIn';

export interface AppNotification {
  id: string;
  title: string;          // Tiêu đề thông báo
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string; 
  relatedEntityId: string;   // ID của Habit hoặc Goal gây ra thông báo này
  relatedEntityType: RelatedEntityType; // Để biết cái ID ở trên là của bảng nào
}