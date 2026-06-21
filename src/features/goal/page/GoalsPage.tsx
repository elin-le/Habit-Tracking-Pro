import { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Target,
  Zap,
  Award,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { Goal, GoalWithDerived } from "../../../shared/types/Goal.ts";
import type { Habit } from "../../../shared/types/Habit.ts";
import type { CheckIn } from "../../../shared/types/CheckIn.ts";
import type {
  TypeFilter,
  StatusFilter,
} from "../../../shared/hooks/useGoals.ts";
import type { GoalFormData } from "../../../shared/components/forms/GoalForm";

import GoalCard from "../../../shared/components/cards/GoalCard.tsx";
import GoalForm from "../../../shared/components/forms/GoalForm";
import { Modal } from "../../../shared/components/ui/Modal.tsx";
import { Pagination } from "../../../shared/components/common/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";

import GoalDetailPanel from "../components/GoalDetailPanel.tsx";
import { SummaryCard } from "../components/SummaryCard.tsx";
import { FilterChip } from "../components/FilterChip.tsx";
import { calculateGoalStats } from "../services/GoalService.ts";

import { ToastService } from "../../../routes/services/toastService.ts";
import { removeAccents } from "../../../shared/utils/stringUtils.ts";
import "../Goals.css";

type LayoutContext = {
  habits: Habit[];
  userGoals: GoalWithDerived[];
  checkIns: CheckIn[];
  createGoal: (goalData: Omit<Goal, "id">) => Goal;
  updateGoal: (id: string, goalData: Partial<Goal>) => Goal | undefined;
  deleteGoal: (id: string) => void;
  refreshGoals: () => void;
};

function GoalsPage() {
  // Contexts & Hooks
  const { t } = useTranslation();
  const {
    habits: allHabits,
    userGoals: goals,
    checkIns = [],
    createGoal,
    updateGoal,
    deleteGoal,
  } = useOutletContext<LayoutContext>();

  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState({ id: "", name: "" });
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [editingGoal, setEditingGoal] = useState<GoalWithDerived | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilters, setStatusFilters] = useState<StatusFilter[]>([
    "TRACKING",
  ]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [activeHabitSearchQuery, setactiveHabitSearchQuery] = useState("");
  const [habitWithoutGoalSearchQuery, setHabitWithoutGoalSearchQuery] =
    useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Constants
  const priorityWeight: Record<string, number> = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };
  const GOALS_PER_PAGE = isMobile ? 4 : 6;
  const hasActiveFilters =
    !statusFilters.includes("ALL") || typeFilter !== "ALL";

  // Derived state
  const activeHabits = useMemo(
    () => allHabits.filter((h: Habit) => h.status === "ACTIVE"),
    [allHabits],
  );

  const goalStats = useMemo(
    () => ({
      total: goals.filter((g) => g.progress.status !== "COMPLETED").length,
      inProgress: goals.filter((g) => g.progress.status === "IN_PROGRESS")
        .length,
      near: goals.filter(
        (g) =>
          g.progress.progressPercent >= 80 && g.progress.status !== "COMPLETED",
      ).length,
      completed: goals.filter((g) => g.progress.status === "COMPLETED").length,
    }),
    [goals],
  );

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      let matchStatus = false;
      if (statusFilters.includes("ALL")) {
        matchStatus = true;
      } else {
        if (
          (statusFilters.includes("IN_PROGRESS") ||
            statusFilters.includes("TRACKING")) &&
          g.progress.status === "IN_PROGRESS"
        )
          matchStatus = true;
        if (
          (statusFilters.includes("NOT_STARTED") ||
            statusFilters.includes("TRACKING")) &&
          g.progress.status === "NOT_STARTED"
        )
          matchStatus = true;
        if (
          statusFilters.includes("COMPLETED") &&
          g.progress.status === "COMPLETED"
        )
          matchStatus = true;
        if (
          statusFilters.includes("NEAR_COMPLETION") &&
          g.progress.progressPercent >= 80 &&
          g.progress.status !== "COMPLETED"
        )
          matchStatus = true;
      }
      const matchType = typeFilter === "ALL" || g.targetType === typeFilter;
      return matchStatus && matchType;
    });
  }, [goals, statusFilters, typeFilter]);

  const displayedGoals = useMemo(() => {
    let result = filteredGoals;

    if (activeHabitSearchQuery.trim()) {
      const normalizedSearch = removeAccents(activeHabitSearchQuery);
      result = result.filter((g) => {
        const habit = activeHabits.find((h: Habit) => h.id === g.habitId);
        const habitName = habit ? removeAccents(habit.name) : "";
        return habitName.includes(normalizedSearch);
      });
    }

    return [...result].sort((a, b) => {
      const aCompletion = a.progress.status === "COMPLETED";
      const bCompletion = b.progress.status === "COMPLETED";

      if (aCompletion && !bCompletion) return 1;
      if (!aCompletion && bCompletion) return -1;

      const habitA = activeHabits.find((h) => h.id === a.habitId);
      const habitB = activeHabits.find((h) => h.id === b.habitId);

      const priorityA = habitA ? priorityWeight[habitA.priority] || 0 : 0;
      const priorityB = habitB ? priorityWeight[habitB.priority] || 0 : 0;

      return priorityB - priorityA;
    });
  }, [filteredGoals, activeHabitSearchQuery, activeHabits]);

  const selectedGoalDetail = useMemo(() => {
    return goals.find((g) => g.id === selectedGoalId) || null;
  }, [goals, selectedGoalId]);

  const selectedGoalFull = useMemo(() => {
    if (!selectedGoalDetail) return null;
    const habit = allHabits.find((h) => h.id === selectedGoalDetail.habitId);
    const targetPerDay = Number(habit?.targetPerDay || 1);
    const stats = calculateGoalStats(
      selectedGoalDetail,
      checkIns,
      targetPerDay,
    );
    return {
      ...selectedGoalDetail,
      ...stats,
    };
  }, [selectedGoalDetail, checkIns, allHabits]);

  const habitsWithoutGoal = useMemo(() => {
    const activeGoalHabitIds = new Set(
      goals
        .filter(
          (g) =>
            g.progress.status === "NOT_STARTED" ||
            g.progress.status === "IN_PROGRESS",
        )
        .map((g) => g.habitId),
    );
    return activeHabits
      .filter((h: Habit) => !activeGoalHabitIds.has(h.id))
      .filter((h) =>
        removeAccents(h.name.toLowerCase()).includes(
          removeAccents(habitWithoutGoalSearchQuery.toLowerCase()),
        ),
      )
      .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  }, [activeHabits, goals, habitWithoutGoalSearchQuery]);

  // Side effects
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedGoals,
    getPageNumbers,
    handlePageChange,
  } = usePagination(displayedGoals, "", () => true, GOALS_PER_PAGE);

  const {
    currentPage: currentHabitPage,
    totalPages: totalHabitPages,
    paginatedItems: paginatedHabits,
    getPageNumbers: getHabitPageNumbers,
    handlePageChange: handleHabitPageChange,
  } = usePagination(habitsWithoutGoal, "", () => true, GOALS_PER_PAGE);

  // Event handlers
  const toggleStatusFilter = (filter: StatusFilter) => {
    if (filter === "ALL") {
      setStatusFilters(["ALL"]);
      return;
    }
    if (filter === "TRACKING") {
      setStatusFilters(["TRACKING"]);
      return;
    }
    setStatusFilters((prev) => {
      let next = [...prev];
      if (next.includes("ALL") || next.includes("TRACKING")) {
        next = [filter];
      } else {
        if (next.includes(filter)) {
          next = next.filter((f) => f !== filter);
        } else {
          next.push(filter);
        }
      }
      if (next.length === 0) return ["ALL"];
      const hasInProgress = next.includes("IN_PROGRESS");
      const hasNotStarted = next.includes("NOT_STARTED");
      const hasCompleted = next.includes("COMPLETED");
      if (hasInProgress && hasNotStarted && hasCompleted) {
        return ["ALL"];
      }
      return next;
    });
  };

  const handleAddGoal = (habit: { id: string; name: string }) => {
    setSelectedHabit(habit);
    setModalOpen(true);
  };

  const handleFormSubmit = (formData: GoalFormData) => {
    const newGoal: Omit<Goal, "id"> = {
      ...formData,
      endDate: formData.endDate || "",
    };
    const created = createGoal(newGoal);
    if (created) {
      ToastService.success(t("goals.add_success"));
      setModalOpen(false);
    }
  };

  const handleSelectDetail = (goal: GoalWithDerived) => {
    setSelectedGoalId(goal.id);
    setPanelOpen(true);
  };

  const handleCloseDetail = () => {
    setPanelOpen(false);
    setTimeout(() => setSelectedGoalId(null), 450);
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoal(goalId);
    ToastService.warning(t("goals.delete_success"));
    handleCloseDetail();
  };

  const handleOpenEditModal = (goal: GoalWithDerived) => {
    setEditingGoal(goal);
    setPanelOpen(false);
  };

  const handleEditSubmit = (formData: GoalFormData) => {
    if (editingGoal) {
      const updated = updateGoal(editingGoal.id, formData);
      if (updated) {
        ToastService.success(t("goals.edit_success"));
        setEditingGoal(null);
      }
    }
  };

  // Main UI
  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-8 text-[var(--text)] animate-in fade-in duration-300">
      {/* Page header  */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 lg:hidden">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
            {t("goals.title")}
          </h1>
          <p className="mt-1 text-sm opacity-60">{t("goals.subtitle")}</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <SummaryCard
          icon={<Target size={18} />}
          label={t("goals.tracking")}
          value={goalStats.total}
          iconClass="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/40"
          activeColorClass="bg-slate-50 dark:bg-slate-800/40 border-slate-400 dark:border-slate-500 ring-1 ring-slate-400/20"
          onClick={() => {
            if (statusFilters.includes("TRACKING")) {
              toggleStatusFilter("ALL");
            } else {
              toggleStatusFilter("TRACKING");
            }
          }}
          active={statusFilters.includes("TRACKING")}
        />
        <SummaryCard
          icon={<Zap size={18} />}
          label={t("goals.in_progress")}
          value={goalStats.inProgress}
          iconClass="text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
          activeColorClass="bg-amber-50 dark:bg-amber-900/10 border-amber-400 dark:border-amber-500 ring-1 ring-amber-400/20"
          onClick={() => toggleStatusFilter("IN_PROGRESS")}
          active={statusFilters.includes("IN_PROGRESS")}
        />
        <SummaryCard
          icon={<Award size={18} />}
          label={t("goals.near_completion")}
          value={goalStats.near}
          iconClass="text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20"
          activeColorClass="bg-violet-50 dark:bg-violet-900/10 border-violet-400 dark:border-violet-500 ring-1 ring-violet-400/20"
          onClick={() => toggleStatusFilter("NEAR_COMPLETION")}
          active={statusFilters.includes("NEAR_COMPLETION")}
        />
        <SummaryCard
          icon={<CheckCircle2 size={18} />}
          label={t("goals.completed")}
          value={goalStats.completed}
          iconClass="text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
          activeColorClass="bg-teal-50 dark:bg-teal-900/10 border-teal-400 dark:border-teal-500 ring-1 ring-teal-400/20"
          onClick={() => toggleStatusFilter("COMPLETED")}
          active={statusFilters.includes("COMPLETED")}
        />
      </div>

      {/* Goals section */}
      <section className="flex flex-col gap-5 mt-6">
        {/* Search + filter toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {t("goals.tracking")}
            {displayedGoals.length !== goals.length && (
              <span className="ml-2 text-sm font-normal opacity-60">
                ({displayedGoals.length} / {goals.length})
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
                value={activeHabitSearchQuery}
                onChange={(e) => setactiveHabitSearchQuery(e.target.value)}
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
                ${
                  showFilters || hasActiveFilters
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "border-[var(--text)]/10 opacity-70 hover:opacity-100"
                }
            `}
            >
              <SlidersHorizontal size={14} />
              {t("goals.filter")}
              {hasActiveFilters && (
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px] font-black">
                  {(statusFilters.includes("ALL") ? 0 : statusFilters.length) +
                    (typeFilter !== "ALL" ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Clear Filters / Search */}
            {(hasActiveFilters || activeHabitSearchQuery.trim() !== "") && (
              <button
                onClick={() => {
                  setStatusFilters(["ALL"]);
                  setTypeFilter("ALL");
                  setactiveHabitSearchQuery("");
                }}
                className="flex items-center gap-1.5 h-9 px-3 rounded-full text-[var(--text)]/60 bg-[var(--text)]/5 hover:bg-[var(--text)]/10 transition-colors text-sm font-medium"
                title={t("goals.clear_filters")}
              >
                <X size={14} />
                <span className="hidden sm:inline">
                  {t("goals.clear_filters")}
                </span>
              </button>
            )}
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
              {(
                [
                  "ALL",
                  "IN_PROGRESS",
                  "NEAR_COMPLETION",
                  "COMPLETED",
                  "NOT_STARTED",
                ] as StatusFilter[]
              ).map((s) => {
                let activeCls =
                  "bg-[var(--primary)]/8 text-[var(--primary)] border-[var(--primary)]/40";
                let inactiveCls =
                  "bg-transparent text-[var(--text)]/55 border-[var(--text)]/10 hover:border-[var(--text)]/20 hover:text-[var(--text)]/75";

                if (s === "IN_PROGRESS") {
                  activeCls =
                    "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700";
                } else if (s === "NEAR_COMPLETION") {
                  activeCls =
                    "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700";
                } else if (s === "COMPLETED") {
                  activeCls =
                    "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700";
                } else if (s === "NOT_STARTED") {
                  activeCls =
                    "bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600";
                }

                return (
                  <FilterChip
                    key={s}
                    active={
                      s === "TRACKING"
                        ? statusFilters.includes("IN_PROGRESS") &&
                          statusFilters.includes("NOT_STARTED") &&
                          statusFilters.length === 2
                        : statusFilters.includes(s)
                    }
                    onClick={() => toggleStatusFilter(s)}
                    activeClass={activeCls}
                    inactiveClass={inactiveCls}
                  >
                    {s === "ALL"
                      ? t("goals.filter_all")
                      : s === "IN_PROGRESS"
                        ? t("goals.in_progress")
                        : s === "NEAR_COMPLETION"
                          ? t("goals.near_completion")
                          : s === "COMPLETED"
                            ? t("goals.completed")
                            : t("goals.not_started")}
                  </FilterChip>
                );
              })}
            </div>

            {/* Type filters */}
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="text-sm font-bold opacity-60 mr-1">
                {t("goals.filter_type")}:
              </span>
              {(["ALL", "STREAK", "TOTAL_COMPLETIONS"] as TypeFilter[]).map(
                (ty) => {
                  let activeCls =
                    "bg-[var(--primary)]/8 text-[var(--primary)] border-[var(--primary)]/40";
                  let inactiveCls =
                    "bg-transparent text-[var(--text)]/55 border-[var(--text)]/10 hover:border-[var(--text)]/20 hover:text-[var(--text)]/75";

                  if (ty === "STREAK") {
                    activeCls =
                      "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700";
                  } else if (ty === "TOTAL_COMPLETIONS") {
                    activeCls =
                      "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700";
                  }

                  return (
                    <FilterChip
                      key={ty}
                      active={typeFilter === ty}
                      onClick={() => setTypeFilter(ty)}
                      activeClass={activeCls}
                      inactiveClass={inactiveCls}
                    >
                      {ty === "ALL"
                        ? t("goals.filter_all")
                        : ty === "STREAK"
                          ? t("goals.type_streak")
                          : t("goals.type_total")}
                    </FilterChip>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Goal grid */}
        {paginatedGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedGoals.map((g) => {
              const habit = allHabits.find((h: Habit) => h.id === g.habitId);
              const habitName = habit ? habit.name : t("goals.hidden_habit");

              return (
                <GoalCard
                  key={g.id}
                  goal={g}
                  habitName={habitName}
                  habitStatus={habit?.status}
                  onSelectDetail={handleSelectDetail}
                  onEdit={() => handleOpenEditModal(g)}
                  onDelete={() => {
                    handleDeleteGoal(g.id);
                  }}
                />
              );
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
                            goals-empty-state
                        "
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
                {activeHabitSearchQuery || hasActiveFilters
                  ? t("goals.empty_filter_hint")
                  : t("goals.empty_hint")}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setStatusFilters(["ALL"]);
                  setTypeFilter("ALL");
                  setactiveHabitSearchQuery("");
                }}
                className="text-sm font-semibold text-[var(--primary)] hover:underline mt-2"
              >
                {t("goals.clear_filters")}
              </button>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getPageNumbers={getPageNumbers}
            handlePageChange={handlePageChange}
          />
        )}
      </section>

      {/* Habits without goal */}
      {(habitsWithoutGoal.length > 0 ||
        habitWithoutGoalSearchQuery.trim() !== "") && (
        <section className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t("goals.no_goal")}
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
                  value={habitWithoutGoalSearchQuery}
                  onChange={(e) =>
                    setHabitWithoutGoalSearchQuery(e.target.value)
                  }
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
            </div>
          </div>
          {habitsWithoutGoal.length > 0 ? (
            <>
              <div className="flex flex-col gap-2.5">
                {paginatedHabits.map((habit) => (
                  <GoalCard
                    key={habit.id}
                    habitName={habit.name}
                    isEmpty={true}
                    onAddGoal={() => handleAddGoal(habit)}
                  />
                ))}
              </div>

              {totalHabitPages > 1 && (
                <Pagination
                  currentPage={currentHabitPage}
                  totalPages={totalHabitPages}
                  getPageNumbers={getHabitPageNumbers}
                  handlePageChange={handleHabitPageChange}
                />
              )}
            </>
          ) : (
            /* Empty state */
            <div
              className="
                              flex flex-col items-center justify-center gap-3
                              py-16 px-8
                              rounded-3xl border
                              text-center
                              goals-empty-state
                          "
            >
              <div
                className="
                              w-14 h-14 rounded-2xl flex items-center justify-center
                              bg-slate-100/50 opacity-60
                          "
              >
                <Search size={24} />
              </div>
              <div>
                <p className="text-lg font-semibold opacity-90">
                  {t("goals.empty_title")}
                </p>
                <p className="text-sm opacity-60 mt-1">
                  {habitWithoutGoalSearchQuery.trim() !== ""
                    ? t("goals.empty_filter_hint")
                    : t("goals.empty_hint")}
                </p>
              </div>
            </div>
          )}
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

      {/* Edit goal modal */}
      {editingGoal && (
        <Modal
          title={t("goals.edit_goal")}
          onClose={() => setEditingGoal(null)}
          size="sm"
        >
          <GoalForm
            habitId={editingGoal.habitId}
            habitName={
              activeHabits.find((h) => h.id === editingGoal.habitId)?.name || ""
            }
            initialData={editingGoal}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingGoal(null)}
          />
        </Modal>
      )}

      {/* Detail drawer */}
      <GoalDetailPanel
        goal={selectedGoalFull}
        habitName={
          selectedGoalFull
            ? (allHabits.find((h) => h.id === selectedGoalFull.habitId)?.name ??
              t("goals.hidden_habit"))
            : ""
        }
        isOpen={panelOpen}
        onClose={handleCloseDetail}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
}

export default GoalsPage;
