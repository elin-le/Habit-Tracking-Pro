import { useState, useMemo } from "react";
import { useGoals, type StatusFilter, type TypeFilter } from "../shared/hooks/useGoals";
import { ToastService } from "../routes/services/toastService";
import { useTranslation } from "react-i18next";
import GoalCard from "../shared/components/cards/GoalCard";
import GoalDetailPanel from "../features/goal/components/GoalDetailPanel";
import {
    Target,
    Zap,
    Award,
    CheckCircle2,
    Plus,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import GoalForm from "../shared/components/forms/GoalForm";
import { STORAGE_KEY } from "../shared/constants/appConstants";
import { Modal } from "../shared/components/ui/Modal";
import { Button } from "../shared/components/ui/Button";
import type { Habit } from "../shared/types/Habit";

// GoalsPage 
function GoalsPage() {
    const { t } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState({ id: "", name: "" });
    const [selectedGoalDetail, setSelectedGoalDetail] = useState<any | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const {
        goals,
        filteredGoals,
        statusFilter, setStatusFilter,
        typeFilter, setTypeFilter,
        deleteGoal, createGoal, refreshGoals
    } = useGoals();

    // Get all habits from local storage
    const allHabits = useMemo(() => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY.USER_HABITS) || "[]") as Habit[];
    }, []);

    const habitsWithoutGoal = useMemo(() => {
        const activeGoalHabitIds = new Set(goals.filter(g => g.progress.status === "NOT_STARTED" || g.progress.status === "IN_PROGRESS").map((g) => g.habitId));
        return allHabits.filter((h: Habit) => !activeGoalHabitIds.has(h.id));
    }, [allHabits, goals]);

    const [showFilters, setShowFilters] = useState(false);

    // Derived stats 
    const stats = useMemo(() => ({
        total: goals.length,
        inProgress: goals.filter((g) => g.progress.status === "IN_PROGRESS").length,
        near: goals.filter((g) => g.progress.progressPercent >= 80 && g.progress.status !== "COMPLETED").length,
        completed: goals.filter((g) => g.progress.status === "COMPLETED").length,
    }), [goals]);

    // Handlers 
    const handleAddGoal = (habit: { id: string; name: string }) => {
        setSelectedHabit(habit);
        setModalOpen(true);
    };

    const handleFormSubmit = (formData: any) => {
        const newGoal = {
            ...formData,
            color: "indigo" as const,
            stats: { bestStreak: 0, completionRate: 0 },
            weeklyHistory: [
                { day: "T2", value: 0 }, { day: "T3", value: 0 },
                { day: "T4", value: 0 }, { day: "T5", value: 0 },
                { day: "T6", value: 0 }, { day: "T7", value: 0 },
                { day: "CN", value: 0 },
            ],
        };
        createGoal(newGoal);
        refreshGoals();
        ToastService.success(t("goals.add_success"));
        setModalOpen(false);
    };

    const handleSelectDetail = (goal: any) => {
        setSelectedGoalDetail(goal);
        setPanelOpen(true);
    };

    const handleCloseDetail = () => {
        setPanelOpen(false);
        // Clear goal data AFTER slide-out animation completes
        setTimeout(() => setSelectedGoalDetail(null), 450);
    };

    const handleArchiveGoal = (goalId: string) => {
        // TODO: chưa có trạng thái ARCHIVE, tạm thời xoá luôn 
        deleteGoal(goalId);
        ToastService.success(t("goals.archive_success"));
        handleCloseDetail();
    };

    const handleDeleteGoal = (goalId: string) => {
        deleteGoal(goalId);
        ToastService.error(t("goals.delete_success"));
        handleCloseDetail();
    };

    // TODO: bổ sung update goal 

    const hasActiveFilters = statusFilter !== "ALL" || typeFilter !== "ALL";

    // Main UI
    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)] animate-in fade-in duration-300">

            {/* Page header  */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
                        {t("goals.title")}
                    </h1>
                    <p className="mt-1 text-sm opacity-60">
                        {t("goals.subtitle")}
                    </p>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <SummaryCard
                    icon={<Target size={18} />}
                    label={t("goals.tracking")}
                    value={stats.total}
                    iconClass="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30"
                    onClick={() => setStatusFilter("ALL")}
                    active={statusFilter === "ALL"}
                />
                <SummaryCard
                    icon={<Zap size={18} />}
                    label={t("goals.in_progress")}
                    value={stats.inProgress}
                    iconClass="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30"
                    onClick={() => setStatusFilter(statusFilter === "IN_PROGRESS" ? "ALL" : "IN_PROGRESS")}
                    active={statusFilter === "IN_PROGRESS"}
                />
                <SummaryCard
                    icon={<Award size={18} />}
                    label={t("goals.near_completion")}
                    value={stats.near}
                    iconClass="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30"
                    onClick={() => setStatusFilter(statusFilter === "NEAR_COMPLETION" ? "ALL" : "NEAR_COMPLETION")}
                    active={statusFilter === "NEAR_COMPLETION"}
                />
                <SummaryCard
                    icon={<CheckCircle2 size={18} />}
                    label={t("goals.completed")}
                    value={stats.completed}
                    iconClass="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                    onClick={() => setStatusFilter(statusFilter === "COMPLETED" ? "ALL" : "COMPLETED")}
                    active={statusFilter === "COMPLETED"}
                />
            </div>

            {/* Goals section */}
            <section className="flex flex-col gap-5 mt-6">
                {/* Search + filter toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-base font-bold">
                        {t("goals.tracking")}
                        {filteredGoals.length !== goals.length && (
                            <span className="ml-2 text-sm font-normal opacity-60">
                                ({filteredGoals.length} / {goals.length})
                            </span>
                        )}
                    </h2>

                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none sm:w-56">
                            <Search
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("goals.search_placeholder")}
                                className="

                                    h-9 w-full pl-9 pr-4
                                    rounded-full
                                    border border-slate-200 dark:border-slate-700
                                    bg-[var(--surface)]
                                    text-[var(--text)]
                                    text-sm
                                    outline-none
                                    focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]
                                    transition-[border-color,box-shadow] duration-150
                                "
                            />
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters((v) => !v)}
                            aria-pressed={showFilters}
                            className={`
                flex items-center gap-1.5 h-9 px-3.5 rounded-full
                border text-sm font-medium
                transition-all duration-150
                ${showFilters || hasActiveFilters
                                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                                    : "border-[var(--text)]/10 opacity-70 hover:opacity-100"
                                }
            `}
                        >
                            <SlidersHorizontal size={14} />
                            {t("goals.filter")}
                            {hasActiveFilters && (
                                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px] font-black">
                                    {(statusFilter !== "ALL" ? 1 : 0) +
                                        (typeFilter !== "ALL" ? 1 : 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Filter chips — animated */}
                {showFilters && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 pb-2 animate-in slide-in-from-top-2 fade-in duration-200 mt-2">
                        {/* Status filters */}
                        <div className="flex items-center flex-wrap gap-2.5">
                            <span className="text-sm font-bold opacity-60 mr-1">
                                {t("goals.filter_status")}:
                            </span>
                            {(["ALL", "IN_PROGRESS", "NEAR_COMPLETION", "COMPLETED", "NOT_STARTED"] as StatusFilter[]).map((s) => (
                                <FilterChip
                                    key={s}
                                    active={statusFilter === s}
                                    onClick={() => setStatusFilter(s)}
                                >
                                    {s === "ALL" ? t("goals.filter_all")
                                        : s === "IN_PROGRESS" ? t("goals.in_progress")
                                            : s === "NEAR_COMPLETION" ? t("goals.near_completion")
                                                : s === "COMPLETED" ? t("goals.completed")
                                                    : t("goals.not_started")}
                                </FilterChip>
                            ))}
                        </div>

                        {/* Type filters */}
                        <div className="flex items-center flex-wrap gap-2.5">
                            <span className="text-sm font-bold opacity-60 mr-1">
                                {t("goals.filter_type")}:
                            </span>
                            {(["ALL", "STREAK", "TOTAL_COMPLETIONS"] as TypeFilter[]).map((ty) => (
                                <FilterChip
                                    key={ty}
                                    active={typeFilter === ty}
                                    onClick={() => setTypeFilter(ty)}
                                >
                                    {ty === "ALL" ? t("goals.filter_all")
                                        : ty === "STREAK" ? t("goals.type_streak")
                                            : t("goals.type_total")}
                                </FilterChip>
                            ))}
                        </div>
                    </div>
                )}

                {/* Goal grid */}
                {filteredGoals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredGoals.map((g) => {
                            const habit = allHabits.find((h: any) => h.id === g.habitId);
                            const habitName = habit ? habit.name : "Thói quen bị ẩn";

                            return (
                                <GoalCard
                                    key={g.id}
                                    goal={{
                                        ...g,
                                        color: "indigo"
                                    }}
                                    habitName={habitName}
                                    onSelectDetail={handleSelectDetail}
                                    onEdit={() => ToastService.info(`${t("goals.edit_goal")}: ${habitName}`)}
                                    onArchive={() => {
                                        handleArchiveGoal(g.id);
                                    }}
                                    onDelete={() => {
                                        handleDeleteGoal(g.id);
                                    }}
                                />
                            )
                        })}
                    </div>
                ) : (
                    /* Empty state */
                    <div
                        className="
                            flex flex-col items-center justify-center gap-3
                            py-16 px-8
                            rounded-3xl border
                            text-center
                        "
                        style={{
                            background: "var(--surface)",
                            borderColor:
                                "color-mix(in srgb, var(--primary) 20%, transparent)",
                        }}
                    >
                        <div
                            className="
                            w-14 h-14 rounded-2xl flex items-center justify-center
                            bg-slate-100/50 opacity-60
                        "
                        >
                            <Target size={24} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold opacity-90">
                                {t("goals.empty_title")}
                            </p>
                            <p className="text-sm opacity-60 mt-1">
                                {search || hasActiveFilters
                                    ? t("goals.empty_filter_hint")
                                    : t("goals.empty_hint")}
                            </p>
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setStatusFilter("ALL");
                                    setTypeFilter("ALL");
                                    setSearch("");
                                }}
                                className="text-sm font-semibold text-[var(--primary)] hover:underline mt-2"
                            >
                                {t("goals.clear_filters")}
                            </button>
                        )}
                    </div>
                )}
            </section>

            {/* Habits without goal */}
            {habitsWithoutGoal.length > 0 && (
                <section className="flex flex-col gap-4 mt-8">
                    <h2 className="text-lg font-bold">{t("goals.no_goal")}</h2>
                    <div className="flex flex-col gap-2.5">
                        {habitsWithoutGoal.map((habit) => (
                            <div
                                key={habit.id}
                                className="
                                    flex items-center justify-between
                                    rounded-2xl p-4 border
                                    hover:shadow-sm transition-shadow duration-200
                                "
                                style={{
                                    background: "var(--surface)",
                                    borderColor:
                                        "color-mix(in srgb, var(--primary) 15%, transparent)",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                        w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                                        bg-slate-100/50 opacity-60
                                    "
                                    >
                                        <Target size={14} />
                                    </div>
                                    <span className="font-semibold text-base opacity-90">
                                        {habit.name}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddGoal(habit)}
                                    className="shrink-0 flex items-center"
                                >
                                    <Plus size={14} />
                                    <span className="ml-2">{t("goals.add_goal")}</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Create goal modal */}
            {modalOpen && (
                <Modal
                    title={t("goals.add_goal")}
                    onClose={() => setModalOpen(false)}
                    size="sm"
                >
                    <GoalForm
                        habitId={selectedHabit.id}
                        habitName={selectedHabit.name}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setModalOpen(false)}
                    />
                </Modal>
            )}

            {/* Detail drawer */}
            <GoalDetailPanel
                goal={selectedGoalDetail}
                habitName={selectedGoalDetail?.habitName ?? ""}
                isOpen={panelOpen}
                onClose={handleCloseDetail}
                onArchive={handleArchiveGoal}
                onDelete={handleDeleteGoal}
            />
        </div>
    );
}

// Summary card

const SummaryCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: number;
    iconClass: string;
    onClick?: () => void;
    active?: boolean;
}> = ({ icon, label, value, iconClass, onClick, active }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className={`
            flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl text-left w-full
            bg-[var(--surface)]
            border transition-all duration-200
            ${onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : "cursor-default"}
            ${active
                ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                : "border-transparent"
            }
        `}
        style={{
            borderColor: active
                ? "var(--primary)"
                : "color-mix(in srgb, var(--primary) 15%, transparent)",
        }}
    >
        <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${iconClass}`}
        >
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-black leading-none">{value}</p>
            <p className="text-xs opacity-60 font-semibold mt-1 truncate">{label}</p>
        </div>
    </button>
);

// Filter chip

const FilterChip: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ active, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`
            h-8 px-4 rounded-full text-sm font-semibold
            border transition-all duration-150
            ${active
                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                : "border-[var(--text)]/10 opacity-70 hover:opacity-100"
            }
        `}
    >
        {children}
    </button>
);

export default GoalsPage;
