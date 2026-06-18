import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const NotificationTime = ({ createdAt }: { createdAt: string }) => {
  const { i18n } = useTranslation();
  const [, setTick] = useState(0);

  useEffect(() => {
    // Force a re-render every 30 seconds to keep the relative time updated
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getRelativeTime = (dateStr: string) => {
    const now = new Date();
    const created = new Date(dateStr);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    const isVi = i18n.language === 'vi';

    if (diffMins < 1) {
      return isVi ? 'Vừa xong' : 'Just now';
    }
    if (diffMins < 60) {
      return isVi ? `${diffMins} phút trước` : `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return isVi ? `${diffHours} giờ trước` : `${diffHours}h ago`;
    }
    if (diffDays < 7) {
      return isVi ? `${diffDays} ngày trước` : `${diffDays}d ago`;
    }
    
    // Fallback to absolute formatting for older items
    return created.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return <>{getRelativeTime(createdAt)}</>;
};
