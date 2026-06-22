import { useContext, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationContext } from '../context/NotificationContext';
import type { AppNotification } from '../types';
import { NotificationTime } from './NotificationTime';
import { Pagination } from '../../../shared/components/common/Pagination';

export const NotificationList = ({
  typeFilter = 'ALL',
  readFilter = 'ALL'
}: {
  typeFilter?: string;
  readFilter?: string;
}) => {
  const { t } = useTranslation();
  const { notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif: any) => {
      const matchesType = typeFilter === 'ALL' || notif.type === typeFilter;
      const matchesRead = readFilter === 'ALL'
        ? true
        : readFilter === 'UNREAD'
          ? !notif.isRead
          : notif.isRead;
      return matchesType && matchesRead;
    });
  }, [notifications, typeFilter, readFilter]);

 const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredNotifications.length / 10));
  }, [filteredNotifications.length]);
  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, readFilter]);
  // Cap current page if total pages decreases (e.g. read notification gets filtered out)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    return filteredNotifications.slice(startIndex, startIndex + 10);
  }, [currentPage, filteredNotifications]);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };



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
      className="rounded-xl border p-5 flex flex-col"
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
          className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:opacity-80 cursor-pointer"
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
        {paginatedItems.map((notif: AppNotification) => (
          <div 
            key={notif.id}
            onClick={() => {
              if (!notif.isRead) {
                markAsRead(notif.id);
              }
            }}
            className={`flex items-start justify-between gap-4 rounded-lg border p-4 transition-all ${
              !notif.isRead ? 'cursor-pointer hover:bg-muted/30' : ''
            }`}            style={{
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

            
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageNumbers={getPageNumbers}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};