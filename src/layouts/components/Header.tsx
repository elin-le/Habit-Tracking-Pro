import { MobileMenuButton } from "./SideBar";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../shared/hooks/useTheme";
import { HabitForm } from "../../shared/components/forms/HabitForm";
import type { Habit } from "../../shared/types/Habit";
import type { HabitSchedule } from "../../shared/types/HabitSchedule";
import { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Thêm dòng này
import { NotificationContext } from "../../features/notifications/context/NotificationContext"; // Thêm dòng này

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
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState<"EN" | "VI">("EN");

  // THÊM DÒNG NÀY ĐỂ LẤY SỐ ĐẾM THÔNG BÁO:
  const { unreadCount } = useContext(NotificationContext);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <header
      style={{ background: "var(--surface)", color: "var(--text)" }}
      className="sticky top-0 z-30"
    >
      {/* MOBILE header  (< md) */}
      <div className="flex md:hidden items-center justify-start px-5 pt-8 pb-3">
        {/* Left: Menu button + greeting */}
        <div className="flex items-center gap-3">
          <MobileMenuButton onClick={onMenuOpen ?? (() => {})} />
          <div>
            <p className="text-sm text-violet-400 font-medium">
              {subtitle ?? "Keep going, you're doing great!"}
            </p>
            <h1 className="text-2xl font-bold mt-0.5">
              {title ?? `${greeting}, Alex! 👋`}
            </h1>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
                DESKTOP header  (≥ md)
            ════════════════════════════════ */}
      <div className="hidden md:flex items-center gap-3 shadow-sm px-6 lg:px-7 py-4">
        <MobileMenuButton onClick={onMenuOpen ?? (() => {})} />

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold leading-tight truncate">
            {title ?? `${greeting}!`}
          </h1>
          <p className="text-base text-violet-400 mt-1 leading-tight truncate">
            {subtitle ?? "Here's your progress overview"}
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
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
            onClick={() => {
              const newLang = lang === "EN" ? "VI" : "EN";
              setLang(newLang);
              i18n.changeLanguage(newLang.toLowerCase());
            }}
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
          <Link
            to="/dashboard/notifications"
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-violet-400 hover:bg-violet-50 hover:text-violet-600 transition-colors"
          >
            <BellIcon />
            {/* Cục badge đỏ kiểu Facebook - Chỉ hiện ra khi có thông báo */}
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

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
            />
          )}
        </div>
      </div>
    </header>
  );
}
