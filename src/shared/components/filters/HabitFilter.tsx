import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { FilterChip } from "../common/FilterChip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { DAYS } from "@/shared/constants/appConstants";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { enUS, vi } from "date-fns/locale";

export function HabitFilter() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "vi" ? vi : enUS;

  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [date, setDate] = useState<Date>();

  const toggleDay = (day: number) => {
    setSelectedDate(undefined);
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

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

        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          3
        </span>

        <button
          className="ml-auto text-xs font-medium transition-colors cursor-pointer"
          style={{
            color: "var(--primary)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
            <FilterChip active>{t("habit_filter.cat-0")}</FilterChip>
            <FilterChip>{t("habit_filter.cat-1")}</FilterChip>
            <FilterChip>{t("habit_filter.cat-2")}</FilterChip>
            <FilterChip>{t("habit_filter.cat-3")}</FilterChip>
            <FilterChip>{t("habit_filter.cat-4")}</FilterChip>
            <FilterChip>{t("habit_filter.cat-5")}</FilterChip>
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
            <FilterChip active>{t("habit_filter.pri-0")}</FilterChip>
            <FilterChip>{t("habit_filter.pri-1")}</FilterChip>
            <FilterChip>{t("habit_filter.pri-2")}</FilterChip>
            <FilterChip>{t("habit_filter.pri-3")}</FilterChip>
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
            <FilterChip active>{t("habit_filter.st-0")}</FilterChip>
            <FilterChip>{t("habit_filter.st-1")}</FilterChip>
            <FilterChip>{t("habit_filter.st-2")}</FilterChip>
            <FilterChip>{t("habit_filter.st-3")}</FilterChip>
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
            {DAYS.map((day) => {
              const isSelected = selectedDays.includes(day.key);
              return <FilterChip>{t(`habit_filter.${day.label}`)}</FilterChip>;
            })}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  // onClick={onClick}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                    "h-auto",
                  )}
                  style={
                    date
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
                    if (!date) {
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.background =
                        "color-mix(in srgb, var(--primary) 8%, transparent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!date) {
                      e.currentTarget.style.color = "var(--sidebar-muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <CalendarIcon size={14} />
                  {date
                    ? format(date, "dd/MM/yyyy")
                    : `${t("habit_filter.pad")}`}
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
                  selected={date}
                  onSelect={setDate}
                  locale={locale}
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedDate && (
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--sidebar-muted)" }}
            >
              {t("habit_filter.filter_by")} {format(selectedDate, "PPP")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
