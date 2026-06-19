import React from "react";
import {
  Target,
  Calendar,
  CheckCircle2,
  Flame,
  Clock,
  Sparkles,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProgressRing } from "../common/ProgressRing.tsx";
import { GoalDropdown } from "./GoalDropdown.tsx";
import { getGoalTheme } from "../../utils/goalTheme";
import type { GoalWithDerived } from "../../types/Goal";
import "./GoalCard.css";

export interface GoalCardProps {
  goal?: GoalWithDerived;
  habitName: string;
  habitStatus?: "ACTIVE" | "PAUSED" | "ARCHIVED";
  onSelectDetail?: (goal: GoalWithDerived) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isEmpty?: boolean;
  onAddGoal?: () => void;
}

function getDaysLeft(endDate: string): number | null {
  if (!endDate) return null;
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((end.getTime() - today.getTime()) / 86_400_000);
}

function formatDate(dateStr: string, locale?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale ?? undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  habitName,
  habitStatus,
  onSelectDetail,
  onEdit,
  onDelete,
  isEmpty,
  onAddGoal,
}) => {
  const { t, i18n } = useTranslation();

  if (isEmpty) {
    return (
      <article
        className={`
                    group relative overflow-hidden
                    rounded-3xl border
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-xl
                    goal-card-empty
                `}
      >
        <div className="relative p-5 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner goal-card-icon-bg"
            >
              <Target size={20} strokeWidth={2} />
            </div>
            <h3 className="font-bold text-lg sm:text-xl tracking-tight line-clamp-1 opacity-90">
              {habitName}
            </h3>
          </div>
          {onAddGoal && (
            <button
              onClick={onAddGoal}
              className="
                                shrink-0 flex items-center justify-center gap-1.5
                                px-4 py-2 rounded-xl text-sm font-semibold
                                border transition-colors duration-200
                                goal-card-add-btn
                            "
            >
              <Plus size={14} />
              <span>{t("goals.add_goal")}</span>
            </button>
          )}
        </div>
      </article>
    );
  }

  if (!goal || !onSelectDetail) return null;

  const { progress } = goal;
  const theme = getGoalTheme(goal.targetType);

  const isCompleted = progress.status === "COMPLETED";
  const isNotStarted = progress.status === "NOT_STARTED";
  const isNear = progress.progressPercent >= 80 && !isCompleted;
  const isStreak = goal.targetType === "STREAK";

  const unit = isStreak ? t("goals.days") : t("goals.sessions");
  const daysLeft = getDaysLeft(goal.endDate);
  const barPercent = Math.min(progress.progressPercent, 100);

  // Days-left urgency level
  const daysUrgency =
    daysLeft === null
      ? "normal"
      : daysLeft <= 0
        ? "overdue"
        : daysLeft <= 3
          ? "critical"
          : daysLeft <= 7
            ? "warning"
            : "normal";

  return (
    <article
      onClick={() => onSelectDetail(goal)}
      className={`
                group relative overflow-hidden
                rounded-3xl border
                cursor-pointer select-none
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-2xl
                ${theme.glow}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
                goal-card-container
                ${isCompleted ? "opacity-60 grayscale-[0.5]" : ""}
            `}
      tabIndex={0}
      role="button"
      aria-label={`Goal: ${habitName}`}
      onKeyDown={(e) => e.key === "Enter" && onSelectDetail(goal)}
    >
      {/* ── Animated top progress strip ── */}
      <div
        className={`absolute top-0 left-0 h-[3px] ${isCompleted ? "bg-[#10b981]" : theme.progressBar} opacity-80`}
        style={{
          width: `${barPercent}%`,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Subtle radial glow backdrop ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${isCompleted ? "#10b981" : theme.hex} 6%, transparent), transparent 65%)`,
        }}
      />

      <div className="relative flex flex-col p-5 gap-3">
        {/* ── Row 1: Type badge + Menu ── */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`
                        inline-flex items-center gap-1.5
                        text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide
                        ${isCompleted ? "bg-[#10b981]/15 text-[#10b981]" : `${theme.badgeBg} ${theme.badgeText}`}
                    `}
          >
            {isStreak ? <Flame size={11} /> : <Target size={11} />}
            {isStreak ? t("goals.streak") : t("goals.total_completions")}
          </span>

          <div className="flex items-center gap-1">
            {/* Status pill */}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981]">
                <CheckCircle2 size={10} />
                {t("goals.completed")}
              </span>
            )}
            {isNotStarted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-400/10 opacity-60">
                <Clock size={10} />
                {t("goals.not_started")}
              </span>
            )}
            {isNear && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400">
                <Sparkles size={10} />
                80%+
              </span>
            )}
            {habitStatus && habitStatus !== "ACTIVE" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-500">
                {habitStatus === "PAUSED" ? t("habit_form.PAUSED") : t("habit_form.ARCHIVED")}
              </span>
            )}

            <GoalDropdown onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

        {/* ── Row 2: Ring + Title + Count ── */}
        <div className="flex items-center gap-4">
          {/* Progress ring */}
          <div className="relative shrink-0 flex items-center justify-center">
            <ProgressRing
              progress={progress.progressPercent}
              color={theme.hex}
              size={76}
              strokeWidth={7}
              isCompleted={isCompleted}
            />
            <div className="absolute flex flex-col items-center leading-none">
              <span className="text-[15px] font-black tabular-nums">
                {barPercent}%
              </span>
            </div>
          </div>

          {/* Title + progress count */}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug line-clamp-2 opacity-90">
              {habitName}
            </h3>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span
                className="text-xl font-black tabular-nums"
                style={{ color: isCompleted ? "#10b981" : theme.hex }}
              >
                {progress.currentProgress}
              </span>
              <span className="text-xs opacity-40 font-semibold">
                / {goal.targetValue} {unit}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3 border-t text-[11px] font-medium goal-card-footer"
        >
          {/* Left: date */}
          <div className="flex items-center gap-2 opacity-55 min-w-0">
            <Calendar size={11} className="shrink-0" />
            <span className="truncate">
              {goal.endDate
                ? `${t("goals.end_date")}: ${formatDate(goal.endDate, i18n.language)}`
                : `${t("goals.started_date")}: ${formatDate(goal.startedDate, i18n.language)}`}
            </span>
          </div>

          {/* Right: days-left chip or done */}
          {isCompleted ? (
            <span className="flex items-center gap-1 font-bold text-[#10b981]">
              <CheckCircle2 size={11} />
              {t("goals.done")}
            </span>
          ) : daysLeft !== null ? (
            <span
              className={`
                            inline-flex items-center gap-1 font-bold rounded-full px-2 py-0.5 shrink-0
                            ${
                              daysUrgency === "overdue"
                                ? "bg-red-500/15 text-red-500"
                                : daysUrgency === "critical"
                                  ? "bg-red-400/15 text-red-400"
                                  : daysUrgency === "warning"
                                    ? "bg-amber-400/15 text-amber-400"
                                    : "opacity-55"
                            }
                        `}
            >
              <Clock size={10} />
              {daysLeft <= 0
                ? t("goals.overdue")
                : `${daysLeft} ${t("goals.days")} ${t("goals.left")}`}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default GoalCard;
