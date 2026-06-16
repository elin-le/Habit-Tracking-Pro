import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationList } from '../features/notifications/component/NotificationList';
import { Target, Award, AlertTriangle, HelpCircle } from 'lucide-react';

export const NotificationsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(prev => prev === filterType ? 'ALL' : filterType);
  };

  return (
    <div className="animate-in flex flex-col gap-6">
      {/* Header giống hệt trang Habits */}
      {/* <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl font-light" style={{ color: 'var(--text)' }}>
            {t('notifications.title')}
          </h1>
          <p className="mt-1 text-sm opacity-60" style={{ color: 'var(--text)' }}>
            {t('notifications.description')}
          </p>
        </div>
      </div> */}

      {/* Bộ lọc phân loại thông báo */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={() => handleFilterClick('GOAL_80')}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
            activeFilter === 'GOAL_80'
              ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
          }`}
        >
          <Target size={14} />
          {t('notifications.demoPanel.btnGoal80')}
        </button>
        
        <button
          onClick={() => handleFilterClick('GOAL_ACHIEVED')}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
            activeFilter === 'GOAL_ACHIEVED'
              ? 'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
          }`}
        >
          <Award size={14} />
          {t('notifications.demoPanel.btnGoalAchieved')}
        </button>
        <button
          onClick={() => handleFilterClick('MISSED_HABIT')}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
            activeFilter === 'MISSED_HABIT'
              ? 'bg-slate-600 border-slate-600 text-white dark:bg-slate-500 dark:border-slate-500'
              : 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
          }`}
        >
          <HelpCircle size={14} />
          {t('notifications.demoPanel.btnMissedHabit')}
        </button>
        <button
          onClick={() => handleFilterClick('STREAK_RISK')}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
            activeFilter === 'STREAK_RISK'
              ? 'bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500'
              : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40'
          }`}
        >
          <AlertTriangle size={14} />
          {t('notifications.demoPanel.btnStreakRisk')}
        </button>
      </div>
      {/* Phần danh sách */}
      <NotificationList filter={activeFilter} />
    </div>
  );
};