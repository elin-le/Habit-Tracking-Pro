import {
  MoreVertical,
  CheckCircle,
  CircleDashed,
  Clock4,
  Calendar,
  Plus,
  Minus,
  History,
  Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu } from "../common/DropdownMenu";
import type { Habit, HabitStatus } from "../../types/Habit";
import {
  CATEGORY_ICONS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../../constants/appConstants";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useCheckIns } from "../../hooks/useCheckIns";
import type { Category } from "@/shared/types/Category";
import { cn } from "@/shared/lib/utils";

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
  onUpdateStatus: (status: HabitStatus) => void;
  onDelete: () => void;
  categories: Category[];
  isViewingToday: boolean;
}

export function HabitCard({
  habit,
  onUpdate,
  onUpdateStatus,
  onDelete,
  categories,
  isViewingToday,
}: HabitCardProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const priorityColor = PRIORITY_COLORS[habit.priority];
  const statusColor = STATUS_COLORS[habit.status];
  const category = categories.find((c) => c.id === habit.categoryId);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const { getCheckIn, upsertCheckIn } = useCheckIns();
  const checkIn = getCheckIn(habit.id, today);
  const currentCount = checkIn?.completionCount ?? 0;
  const targetPerDay = Number(habit.targetPerDay ?? 1) || 1;
  const isCompleted = currentCount >= targetPerDay;

  const minusDisabled =
    habit.status !== "ACTIVE" || currentCount <= 0 || !isViewingToday;
  const plusDisabled =
    habit.status !== "ACTIVE" || isCompleted || !isViewingToday;

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
              className="rounded-full px-2 py-1 text-xs capitalize"
              style={{
                background: `color-mix(in srgb, ${statusColor} 12%, transparent)`,
                color: statusColor,
              }}
            >
              {t(`habit_form.${habit.status}`)}
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
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(true);
          }}
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
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] font-medium",
              `${currentCount}/${targetPerDay}`.length > 4
                ? "text-[10px]"
                : "text-sm",
            )}
            style={{ borderColor: "var(--primary)" }}
          >
            {currentCount}/{targetPerDay}
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium"
              style={{
                color: isCompleted
                  ? "#22c55e"
                  : currentCount === 0
                    ? "#94a3b8"
                    : "#f59e0b",
              }}
            >
              {" "}
              {isCompleted ? (
                <CheckCircle size={14} className="shrink-0" />
              ) : currentCount === 0 ? (
                <CircleDashed size={14} className="shrink-0" />
              ) : (
                <Clock4 size={14} className="shrink-0" />
              )}
              <span className="truncate">
                {isCompleted
                  ? t("habit_card.status-1")
                  : currentCount === 0
                    ? t("habit_card.status-2")
                    : t("habit_card.status-3")}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 enabled:hover:scale-105 enabled:hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
              disabled={minusDisabled}
              style={{
                borderColor: minusDisabled
                  ? "var(--primary-light)"
                  : "var(--primary)",

                background: minusDisabled
                  ? "color-mix(in srgb, var(--primary-light) 10%, transparent)"
                  : "color-mix(in srgb, var(--primary) 15%, transparent)",

                color: minusDisabled
                  ? "var(--primary-light)"
                  : "var(--primary)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                const next = Math.max(0, currentCount - 1);
                upsertCheckIn(habit.id, today, next);
                toast.error(`-1 ${habit.name}`, {description: `${next}/${targetPerDay} completed today`,});
                //onUpdate();
              }}
            >
              <Minus size={13} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 enabled:hover:scale-105 enabled:hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
              disabled={plusDisabled}
              style={{
                borderColor: plusDisabled
                  ? "var(--primary-light)"
                  : "var(--primary)",

                background: plusDisabled
                  ? "color-mix(in srgb, var(--primary-light) 10%, transparent)"
                  : "color-mix(in srgb, var(--primary) 15%, transparent)",

                color: plusDisabled ? "var(--primary-light)" : "var(--primary)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                const next = Math.min(
                  currentCount + 1,
                  Number(targetPerDay) || 1,
                );
                upsertCheckIn(habit.id, today, next);
                toast.success(`+1 ${habit.name}`, {description: `${next}/${targetPerDay} completed today`,});
                // onUpdate();
              }}
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* <div
            style={{
              background: "var(--bg-deep)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 12px",
              fontSize: 12,
              color: "var(--text-muted)",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {t("habit_card.mess")}{" "}
            {t(`habit_card.${habit.status.toLowerCase()}`)}
            {" !"}
          </div> */}

        {/* Footer: View history */}
        <div
          className="border-t px-3 py-1.5"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        >
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1.5 rounded text-xs transition-colors cursor-pointer"
            style={{ color: "var(--primary)" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/habits/${habit.id}/history`);
            }}
          >
            <History size={13} />
            {t("habit_card.btn_view")}
          </button>
        </div>
      </div>

      {menuOpen && (
        <DropdownMenu
          habitName={habit.name}
          key={`menu-${habit.id}-${menuOpen}`}
          onClose={() => setMenuOpen(false)}
          status={habit.status}
          onUpdate={() => {
            setMenuOpen(false);
            onUpdate();
          }}
          onUpdateStatus={(status) => {
            onUpdateStatus(status);
            setMenuOpen(false);
          }}
          onDelete={() => {
            setMenuOpen(false);
            setDeleteDialogOpen(true);
          }}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="max-w-sm rounded-3xl border shadow-2xl"
          style={{
            background: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
            boxShadow:
              "0 20px 60px color-mix(in srgb, var(--primary) 15%, transparent)",
          }}
        >
          <AlertDialogHeader className="items-center text-center">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "color-mix(in srgb, #ef4444 12%, transparent)",
              }}
            >
              <Trash2 size={28} className="text-red-500" />
            </div>

            <AlertDialogTitle
              className="text-2xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {t("habit_a-dialog.title")}
            </AlertDialogTitle>

            <AlertDialogDescription
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--sidebar-muted)" }}
            >
              {t("habit_a-dialog.content-1")}
              <span
                className="mx-1 font-semibold"
                style={{ color: "var(--text)" }}
              >
                {habit.name}
              </span>
              ?<br />
              {t("habit_a-dialog.content-2")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 gap-2">
            <AlertDialogCancel
              className="cursor-pointer rounded-xl transition-all duration-200"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--primary) 20%, transparent)",
                background:
                  "color-mix(in srgb, var(--primary) 4%, transparent)",
                color: "var(--text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--primary) 10%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--primary) 4%, transparent)";
              }}
            >
              {t("habit_a-dialog.btn_1")}
            </AlertDialogCancel>

            <AlertDialogAction
              className="cursor-pointer rounded-xl border-0 text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow: "0 8px 24px rgba(239,68,68,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onClick={() => {
                onDelete();
                toast.error(`"${habit.name}" has been deleted`);
              }}
            >
              {t("habit_a-dialog.btn_2")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
