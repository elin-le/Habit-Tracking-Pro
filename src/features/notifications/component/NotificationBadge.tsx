// src/features/notifications/components/NotificationBadge.tsx
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const NotificationBadge = () => {
  // Lấy số lượng chưa đọc từ kho dữ liệu chung
  const { unreadCount } = useContext(NotificationContext);

  // Nếu không có thông báo nào chưa đọc thì không hiện gì cả
  if (unreadCount === 0) return null;

  return (
    <span style={{
      backgroundColor: '#ef4444', 
      color: 'white',
      borderRadius: '9999px',
      padding: '2px 6px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginLeft: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '18px',
      height: '18px'
    }}>
      {unreadCount}
    </span>
  );
};