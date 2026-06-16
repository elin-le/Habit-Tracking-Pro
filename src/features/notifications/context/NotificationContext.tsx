// src/features/notifications/context/NotificationContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AppNotification } from '../types';
import { mockNotifications } from '../../../data/notifications';
import { useTranslation } from 'react-i18next';
import { ToastService } from '../../../routes/services/toastService';
import {
  getCurrentStreak,
  getStreakProgress,
  getTotalCompletionProgress
} from '../../habit/calculators/GoalCalculator';

export const NotificationContext = createContext<any>(null);

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
      id: `notif-${crypto.randomUUID()}`,
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

  const checkAndGenerateNotifications = (currentNotifications: AppNotification[] = []) => {
    try {
      const goalsStr = localStorage.getItem('htp_current_user_goals');
      const habitsStr = localStorage.getItem('htp_current_user_habits');
      const checkinsStr = localStorage.getItem('htp_current_user_checkins');

      const goals = goalsStr ? JSON.parse(goalsStr) : [];
      const habits = habitsStr ? JSON.parse(habitsStr) : [];
      const checkins = checkinsStr ? JSON.parse(checkinsStr) : [];

      const listToCheck = currentNotifications.length > 0 ? currentNotifications : notifications;

      // 1. Quét Goals để tạo thông báo 80% hoặc 100%
      goals.forEach((goal: any) => {
        const habit = habits.find((h: any) => h.id === goal.habitId);
        const targetPerDay = habit ? habit.targetPerDay : 1;
        const habitName = habit ? habit.name : 'Mục tiêu';
        
        let progressPercent = 0;
        if (goal.goalType === 'STREAK') {
          progressPercent = getStreakProgress(goal, targetPerDay, checkins);
        } else if (goal.goalType === 'TOTAL_COMPLETIONS') {
          progressPercent = getTotalCompletionProgress(goal, targetPerDay, checkins);
        }

        if (progressPercent >= 100) {
          const hasAchievedNotif = listToCheck.some(
            (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_ACHIEVED'
          );
          if (!hasAchievedNotif) {
            addNotification(
              'GOAL_ACHIEVED',
              'notifications.goal_achieved.title',
              'notifications.goal_achieved.message',
              { habitName },
              goal.id,
              'GOAL'
            );
          }
        } else if (progressPercent >= 80) {
          const has80Notif = listToCheck.some(
            (n: any) => n.relatedEntityId === goal.id && n.type === 'GOAL_80'
          );
          if (!has80Notif) {
            addNotification(
              'GOAL_80',
              'notifications.goal_80.title',
              'notifications.goal_80.message',
              { habitName },
              goal.id,
              'GOAL'
            );
          }
        }
      });

      // 2. Quét Habits để kiểm tra nguy cơ đứt chuỗi (Streak Risk)
      habits.forEach((habit: any) => {
        const habitCheckins = checkins.filter((c: any) => c.habitId === habit.id);
        const currentStreakVal = getCurrentStreak(habitCheckins, habit.targetPerDay);
        
        if (currentStreakVal >= 3) {
          const todayKey = new Date().toISOString().split('T')[0];
          // Đếm số checkin hôm nay
          const todaySummary = habitCheckins.filter((c: any) => c.checkedAt === todayKey).length;
          const isCompletedToday = todaySummary >= habit.targetPerDay;

          if (!isCompletedToday) {
            const todayNotifExists = listToCheck.some(
              (n: any) =>
                n.relatedEntityId === habit.id &&
                n.type === 'STREAK_RISK' &&
                n.createdAt.startsWith(todayKey)
            );
            if (!todayNotifExists) {
              addNotification(
                'STREAK_RISK',
                'notifications.streak_risk.title',
                'notifications.streak_risk.message',
                { habitName: habit.name, streakCount: currentStreakVal },
                habit.id,
                'HABIT'
              );
            }
          }
        }
      });
    } catch (error) {
      console.error('Failed to run checkAndGenerateNotifications', error);
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
        loadedNotifications = mockNotifications;
        setNotifications(mockNotifications);
      }
    } else {
      loadedNotifications = mockNotifications;
      setNotifications(mockNotifications);
    }

    // Tự động kiểm tra trạng thái ngay sau khi load
    setTimeout(() => {
      checkAndGenerateNotifications(loadedNotifications);
    }, 200);
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
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, checkAndGenerateNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};