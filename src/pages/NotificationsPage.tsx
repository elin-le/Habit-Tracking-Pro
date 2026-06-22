import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationList } from '../features/notifications/component/NotificationList';
import {
  Target,
  Award,
  AlertTriangle,
  HelpCircle,
  Layers,
  Inbox,
  Eye,
  EyeOff,
  ListFilter,
  CheckCircle2
} from 'lucide-react';

import { useNavigate } from "react-router-dom"
import type { User } from "@/shared/types/User"
import { ROUTES } from "@/shared/constants/appConstants"
import { STORAGE_KEY } from "@/shared/constants/appConstants"

export const NotificationsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [readFilter, setReadFilter] = useState<string>('ALL');
  const navigate = useNavigate();

  const currentUser: User | null =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY.CURRENT_USER
      ) || "null"
    );



  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH);
    }
  }, [currentUser, navigate]);
  const TYPE_OPTIONS = [
    {
      value: 'ALL',
      label: t('notifications.filters.typeAll', 'Tất cả'),
      icon: Layers,
      activeClass: 'bg-primary border-primary text-primary-foreground',
      inactiveClass: 'bg-[var(--bg)] border-border text-[var(--text)] opacity-80 hover:bg-muted'
    },
    {
      value: 'GOAL_80',
      label: t('notifications.demoPanel.btnGoal80'),
      icon: Target,
      activeClass: 'bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500',
      inactiveClass: 'bg-indigo-50/50 border-indigo-100 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-800/30 dark:text-indigo-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30'
    },
    {
      value: 'GOAL_ACHIEVED',
      label: t('notifications.demoPanel.btnGoalAchieved'),
      icon: Award,
      activeClass: 'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500',
      inactiveClass: 'bg-emerald-50/50 border-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800/30 dark:text-emerald-300 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30'
    },
    {
      value: 'MISSED_HABIT',
      label: t('notifications.demoPanel.btnMissedHabit'),
      icon: HelpCircle,
      activeClass: 'bg-slate-600 border-slate-600 text-white dark:bg-slate-500 dark:border-slate-500',
      inactiveClass: 'bg-slate-50/50 border-slate-200 text-slate-700 dark:bg-slate-800/20 dark:border-slate-700/50 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/30'
    },
    {
      value: 'STREAK_RISK',
      label: t('notifications.demoPanel.btnStreakRisk'),
      icon: AlertTriangle,
      activeClass: 'bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500',
      inactiveClass: 'bg-amber-50/50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800/30 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/30'
    }
  ];

  const STATUS_OPTIONS = [
    { value: 'ALL', label: t('notifications.filters.statusAll', 'Tất cả'), icon: Inbox },
    { value: 'UNREAD', label: t('notifications.filters.unread', 'Chưa đọc'), icon: EyeOff },
    { value: 'READ', label: t('notifications.filters.read', 'Đã đọc'), icon: Eye }
  ];

  return (
    <div className="animate-in flex flex-col gap-6 pb-6">
      {/* Unified Filter Area */}
      <div 
        className="
          rounded-2xl border
          p-4 md:p-5
          bg-[var(--surface)]
          flex flex-col md:flex-row md:items-center md:justify-between gap-4
        "
        style={{
          borderColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
        }}
      >
        {/* Type Filter */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black dark:text-white">
            <ListFilter size={14} />
            {t('notifications.filters.typeLabel', 'Loại thông báo')}
          </span>

          
          {/* Mobile */}
          <div className="flex flex-col gap-2 md:hidden">

            {/* All đứng riêng */}
            <div>
              {TYPE_OPTIONS.filter(opt => opt.value === 'ALL').map((opt) => {
                const Icon = opt.icon;
                const isActive = activeFilter === opt.value;

                return (
                  <button
                    key={opt.value}
                    onClick={() => setActiveFilter(opt.value)}
                    className={`
                      flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold
                      transition-all cursor-pointer
                      ${isActive ? opt.activeClass : opt.inactiveClass}
                    `}
                  >
                    <Icon size={14} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Các loại còn lại */}
            <div className="grid grid-cols-2 gap-2">
              {TYPE_OPTIONS
                .filter(opt => opt.value !== 'ALL')
                .map((opt) => {
                  const Icon = opt.icon;
                  const isActive = activeFilter === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => setActiveFilter(opt.value)}
                      className={`
                        flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold
                        transition-all cursor-pointer
                        ${isActive ? opt.activeClass : opt.inactiveClass}
                      `}
                    >
                      <Icon size={14} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Desktop */}
          <div
            className="hidden md:flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TYPE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeFilter === opt.value;

              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`
                    flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold
                    transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0
                    ${isActive ? opt.activeClass : opt.inactiveClass}
                  `}
                >
                  <Icon size={14} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block w-px h-10 self-end" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}></div>

        {/* Read Status Filter */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-black dark:text-white">
            <CheckCircle2 size={14} />
            {t('notifications.filters.statusLabel', 'Trạng thái')}
          </span>
          <div className="flex bg-[var(--bg)] p-1 rounded-xl border" style={{ borderColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
            {STATUS_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = readFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setReadFilter(opt.value)}
                  className={`
                    flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold
                    transition-all cursor-pointer select-none
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-[var(--text)] opacity-70 hover:opacity-100 hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon size={13} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Notification List */}
      <NotificationList typeFilter={activeFilter} readFilter={readFilter} />
    </div>
  );
};
