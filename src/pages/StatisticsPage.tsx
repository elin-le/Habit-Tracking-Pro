import { useTranslation } from "react-i18next";
import { Flame, Trophy, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useHabitStats } from "../shared/hooks/useHabitStats";
import type { HabitStat, RiskLevel } from "../shared/types/Statistics";

export default function StatisticsPage() {
  const { t } = useTranslation();
  const { stats } = useHabitStats();

  const total = stats.length;
  const completedToday = stats.filter((s) => s.last7Days[s.last7Days.length - 1] === 100).length;
  const completedTodayPct = total === 0 ? 0 : Math.round((completedToday / total) * 100);
  const activeHabits = stats.length;
  const atRisk = stats.filter((s) => s.riskLevel === "AT_RISK").length;

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)]">
      {/* Tiêu đề trang */}
      {/* <div>
        <h1 className="text-3xl sm:text-4xl font-light">{t("statistics.title")}</h1>
        <p className="mt-1 text-sm opacity-60">{t("statistics.subtitle")}</p>
      </div> */}

      {stats.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* ---- 3 thẻ tổng quan ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OverviewCard label={t("statistics.completed_today")} value={`${completedTodayPct}%`} />
            <OverviewCard label={t("statistics.active_habits")} value={activeHabits} />
            <OverviewCard label={t("statistics.at_risk")} value={atRisk} />
          </div>

          {/* ---- Danh sách thống kê từng habit ---- */}
          <h2 className="text-base font-bold">{t("statistics.per_habit")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {stats.map((s) => (
              <HabitStatCard key={s.id} stat={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

//Thẻ tổng quan (3 ô trên cùng)
function OverviewCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-5 rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)]">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs opacity-60 font-semibold mt-1">{label}</p>
    </div>
  );
}
function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs opacity-60">
        <span className="text-[var(--primary)]">{icon}</span>
        {label}
      </span>
      <b className="text-base">{value}</b>
    </div>
  );
}
function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)] px-6 py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
        <BarChart3 size={32} />
      </div>
      <h3 className="mb-2 text-2xl font-light">{t("statistics.empty")}</h3>
      <p className="mb-6 text-sm opacity-60">{t("statistics.empty_hint")}</p>
      <Link
        to="/dashboard/habits"
        className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {t("statistics.empty_action")}
      </Link>
    </div>
  );
}
//Thẻ thống kê 1 habit
function HabitStatCard({ stat }: { stat: HabitStat }) {
  const { t } = useTranslation();

  const riskColor: Record<RiskLevel, string> = {
    SAFE: "text-emerald-700 bg-emerald-100",
    WARNING: "text-amber-700 bg-amber-100",
    AT_RISK: "text-rose-700 bg-rose-100",
  };
  const riskLabel: Record<RiskLevel, string> = {
    SAFE: t("statistics.risk_safe"),
    WARNING: t("statistics.risk_warning"),
    AT_RISK: t("statistics.risk_at_risk"),
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)]">
      {/* Tên habit + category + nhãn risk */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base">{stat.name}</h3>
          <p className="text-xs opacity-50 mt-0.5">{stat.category}</p>
        </div>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold ${riskColor[stat.riskLevel]}`}>
          {riskLabel[stat.riskLevel]}
        </span>
      </div>
      {/* 4 chỉ số */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric icon={<Flame size={15} />} label={t("statistics.current_streak")}
          value={`${stat.currentStreak} ${t("statistics.days")}`} />
        <Metric icon={<Trophy size={15} />} label={t("statistics.longest_streak")}
          value={`${stat.longestStreak} ${t("statistics.days")}`} />
        <Metric icon={<CheckCircle2 size={15} />} label={t("statistics.total_completions")}
          value={`${stat.totalCompletions}`} />
        <Metric icon={<TrendingUp size={15} />} label={t("statistics.completion_rate")}
          value={`${stat.completionRate}%`} />
      </div>
      {/* Thanh 7 ngày gần nhất*/}
      <div>
        <p className="text-xs font-semibold opacity-60 mb-2">{t("statistics.last_7_days")}</p>
        <div className="flex items-end gap-1 h-10">
          {stat.last7Days.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[var(--primary)]"
              style={{ height: `${Math.max(v, 6)}%`, opacity: v === 0 ? 0.2 : 0.4 + (v / 100) * 0.6 }}
              title={`${v}%`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}