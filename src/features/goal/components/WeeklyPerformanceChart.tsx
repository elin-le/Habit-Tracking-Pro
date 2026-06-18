import React from "react";
import { useTranslation } from "react-i18next";
import "../Goals.css";

interface WeeklyPerformanceChartProps {
  weeklyHistory: any[];
  maxBar: number;
  barColor: string;
}

export const WeeklyPerformanceChart: React.FC<WeeklyPerformanceChartProps> = ({
  weeklyHistory,
  maxBar,
  barColor,
}) => {
  const { t } = useTranslation();

  if (!weeklyHistory || weeklyHistory.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3
        className="
            text-xs font-bold uppercase tracking-[0.1em]
            opacity-60
        "
      >
        {t("goals.weekly_performance")}
      </h3>
      <div
        className="
            p-6 rounded-3xl border goal-weekly-chart
        "
      >
        <div className="flex items-end justify-between gap-2 h-28">
          {weeklyHistory.map((hist: any, i: number) => {
            const heightPercent =
              maxBar > 0
                ? Math.max((hist.value / maxBar) * 100, hist.value > 0 ? 8 : 4)
                : 4;
            const isDone = hist.value > 0;

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end h-full group"
              >
                <span
                  className="
                      text-[9px] font-bold mb-1
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      text-[var(--text)]/60
                  "
                >
                  {hist.value}%
                </span>

                <div
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isDone
                      ? barColor
                      : "color-mix(in srgb, var(--text) 10%, transparent)",
                    opacity: isDone ? 0.85 : 1,
                    transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  className="w-full rounded-t-md group-hover:opacity-100"
                />
                <span
                  className="
                      text-[11px] font-bold mt-2
                      opacity-60
                  "
                >
                  {hist.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
