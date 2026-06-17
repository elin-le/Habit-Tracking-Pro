import { Crown, Flame } from 'lucide-react';
import type { CommunityMember } from './CommunityTypes';
import { getTopStreak } from './CommunityUtil';

interface LeaderboardPodiumProps {
  /** Already sorted, rank 1 first. Renders nothing past the first 3. */
  top3: CommunityMember[];
  onSelect: (member: CommunityMember) => void;
}

// Visual slot order (2nd - 1st - 3rd) mapped to index into `top3`.
const SLOT_TO_RANK_INDEX = [1, 0, 2];
const SLOT_HEIGHT = ['h-24', 'h-32', 'h-20'];

export default function LeaderboardPodium({ top3, onSelect }: LeaderboardPodiumProps) {
  if (top3.length === 0) return null;

  return (
    <div className="flex items-end justify-center gap-3 px-2">
      {SLOT_TO_RANK_INDEX.map((memberIndex, slot) => {
        const member = top3[memberIndex];
        if (!member) return <div key={slot} className="w-20 sm:w-24" />;
        const rank = memberIndex + 1;

        return (
          <button
            key={member.user.phone}
            type="button"
            onClick={() => onSelect(member)}
            className="flex w-20 flex-col items-center gap-2 sm:w-24"
          >
            <div className="relative">
              {rank === 1 && (
                <Crown
                  className="absolute -top-5 left-1/2 h-5 w-5 -translate-x-1/2 text-amber-500"
                  strokeWidth={2.5}
                  fill="currentColor"
                />
              )}
              <img
                src={member.user.avatar}
                alt=""
                className={`rounded-full object-cover ring-2 ${
                  rank === 1 ? 'h-16 w-16 ring-amber-400' : 'h-12 w-12 ring-violet-300 dark:ring-violet-700'
                }`}
              />
            </div>
            <p className="w-full truncate text-center text-xs font-semibold text-violet-950 dark:text-violet-50">
              {member.user.username}
            </p>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              <Flame className="h-3 w-3" />
              {getTopStreak(member)}
            </span>
            <div
              className={`flex w-full items-end justify-center rounded-t-xl pb-1 ${SLOT_HEIGHT[slot]} ${
                rank === 1
                  ? 'bg-gradient-to-t from-amber-400 to-amber-300'
                  : 'bg-gradient-to-t from-violet-300 to-violet-200 dark:from-violet-800 dark:to-violet-700'
              }`}
            >
              <span
                className={`text-lg font-extrabold ${
                  rank === 1 ? 'text-amber-900' : 'text-violet-900 dark:text-violet-100'
                }`}
              >
                {rank}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}