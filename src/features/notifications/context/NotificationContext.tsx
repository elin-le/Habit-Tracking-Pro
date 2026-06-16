// src/features/notifications/context/NotificationContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AppNotification } from '../types';
import { mockNotifications } from '../mockData';

export const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Lấy dữ liệu từ localStorage hoặc dùng mockData 
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(mockNotifications);
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
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};