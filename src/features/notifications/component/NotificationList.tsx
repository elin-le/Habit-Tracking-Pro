import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationContext } from '../context/NotificationContext';
import type { AppNotification } from '../types';
import { NotificationTime } from './NotificationTime';

export const NotificationList = ({
  typeFilter = 'ALL',
  readFilter = 'ALL'
}: {
  typeFilter?: string;
  readFilter?: string;
}) => {
    const { t } = useTranslation();
  const { notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);

  const filteredNotifications = notifications.filter((notif: any) => {
    const matchesType = typeFilter === 'ALL' || notif.type === typeFilter;
    const matchesRead = readFilter === 'ALL'
      ? true
      : readFilter === 'UNREAD'
        ? !notif.isRead
        : notif.isRead;
    return matchesType && matchesRead;
  });

  if (filteredNotifications.length === 0) {
    return (
      <div 
        className="rounded-xl border px-5 py-16 text-center"
        style={{ 
          background: 'var(--surface)', 
          borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' 
        }}
      >
        <h3 className="mb-2 text-2xl font-light" style={{ color: 'var(--text)' }}>
          {t('notifications.empty')}
        </h3>
      </div>
    );
  }

  return (
    <div 
      className="rounded-xl border p-5"
      style={{ 
        background: 'var(--surface)', 
        borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' 
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-medium" style={{ color: 'var(--text)' }}>
          {t('notifications.listTitle')}
        </h3>
        <button 
          onClick={markAllAsRead}
          className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:opacity-80"
          style={{ 
            background: 'var(--bg)', 
            color: 'var(--text)',
            borderColor: 'var(--primary)' 
          }}
        >
          {t('notifications.markAllRead')}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredNotifications.map((notif: AppNotification) => (
          <div 
            key={notif.id}
            className="flex items-start justify-between gap-4 rounded-lg border p-4 transition-all"
            style={{
              background: notif.isRead ? 'transparent' : 'color-mix(in srgb, var(--primary) 5%, transparent)',
              borderColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
              borderLeft: notif.isRead ? '' : '3px solid var(--primary)'
            }}
          >
            <div>
              <h4 className={`mb-1 text-[15px] ${notif.isRead ? 'font-semibold' : 'font-bold'}`} style={{ color: 'var(--text)' }}>
                {t(notif.title, {
                  ...notif.params,
                  habitName: notif.params?.habitName ? t(String(notif.params.habitName)) : ''
                })}
              </h4>
              <p className={`text-sm ${notif.isRead ? 'font-medium opacity-85' : 'font-semibold opacity-100'}`} style={{ color: 'var(--text)' }}>
                {t(notif.message, {
                  ...notif.params,
                  habitName: notif.params?.habitName ? t(String(notif.params.habitName)) : ''
                })}
              </p>
              <span className="mt-2 block text-xs font-medium opacity-70" style={{ color: 'var(--text)' }}>
                <NotificationTime createdAt={notif.createdAt} />
              </span>
            </div>

            {!notif.isRead && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-all hover:opacity-80"
                style={{ background: 'var(--primary)', color: 'var(--bg)' }}
              >
                {t('notifications.readBtn')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};