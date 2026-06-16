import { Search, SparklesIcon } from "lucide-react";
import { HabitCard } from "../../../shared/components/cards/HabitCard";
import { HabitFilter } from "../../../shared/components/filters/HabitFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/common/Pagination";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import type { Habit, HabitStatus, Priority } from "../../../shared/types/Habit";
import type {
  DaysOfWeek,
  HabitSchedule,
} from "../../../shared/types/HabitSchedule";
import { HabitForm } from "../../../shared/components/forms/HabitForm";
import { useMemo, useState } from "react";
import { DAY_OF_WEEK_MAP } from "@/shared/constants/appConstants";
import { useDebounce } from "@/shared/hooks/useDebounce";

type LayoutContext = {
  habits: Habit[];
  createHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  habitSchedules: HabitSchedule[];
  createHabitSchedules: (s: HabitSchedule[]) => void;
  replaceHabitSchedules: (habitId: string, s: HabitSchedule[]) => void;
  deleteHabitSchedulesByHabitId: (habitId: string) => void;
  showAddForm: boolean;
  setShowAddForm: (v: boolean) => void;
};

export function HabitsPage() {
  const { t } = useTranslation();
  const {
    habits,
    showAddForm,
    habitSchedules,
    createHabit,
    createHabitSchedules,
    setShowAddForm,
    updateHabit,
    replaceHabitSchedules,
    deleteHabit,
    deleteHabitSchedulesByHabitId,
  } = useOutletContext<LayoutContext>();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [updatingHabit, setUpdatingHabit] = useState<Habit | null>(null);

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);
  const [filterStatus, setFilterStatus] = useState<HabitStatus | null>(
    "ACTIVE",
  );
  const [frequencyFilter, setFrequencyFilter] = useState<DaysOfWeek | null>(
    DAY_OF_WEEK_MAP[new Date().getDay()],
  );

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
      const statusOk = filterStatus
        ? habit.status === filterStatus
        : habit.status === "ACTIVE";

      const categoryOk = !filterCategory || habit.categoryId === filterCategory;

      const priorityOk = !filterPriority || habit.priority === filterPriority;

      let scheduleOk = true;
      if (statusOk && habit.status === "ACTIVE" && frequencyFilter) {
        scheduleOk = isScheduledOnDow(habit, frequencyFilter);
      }

      // console.log(habit.name, {
      //   statusOk,
      //   categoryOk,
      //   priorityOk,
      //   scheduleOk,
      //   status: habit.status,
      // });

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

  // console.log(filterCategory);
  // console.log(filterPriority);
  // console.log(filterStatus);
  // console.log(frequencyFilter);

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
        <HabitFilter
          selectedCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          selectedPriority={filterPriority}
          onPriorityChange={setFilterPriority}
          selectedStatus={filterStatus}
          onStatusChange={setFilterStatus}
          frequencyFilter={frequencyFilter}
          onFrequencyChange={setFrequencyFilter}
          onClearAll={handleClearAll}
        />
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
              onUpdate={() => setUpdatingHabit(habit)}
              onUpdateStatus={(status) => updateHabit({ ...habit, status })}
              onDelete={() => {
                deleteHabit(habit.id);
                deleteHabitSchedulesByHabitId(habit.id);
              }}
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

      {showAddForm && (
        <HabitForm
          onClose={() => setShowAddForm(false)}
          onSubmit={createHabit}
          onSubmitSchedules={createHabitSchedules}
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
        />
      )}
    </div>
  );
}
