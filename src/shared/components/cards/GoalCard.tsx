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
import type { GoalWithDerived } from "../../types/Goal";
import { getGoalTheme } from "../../utils/goalTheme";

// Types 

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    isCompleted?: boolean;
}

export interface GoalCardProps {
    goal: GoalWithDerived;
    habitName: string;
    onSelectDetail: (goal: GoalWithDerived) => void;
    onEdit?: () => void;
    onArchive?: () => void;
    onDelete?: () => void;
}

// Progress Ring 

const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 80,
    strokeWidth = 7,
    color,
    isCompleted,
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
            {/* Track */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="color-mix(in srgb, var(--primary) 12%, transparent)"
                strokeWidth={strokeWidth}
            />
            {/* Progress arc */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isCompleted ? "#10b981" : color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
            />
        </svg>
    );
};

// Dropdown

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
                    opacity-50 hover:opacity-100
                    hover:bg-white/10
                    transition-all duration-150
                "
            >
                <MoreVertical size={15} />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div
                        className="
                            absolute right-0 top-8 z-50
                            min-w-[152px] py-1.5
                            border rounded-2xl shadow-2xl
                            overflow-hidden
                            animate-in fade-in slide-in-from-top-2 duration-150
                        "
                        style={{
                            background: "var(--surface)",
                            borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
                        }}
                        role="menu"
                    >
                        <DropdownItem icon={<Edit3 size={13} />} onClick={() => { setOpen(false); onEdit?.(); }}>
                            {t("goals.edit_goal")}
                        </DropdownItem>
                        <DropdownItem icon={<Archive size={13} />} onClick={() => { setOpen(false); onArchive?.(); }}>
                            {t("goals.archive_goal")}
                        </DropdownItem>
                        <div className="my-1 mx-3 border-t" style={{ borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }} />
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
                : "opacity-90 hover:bg-white/5"
            }
        `}
    >
        <span className={danger ? "text-red-400" : "opacity-50"}>{icon}</span>
        {children}
    </button>
);

// Helpers

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
    return d.toLocaleDateString(locale ?? undefined, { month: "short", day: "numeric", year: "numeric" });
}

//  GoalCard 

const GoalCard: React.FC<GoalCardProps> = ({
    goal,
    habitName,
    onSelectDetail,
    onEdit,
    onArchive,
    onDelete,
}) => {
    const { t, i18n } = useTranslation();
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
        daysLeft === null ? "normal"
        : daysLeft <= 0 ? "overdue"
        : daysLeft <= 3 ? "critical"
        : daysLeft <= 7 ? "warning"
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
            `}
            style={{
                background: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--primary) 18%, transparent)",
                color: "var(--text)",
            }}
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
                    <span className={`
                        inline-flex items-center gap-1.5
                        text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide
                        ${isCompleted ? "bg-[#10b981]/15 text-[#10b981]" : `${theme.badgeBg} ${theme.badgeText}`}
                    `}>
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
                        <GoalDropdown onEdit={onEdit} onArchive={onArchive} onDelete={onDelete} />
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
                        <h3 className="text-[15px] font-bold leading-snug line-clamp-2">
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
                    className="flex items-center justify-between pt-3 border-t text-[11px] font-medium"
                    style={{ borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
                >
                    {/* Left: date */}
                    <div className="flex items-center gap-2 opacity-55 min-w-0">
                        <Calendar size={11} className="shrink-0" />
                        <span className="truncate">
                            {goal.endDate
                                ? `${t("goals.end_date")}: ${formatDate(goal.endDate, i18n.language)}`
                                : `${t("goals.started_date")}: ${formatDate(goal.startedDate, i18n.language)}`
                            }
                        </span>
                    </div>

                    {/* Right: days-left chip or done */}
                    {isCompleted ? (
                        <span className="flex items-center gap-1 font-bold text-[#10b981]">
                            <CheckCircle2 size={11} />
                            {t("goals.done")}
                        </span>
                    ) : daysLeft !== null ? (
                        <span className={`
                            inline-flex items-center gap-1 font-bold rounded-full px-2 py-0.5 shrink-0
                            ${daysUrgency === "overdue" ? "bg-red-500/15 text-red-500"
                            : daysUrgency === "critical" ? "bg-red-400/15 text-red-400"
                            : daysUrgency === "warning" ? "bg-amber-400/15 text-amber-400"
                            : "opacity-55"}
                        `}>
                            <Clock size={10} />
                            {daysLeft <= 0
                                ? t("goals.overdue")
                                : `${daysLeft} ${t("goals.days")} ${t("goals.left")}`
                            }
                        </span>
                    ) : null}
                </div>
            </div>
        </article>
    );
};

export default GoalCard;