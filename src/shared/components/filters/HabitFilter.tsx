import {  SlidersHorizontal } from "lucide-react";
import { FilterChip } from "../common/FilterChip";
import { DAY_OF_WEEK_MAP, DAYS } from "@/shared/constants/appConstants";
import { useTranslation } from "react-i18next";
import { enUS, vi } from "date-fns/locale";
import type { HabitStatus, Priority } from "@/shared/types/Habit";
import type { DaysOfWeek } from "@/shared/types/HabitSchedule";
import { useState } from "react";
import type { Category } from "@/shared/types/Category";

interface HabitFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  selectedPriority: Priority | null;
  onPriorityChange: (p: Priority | null) => void;
  selectedStatus: HabitStatus | null;
  onStatusChange: (s: HabitStatus | null) => void;
  frequencyFilter: DaysOfWeek | null;
  onFrequencyChange: (v: DaysOfWeek | null) => void;
  onClearAll: () => void;
}

export function HabitFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  frequencyFilter,
  onFrequencyChange,
  onClearAll,
}: HabitFilterProps) {
  const { t, i18n } = useTranslation();

  const [calendarDate, setCalendarDate] = useState<Date | undefined>();

  const handleWeekdayClick = (dayIndex: number) => {
    const dow = DAY_OF_WEEK_MAP[dayIndex];
    setCalendarDate(undefined); // bỏ chọn calendar khi chọn weekday chip
    onFrequencyChange(frequencyFilter === dow ? null : dow);
  };
  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedPriority ? 1 : 0) +
    (selectedStatus === "ACTIVE" ? 0 : 1) +
    (frequencyFilter === DAY_OF_WEEK_MAP[new Date().getDay()] ? 0 : 1);

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={16} style={{ color: "var(--primary)" }} />

        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--sidebar-muted)" }}
        >
          {t("habit_filter.title")}
        </span>

        {activeFilterCount > 0 && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
            style={{ background: "var(--primary)" }}
          >
            {activeFilterCount}
          </span>
        )}

        <button
          className="ml-auto text-xs font-medium transition-colors cursor-pointer"
          style={{
            color: "var(--primary)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onClick={onClearAll}
        >
          {t("habit_filter.btn_clear")}
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Category */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {t("habit_filter.category")}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!selectedCategory}
              onClick={() => onCategoryChange(null)}
            >
              {t("habit_filter.cat-0")}
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat.id}
                active={selectedCategory === cat.id}
                onClick={() => onCategoryChange(cat.id)}
              >
                {t(`habit_form.${cat.name}`)}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {t("habit_filter.priority")}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!selectedPriority}
              onClick={() => onPriorityChange(null)}
            >
              {t("habit_filter.pri-0")}
            </FilterChip>
            <FilterChip
              active={selectedPriority === "LOW"}
              onClick={() => onPriorityChange("LOW")}
            >
              {t("habit_filter.pri-1")}
            </FilterChip>
            <FilterChip
              active={selectedPriority === "MEDIUM"}
              onClick={() => onPriorityChange("MEDIUM")}
            >
              {t("habit_filter.pri-2")}
            </FilterChip>
            <FilterChip
              active={selectedPriority === "HIGH"}
              onClick={() => onPriorityChange("HIGH")}
            >
              {t("habit_filter.pri-3")}
            </FilterChip>
          </div>
        </div>

        {/* Status */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {t("habit_filter.status")}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!selectedStatus}
              onClick={() => onStatusChange(null)}
            >
              {t("habit_filter.st-0")}
            </FilterChip>
            <FilterChip
              active={selectedStatus === "ACTIVE"}
              onClick={() => onStatusChange("ACTIVE")}
            >
              {t("habit_filter.st-1")}
            </FilterChip>
            <FilterChip
              active={selectedStatus === "PAUSED"}
              onClick={() => onStatusChange("PAUSED")}
            >
              {t("habit_filter.st-2")}
            </FilterChip>
            <FilterChip
              active={selectedStatus === "ARCHIVED"}
              onClick={() => onStatusChange("ARCHIVED")}
            >
              {t("habit_filter.st-3")}
            </FilterChip>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <p
            className="mb-2.5 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {t("habit_filter.frequency")}
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <FilterChip
              active={!frequencyFilter && !calendarDate}
              onClick={() => {
                onFrequencyChange(null);
                setCalendarDate(undefined);
              }}
            >
              {t("habit_filter.All")}
            </FilterChip>

            {DAYS.map((day) => (
              <FilterChip
                key={day.key}
                active={frequencyFilter === DAY_OF_WEEK_MAP[day.key]}
                onClick={() => handleWeekdayClick(day.key)}
              >
                {t(`habit_filter.${day.label}`)}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
