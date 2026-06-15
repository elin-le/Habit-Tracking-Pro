import { useTranslation } from 'react-i18next';
import { NotificationList } from '../features/notifications/component/NotificationList';

export const NotificationsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-in">
      {/* Header giống hệt trang Habits */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl font-light" style={{ color: 'var(--text)' }}>
            {t('notifications.title')}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--sidebar-muted)' }}>
            {t('notifications.description')}
          </p>
        </div>
      </div>

      {/* Phần danh sách */}
      <NotificationList />
    </div>
  );
};