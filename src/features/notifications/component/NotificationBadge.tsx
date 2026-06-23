// src/features/notifications/components/NotificationBadge.tsx
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const NotificationBadge = () => {
  // Lấy số lượng chưa đọc từ kho dữ liệu chung
  const { unreadCount } = useContext(NotificationContext);

  // Nếu không có thông báo nào chưa đọc thì không hiện gì cả
  if (unreadCount === 0) return null;

  return (
    <span className="inline-flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold px-1.5 py-0.5 ml-2 min-w-[18px] h-[18px]">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
};