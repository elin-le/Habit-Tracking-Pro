// src/features/notifications/mockData.ts
import type { AppNotification } from './types';

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Sắp đạt mục tiêu!',
    message: 'Tuyệt vời! Bạn đã hoàn thành 80% mục tiêu Đọc sách.',
    type: 'goal_80',
    isRead: false,
    createdAt: new Date().toISOString(),
    relatedEntityId: 'goal-123', // ID giả của một Goal
    relatedEntityType: 'Goal',
  },
  {
    id: 'notif-2',
    title: 'Nguy cơ đứt chuỗi',
    message: 'Cẩn thận! Bạn sắp làm đứt chuỗi uống nước 5 ngày rồi.',
    type: 'streak_risk',
    isRead: false,
    createdAt: new Date().toISOString(),
    relatedEntityId: 'habit-456', // ID giả của một Habit
    relatedEntityType: 'Habit',
  }
];