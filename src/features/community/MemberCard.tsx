import { Flame, Eye } from 'lucide-react';
import type { CommunityMember } from './CommunityTypes';
import { CATEGORY_EMOJI } from './CommunityTypes';
import { getTopStreak, getTopHabit } from './CommunityUtil';
import StreakTrail from './StreakTrail';

interface MemberCardProps {
    member: CommunityMember;
    /** 1-3 if this member is on the podium, otherwise undefined. */
    rank?: number;
    onSelect: (member: CommunityMember) => void;
}

export default function MemberCard({ member, rank, onSelect }: MemberCardProps) {
    const topStreak = getTopStreak(member);
    const topHabit = getTopHabit(member);

    return (
        <button
            type="button"
            onClick={() => onSelect(member)}
            className="group relative flex w-full flex-col gap-3 rounded-2xl border border-violet-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-violet-900/40 dark:bg-[#1f1733] dark:shadow-none dark:hover:bg-[#241b3d]"
        >
            {rank && rank <= 3 && (
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white shadow">
                    {rank}
                </span>
            )}

            <div className="flex items-center gap-3">
                <img
                    src={member.user.avatar}
                    alt=""
                    className="h-11 w-11 flex-shrink-0 rounded-full border-2 border-violet-200 object-cover dark:border-violet-800"
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-violet-950 dark:text-violet-50">
                        {member.user.username}
                    </p>
                    <p className="truncate text-xs text-violet-500 dark:text-violet-400">
                        {topHabit ? `${CATEGORY_EMOJI[topHabit.category]} ${topHabit.name}` : 'Chưa có thói quen'}
                    </p>
                </div>
                <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <Flame className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {topStreak}
                </span>
            </div>

            <StreakTrail data={member.stats.last7Days} size="sm" />

            <div className="flex items-center justify-between border-t border-violet-100 pt-2 text-xs text-violet-500 dark:border-violet-900/40 dark:text-violet-400">
                <span>{member.stats.completionRate}% hoàn thành</span>
                <span className="flex items-center gap-1 text-violet-400 opacity-0 transition group-hover:opacity-100 dark:text-violet-500">
                    <Eye className="h-3.5 w-3.5" /> Xem hồ sơ
                </span>
            </div>
        </button>
    );
}