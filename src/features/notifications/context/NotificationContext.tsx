// src/features/notifications/context/NotificationContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AppNotification } from '../types';
import { useTranslation } from 'react-i18next';
import { ToastService } from '../../../routes/services/toastService';


export const NotificationContext = createContext<any>(null);

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const { t } = useTranslation();

  const addNotification = (
    type: AppNotification['type'],
    titleKey: string,
    messageKey: string,
    params: Record<string, string | number>,
    relatedEntityId: string,
    relatedEntityType: AppNotification['relatedEntityType']
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${generateUUID()}`,
      title: titleKey,
      message: messageKey,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
      relatedEntityId,
      relatedEntityType,
      params,
    };

    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });

    const translatedMessage = t(messageKey, params);
    if (type === 'GOAL_ACHIEVED') {
      ToastService.achievement(translatedMessage);
    } else if (type === 'STREAK_RISK') {
      ToastService.warning(translatedMessage);
    } else if (type === 'MISSED_HABIT') {
      ToastService.reminder(translatedMessage);
    } else {
      ToastService.info(translatedMessage);
    }
  };


  // Lấy dữ liệu từ localStorage hoặc dùng mockData 
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    let loadedNotifications: AppNotification[] = [];
    if (saved) {
      try {
        loadedNotifications = JSON.parse(saved);
        let isDirty = false;
        loadedNotifications = loadedNotifications.map(n => {
          const hasMissingParams = (n.type === 'GOAL_80' || n.type === 'GOAL_ACHIEVED' || n.type === 'MISSED_HABIT' || n.type === 'STREAK_RISK') && !n.params;
          if (typeof n.message === 'string' && (n.message.includes('{{') || !n.message.startsWith('notifications.') || hasMissingParams)) {
            isDirty = true;
            if (n.type === 'GOAL_80') {
              n.title = 'notifications.goal_80.title';
              n.message = 'notifications.goal_80.message';
              n.params = { habitName: 'habit_form.Study' };
            } else if (n.type === 'GOAL_ACHIEVED') {
              n.title = 'notifications.goal_achieved.title';
              n.message = 'notifications.goal_achieved.message';
              n.params = { habitName: 'habit_form.Health' };
            } else if (n.type === 'MISSED_HABIT') {
              n.title = 'notifications.missed_habit.title';
              n.message = 'notifications.missed_habit.message';
              n.params = { habitName: 'habit_form.Mindfulness' };
            } else if (n.type === 'STREAK_RISK') {
              n.title = 'notifications.streak_risk.title';
              n.message = 'notifications.streak_risk.message';
              n.params = { habitName: 'habit_form.Work', streakCount: 5 };
            }
          }
          return n;
        });
        setNotifications(loadedNotifications);
        if (isDirty) {
          localStorage.setItem('notifications', JSON.stringify(loadedNotifications));
        }
      } catch (e) {
        console.error('Failed to parse saved notifications', e);
        loadedNotifications = [];
        setNotifications([]);
      }
    } else {
      loadedNotifications = [];
      setNotifications([]);
    }


  }, []);

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