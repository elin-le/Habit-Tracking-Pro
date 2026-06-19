import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalDetailPanel.css";
import {
  X,
  Calendar,
  Flame,
  CheckCircle2,
  Trash2,
  Clock,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GoalWithDerived } from "../../../shared/types/Goal.ts";
import { getGoalTheme } from "../../../shared/utils/goalTheme.ts";
import { StatCard } from "./StatCard.tsx";
import { DetailRing } from "./DetailRing.tsx";
import { RewardBanner } from "./RewardBanner.tsx";
import { WeeklyPerformanceChart } from "./WeeklyPerformanceChart.tsx";

interface GoalDetailPanelProps {
  goal: GoalWithDerived | null;
  habitName: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (goal: GoalWithDerived) => void;
  onDelete?: (goalId: string) => void;
}

const GoalDetailPanel: React.FC<GoalDetailPanelProps> = ({
  goal,
  habitName,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Keep last valid goal in memory so content stays visible during slide-out
  const [cached, setCached] = useState<any | null>(goal);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (goal) {
      setCached(goal);
      const id = setTimeout(() => setVisible(true), 16);
      return () => clearTimeout(id);
    } else {
      setVisible(false);
    }
  }, [goal]);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const display = goal ?? cached;
  if (!display) return null;

  const { progress, stats, weeklyHistory } = display;
  const theme = getGoalTheme(display.targetType);
  const barColor = theme.hex;
  const isCompleted = progress.status === "COMPLETED";
  const isNear = progress.progressPercent >= 80 && !isCompleted;
  const highestMilestone = [...(display.progress.milestones ?? [])]
    .reverse()
    .find((m) => m.isReached);
  const rewardLevel: "completed" | "near" | "milestone" | "motivation" | null =
    isCompleted
      ? "completed"
      : isNear
        ? "near"
        : highestMilestone
          ? "milestone"
          : "motivation";
  const unit =
    display.targetType === "STREAK" ? t("goals.days") : t("goals.sessions");
  const maxBar = Math.max(
    ...(weeklyHistory?.map((h: any) => h.value) ?? [1]),
    1,
  );

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[100] goal-detail-backdrop"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Goal detail: ${habitName}`}
        className={`
          fixed z-[101] flex flex-col bg-[var(--surface)] shadow-2xl overflow-y-auto scrollbar-hide goal-detail-drawer
          
          /* Mobile: Bottom Sheet */
          left-0 right-0 bottom-0 h-[92svh] rounded-t-[2rem] border-t
          ${visible ? "translate-y-0 translate-x-0" : "translate-y-full translate-x-0"}
          
          /* Desktop: Side Drawer */
          sm:left-auto sm:right-0 sm:top-0 sm:bottom-auto sm:h-full sm:w-[420px] sm:rounded-none sm:border-t-0 sm:border-l
          ${visible ? "sm:translate-y-0 sm:translate-x-0" : "sm:translate-y-0 sm:translate-x-full"}
        `}
      >
        {/* Header */}
        <div
          className="
                    flex items-center justify-between
                    px-4 sm:px-6 py-4 sm:py-5
                    border-b
                    sticky top-0 z-10
                    bg-[var(--surface)]
                    goal-detail-header
                "
        >
          <div>
            <span
              className="
                            text-[11px] font-bold uppercase tracking-[0.12em]
                            opacity-60
                        "
            >
              {t("goals.detail_title")}
            </span>
            <h2
              className="text-xl font-bold mt-1 line-clamp-1"
            >
              <span
                className="goal-detail-habit-badge"
                style={{ "--badge-color": barColor } as React.CSSProperties}
                onClick={() => {
                  onClose();
                  navigate(`/dashboard/habits/${display.habitId}/history`);
                }}>
                {habitName}
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="
                            p-2 rounded-full
                            opacity-60 hover:opacity-100
                            goal-detail-close-btn
                        "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5">
          {/* Reward banner */}
          <RewardBanner
            level={rewardLevel}
            milestones={display.progress.milestones ?? []}
            themeHex={barColor}
            themeName={theme.name}
          />

          {/* Main progress card */}
          <div
            className="
                            flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 px-5 sm:px-6 py-6 rounded-3xl
                            border text-center sm:text-left
                            goal-detail-card
                        "
          >
            <DetailRing percent={progress.progressPercent} color={barColor} />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                {t("goals.current_progress")}
              </p>
              <p className="text-4xl font-black mt-1 leading-none">
                {progress.currentProgress}
                <span className="text-base font-semibold opacity-60 ml-2">
                  / {display.targetValue} {unit}
                </span>
              </p>
              {/* Status pill */}
              <div className="flex justify-center sm:justify-start">
                <span
                  className={`
                                  inline-flex items-center gap-1.5 mt-3
                                  text-[11px] font-bold px-3 py-1 rounded-full
                                  ${
                                    isCompleted
                                      ? "bg-[#10b981]/15 text-[#10b981]"
                                      : "bg-indigo-500/15 text-indigo-500"
                                  }
                              `}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <TrendingUp size={12} />
                  )}
                  {progress.status === "COMPLETED"
                    ? t("goals.completed")
                    : progress.status === "NOT_STARTED"
                      ? t("goals.not_started")
                      : t("goals.in_progress")}
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Flame size={16} className="text-orange-500" />}
              label={t("goals.best_streak")}
              value={`${stats?.bestStreak ?? 0} ${t("goals.days")}`}
            />
            <StatCard
              icon={<CheckCircle2 size={16} className="text-emerald-500" />}
              label={t("goals.completion_rate")}
              value={`${stats?.completionRate ?? 0}%`}
            />
          </div>

          {/* Weekly bar chart */}
          <WeeklyPerformanceChart
            weeklyHistory={weeklyHistory}
            maxBar={maxBar}
            barColor={barColor}
          />

          <div
            className="
                            flex flex-col gap-3 px-5 py-5 rounded-2xl
                            border
                            text-sm opacity-70 goal-detail-info
                        "
          >
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 font-medium">
                <Calendar size={14} className="opacity-60" />
                {t("goals.started_date")}
              </span>
              <span className="font-semibold opacity-90">
                {display.startedDate}
              </span>
            </div>
            {display.endDate && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 font-medium">
                  <Clock size={14} className="opacity-60" />
                  {t("goals.end_date")}
                </span>
                <span className="font-semibold opacity-90">
                  {display.endDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div
          className="flex gap-2.5 sm:gap-3 px-4 sm:px-6 pt-4 sm:pt-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-[calc(env(safe-area-inset-bottom)+1.25rem)] border-t sticky bottom-0 z-10 goal-detail-footer"
        >
          <button
            onClick={() => onEdit?.(display)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow"
            style={{ backgroundColor: barColor }}
          >
            <Sparkles size={16} />
            {t("goals.edit_goal")}
          </button>

          <div className="flex gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => onDelete?.(display.id)}
              title={t("goals.action_delete")}
              aria-label={t("goals.action_delete")}
              className="flex items-center justify-center w-[52px] rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow goal-detail-delete-btn"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDetailPanel;
