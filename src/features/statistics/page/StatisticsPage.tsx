import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Flame,
  Trophy,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useHabitStats } from "../../../shared/hooks/useHabitStats";
import { useCategories } from "../../../shared/hooks/useCategory";
import type { HabitStat, RiskLevel } from "../../../shared/types/Statistics";
import type { Priority } from "../../../shared/types/Habit";
import { StatisticsFilter } from "../component/StatisticsFilter";

export default function StatisticsPage() {
  const { t } = useTranslation();
  const { stats } = useHabitStats();
  const { categories } = useCategories();

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);

  // chỉ số tổng quan luôn tính trên TẤT CẢ habit (không theo bộ lọc)
  const total = stats.length;
  const completedToday = stats.filter(
    (s) => s.last7Days[s.last7Days.length - 1] === 100
  ).length;
  const completedTodayPct = total === 0 ? 0 : Math.round((completedToday / total) * 100);
  const activeHabits = stats.length;
  const atRisk = stats.filter((s) => s.riskLevel === "AT_RISK").length;

  // lọc danh sách habit
  const visibleStats = useMemo(() => {
    return stats.filter((s) => {
      const catOk = !filterCategory || s.categoryId === filterCategory;
      const priOk = !filterPriority || s.priority === filterPriority;
      return catOk && priOk;
    });
  }, [stats, filterCategory, filterPriority]);

  const handleClearAll = () => {
    setFilterCategory(null);
    setFilterPriority(null);
  };

  if (stats.length === 0) {
    return (
      <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)]">
        <PageHeading />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)]">
      <PageHeading />

      {/* ---- Tổng quan ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <OverviewCard
          icon={<TrendingUp size={20} />}
          accent="text-emerald-600 bg-emerald-50"
          label={t("statistics.completed_today")}
          value={completedTodayPct}
          suffix="%"
        />
        <OverviewCard
          icon={<Activity size={20} />}
          accent="text-indigo-600 bg-indigo-50"
          label={t("statistics.active_habits")}
          value={activeHabits}
        />
        <OverviewCard
          icon={<AlertTriangle size={20} />}
          accent="text-rose-600 bg-rose-50"
          label={t("statistics.at_risk")}
          value={atRisk}
        />
      </div>

      {/* ---- Bộ lọc ---- */}
      <StatisticsFilter
        categories={categories}
        selectedCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        selectedPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        onClearAll={handleClearAll}
      />

      {/* ---- Danh sách habit (đã lọc) ---- */}
      <h2 className="text-base font-bold">{t("statistics.per_habit")}</h2>
      {visibleStats.length === 0 ? (
        <p className="opacity-60 text-sm">{t("statistics.no_match")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleStats.map((s) => (
            <HabitStatCard key={s.id} stat={s} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Số đếm tăng dần (hiệu ứng động) ---- */
function useCountUp(target: number, duration = 700) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* ---- Tiêu đề trang ---- */
function PageHeading() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-light">{t("statistics.title")}</h1>
      <p className="mt-1 text-sm opacity-60">{t("statistics.subtitle")}</p>
    </div>
  );
}

/* ---- Thẻ tổng quan: số to, nổi bật, đếm tăng dần ---- */
function OverviewCard({
  icon,
  accent,
  label,
  value,
  suffix = "",
}: {
  icon: ReactNode;
  accent: string;
  label: string;
  value: number;
  suffix?: string;
}) {
  const animated = useCountUp(value);
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-lg">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-4xl font-black leading-none tracking-tight tabular-nums">
          {animated}
          <span className="text-2xl">{suffix}</span>
        </p>
        <p className="text-xs opacity-60 font-semibold mt-1.5 truncate">{label}</p>
      </div>
    </div>
  );
}

/* ---- 1 chỉ số nhỏ trong thẻ habit ---- */
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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

/* ---- Trạng thái rỗng ---- */
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

/* ---- Thẻ thống kê 1 habit ---- */
function HabitStatCard({ stat }: { stat: HabitStat }) {
  const { t, i18n } = useTranslation();

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

  // nhãn thứ cho 7 cột (theo ngôn ngữ hiện tại, không hardcode)
  const locale = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";
  const dayLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const out: string[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      out.push(fmt.format(d));
    }
    return out;
  }, [locale]);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Tên habit + category + nhãn risk */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-base truncate">{stat.name}</h3>
          <p className="text-xs opacity-50 mt-0.5">{stat.category}</p>
        </div>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold ${riskColor[stat.riskLevel]}`}
        >
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

      {/* Thanh tiến độ tỷ lệ hoàn thành */}
      <div>
        <div className="flex items-center justify-between text-xs opacity-60 mb-1">
          <span>{t("statistics.completion_rate")}</span>
          <span>{stat.completionRate}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--primary)]/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-700 ease-out"
            style={{ width: `${stat.completionRate}%` }}
          />
        </div>
      </div>

      {/* Biểu đồ 7 ngày + nhãn thứ */}
      <div>
        <p className="text-xs font-semibold opacity-60 mb-2">{t("statistics.last_7_days")}</p>
        <div className="flex items-end gap-1 h-12">
          {stat.last7Days.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[var(--primary)] transition-[height] duration-500 ease-out"
              style={{ height: `${Math.max(v, 6)}%`, opacity: v === 0 ? 0.2 : 0.4 + (v / 100) * 0.6 }}
              title={`${v}%`}
            />
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {dayLabels.map((d, i) => (
            <span key={i} className="flex-1 text-center text-[10px] opacity-40">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}