import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Flame,
  Trophy,
  CheckCircle2,
  Archive,
  Trash2,
  Clock,
  TrendingUp,
  Sparkles,
  Award,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GoalWithDerived, Milestone } from "../../../shared/types/Goal.ts";
import { getGoalTheme } from "../../../shared/utils/goalTheme.ts";

interface GoalDetailPanelProps {
  goal: GoalWithDerived | null;
  habitName: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (goal: GoalWithDerived) => void;
  onArchive?: (goalId: string) => void;
  onDelete?: (goalId: string) => void;
}

const DetailRing: React.FC<{ percent: number; color: string }> = ({
  percent,
  color,
}) => {
  const size = 72;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.min(percent, 100) / 100) * circ;

  return (
    <div className="relative w-[72px] h-[72px] shrink-0">
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="color-mix(in srgb, var(--primary) 15%, transparent)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-black"
        style={{ color }}
      >
        {percent}%
      </span>
    </div>
  );
};

// RewardBanner

type RewardLevel = "completed" | "near" | "milestone" | null;

interface RewardBannerProps {
  level: RewardLevel;
  milestones?: Milestone[];
  themeHex: string;
  themeName: string;
}

const RewardBanner: React.FC<RewardBannerProps> = ({ level, milestones = [], themeHex }) => {
  const { t } = useTranslation();
  if (!level) return null;

  const highestReached = [...milestones].reverse().find((m) => m.isReached);

  const config = {
    completed: {
      color:    "#10b981",
      darkColor:"#059669",
      icon:     <Trophy size={28} strokeWidth={1.5} />,
      eyebrow:  t("goals.completed").toUpperCase(),
      headline: t("goals.congrats_completed"),
    },
    near: {
      color:    "#8b5cf6",
      darkColor:"#7c3aed",
      icon:     <Sparkles size={28} strokeWidth={1.5} />,
      eyebrow:  "80%+",
      headline: t("goals.congrats_near"),
    },
    milestone: {
      color:    themeHex,
      darkColor:themeHex,
      icon:     <Award size={28} strokeWidth={1.5} />,
      eyebrow:  "",
      headline: highestReached ? t(highestReached.labelKey) : "",
    },
  }[level];

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `color-mix(in srgb, ${config.color} 6%, var(--surface))`,
        border: `1px solid color-mix(in srgb, ${config.color} 22%, transparent)`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${config.color} 18%, transparent) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${config.color}, ${config.darkColor})` }}
      />

      <div className="relative flex items-stretch gap-0 min-h-[72px]">
        <div
          className="shrink-0 flex items-center justify-center w-20"
          style={{
            borderRight: `1px solid color-mix(in srgb, ${config.color} 15%, transparent)`,
          }}
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl"
            style={{
              background: `color-mix(in srgb, ${config.color} 12%, var(--surface))`,
              color: config.color,
              boxShadow: `0 0 0 1px color-mix(in srgb, ${config.color} 25%, transparent)`,
            }}
          >
            {config.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3.5 flex flex-col justify-center">
          {config.eyebrow && (
            <p
              className="text-[10px] font-black tracking-[0.14em] mb-1"
              style={{ color: config.color }}
            >
              {config.eyebrow}
            </p>
          )}
          <p
            className="text-[13px] font-semibold leading-snug"
            style={{ color: "var(--text)", opacity: 0.8 }}
          >
            {config.headline}
          </p>
        </div>
      </div>
    </div>
  );
};


const GoalDetailPanel: React.FC<GoalDetailPanelProps> = ({
  goal,
  habitName,
  isOpen,
  onClose,
  onEdit,
  onArchive,
  onDelete,
}) => {
  const { t } = useTranslation();

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
  const highestMilestone = [...(display.progress.milestones ?? [])].reverse().find((m) => m.isReached);
  const rewardLevel: "completed" | "near" | "milestone" | null =
    isCompleted ? "completed"
    : isNear ? "near"
    : highestMilestone ? "milestone"
    : null;
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
        className="fixed inset-0 z-[100]"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 350ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Goal detail: ${habitName}`}
        className={`
          fixed z-[101] flex flex-col bg-[var(--surface)] shadow-2xl overflow-y-auto scrollbar-hide
          
          /* Mobile: Bottom Sheet */
          left-0 right-0 bottom-0 h-[92svh] rounded-t-[2rem] border-t
          ${visible ? "translate-y-0 translate-x-0" : "translate-y-full translate-x-0"}
          
          /* Desktop: Side Drawer */
          sm:left-auto sm:right-0 sm:top-0 sm:bottom-auto sm:h-full sm:w-[420px] sm:rounded-none sm:border-t-0 sm:border-l
          ${visible ? "sm:translate-y-0 sm:translate-x-0" : "sm:translate-y-0 sm:translate-x-full"}
        `}
        style={{
          transition: "transform 420ms cubic-bezier(0.16,1,0.3,1)",
          borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
          color: "var(--text)"
        }}
      >
        {/* Header */}
        <div
          className="
                    flex items-center justify-between
                    px-4 sm:px-6 py-4 sm:py-5
                    border-b
                    sticky top-0 z-10
                    bg-[var(--surface)]
                "
          style={{ borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
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
            <h2 className="text-xl font-bold mt-1 line-clamp-1">{habitName}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="
                            p-2 rounded-full
                            opacity-60 hover:opacity-100
                            transition-colors duration-150
                        "
            style={{
               background: "transparent",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 10%, transparent)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
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
                        "
            style={{
              background: "color-mix(in srgb, var(--surface) 80%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--primary) 10%, transparent)",
            }}
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
          {weeklyHistory && weeklyHistory.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3
                className="
                                text-xs font-bold uppercase tracking-[0.1em]
                                opacity-60
                            "
              >
                {t("goals.weekly_performance")}
              </h3>
              <div
                className="
                                    p-6 rounded-3xl border
                                "
                style={{
                  background:
                    "color-mix(in srgb, var(--surface) 50%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--primary) 10%, transparent)",
                }}
              >
                <div className="flex items-end justify-between gap-2 h-28">
                  {weeklyHistory.map((hist: any, i: number) => {
                    const heightPercent =
                      maxBar > 0
                        ? Math.max(
                            (hist.value / maxBar) * 100,
                            hist.value > 0 ? 8 : 4,
                          )
                        : 4;
                    const isDone = hist.value > 0;

                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center justify-end h-full group"
                      >

                        <span
                          className="
                                                    text-[9px] font-bold mb-1
                                                    opacity-0 group-hover:opacity-100
                                                    transition-opacity duration-200
                                                "
                          style={{ color: "color-mix(in srgb, var(--text) 60%, transparent)" }}
                        >
                          {hist.value}%
                        </span>

                        <div
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: isDone ? barColor : "color-mix(in srgb, var(--text) 10%, transparent)",
                            opacity: isDone ? 0.85 : 1,
                            transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)",
                          }}
                          className="w-full rounded-t-md group-hover:opacity-100"
                        />
                        <span
                          className="
                                                    text-[11px] font-bold mt-2
                                                    opacity-60
                                                "
                        >
                          {hist.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div
            className="
                            flex flex-col gap-3 px-5 py-5 rounded-2xl
                            border
                            text-sm opacity-70
                        "
            style={{
              background: "color-mix(in srgb, var(--surface) 50%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--primary) 10%, transparent)",
            }}
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
          className="flex gap-2.5 sm:gap-3 px-4 sm:px-6 pt-4 sm:pt-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-[calc(env(safe-area-inset-bottom)+1.25rem)] border-t sticky bottom-0 z-10"
          style={{
            background: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
          }}
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
              onClick={() => onArchive?.(display.id)}
              title={t("goals.action_archive")}
              aria-label={t("goals.action_archive")}
              className="flex items-center justify-center w-[52px] rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow"
              style={{
                background: "color-mix(in srgb, var(--primary) 4%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
                color: "var(--text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 10%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 4%, transparent)";
              }}
            >
              <Archive size={18} className="opacity-70" />
            </button>
            <button
              onClick={() => onDelete?.(display.id)}
              title={t("goals.action_delete")}
              aria-label={t("goals.action_delete")}
              className="flex items-center justify-center w-[52px] rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow"
              style={{
                background: "color-mix(in srgb, #ef4444 4%, transparent)",
                borderColor: "color-mix(in srgb, #ef4444 15%, transparent)",
                color: "#ef4444",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "color-mix(in srgb, #ef4444 10%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "color-mix(in srgb, #ef4444 4%, transparent)";
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Stat card

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div
    className="
            flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl
            border
        "
    style={{
      background: "color-mix(in srgb, var(--surface) 50%, transparent)",
      borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
    }}
  >
    <div className="flex flex-col gap-2">
      {icon}
      <p className="text-[11px] font-bold uppercase tracking-wide opacity-60 leading-snug">
        {label}
      </p>
    </div>
    <p className="text-xl sm:text-2xl font-black text-[var(--text)]">{value}</p>
  </div>
);

export default GoalDetailPanel;
