import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { TrendingUp, BarChart3, Activity, AlertTriangle, Download, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { useHabitStats } from "../../../shared/hooks/useHabitStats";
import { useCategories } from "../../../shared/hooks/useCategory";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/common/Pagination";
import type { HabitStat, RiskLevel } from "../../../shared/types/Statistics";
import type { Habit, Priority } from "../../../shared/types/Habit";
import { StatisticsFilter } from "../components/StatisticsFilter";
import { OverviewCard } from "../components/OverviewCard";
import { HabitStatCard } from "../components/HabitStatCard";
import type { Goal } from "@/shared/types/Goal";
import type { CheckIn } from "@/shared/types/CheckIn";
import type { User } from "@/shared/types/User";
import { ROUTES, STORAGE_KEY } from "@/shared/constants/appConstants";
import { exportJson } from "@/shared/utils/exportJson";
import { toast } from "sonner";

type LayoutContext = { habits: Habit[]; goals: Goal[]; checkIns: CheckIn[] };
const STATS_PER_PAGE = 6;

export default function StatisticsPage() {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const { habits, goals, checkIns } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();

  const currentUser: User | null = JSON.parse(localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "null");
  useEffect(() => { if (!currentUser) navigate(ROUTES.AUTH, { replace: true }); }, []);

  const stats = useHabitStats(habits, checkIns, categories);

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);
  const [filterRisk, setFilterRisk] = useState<RiskLevel | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleExport = () => {
    try { exportJson(habits, goals, checkIns); toast.success(`${t("statistics.ex_noti1")}`); }
    catch (error) { toast.error(`${t("statistics.ex_noti2")}`); console.error(error); }
  };

  const total = stats.length;
  const completedToday = stats.filter((s) => s.todayRate === 100).length;
  const completedTodayPct = total === 0 ? 0 : Math.round((completedToday / total) * 100);
  const activeHabits = stats.length;
  const atRisk = stats.filter((s) => s.riskLevel === "AT_RISK").length;

  const visibleStats = useMemo(() => stats.filter((s) => {
    const catOk = !filterCategory || s.categoryId === filterCategory;
    const priOk = !filterPriority || s.priority === filterPriority;
    const riskOk = !filterRisk || s.riskLevel === filterRisk;
    return catOk && priOk && riskOk;
  }), [stats, filterCategory, filterPriority, filterRisk]);

  const { paginatedItems, currentPage, totalPages, handlePageChange, getPageNumbers } =
    usePagination<HabitStat>(visibleStats, "", () => true, STATS_PER_PAGE);

  const activeFilterCount = (filterCategory ? 1 : 0) + (filterPriority ? 1 : 0) + (filterRisk ? 1 : 0);
  const handleClearAll = () => { setFilterCategory(null); setFilterPriority(null); setFilterRisk(null); };

  if (stats.length === 0) {
    return (<div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)]"><PageHeading /><EmptyState /></div>);
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)]">
      <PageHeading />
      <div className="flex justify-end">
        <button onClick={handleExport} className="flex items-center gap-1.5 rounded-xl border border-[var(--primary)]/25 px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--primary)]/8 cursor-pointer">
          <Download size={15} />{t("statistics.btn_export")}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <OverviewCard icon={<TrendingUp size={20} />} accent="text-emerald-600 bg-emerald-50" label={t("statistics.completed_today")} value={completedTodayPct} suffix="%" />
        <OverviewCard icon={<Activity size={20} />} accent="text-indigo-600 bg-indigo-50" label={t("statistics.active_habits")} value={activeHabits} />
        <OverviewCard icon={<AlertTriangle size={20} />} accent="text-rose-600 bg-rose-50" label={t("statistics.at_risk")} value={atRisk} />
      </div>
      <div>
        <button onClick={() => setShowFilter((v) => !v)} className="flex items-center gap-2 rounded-xl border border-[var(--primary)]/20 px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--primary)]/8 cursor-pointer">
          <SlidersHorizontal size={15} className="text-[var(--primary)]" />{t("habit_filter.title")}
          {activeFilterCount > 0 && (<span className="rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">{activeFilterCount}</span>)}
          {showFilter ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {showFilter && (<div className="mt-3"><StatisticsFilter categories={categories} selectedCategory={filterCategory} onCategoryChange={setFilterCategory} selectedPriority={filterPriority} onPriorityChange={setFilterPriority} selectedRisk={filterRisk} onRiskChange={setFilterRisk} onClearAll={handleClearAll} /></div>)}
      </div>
      <h2 className="text-base font-bold">{t("statistics.per_habit")}</h2>
      {visibleStats.length === 0 ? (
        <p className="opacity-60 text-sm">{t("statistics.no_match")}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedItems.map((s) => (<HabitStatCard key={s.id} stat={s} />))}
          </div>
          {totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} getPageNumbers={getPageNumbers} />)}
        </>
      )}
    </div>
  );
}

function PageHeading() {
  const { t } = useTranslation();
  return (<div><h1 className="text-3xl sm:text-4xl font-light">{t("statistics.title")}</h1><p className="mt-1 text-sm opacity-60">{t("statistics.subtitle")}</p></div>);
}
function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)] px-6 py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]"><BarChart3 size={32} /></div>
      <h3 className="mb-2 text-2xl font-light">{t("statistics.empty")}</h3>
      <p className="mb-6 text-sm opacity-60">{t("statistics.empty_hint")}</p>
      <Link to="/dashboard/habits" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">{t("statistics.empty_action")}</Link>
    </div>
  );
}