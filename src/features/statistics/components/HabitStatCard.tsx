import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Flame, Trophy, CheckCircle2, TrendingUp, ChevronDown, ChevronUp, ChevronRight,
  Target, Flag, CalendarClock, AlertTriangle,
} from "lucide-react";
import type { HabitStat, TodayStatus, StatGoalStatus } from "../../../shared/types/Statistics";
import type { Priority } from "../../../shared/types/Habit";

function MetricRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="flex items-center gap-2 opacity-70">
        <span className="text-[var(--primary)]">{icon}</span>
        {label}
      </span>
      <b className="tabular-nums">{value}</b>
    </div>
  );
}

export function HabitStatCard({ stat }: { stat: HabitStat }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);

  const todayStyle: Record<TodayStatus, string> = {
    COMPLETED_TODAY: "text-emerald-700 bg-emerald-100",
    IN_PROGRESS: "text-amber-700 bg-amber-100",
    NOT_STARTED: "text-slate-600 bg-slate-100",
  };
  const todayLabel: Record<TodayStatus, string> = {
    COMPLETED_TODAY: t("statistics.status_completed_today"),
    IN_PROGRESS: t("statistics.status_in_progress"),
    NOT_STARTED: t("statistics.status_not_started"),
  };

  const goalStyle: Record<StatGoalStatus, string> = {
    NOT_STARTED: "text-slate-600 bg-slate-100",
    IN_PROGRESS: "text-indigo-600 bg-indigo-100",
    COMPLETED: "text-emerald-700 bg-emerald-100",
    AT_RISK: "text-rose-700 bg-rose-100",
  };
  const goalLabel: Record<StatGoalStatus, string> = {
    NOT_STARTED: t("statistics.goal_status_not_started"),
    IN_PROGRESS: t("statistics.goal_status_in_progress"),
    COMPLETED: t("statistics.goal_status_completed"),
    AT_RISK: t("statistics.goal_status_at_risk"),
  };

  const priColor: Record<Priority, string> = {
    LOW: "text-slate-600 bg-slate-100",
    MEDIUM: "text-amber-700 bg-amber-100",
    HIGH: "text-rose-700 bg-rose-100",
  };
  const priLabel: Record<Priority, string> = {
    LOW: t("habit_filter.pri-1"),
    MEDIUM: t("habit_filter.pri-2"),
    HIGH: t("habit_filter.pri-3"),
  };

  const locale = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";
  const dayLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const out: string[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) { const d = new Date(today); d.setDate(today.getDate() - i); out.push(fmt.format(d)); }
    return out;
  }, [locale]);

  const recentCheckIns = useMemo(
    () => [...stat.checkIns].filter((c) => c.completionCount > 0).sort((a, b) => b.checkedAt.localeCompare(a.checkedAt)).slice(0, 3),
    [stat.checkIns]
  );
  const fmtDate = useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }), [locale]);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border-2 border-[var(--primary)]/15 bg-[var(--surface)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)]/35 hover:shadow-[0_12px_30px_rgba(124,58,237,0.15)]">
      {/* Header: tên + category + priority + today status */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-base truncate">{stat.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs opacity-50">{stat.category}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${priColor[stat.priority]}`}>
              {priLabel[stat.priority]}
            </span>
          </div>
        </div>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold ${todayStyle[stat.todayStatus]}`}>
          {todayLabel[stat.todayStatus]}
        </span>
      </div>

      {/* Cơ bản */}
      <div className="flex flex-col gap-2">
        <MetricRow icon={<TrendingUp size={15} />} label={t("statistics.today_progress")}
          value={`${stat.todayRate}% · ${stat.todayCount}/${stat.targetPerDay}`} />
        <MetricRow icon={<Flame size={15} />} label={t("statistics.consecutive_days")}
          value={`${stat.consecutiveDays} ${t("statistics.days")}`} />
      </div>

      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-1 rounded-xl border border-[var(--primary)]/20 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/8 cursor-pointer">
        {t("statistics.view_detail")}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {open && (
        <div className="flex flex-col gap-4 border-t border-[var(--primary)]/10 pt-4">
          <div className="flex flex-col gap-2">
            <MetricRow icon={<Trophy size={15} />} label={t("statistics.best_run")} value={`${stat.bestRun} ${t("statistics.days")}`} />
            <MetricRow icon={<CheckCircle2 size={15} />} label={t("statistics.completed_days")} value={`${stat.completedDays}`} />
            <MetricRow icon={<TrendingUp size={15} />} label={t("statistics.seven_day_consistency")} value={`${stat.sevenDayConsistency}/7`} />
          </div>

          {/* Last 7 days chart */}
          <div>
            <p className="text-xs font-semibold opacity-60 mb-2">{t("statistics.last_7_days")}</p>
            <div className="flex items-end gap-1 h-12">
              {stat.last7Days.map((v, i) => (
                <div key={i} className="flex-1 rounded-sm bg-[var(--primary)] transition-[height] duration-500 ease-out"
                  style={{ height: `${Math.max(v, 6)}%`, opacity: v === 0 ? 0.2 : 0.4 + (v / 100) * 0.6 }} title={`${v}%`} />
              ))}
            </div>
            <div className="flex gap-1 mt-1">{dayLabels.map((d, i) => (<span key={i} className="flex-1 text-center text-[10px] opacity-40">{d}</span>))}</div>
          </div>

          {/* Goal statistics — chỉ khi có goal */}
          {stat.goal && (
            <div className="rounded-xl border border-[var(--primary)]/15">
              <button onClick={() => setGoalOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/8 cursor-pointer rounded-xl">
                <span className="flex items-center gap-1.5"><Target size={15} />{t("statistics.view_goal_statistics")}</span>
                {goalOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {goalOpen && (
                <div className="flex flex-col gap-2 border-t border-[var(--primary)]/10 px-3 py-3">
                  <MetricRow icon={<Flag size={15} />} label={t("statistics.goal_type")}
                    value={stat.goal.goalType === "STREAK" ? t("statistics.goal_type_streak") : t("statistics.goal_type_total")} />
                  <MetricRow icon={<TrendingUp size={15} />} label={t("statistics.goal_progress")}
                    value={`${stat.goal.currentValue}/${stat.goal.targetValue} (${stat.goal.progressRate}%)`} />
                  <MetricRow icon={<CheckCircle2 size={15} />} label={t("statistics.remaining_to_goal")}
                    value={`${stat.goal.remainingValue}`} />
                  {stat.goal.hasDeadline && stat.goal.expectedProgressRate !== undefined && (
                    <MetricRow icon={<CalendarClock size={15} />} label={t("statistics.expected_by_today")}
                      value={`${stat.goal.expectedProgressRate}%`} />
                  )}
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 opacity-70">
                      {stat.goal.status === "AT_RISK" && <AlertTriangle size={15} className="text-rose-600" />}
                      {t("statistics.goal_status")}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${goalStyle[stat.goal.status]}`}>
                      {goalLabel[stat.goal.status]}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--primary)]/10">
                    <div className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-500"
                      style={{ width: `${stat.goal.progressRate}%` }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Check-in history */}
          <div>
            <p className="text-xs font-semibold opacity-60 mb-2">{t("statistics.checkin_history")}</p>
            {recentCheckIns.length === 0 ? (
              <p className="text-sm opacity-50">{t("statistics.no_checkin")}</p>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {recentCheckIns.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <span className="opacity-70">{fmtDate.format(new Date(c.checkedAt))}</span>
                    <span className="font-medium">{c.completionCount} {t("statistics.total_checkins")}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link to={`/dashboard/habits/${stat.id}/history`}
              className="mt-3 flex items-center justify-center gap-1 rounded-xl border border-[var(--primary)]/20 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/8">
              {t("statistics.checkin_detail")}<ChevronRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}