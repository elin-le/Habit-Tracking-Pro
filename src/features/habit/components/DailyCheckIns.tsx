import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import type { Habit } from "@/shared/types/Habit";
import type { CheckIn } from "@/shared/types/CheckIn";
import type { Category } from "@/shared/types/Category";
import {
  CATEGORY_ICONS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "@/shared/constants/appConstants"; 


type Props = {
  habits: Habit[];
  checkIns: CheckIn[];
  categories: Category[];
  currentUserId?: string;
};

export default function DailyCheckIns({
  habits,
  checkIns,
  categories,
  currentUserId,
}: Props) {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );

  const dailyCheckInsWithHabit = useMemo(() => {
    const userHabits = habits.filter(
      (habit) => habit.userId === currentUserId,
    );
    const habitIds = userHabits.map((h) => h.id);
    const userCheckIns = checkIns.filter((c) => habitIds.includes(c.habitId));
    const dailyCheckIns = userCheckIns.filter((c) => c.checkedAt === selectedDate);

    return dailyCheckIns
      .map((checkIn) => ({
        checkIn,
        habit: userHabits.find((h) => h.id === checkIn.habitId),
      }))
      .filter((item) => item.habit) as { checkIn: CheckIn; habit: Habit }[];
  }, [habits, checkIns, selectedDate, currentUserId]);

  return (
    <div className="dashboard-card mt-6">
      <div className="dashboard-card.text-secondary flex justify-between items-center mb-4">
        <div>
          <p className="dashboard-card__title font-medium text-lg text-[var(--text)]">
            {t("statistics.checkin_history")}
          </p>
          <p className="text-secondary text-sm text-gray-500">
            {t("checkin.view")}
          </p>
        </div>

        <input
          type="date"
          className="dashboard-card rounded-lg border p-0.5 text-sm outline-none"
          style={{
            background: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
            color: "var(--text)",
          }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {dailyCheckInsWithHabit.length === 0 ? (
        <div className="text-center py-8 text-gray-400 italic">
          {t("checkin.no")}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dailyCheckInsWithHabit.map(({ checkIn, habit }) => {
            const priorityColor = PRIORITY_COLORS[habit.priority];
            const statusColor = STATUS_COLORS[habit.status];
            const category = categories.find((c) => c.id === habit.categoryId);
            
            const targetPerDay = Number(habit.targetPerDay ?? 1) || 1;
            const currentCount = checkIn.completionCount ?? 0;
            
            const isTargetMet = currentCount >= targetPerDay;

            return (
              <div
                key={checkIn.id}
                className="relative flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all"
                style={{
                  background: "var(--surface)",
                  borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
                }}
              >
                <div
                  className="absolute left-0 top-1 bottom-1 w-1 rounded-l-3xl"
                  style={{ background: priorityColor }}
                />

                {/* Header thông tin habit*/}
                <div className="mb-3 flex items-start gap-3 pl-1">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
                    style={{
                      background: "color-mix(in srgb, var(--primary) 20%, transparent)",
                    }}
                  >
                    <span className="text-lg">{CATEGORY_ICONS[habit.categoryId] || CATEGORY_ICONS[habit.categoryId]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-medium text-[var(--text)]">
                      {habit.name}
                    </h3>
                    
                    {/* Badge thông tin phụ */}
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px]"
                        style={{
                          background: "color-mix(in srgb, var(--primary) 15%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {t(`habit_form.${category?.name}`) ?? habit.categoryId}
                      </span>

                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] capitalize"
                        style={{
                          background: `color-mix(in srgb, ${priorityColor} 12%, transparent)`,
                          color: priorityColor,
                        }}
                      >
                        {t(`habit_form.${habit.priority}`)}
                      </span>

                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] capitalize"
                        style={{
                          background: `color-mix(in srgb, ${statusColor} 12%, transparent)`,
                          color: statusColor,
                        }}
                      >
                        {t(`habit_form.${habit.status}`)}
                      </span>

                      <span
                        className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px]"
                        style={{
                          background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
                          color: "var(--sidebar-muted)",
                        }}
                      >
                        <Calendar size={10} />
                        {habit.frequencyType === "DAILY"
                          ? t("habit_form.DAILY")
                          : t("habit_form.DAY_OF_WEEK")}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-lg p-2.5 flex items-center justify-between gap-3 mt-1"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 6%, var(--bg))",
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="shrink-0">
                      {isTargetMet ? (
                        <CheckCircle2 size={16} className="text-green-500 fill-green-50" />
                      ) : (
                        <Circle size={16} className="text-amber-500 fill-amber-50" />
                      )}
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span 
                        className="text-xs font-medium capitalize truncate" 
                        style={{ color: isTargetMet ? "#22c55e" : "#f59e0b" }}
                      >
                        {isTargetMet ? t("checkin.completed") : t("checkin.not_finished")}
                      </span>
                    </div>
                  </div>

                  <div 
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0"
                    style={{
                      background: isTargetMet ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      color: isTargetMet ? "#22c55e" : "#f59e0b"
                    }}
                  >
                    {currentCount} / {targetPerDay}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}