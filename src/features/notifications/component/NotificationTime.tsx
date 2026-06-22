import { useTranslation } from "react-i18next";

export function NotificationTime({ createdAt }: { createdAt: string | null | undefined }) {
  const { i18n } = useTranslation();
  if (!createdAt) {
    return null;
  }
  const date = new Date(createdAt);
  
  if (isNaN(date.getTime())) {
    return <span>{createdAt}</span>;
  }

  const isToday = new Date().toDateString() === date.toDateString();
  
  const timeStr = date.toLocaleTimeString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  if (isToday) {
    const todayLabel = i18n.language === 'vi' ? 'Hôm nay lúc' : 'Today at';
    return <span>{`${todayLabel} ${timeStr}`}</span>;
  }

  const dateStr = date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return <span>{`${timeStr} - ${dateStr}`}</span>;
}
