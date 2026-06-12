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

  // 1. Not Started
  let statusText = "Not Started";
  let statusKey = "status.not_started";
  
  let cardBgClasses = "bg-[var(--checkin-notstarted-bg)] border-[var(--checkin-notstarted-border)]";
  let badgeClasses = "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]";

  if (completed >= target) {
    // 2. Completed
    statusText = "Completed";
    statusKey = "status.completed";
    
    cardBgClasses = "bg-[var(--checkin-completed-bg)] border-[var(--checkin-completed-border)]";
    badgeClasses = "bg-[var(--badge-completed-bg)] text-[var(--badge-completed-text)]";
  } else if (completed > 0) {
    // 3. In Progress
    statusText = "In Progress"; 
    statusKey = "status.in_progress";
    
    cardBgClasses = "bg-[var(--checkin-progress-bg)] border-[var(--checkin-progress-border)]";
    badgeClasses = "bg-[var(--badge-progress-bg)] text-[var(--badge-progress-text)]";
  }

  return (
    <li
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm transition-colors duration-200 ${cardBgClasses}`}
    >      
      <div>
        <div className="font-semibold text-[var(--text)]">{habit.name}</div>
        <div className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5 opacity-80">
          {habit.category || "General"}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors duration-200 ${badgeClasses}`}>
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