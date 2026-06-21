// src/features/notifications/context/NotificationContext.tsx
import { createContext, useState, type ReactNode } from 'react';
import type { AppNotification } from '../types';


export const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        let loadedNotifications: AppNotification[] = JSON.parse(saved);
        let isDirty = false;
        loadedNotifications = loadedNotifications.map(n => {
          const hasMissingParams = (n.type === 'GOAL_80' || n.type === 'GOAL_ACHIEVED' || n.type === 'MISSED_HABIT' || n.type === 'STREAK_RISK') && !n.params;
          if (typeof n.message === 'string' && (n.message.includes('{{') || !n.message.startsWith('notifications.') || hasMissingParams)) {
            isDirty = true;
            if (n.type === 'GOAL_80') {
              n.title = 'notifications.goal_80.title';
              n.message = 'notifications.goal_80.message';
              n.params = { habitName: n.params?.habitName || 'habit_form.Study' };
            } else if (n.type === 'GOAL_ACHIEVED') {
              n.title = 'notifications.goal_achieved.title';
              n.message = 'notifications.goal_achieved.message';
              n.params = { habitName: n.params?.habitName || 'habit_form.Health' };
            } else if (n.type === 'MISSED_HABIT') {
              n.title = 'notifications.missed_habit.title';
              if (n.message !== 'notifications.missed_habit.message_date') {
                n.message = 'notifications.missed_habit.message_date';
              }
              n.params = { 
                habitName: n.params?.habitName || 'habit_form.Mindfulness',
                missedDate: n.params?.missedDate ?? ''
              };
         } else if (n.type === 'STREAK_RISK') {
              n.title = 'notifications.streak_risk.title';
              n.message = 'notifications.streak_risk.message';
              n.params = { 
                habitName: n.params?.habitName || 'habit_form.Work', 
                streakCount: typeof n.params?.streakCount === 'number' ? n.params.streakCount : 5 
              };
            }
          }
          return n;
        });
        if (isDirty) {
          localStorage.setItem('notifications', JSON.stringify(loadedNotifications));
        }
        return loadedNotifications;
      } catch (e) {
        console.error('Failed to parse saved notifications', e);
      }
    }
    return [];
  });


  const addNotification = (
    type: AppNotification['type'],
    titleKey: string,
    messageKey: string,
    params: Record<string, string | number>,
    relatedEntityId: string,
    relatedEntityType: AppNotification['relatedEntityType']
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: titleKey,
      message: messageKey,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
      relatedEntityId,
      relatedEntityType,
      params,
    };

    const saved = localStorage.getItem('notifications');
    let currentList: AppNotification[] = [];
    if (saved) {
      try {
        currentList = JSON.parse(saved);
      } catch {
        currentList = [];
      }
    }
    const updated = [newNotif, ...currentList];
    localStorage.setItem('notifications', JSON.stringify(updated));
    setNotifications(updated);
  };



  // Hàm đánh dấu 1 thông báo đã đọc
  const markAsRead = (id: string) => {
    const updated = notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  // Hàm đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  // Đếm số lượng chưa đọc cho cục Badge
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>

      {children}
    </NotificationContext.Provider>
  );
};