import {
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  SparklesIcon,
} from "lucide-react";
import { HabitCard } from "../../../shared/components/cards/HabitCard";
import { HabitFilter } from "../../../shared/components/filters/HabitFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/common/Pagination";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Habit, HabitStatus, Priority } from "../../../shared/types/Habit";
import type { CheckIn } from "../../../shared/types/CheckIn"; // 🛠️ Thêm type CheckIn
import type {
  DaysOfWeek,
  HabitSchedule,
} from "../../../shared/types/HabitSchedule";
import { HabitForm } from "../../../shared/components/forms/HabitForm";
import { useMemo, useState, useEffect } from "react";
import { DAY_OF_WEEK_MAP } from "@/shared/constants/appConstants";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { Category } from "@/shared/types/Category";
import type { User } from "@/shared/types/User";
import { ROUTES, STORAGE_KEY } from "@/shared/constants/appConstants";
import GoalForm, {
  type GoalFormData,
} from "../../../shared/components/forms/GoalForm";
import { Modal } from "../../../shared/components/ui/Modal";
import type { Goal, GoalWithDerived } from "../../../shared/types/Goal";
import { ToastService } from "../../../routes/services/toastService";
import "../../dashboard/Dashboard.css";
import DailyCheckIns from "../components/DailyCheckIns";

type LayoutContext = {
  habits: Habit[];
  checkIns?: CheckIn[];
  userGoals: GoalWithDerived[];
  createHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  habitSchedules: HabitSchedule[];
  createHabitSchedules: (s: HabitSchedule[]) => void;
  replaceHabitSchedules: (habitId: string, s: HabitSchedule[]) => void;
  deleteHabitSchedulesByHabitId: (habitId: string) => void;
  categories: Category[];
  showAddForm: boolean;
  setShowAddForm: (v: boolean) => void;
  deleteGoalsByHabitId: (habitId: string) => void;
  createGoal: (goalData: Omit<Goal, "id">) => Goal;
};

export function HabitsPage() {
  const { t } = useTranslation();
  const {
    habits,
    checkIns = [],
    userGoals = [],
    showAddForm,
    habitSchedules,
    categories,
    createHabit,
    createHabitSchedules,
    setShowAddForm,
    updateHabit,
    replaceHabitSchedules,
    deleteHabit,
    deleteHabitSchedulesByHabitId,
    deleteGoalsByHabitId,
    createGoal,
  } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();

  const currentUser: User | null = JSON.parse(
    localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "null",
  );

  const [showFilter, setShowFilter] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [updatingHabit, setUpdatingHabit] = useState<Habit | null>(null);
  const [goalHabit, setGoalHabit] = useState<Habit | null>(null);

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);
  const [filterStatus, setFilterStatus] = useState<HabitStatus | null>(
    "ACTIVE",
  );
  const [frequencyFilter, setFrequencyFilter] = useState<DaysOfWeek | null>(
    DAY_OF_WEEK_MAP[new Date().getDay()],
  );

  const todayDow = DAY_OF_WEEK_MAP[new Date().getDay()];
  const isViewingToday =
    frequencyFilter === null || frequencyFilter === todayDow;

  const handleClearAll = () => {
    setFilterCategory(null);
    setFilterPriority(null);
    setFilterStatus("ACTIVE");
    setFrequencyFilter(DAY_OF_WEEK_MAP[new Date().getDay()]);
  };

  const isScheduledOnDow = (habit: Habit, dow: DaysOfWeek) => {
    if (habit.frequencyType === "DAILY") return true;
    return habitSchedules.some(
      (s) => s.habitId === habit.id && s.dayOfWeek === dow,
    );
  };

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const statusOk = filterStatus === null || habit.status === filterStatus;

      const categoryOk = !filterCategory || habit.categoryId === filterCategory;

      const priorityOk = !filterPriority || habit.priority === filterPriority;

      const scheduleOk =
        !frequencyFilter || isScheduledOnDow(habit, frequencyFilter);
      return statusOk && categoryOk && priorityOk && scheduleOk;
    });
  }, [
    habits,
    habitSchedules,
    filterCategory,
    filterPriority,
    filterStatus,
    frequencyFilter,
  ]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    filteredItems,
    getPageNumbers,
    handlePageChange,
  } = usePagination(filteredHabits, debouncedSearchQuery, (habit, query) =>
    habit.name.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH);
    }
  }, []);
  return (
    <div className="animate-in">
      {/* Header */}
      {/* <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl font-light">{t("habit.page_title")}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {t("habit.active")}:{" "}
            {
              habits.filter((h) => String(h.status).toLowerCase() === "active")
                .length
            }{" "}
            · {t("habit.total")}: {habits.length}
          </p>
        </div>
      </div> */}

      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--sidebar-muted)" }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("habit.search")}
          className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition-all
      focus:ring-2"
          style={{
            background: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
            color: "var(--text)",
          }}
        />
      </div>

      {/* Filter */}
      <div className="mb-5">
        <button
          onClick={() => setShowFilter((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-[var(--primary)]/20 px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--primary)]/8 cursor-pointer"
        >
          <SlidersHorizontal size={15} className="text-[var(--primary)]" />
          {t("habit_filter.title")}
          {activeFilterCount > 0 && (
            <span className="rounded-full p-0.5 bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
          {showFilter ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {showFilter && (
          <div className="mt-3">
            <HabitFilter
              categories={categories}
              selectedCategory={filterCategory}
              onCategoryChange={setFilterCategory}
              selectedPriority={filterPriority}
              onPriorityChange={setFilterPriority}
              selectedStatus={filterStatus}
              onStatusChange={setFilterStatus}
              frequencyFilter={frequencyFilter}
              onFrequencyChange={setFrequencyFilter}
              onClearAll={handleClearAll}
              activeFilterCount={activeFilterCount}
              setActiveFilterCount={setActiveFilterCount}
            />
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div
          className="rounded-xl border px-5 py-16 text-center"
          style={{
            background: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
          }}
        >
          <div
            className="mb-4 text-4xl flex items-center justify-center"
            style={{ color: "var(--primary)", opacity: 0.4 }}
          >
            <SparklesIcon size={48} />
          </div>

          <h3
            className="mb-2 text-2xl font-light"
            style={{ color: "var(--text)" }}
          >
            {habits.length === 0
              ? `${t("habit.ept-1")}`
              : searchQuery
                ? `${t("habit.ept-5")}`
                : `${t("habit.ept-3")}`}
          </h3>

          <p className="mb-5 text-sm" style={{ color: "var(--sidebar-muted)" }}>
            {habits.length === 0
              ? `${t("habit.ept-2")}`
              : searchQuery
                ? `${t("habit.ept-6")}`
                : `${t("habit.ept-4")}`}
          </p>

          {habits.length === 0 && (
            <button
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
              style={{ background: "var(--primary)", color: "var(--bg)" }}
              onClick={() => setShowAddForm(true)}
            >
              {t("habit.btn_create")}
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedItems.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              habitSchedules={habitSchedules}
              onUpdate={() => setUpdatingHabit(habit)}
              onUpdateStatus={(status) => updateHabit({ ...habit, status })}
              onDelete={() => {
                deleteHabit(habit.id);
                deleteHabitSchedulesByHabitId(habit.id);
                deleteGoalsByHabitId(habit.id);
              }}
              onSetGoal={() => setGoalHabit(habit)}
              hasActiveGoal={userGoals?.some(
                (g) =>
                  g.habitId === habit.id &&
                  (g.progress.status === "NOT_STARTED" ||
                    g.progress.status === "IN_PROGRESS"),
              )}
              categories={categories}
              isViewingToday={isViewingToday}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageNumbers={getPageNumbers}
        handlePageChange={handlePageChange}
      />

      <DailyCheckIns
        habits={habits}
        checkIns={checkIns}
        categories={categories}
        currentUserId={currentUser?.phone}
      />
      {showAddForm && (
        <HabitForm
          onClose={() => setShowAddForm(false)}
          onSubmit={createHabit}
          onSubmitSchedules={createHabitSchedules}
          categories={categories}
        />
      )}

      {updatingHabit && (
        <HabitForm
          initial={updatingHabit}
          initialSchedules={habitSchedules.filter(
            (s) => s.habitId === updatingHabit.id,
          )}
          onClose={() => setUpdatingHabit(null)}
          onSubmit={updateHabit}
          onSubmitSchedules={(schedules) =>
            replaceHabitSchedules(updatingHabit.id, schedules)
          }
          categories={categories}
        />
      )}

      {goalHabit && (
        <Modal
          title={t("goals.add_goal")}
          onClose={() => setGoalHabit(null)}
          size="sm"
        >
          <GoalForm
            habitId={goalHabit.id}
            habitName={goalHabit.name}
            onSubmit={(formData: GoalFormData) => {
              const newGoal: Omit<Goal, "id"> = {
                ...formData,
                endDate: formData.endDate || "",
              };
              try {
                createGoal(newGoal);
                ToastService.success(t("goals.add_success"));
                setGoalHabit(null);
              } catch (e: any) {
                ToastService.error(e.message || "Error");
              }
            }}
            onCancel={() => setGoalHabit(null)}
          />
        </Modal>
      )}
    </div>
  );
}
