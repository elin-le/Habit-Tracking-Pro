import { Search, SparklesIcon } from "lucide-react";
import { HabitCard } from "../../../shared/components/cards/HabitCard";
import { HabitFilter } from "../../../shared/components/filters/HabitFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/common/Pagination";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import type { Habit } from "../../../shared/types/Habit";
import type { HabitSchedule } from "../../../shared/types/HabitSchedule";
import { HabitForm } from "../../../shared/components/forms/HabitForm";
import { useState } from "react";

type LayoutContext = {
  habits: Habit[];
  createHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  habitSchedules: HabitSchedule[];
  createHabitSchedules: (s: HabitSchedule[]) => void;
  replaceHabitSchedules: (habitId: string, s: HabitSchedule[]) => void;
  showAddForm: boolean;
  setShowAddForm: (v: boolean) => void;
};

export function HabitsPage() {
  const { t } = useTranslation();
  const {
    habits,
    showAddForm,
    createHabit,
    createHabitSchedules,
    setShowAddForm,
    updateHabit,
    replaceHabitSchedules,
  } = useOutletContext<LayoutContext>();

  const {
    currentPage,
    totalPages,
    paginatedItems,
    // filteredItems,
    getPageNumbers,
    handlePageChange,
  } = usePagination(habits, "", (habit, query) =>
    habit.name.toLowerCase().includes(query.toLowerCase()),
  );

  const [updatingHabit, setUpdatingHabit] = useState<Habit | null>(null);

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
        <HabitFilter />
      </div>

      {/* Empty State */}
      {habits.length === 0 ? (
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
            {t("habit.ept-1")}
          </h3>

          <p className="mb-5 text-sm" style={{ color: "var(--sidebar-muted)" }}>
            {t("habit.ept-2")}
          </p>

          <button
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ background: "var(--primary)", color: "var(--bg)" }}
            onClick={() => setShowAddForm(true)}
          >
            {t("habit.btn_create")}
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedItems.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
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
