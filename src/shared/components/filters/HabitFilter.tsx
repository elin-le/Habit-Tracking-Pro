import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { FilterChip } from "../common/FilterChip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/Button";
import { DAY_OF_WEEK_MAP, DAYS } from "@/shared/constants/appConstants";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { enUS, vi } from "date-fns/locale";
import type { HabitStatus, Priority } from "@/shared/types/Habit";
import { mockCategories } from "@/data/category";
import type { DaysOfWeek } from "@/shared/types/HabitSchedule";
import { useState } from "react";

interface HabitFilterProps {
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
  const locale = i18n.language === "vi" ? vi : enUS;

  const [calendarDate, setCalendarDate] = useState<Date | undefined>();

  const handleWeekdayClick = (dayIndex: number) => {
    const dow = DAY_OF_WEEK_MAP[dayIndex];
    setCalendarDate(undefined); // bỏ chọn calendar khi chọn weekday chip
    onFrequencyChange(frequencyFilter === dow ? null : dow);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setCalendarDate(date);
    onFrequencyChange(DAY_OF_WEEK_MAP[date.getDay()]); // convert ngay thành DaysOfWeek
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
            {mockCategories.map((cat) => (
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

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                    "h-auto",
                  )}
                  style={
                    calendarDate
                      ? {
                        background: "var(--primary)",
                        borderColor: "var(--primary)",
                        color: "#fff",
                        boxShadow:
                          "0 0 0 2px color-mix(in srgb, var(--primary) 18%, transparent)",
                      }
                      : {
                        background: "transparent",
                        borderColor:
                          "color-mix(in srgb, var(--primary) 18%, transparent)",
                        color: "var(--sidebar-muted)",
                      }
                  }
                  onMouseEnter={(e) => {
                    if (!calendarDate) {
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.background =
                        "color-mix(in srgb, var(--primary) 8%, transparent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!calendarDate) {
                      e.currentTarget.style.color = "var(--sidebar-muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <CalendarIcon size={14} />
                  {calendarDate
                    ? format(calendarDate, "dd/MM/yyyy")
                    : t("habit_filter.pad")}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 shadow-xl border-0"
                align="start"
                sideOffset={4}
                style={{
                  boxShadow:
                    "0 8px 32px -4px rgba(0,0,0,0.18), 0 2px 8px -2px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <Calendar
                  mode="single"
                  selected={calendarDate}
                  onSelect={handleDateSelect}
                  locale={locale}
                />
              </PopoverContent>
            </Popover>
          </div>

          {frequencyFilter && (
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--sidebar-muted)" }}
            >
              {t("habit_filter.filter_by")}{" "}
              {t(`habit_filter.${frequencyFilter}`)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
