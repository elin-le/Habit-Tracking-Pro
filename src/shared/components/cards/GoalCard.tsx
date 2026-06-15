import React, { useState, useRef, useEffect } from "react";
import {
    Target,
    Calendar,
    MoreVertical,
    CheckCircle2,
    Archive,
    Edit3,
    Trash2,
    Flame,
    Clock,
    Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Types

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
}

export interface GoalCardProps {
    goal: {
        id: string;
        goalType: "STREAK" | "TOTAL_COMPLETIONS";
        targetValue: number;
        startedDate: string;
        endDate: string;
        progress: {
            currentProgress: number;
            progressPercent: number;
            status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
        };
        color?: "emerald" | "orange" | "indigo" | "rose";
    };
    habitName: string;
    onSelectDetail: (goal: any) => void;
    onEdit?: () => void;
    onArchive?: () => void;
    onDelete?: () => void;
}

// Color map 

const COLOR_MAP = {
    emerald: {
        ring: "#10b981",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/30",
        badgeText: "text-emerald-600 dark:text-emerald-400",
        progressBar: "bg-emerald-500",
        glow: "hover:shadow-emerald-500/10",
    },
    orange: {
        ring: "#f97316",
        badgeBg: "bg-orange-50 dark:bg-orange-950/30",
        badgeText: "text-orange-600 dark:text-orange-400",
        progressBar: "bg-orange-500",
        glow: "hover:shadow-orange-500/10",
    },
    indigo: {
        ring: "#4f46e5",
        badgeBg: "bg-indigo-50 dark:bg-indigo-950/30",
        badgeText: "text-indigo-600 dark:text-indigo-400",
        progressBar: "bg-indigo-600",
        glow: "hover:shadow-indigo-500/10",
    },
    rose: {
        ring: "#f43f5e",
        badgeBg: "bg-rose-50 dark:bg-rose-950/30",
        badgeText: "text-rose-600 dark:text-rose-400",
        progressBar: "bg-rose-500",
        glow: "hover:shadow-rose-500/10",
    },
} as const;

// Progress Ring 

const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 64,
    strokeWidth = 5,
    color = "#6366f1",
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const cleanProgress = Math.min(Math.max(progress, 0), 100);
    const offset = circumference - (cleanProgress / 100) * circumference;

    return (
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
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            />
        </svg>
    );
};

// Dropdown Menu

interface GoalDropdownProps {
    onEdit?: () => void;
    onArchive?: () => void;
    onDelete?: () => void;
}

const GoalDropdown: React.FC<GoalDropdownProps> = ({ onEdit, onArchive, onDelete }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Goal options"
                aria-expanded={open}
                className="
                    p-1.5 rounded-lg
                    opacity-60 hover:opacity-100
                    hover:bg-slate-100/50
                    transition-all duration-150
                "
            >
                <MoreVertical size={15} />
            </button>

            {open && (
                <>
                    {/* Invisible backdrop for outside-click */}
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div
                        className="
                            absolute right-0 top-8 z-50
                            min-w-[148px] py-1.5
                            bg-[var(--surface)]
                            border border-slate-200 dark:border-slate-700/80
                            rounded-2xl shadow-xl
                            overflow-hidden
                            animate-in fade-in slide-in-from-top-2 duration-150
                        "
                        role="menu"
                    >
                        <DropdownItem icon={<Edit3 size={13} />} onClick={() => { setOpen(false); onEdit?.(); }}>
                            {t("goals.edit_goal")}
                        </DropdownItem>
                        <DropdownItem icon={<Archive size={13} />} onClick={() => { setOpen(false); onArchive?.(); }}>
                            {t("goals.archive_goal")}
                        </DropdownItem>
                        <div className="my-1 mx-3 border-t border-slate-100 dark:border-slate-700/60" />
                        <DropdownItem
                            icon={<Trash2 size={13} />}
                            onClick={() => { setOpen(false); onDelete?.(); }}
                            danger
                        >
                            {t("goals.delete_goal")}
                        </DropdownItem>
                    </div>
                </>
            )}
        </div>
    );
};

const DropdownItem: React.FC<{
    icon: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
    children: React.ReactNode;
}> = ({ icon, onClick, danger, children }) => (
    <button
        role="menuitem"
        onClick={onClick}
        className={`
            flex items-center gap-2.5 w-full px-4 py-2.5
            text-sm font-semibold text-left
            transition-colors duration-100
            ${danger
                ? "text-red-500 hover:bg-red-50/50"
                : "opacity-90 hover:bg-slate-50/10"
            }
        `}
    >
        <span className={danger ? "text-red-400" : "opacity-60"}>
            {icon}
        </span>
        {children}
    </button>
);

// Days remaining helper 

function getDaysLeft(endDate: string): number | null {
    if (!endDate) return null;
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((end.getTime() - today.getTime()) / 86_400_000);
}

// GoalCard 

const GoalCard: React.FC<GoalCardProps> = ({
    goal,
    habitName,
    onSelectDetail,
    onEdit,
    onArchive,
    onDelete,
}) => {
    const { t } = useTranslation();
    const { progress, color = "indigo" } = goal;
    // Thêm fallback an toàn: nếu màu trong LocalStorage cũ chưa bị xoá và không có trong COLOR_MAP thì lấy màu indigo
    const c = COLOR_MAP[color as keyof typeof COLOR_MAP] || COLOR_MAP.indigo;

    const isCompleted = progress.status === "COMPLETED";
    const isNotStarted = progress.status === "NOT_STARTED";
    const isNear = progress.progressPercent >= 80 && !isCompleted;

    const unit = goal.goalType === "STREAK" ? t("goals.days") : t("goals.times");
    const daysLeft = getDaysLeft(goal.endDate);

    // Progress bar width capped at 100%
    const barPercent = Math.min(progress.progressPercent, 100);

    return (
        <article
            onClick={() => onSelectDetail(goal)}
            className={`
                group relative overflow-hidden
                bg-[var(--surface)]
                border border-slate-200/80 dark:border-slate-700/60
                rounded-3xl
                cursor-pointer select-none
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-xl
                ${c.glow}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
            `}
            tabIndex={0}
            role="button"
            aria-label={`Goal: ${habitName}`}
            onKeyDown={(e) => e.key === "Enter" && onSelectDetail(goal)}
        >
            {/* Colored top accent strip */}
            <div
                className={`absolute top-0 left-0 right-0 h-0.5 ${c.progressBar} opacity-70`}
                style={{ width: `${barPercent}%`, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            />

            <div className="flex gap-0 sm:gap-0 h-full">
                {/* Left: Progress ring panel */}
                <div className="
                    w-[88px] shrink-0
                    flex flex-col items-center justify-center gap-1.5
                    border-r border-slate-100 dark:border-slate-700/50
                    py-5
                ">
                    <div className="relative flex items-center justify-center">
                        <ProgressRing
                            progress={progress.progressPercent}
                            color={c.ring}
                            size={72}
                            strokeWidth={6}
                        />
                        <span className="absolute text-[13px] font-black">
                            {progress.progressPercent}%
                        </span>
                    </div>
                    {/* Counts below ring */}
                    <span className="text-xs font-semibold opacity-60">
                        {progress.currentProgress}/{goal.targetValue}
                    </span>
                </div>

                {/* Right: Content */}
                <div className="flex-1 flex flex-col justify-between px-5 py-5 min-w-0">
                    {/* Top row */}
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            {/* Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {/* Goal type badge */}
                                <span className={`
                                    inline-flex items-center gap-1.5
                                    text-[11px] font-bold px-2.5 py-1 rounded-full
                                    ${c.badgeBg} ${c.badgeText}
                                `}>
                                    {goal.goalType === "STREAK"
                                        ? <Flame size={11} />
                                        : <Target size={11} />
                                    }
                                    {goal.goalType === "STREAK"
                                        ? t("goals.streak")
                                        : t("goals.total_completions")
                                    }
                                </span>

                                {/* Status badge */}
                                {isCompleted && (
                                    <span className="
                                        inline-flex items-center gap-1
                                        text-[11px] font-bold px-2.5 py-1 rounded-full
                                        bg-emerald-50 dark:bg-emerald-950/30
                                        text-emerald-600 dark:text-emerald-400
                                    ">
                                        <CheckCircle2 size={11} />
                                        {t("goals.completed")}
                                    </span>
                                )}
                                {isNotStarted && (
                                    <span className="
                                        inline-flex items-center gap-1
                                        text-[11px] font-bold px-2.5 py-1 rounded-full
                                        bg-slate-100/50
                                        opacity-70
                                    ">
                                        <Clock size={11} />
                                        {t("goals.not_started")}
                                    </span>
                                )}
                                {isNear && (
                                    <span className="
                                        inline-flex items-center gap-1
                                        text-[11px] font-bold px-2.5 py-1 rounded-full
                                        bg-violet-50 dark:bg-violet-950/30
                                        text-violet-600 dark:text-violet-400
                                    ">
                                        <Sparkles size={11} />
                                        80%+
                                    </span>
                                )}
                            </div>

                            {/* Menu */}
                            <GoalDropdown onEdit={onEdit} onArchive={onArchive} onDelete={onDelete} />
                        </div>

                        {/* Habit name */}
                        <h3 className="
                            text-base font-bold mt-3
                            line-clamp-1
                        ">
                            {habitName}
                        </h3>

                        {/* Target description */}
                        <p className="text-xs opacity-60 mt-1">
                            {t("goals.target")}: {goal.targetValue} {unit}
                            {" · "}
                            {t("goals.current_progress")}: {progress.currentProgress}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                        <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
                            <div
                                className={`h-full rounded-full ${c.progressBar} transition-all duration-700 ease-out`}
                                style={{ width: `${barPercent}%` }}
                                role="progressbar"
                                aria-valuenow={progress.progressPercent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="
                        flex items-center justify-between
                        mt-4 pt-3
                        border-t border-slate-100/50
                        text-[11px] sm:text-xs opacity-60 font-medium
                    ">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {goal.endDate
                                ? `${t("goals.end_date")}: ${goal.endDate}`
                                : `${t("goals.started_date")}: ${goal.startedDate}`
                            }
                        </span>

                        {/* Days left indicator */}
                        {!isCompleted && daysLeft !== null && (
                            <span className={`flex items-center gap-1.5 font-bold ${daysLeft <= 3
                                ? "text-red-500 dark:text-red-400"
                                : daysLeft <= 7
                                    ? "text-amber-500"
                                    : "opacity-80"
                                }`}>
                                <Clock size={12} />
                                {daysLeft <= 0
                                    ? t("goals.overdue")
                                    : `${daysLeft}d`
                                }
                            </span>
                        )}

                        {isCompleted && (
                            <span className="flex items-center gap-1.5 font-bold text-emerald-500 dark:text-emerald-400">
                                <CheckCircle2 size={12} />
                                {t("goals.done")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default GoalCard;