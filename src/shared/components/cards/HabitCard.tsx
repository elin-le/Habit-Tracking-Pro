import {
  MoreVertical,
  CheckCircle,
  Calendar,
  Plus,
  Minus,
  History,
} from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "../common/DropdownMenu";
import type { Habit } from "../../types/Habit";
import { CATEGORY_ICONS, PRIORITY_COLORS } from "../../constants/appConstants";
import { mockCategories } from "../../../data/category";
import { useTranslation } from "react-i18next";

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
}

export function HabitCard({ habit, onUpdate }: HabitCardProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const priorityColor = PRIORITY_COLORS[habit.priority];
  const category = mockCategories.find((c) => c.id === habit.categoryId);

  return (
    <div
      className="relative flex h-full flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
      }}
    >
      <div
        className="absolute left-0 top-1 bottom-1 w-1 rounded-l-3xl"
        style={{ background: priorityColor }}
      />

      {/* Header */}
      <div className="mb-4 flex items-start gap-3 pl-2">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md"
          style={{
            background: "color-mix(in srgb, var(--primary) 25%, transparent)",
          }}
        >
          <span className="text-xl">{CATEGORY_ICONS[habit.categoryId]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="truncate text-base font-medium"
            style={{ color: "var(--text)" }}
          >
            {habit.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="rounded-full px-2 py-1 text-xs"
              style={{
                background:
                  "color-mix(in srgb, var(--primary) 15%, transparent)",
                color: "var(--primary)",
              }}
            >
              {t(`habit_form.${category?.name}`) ?? habit.categoryId}
            </span>
            <span
              className="rounded-full px-2 py-1 text-xs capitalize"
              style={{
                background: `color-mix(in srgb, ${priorityColor} 12%, transparent)`,
                color: priorityColor,
              }}
            >
              {t(`habit_form.${habit.priority}`)}
            </span>
            <span
              className="flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs"
              style={{
                background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
                color: "var(--sidebar-muted)",
              }}
            >
              <Calendar size={12} />
              {habit.frequencyType === "DAILY"
                ? t("habit_form.DAILY")
                : t("habit_form.DAY_OF_WEEK")}
            </span>
          </div>
        </div>
        <button
          className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full group transition-all hover:bg-violet-500/10"
          style={{ color: "var(--sidebar-muted)" }}
          onClick={() => setMenuOpen(true)}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Checkin */}
      <div
        className="rounded-md"
        style={{
          background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
        }}
      >
        {/* Hàng chính: ring + status + actions */}
        <div className="flex items-center gap-3 p-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] text-sm font-medium"
            style={{ borderColor: "var(--primary)" }}
          >
            3/5
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium"
              style={{ color: "#22c55e" }}
            >
              <CheckCircle size={14} className="shrink-0" /> Completed today
            </div>
          </div>

          <div className="flex shrink-0 gap-1.5">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--sidebar-muted)",
                color: "var(--sidebar-muted)",
              }}
            >
              <Minus size={13} />
            </button>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--primary)",
                background:
                  "color-mix(in srgb, var(--primary) 12%, transparent)",
                color: "var(--primary)",
              }}
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* Footer: View history */}
        <div
          className="border-t px-3 py-1.5"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        >
          <button
            className="flex w-full items-center justify-center gap-1.5 rounded text-xs transition-colors"
            style={{ color: "var(--primary)" }}
            // onClick={() => /* open history modal */}
          >
            <History size={13} />
            View check-in history
          </button>
        </div>
      </div>

      {menuOpen && (
        <DropdownMenu
          onClose={() => setMenuOpen(false)}
          status={habit.status}
          onUpdate={() => {
            onUpdate();
            setMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
