import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

interface CheckinCardProps {
  habit: { id: string; name: string; category?: string; targetPerDay: number };
  completed: number;
  isReadOnly: boolean;
  onUpdateCount: (habitId: string, next: number) => void;
}

const CheckinCard: React.FC<CheckinCardProps> = ({ habit, completed, isReadOnly, onUpdateCount }) => {
  const { t } = useTranslation();
  const target = habit.targetPerDay;

  let statusText = "Not Started";
  let statusKey = "status.not_started";
  
  // 1. NOT STARTED
  let cardBg = "bg-yellow-50/60 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/40"; 
  let badgeColor = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  if (completed >= target) {
    // 2. COMPLETED
    statusText = "Completed";
    statusKey = "status.completed";
    cardBg = "bg-green-50/60 dark:bg-emerald-950/20 border-green-200 dark:border-emerald-900/40";
    badgeColor = "bg-green-100 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400";
  } else if (completed > 0) {
    // 3. IN PROGRESS
    statusKey = "status.in_progress";
    cardBg = "bg-[var(--surface)] border-slate-200 dark:border-slate-700";
    badgeColor = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  }

  return (
    <li className={`flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm transition-colors ${cardBg}`}>
      <div>
        <div className="font-semibold text-[var(--text)]">{habit.name}</div>
      <div className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5 opacity-80">{habit.category || "General"}</div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeColor}`}>
          {t(statusKey, statusText)}
        </span>

        <div className="flex items-center gap-2.5">
          <div className="text-sm font-bold text-[var(--text)] opacity-80 min-w-[40px] text-center">
            {completed}/{target}
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateCount(habit.id, completed - 1)}
              disabled={isReadOnly || completed <= 0}
              className="h-9 w-9 p-0 font-bold border-slate-300 dark:border-slate-600 text-[var(--text)]"
            >
              -
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdateCount(habit.id, completed + 1)}
              disabled={isReadOnly || completed >= target}
              className="h-9 w-9 p-0 font-bold"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CheckinCard;