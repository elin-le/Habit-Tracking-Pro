import { useEffect, useState, type ReactNode } from 'react';
import { X, Eye, Flame, Heart, CheckCircle2, AlertTriangle, Trophy } from 'lucide-react';
import type { CommunityMember, GoalStatus } from './CommunityTypes';
import { formatJoinDate, formatDeadline } from './CommunityUtil';
import StreakTrail from './StreakTrail';

interface MemberProfileSheetProps {
    member: CommunityMember | null;
    onClose: () => void;
}

const STATUS_STYLE: Record<GoalStatus, { label: string; className: string; icon: ReactNode }> = {
    on_track: {
        label: 'Đúng tiến độ',
        className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
        icon: <CheckCircle2 className="h-3 w-3" />,
    },
    at_risk: {
        label: 'Có rủi ro',
        className: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
        icon: <AlertTriangle className="h-3 w-3" />,
    },
    completed: {
        label: 'Hoàn thành',
        className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
        icon: <Trophy className="h-3 w-3" />,
    },
};

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

/**
 * The read-only detail view: a bottom sheet on mobile that becomes a
 * centered modal from `sm:` up. There is intentionally no edit, delete, or
 * form control anywhere in this component — only the "cheer" button at the
 * bottom, which is a local, ephemeral UI reaction (not persisted, not wired
 * to any API) and never touches the viewed member's actual data.
 */
export default function MemberProfileSheet({ member, onClose }: MemberProfileSheetProps) {
    const [cheered, setCheered] = useState(false);

    useEffect(() => {
        setCheered(false);
    }, [member?.user.phone]);

    useEffect(() => {
        if (!member) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [member, onClose]);

    if (!member) return null;
    const { user, stats, habits, goals } = member;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <button
                type="button"
                aria-label="Đóng hồ sơ"
                onClick={onClose}
                className="absolute inset-0 bg-violet-950/40 backdrop-blur-sm"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label={`Hồ sơ của ${user.username}`}
                className="relative flex max-h-[88vh] w-full flex-col rounded-t-3xl bg-white shadow-xl sm:max-h-[85vh] sm:max-w-2xl sm:rounded-3xl dark:bg-[#1a1429]"
            >
                <div className="mx-auto mt-3 h-1.5 w-10 flex-shrink-0 rounded-full bg-violet-200 sm:hidden dark:bg-violet-800" />

                <div className="flex flex-shrink-0 items-start justify-between gap-3 px-5 pt-4 sm:pt-5">
                    <div className="flex items-center gap-3">
                        <img
                            src={user.avatar}
                            alt=""
                            className="h-14 w-14 rounded-full border-2 border-violet-200 object-cover dark:border-violet-800"
                        />
                        <div>
                            <p className="text-base font-bold text-violet-950 dark:text-violet-50">{user.username}</p>
                            <p className="text-xs text-violet-500 dark:text-violet-400">
                                Thành viên từ {formatJoinDate(stats.memberSince)}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Đóng"
                        className="rounded-full p-1.5 text-violet-400 transition hover:bg-violet-50 hover:text-violet-600 dark:text-violet-500 dark:hover:bg-violet-900/40"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-shrink-0 px-5 pt-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                        <Eye className="h-3 w-3" /> Chỉ xem · không thể chỉnh sửa
                    </span>
                </div>

                <div className="mt-4 grid flex-shrink-0 grid-cols-2 divide-x divide-y divide-violet-100 border-y border-violet-100 sm:grid-cols-4 sm:divide-y-0 dark:divide-violet-900/40 dark:border-violet-900/40">
                    <Stat label="Streak dài nhất" value={stats.longestStreak} />
                    <Stat label="Tổng check-in" value={stats.totalCheckIns} />
                    <Stat label="Hoàn thành" value={`${stats.completionRate}%`} />
                    <Stat label="Thói quen" value={stats.totalHabits} />
                </div>

                <div className="flex-1 overflow-y-auto px-5 pb-5">
                    <section className="py-4">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-violet-400 dark:text-violet-500">
                            7 ngày qua
                        </h3>
                        <div className="mt-3">
                            <StreakTrail data={stats.last7Days} size="md" labels={DAY_LABELS} />
                        </div>
                    </section>

                    <section className="border-t border-violet-100 py-4 dark:border-violet-900/40">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-violet-400 dark:text-violet-500">
                            Thói quen ({habits.length})
                        </h3>
                        <ul className="mt-3 space-y-3">
                            {habits.map((habit) => (
                                <li key={habit.id} className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-base dark:bg-violet-900/30">
                                        {habit.emoji}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-sm font-medium text-violet-950 dark:text-violet-50">
                                                {habit.name}
                                            </p>
                                            <span className="flex flex-shrink-0 items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                                                <Flame className="h-3.5 w-3.5" />
                                                {habit.currentStreak}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-violet-100 dark:bg-violet-900/40">
                                            <div
                                                className="h-full rounded-full bg-violet-500"
                                                style={{ width: `${habit.completionRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {habits.length === 0 && <EmptyRow text="Chưa có thói quen nào được chia sẻ." />}
                        </ul>
                    </section>

                    <section className="border-t border-violet-100 py-4 dark:border-violet-900/40">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-violet-400 dark:text-violet-500">
                            Mục tiêu ({goals.length})
                        </h3>
                        <ul className="mt-3 space-y-3">
                            {goals.map((goal) => {
                                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                                const status = STATUS_STYLE[goal.status];
                                return (
                                    <li key={goal.id} className="rounded-xl border border-violet-100 p-3 dark:border-violet-900/40">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-medium text-violet-950 dark:text-violet-50">{goal.title}</p>
                                            <span
                                                className={`flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}
                                            >
                                                {status.icon}
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-violet-100 dark:bg-violet-900/40">
                                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="mt-1.5 flex items-center justify-between text-xs text-violet-500 dark:text-violet-400">
                                            <span>
                                                {goal.current}/{goal.target} {goal.unit}
                                            </span>
                                            <span>Hạn: {formatDeadline(goal.deadline)}</span>
                                        </div>
                                    </li>
                                );
                            })}
                            {goals.length === 0 && <EmptyRow text="Chưa có mục tiêu nào được chia sẻ." />}
                        </ul>
                    </section>

                    <div className="flex flex-col items-center gap-3 border-t border-violet-100 pt-5 dark:border-violet-900/40">
                        <button
                            type="button"
                            onClick={() => setCheered(true)}
                            disabled={cheered}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${cheered
                                    ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400'
                                    : 'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400'
                                }`}
                        >
                            <Heart className={`h-4 w-4 ${cheered ? 'fill-current' : ''}`} />
                            {cheered ? 'Đã cổ vũ!' : `Cổ vũ ${user.username}`}
                        </button>
                        <p className="max-w-sm text-center text-[11px] text-violet-400 dark:text-violet-500">
                            Đây là hồ sơ công khai. Bạn không thể chỉnh sửa thói quen, mục tiêu hoặc số liệu của {user.username}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="px-3 py-3 text-center">
            <p className="text-lg font-bold tabular-nums text-violet-950 dark:text-violet-50">{value}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-violet-400 dark:text-violet-500">{label}</p>
        </div>
    );
}

function EmptyRow({ text }: { text: string }) {
    return <li className="text-xs text-violet-400 dark:text-violet-500">{text}</li>;
}