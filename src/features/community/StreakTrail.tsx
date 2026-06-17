import type { DayIntensity } from './CommunityTypes';

interface StreakTrailProps {
  /** Length-7 array, oldest day first. */
  data: DayIntensity[];
  size?: 'sm' | 'md';
  /** Optional day labels rendered under each cell, e.g. ['T2', ..., 'CN']. */
  labels?: string[];
  className?: string;
}

const INTENSITY_STYLE: Record<DayIntensity, string> = {
  0: 'bg-violet-100 dark:bg-violet-900/40',
  1: 'bg-violet-300 dark:bg-violet-700/70',
  2: 'bg-violet-500 dark:bg-violet-500',
  3: 'bg-amber-500 dark:bg-amber-400',
};

/**
 * The recurring visual motif for the Community feature: a 7-day strip where
 * each cell's fill reflects that day's check-in intensity (the same idea as
 * a habit's streak, just compressed into one glance). Used both small on
 * member cards and larger, with day labels, inside the profile sheet.
 */
export default function StreakTrail({ data, size = 'sm', labels, className = '' }: StreakTrailProps) {
  const cell = size === 'sm' ? 'h-2 w-2' : 'h-3.5 w-3.5';
  const activeDays = data.filter((d) => d > 0).length;

  return (
    <div
      role="img"
      aria-label={`${activeDays}/${data.length} ngày hoạt động trong tuần qua`}
      className={`flex items-end gap-1 ${className}`}
    >
      {data.map((value, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={`${cell} rounded-[3px] ${INTENSITY_STYLE[value]} transition-colors`} />
          {labels && (
            <span className="text-[10px] text-violet-400 dark:text-violet-500">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  );
}