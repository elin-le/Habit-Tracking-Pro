import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import checkinService, { type CheckInRecord } from "./checkinService";
import { habits as defaultHabits } from "../../data/habit";
import CheckinCard from "../../shared/components/checkin/CheckinCard";

interface DailyCheckInProps {
  today: string;
}


const DailyCheckIn: React.FC<DailyCheckInProps> = ({ today }) => {
  const { t } = useTranslation();
  const [todayRecords, setTodayRecords] = useState<CheckInRecord[]>(() => checkinService.getForDate(today));

  const todayHabits = useMemo(() => {
    return defaultHabits
      .filter((h: any) => h.status === "Active")
      .map((h: any) => ({
        id: h.id,
        name: h.name,
        category: h.category || "General",
        targetPerDay: h.targetPerDay,
      }));
  }, []);

  const getTodayCompleted = (habitId: string) => {
    return todayRecords.find((x) => x.habitId === habitId)?.completionCount || 0;
  };

  const updateTodayCount = (habitId: string, next: number) => {
    const target = todayHabits.find((h) => h.id === habitId)?.targetPerDay??1; // fallback = 1 
    const bounded = Math.max(0, Math.min(next, target));

    let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
    if (bounded >= target) status = 'Completed';
    else if (bounded > 0) status = 'In Progress';
    
    const existing = checkinService.getForDateAndHabit(today, habitId);
    const record: CheckInRecord = existing 
      ? { ...existing, completionCount: bounded, completionStatus: status }
      : { id: `ci-${Date.now()}-${habitId}`, habitId, checkedAt: today, completionCount: bounded, completionStatus: status };
    checkinService.upsert(record);
    setTodayRecords(checkinService.getForDate(today));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">{t("checkin.today_habits")}</h2>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
          {today}
        </span>
      </div>

      {todayHabits.length === 0 && (
        <div className="p-6 text-center text-[var(--text)] opacity-60 font-medium">{t("habit.no_habits")}</div>
      )}

      <ul className="space-y-3">
        {todayHabits.map((h) => (
          <CheckinCard
            key={h.id}
            habit={h}
            completed={getTodayCompleted(h.id)}
            isReadOnly={false} 
            onUpdateCount={updateTodayCount}
          />
        ))}
      </ul>
    </div>
  );
};

export default DailyCheckIn;