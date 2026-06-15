import React, { useState, useEffect, useCallback } from "react";
import {
    X,
    Calendar,
    Flame,
    Target,
    Trophy,
    CheckCircle2,
    AlertTriangle,
    Archive,
    Trash2,
    Clock,
    TrendingUp,
    Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { MilestoneCard } from "../../../shared/components/cards/MilestoneCard.tsx";

// Types 

interface GoalDetailPanelProps {
    goal: any | null;
    habitName: string;
    isOpen: boolean;
    onClose: () => void;
    onArchive?: (goalId: string) => void;
    onDelete?: (goalId: string) => void;
}

// Color config 

// Inline styles for bar chart to avoid Tailwind purge on dynamic classes
const BAR_COLORS: Record<string, string> = {
    emerald: "#10b981",
    orange: "#f97316",
    indigo: "#4f46e5",
};

// Mini progress ring for detail panel 

const DetailRing: React.FC<{ percent: number; color: string }> = ({ percent, color }) => {
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
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
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

// GoalDetailPanel
// TODO: add onEdit

const GoalDetailPanel: React.FC<GoalDetailPanelProps> = ({
    goal,
    habitName,
    isOpen,
    onClose,
    onArchive,
    onDelete,
}) => {
    const { t } = useTranslation();

    // Keep last valid goal in memory so content stays visible during slide-out
    const [cached, setCached] = useState<any | null>(goal);
    // Controls the actual CSS animation
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (goal) {
            setCached(goal);
            // Tiny delay lets the browser paint the off-screen state first,
            // giving the CSS transition something to transition FROM.
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
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const display = goal ?? cached;
    if (!display) return null;

    const { progress, color = "indigo", stats, weeklyHistory } = display;
    const barColor = BAR_COLORS[color] ?? BAR_COLORS.indigo;

    const isCompleted = progress.status === "COMPLETED";
    const isNear = progress.progressPercent >= 80 && !isCompleted;
    const unit = display.goalType === "STREAK" ? t("goals.days") : t("goals.times");
    const maxBar = Math.max(...(weeklyHistory?.map((h: any) => h.value) ?? [1]), 1);

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
                className="
                    fixed right-0 top-0 h-full z-[101]
                    w-full max-w-[420px]
                    flex flex-col
                    bg-[var(--surface)]
                    border-l border-slate-200 dark:border-slate-700/80
                    shadow-2xl overflow-y-auto
                "
                style={{
                    transform: visible ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 420ms cubic-bezier(0.16,1,0.3,1)",
                }}
            >
                {/* Header */}
                <div className="
                    flex items-center justify-between
                    px-6 py-5
                    border-b border-slate-100 dark:border-slate-700/60
                    sticky top-0 z-10
                    bg-[var(--surface)]
                ">
                    <div>
                        <span className="
                            text-[11px] font-bold uppercase tracking-[0.12em]
                            text-slate-400 dark:text-slate-500
                        ">
                            {t("goals.detail_title")}
                        </span>
                        <h2 className="text-xl font-bold mt-1 line-clamp-1">
                            {habitName}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close panel"
                        className="
                            p-2 rounded-full
                            text-slate-400 dark:text-slate-500
                            hover:bg-slate-100 dark:hover:bg-slate-700/60
                            transition-colors duration-150
                        "
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col gap-5 px-6 py-5">

                    {/* Milestone banners */}
                    {isCompleted && (
                        <div className="
                            flex items-start gap-3 px-5 py-4 rounded-2xl
                            bg-emerald-50 dark:bg-emerald-950/20
                            border border-emerald-200/70 dark:border-emerald-800/40
                            text-emerald-700 dark:text-emerald-400
                            text-sm font-semibold
                        ">
                            <Trophy size={18} className="shrink-0 text-emerald-500 mt-0.5" />
                            <span>{t("goals.congrats_completed")}</span>
                        </div>
                    )}
                    {isNear && (
                        <div className="
                            flex items-start gap-3 px-5 py-4 rounded-2xl
                            bg-violet-50 dark:bg-violet-950/20
                            border border-violet-200/70 dark:border-violet-800/40
                            text-violet-700 dark:text-violet-400
                            text-sm font-semibold
                        ">
                            <Sparkles size={18} className="shrink-0 text-violet-500 mt-0.5" />
                            <span>{t("goals.congrats_near")}</span>
                        </div>
                    )}

                    {/* Main progress card */}
                    <div
                        className="
                            flex items-center gap-6 px-6 py-6 rounded-3xl
                            border
                        "
                        style={{
                            background: "color-mix(in srgb, var(--surface) 80%, transparent)",
                            borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)"
                        }}
                    >
                        <DetailRing percent={progress.progressPercent} color={barColor} />
                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {t("goals.current_progress")}
                            </p>
                            <p className="text-4xl font-black mt-1 leading-none">
                                {progress.currentProgress}
                                <span className="text-base font-semibold opacity-60 ml-2">
                                    / {display.targetValue} {unit}
                                </span>
                            </p>
                            {/* Status pill */}
                            <span className={`
                                inline-flex items-center gap-1.5 mt-3
                                text-[11px] font-bold px-3 py-1 rounded-full
                                ${isCompleted
                                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                                    : "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                                }
                            `}>
                                {isCompleted ? <CheckCircle2 size={12} /> : <TrendingUp size={12} />}
                                {progress.status === "COMPLETED"
                                    ? t("goals.completed")
                                    : progress.status === "NOT_STARTED"
                                        ? t("goals.not_started")
                                        : t("goals.in_progress")
                                }
                            </span>
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
                            <h3 className="
                                text-xs font-bold uppercase tracking-[0.1em]
                                text-slate-400 dark:text-slate-500
                            ">
                                {t("goals.weekly_performance")}
                            </h3>
                            <div
                                className="
                                    p-6 rounded-3xl border
                                "
                                style={{
                                    background: "color-mix(in srgb, var(--surface) 50%, transparent)",
                                    borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)"
                                }}
                            >
                                <div className="flex items-end justify-between gap-2 h-28">
                                    {weeklyHistory.map((hist: any, i: number) => {
                                        const heightPercent = maxBar > 0
                                            ? Math.max((hist.value / maxBar) * 100, hist.value > 0 ? 8 : 4)
                                            : 4;
                                        const isDone = hist.value > 0;

                                        return (
                                            <div
                                                key={i}
                                                className="flex-1 flex flex-col items-center justify-end h-full group"
                                            >
                                                {/* Tooltip on hover */}
                                                <span className="
                                                    text-[9px] font-bold mb-1
                                                    opacity-0 group-hover:opacity-100
                                                    transition-opacity duration-200
                                                    text-slate-500 dark:text-slate-400
                                                ">
                                                    {hist.value}%
                                                </span>
                                                {/* Bar - using inline style for dynamic color/height */}
                                                <div
                                                    style={{
                                                        height: `${heightPercent}%`,
                                                        backgroundColor: isDone ? barColor : undefined,
                                                        opacity: isDone ? 0.85 : 1,
                                                        transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)",
                                                    }}
                                                    className={`
                                                        w-full rounded-t-md
                                                        group-hover:opacity-100
                                                        ${!isDone ? "bg-slate-200 dark:bg-slate-700" : ""}
                                                    `}
                                                />
                                                <span className="
                                                    text-[11px] font-bold mt-2
                                                    text-slate-400 dark:text-slate-500
                                                ">
                                                    {hist.day}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Date info */}
                    <div
                        className="
                            flex flex-col gap-3 px-5 py-5 rounded-2xl
                            border
                            text-sm opacity-70
                        "
                        style={{
                            background: "color-mix(in srgb, var(--surface) 50%, transparent)",
                            borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)"
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 font-medium">
                                <Calendar size={14} className="text-slate-400" />
                                {t("goals.started_date")}
                            </span>
                            <span className="font-semibold opacity-90">
                                {display.startedDate}
                            </span>
                        </div>
                        {display.endDate && (
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 font-medium">
                                    <Clock size={14} className="text-slate-400" />
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
                    className="
                        flex gap-3 px-6 py-5
                        border-t
                        sticky bottom-0
                    "
                    style={{
                        background: "var(--surface)",
                        borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)"
                    }}
                >
                    <button
                        onClick={() => onArchive?.(display.id)}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            py-3 px-4 rounded-xl
                            text-sm font-semibold
                            bg-[var(--surface)]
                            border
                            hover:opacity-80
                            transition-colors duration-150
                        "
                        style={{ borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                        <Archive size={15} />
                        {t("goals.action_archive")}
                    </button>
                    <button
                        onClick={() => onDelete?.(display.id)}
                        className="
                            flex items-center justify-center gap-2
                            py-3 px-4 rounded-xl
                            text-sm font-semibold
                            bg-red-50 dark:bg-red-950/20
                            border border-red-200 dark:border-red-800/50
                            hover:bg-red-100 dark:hover:bg-red-900/30
                            text-red-500 dark:text-red-400
                            transition-colors duration-150
                        "
                    >
                        <Trash2 size={15} />
                        {t("goals.action_delete")}
                    </button>
                </div>
            </div>
            <MilestoneCard
                milestones={display.progress.milestones || []}
                habitColor={display.color}
            />
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
            borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)"
        }}
    >
        <div className="flex flex-col gap-2">
            {icon}
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 leading-snug">
                {label}
            </p>
        </div>
        <p className="text-xl sm:text-2xl font-black text-[var(--text)]">
            {value}
        </p>
    </div>
);

export default GoalDetailPanel;