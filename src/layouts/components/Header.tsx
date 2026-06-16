import { MobileMenuButton } from "./SideBar";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../shared/hooks/useTheme";
import { HabitForm } from "../../shared/components/forms/HabitForm";
import type { Habit } from "../../shared/types/Habit";
import type { HabitSchedule } from "../../shared/types/HabitSchedule";
import { useState, useContext, useRef, useEffect } from "react";
import { NotificationContext } from "../../features/notifications/context/NotificationContext";
import type { Category } from "../../shared/types/Category"
import type { User } from "../../shared/types/User"
import { STORAGE_KEY } from "../../shared/constants/appConstants"

interface HeaderProps {
  title?: string;
  subtitle?: string;
  period?: "today" | "week" | "month" | "year";
  onPeriodChange?: (period: "today" | "week" | "month" | "year") => void;
  showNewHabit?: boolean;
  onNewHabit?: () => void;
  onMenuOpen?: () => void;
  showAddForm: boolean;
  setShowAddForm: (v: boolean) => void;
  createHabit: (habit: Habit) => void;
  createHabitSchedules: (s: HabitSchedule[]) => void;
  userName?: string;
  avatarUrl?: string;
}

const PERIODS = [
  { value: "today" as const, label: "Today" },
  { value: "week" as const, label: "Week" },
  { value: "month" as const, label: "Month" },
  { value: "year" as const, label: "Year" },
] as const;

function BellIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

// Avatar nhỏ dùng ảnh nếu có, không thì hiện chữ cái đầu của tên
function AvatarBadge({ name, src }: { name: string; src?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="w-11 h-11 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-violet-700 shadow-sm ring-2 ring-white/60 flex items-center justify-center text-white font-bold text-base select-none">
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}

export default function Header({
  title,
  subtitle,
  period = "today",
  onPeriodChange,
  // showNewHabit = true,
  // onNewHabit,
  onMenuOpen,
  showAddForm,
  setShowAddForm,
  createHabit,
  createHabitSchedules,
  userName = "Alex",
  avatarUrl,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState<"EN" | "VI">("EN");
  const categories = JSON.parse(localStorage.getItem(STORAGE_KEY.CATEGORYS) || "[]") as Category[];
  const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}") as User;
  
// 1. Khai báo thêm hàm đọc thông báo
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);

  // 2. State điều khiển mở popup & click ra ngoài tự đóng
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const toggleLang = () => {
    const newLang = lang === "EN" ? "VI" : "EN";
    setLang(newLang);
    i18n.changeLanguage(newLang.toLowerCase());
  };

  return (
    <header
      style={{ background: "var(--surface)", color: "var(--text)" }}
      className="sticky top-0 z-30"
    >
      {/* MOBILE header  (< md) */}
      <div className="flex md:hidden items-center justify-between gap-3 px-5 pt-8 pb-3">
        {/* Left: Avatar + greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <AvatarBadge name={currentUser.username} src={currentUser.avt} />
          <div className="min-w-0">
            <p className="text-xs text-violet-400 font-medium truncate">
              {subtitle ?? `${greeting},`}
            </p>
            <h1 className="text-lg font-bold leading-tight truncate">
              {title + " " + currentUser.username}
            </h1>
          </div>
        </div>

        {/* Right: quick toggles, nổi hẳn lên so với nền để không bị lẫn vào body khi light mode */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-violet-50 shadow-sm ring-1 ring-violet-100 text-violet-500 text-[11px] font-semibold tracking-wide select-none"
          >
            <span
              className={lang === "EN" ? "text-violet-700" : "text-violet-300"}
            >
              EN
            </span>
            <span className="text-violet-200 font-normal">|</span>
            <span
              className={lang === "VI" ? "text-violet-700" : "text-violet-300"}
            >
              VI
            </span>
          </button>

          {/* Dark/Light toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={[
              "relative w-10 h-6 rounded-full shadow-sm transition-colors duration-300 overflow-hidden",
              theme === "light" ? "bg-violet-600" : "bg-violet-100",
            ].join(" ")}
          >
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-yellow-400">
              <SunIcon />
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-violet-400">
              <MoonIcon />
            </span>
            <span
              className={[
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300",
                theme === "light" ? "translate-x-4" : "translate-x-0",
              ].join(" ")}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════
                DESKTOP header  (≥ md)
            ════════════════════════════════ */}
      <div className="hidden md:flex items-center gap-3 shadow-sm px-6 lg:px-7 py-4">
        <MobileMenuButton onClick={onMenuOpen ?? (() => { })} />

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold leading-tight truncate">
            {title + " " + currentUser.username}
          </h1>
          <p className="text-base text-violet-400 mt-1 leading-tight truncate">
            {subtitle ?? "Here's your progress overview"}
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 relative">
          {/* Period selector */}
          {onPeriodChange && (
            <div className="flex items-center bg-violet-50 rounded-xl p-1 gap-0.5">
              {PERIODS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => onPeriodChange(p.value)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
                    period === p.value
                      ? "bg-white text-[#1a1040] shadow-sm"
                      : "text-violet-400 hover:text-violet-700 hover:bg-violet-100/50",
                  ].join(" ")}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <div className="w-px h-6 bg-violet-100 mx-1" />

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 h-9 px-2.5 rounded-xl border text-violet-500 hover:bg-violet-50 hover:border-violet-200 transition-all text-xs font-semibold tracking-wide select-none"
          >
            <span
              className={lang === "EN" ? "text-violet-700" : "text-violet-300"}
            >
              EN
            </span>
            <span className="text-violet-200 font-normal">|</span>
            <span
              className={lang === "VI" ? "text-violet-700" : "text-violet-300"}
            >
              VI
            </span>
          </button>

          {/* Dark/Light toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={[
              "relative w-[52px] h-7 rounded-full transition-colors duration-300 overflow-hidden",
              theme === "light" ? "bg-violet-600" : "bg-violet-100",
            ].join(" ")}
          >
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-yellow-400">
              <SunIcon />
            </span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-violet-400">
              <MoonIcon />
            </span>
            <span
              className={[
                "absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300",
                theme === "light" ? "translate-x-6" : "translate-x-0",
              ].join(" ")}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

          <div className="w-px h-6 bg-violet-100 mx-1" />

          {/* Bell */}
          <div ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-violet-400 hover:bg-violet-50 hover:text-violet-600 transition-colors cursor-pointer"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Khung Popup thả xuống */}
            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-xl border overflow-hidden z-50 flex flex-col"
                style={{ background: 'var(--surface)', borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
                  <h3 className="font-bold text-xl" style={{ color: 'var(--text)' }}>
                    {t('notifications.title')}
                  </h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      {t('notifications.markAllRead')}
                    </button>
                  )}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center opacity-60" style={{ color: 'var(--text)' }}>
                      {t('notifications.empty')}
                    </div>
                  ) : (
                    notifications.map((notif: any) => {
                      const isDark = theme === "dark";
                      const baseClass = "relative flex items-start gap-3 p-3 mx-2 my-1 rounded-xl cursor-pointer transition-colors";
                      const hoverClass = notif.isRead
                        ? isDark
                          ? "hover:bg-white/5"
                          : "hover:bg-black/5"
                        : isDark
                          ? "hover:bg-[rgba(255,255,255,0.04)]"
                          : "hover:bg-blue-50";

                      const itemStyle: React.CSSProperties = notif.isRead
                        ? {}
                        : (isDark
                          ? { background: 'rgba(255,255,255,0.03)' }
                          : { background: 'rgba(59,130,246,0.06)' }
                        );

                      const textColor = isDark ? 'rgba(255,255,255,0.94)' : 'var(--text)';

                      const timeStyle: React.CSSProperties = notif.isRead
                        ? { opacity: 0.6, color: isDark ? 'rgba(255,255,255,0.7)' : undefined }
                        : { color: isDark ? '#93c5fd' : '#2563eb', fontWeight: 600 };

                      return (
                        <div
                          key={notif.id}
                          onClick={() => { if (!notif.isRead) markAsRead(notif.id); }}
                          className={`${baseClass} ${hoverClass}`}
                          style={itemStyle}
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-[15px] ${notif.isRead ? 'font-normal' : 'font-semibold'}`} style={{ color: textColor }}>
                              {t(notif.title, {
                                ...(notif.params || {}),
                                habitName: notif.params?.habitName ? t(String(notif.params.habitName)) : ''
                              }) as string}
                            </h4>
                            <p className={`text-sm mt-0.5 leading-snug ${notif.isRead ? 'opacity-80' : 'opacity-90'}`} style={{ color: textColor }}>
                              {t(notif.message, {
                                ...(notif.params || {}),
                                habitName: notif.params?.habitName ? t(String(notif.params.habitName)) : ''
                              }) as string}
                            </p>
                            <span className={`text-[12px] mt-1 block`} style={timeStyle}>
                              {new Date(notif.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          {/* Chấm tròn xanh (Chưa đọc) */}
                          {!notif.isRead && (
                            <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>          

          {/* New Habit */}
          <button
            className="cursor-pointer flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium rounded-xl transition-colors px-4 h-9 text-sm"
            onClick={() => setShowAddForm(true)}
          >
            <PlusIcon />
            {t("habit.btn_add")}
          </button>
          {showAddForm && (
            <HabitForm
              onClose={() => setShowAddForm(false)}
              onSubmit={createHabit}
              onSubmitSchedules={createHabitSchedules}
              categories={categories}
            />
          )}
        </div>
      </div>
    </header>
  );
}