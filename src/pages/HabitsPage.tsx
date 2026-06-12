import { PlusIcon, Search, SparklesIcon } from "lucide-react";
import { HabitCard } from "../shared/components/cards/HabitCard";
import { HabitForm } from "../shared/components/forms/HabitForm";
import { HabitFilter } from "../shared/components/filters/HabitFilter";
import { useState } from "react";

export function HabitsPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl font-light">My Habits</h1>
          <p className="mt-1 text-sm text-gray-500">3 active · 5 total</p>
        </div>

        <button
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium rounded-xl transition-colors px-4 h-9 text-sm"
          onClick={() => setShowAddForm(true)}
        >
          <PlusIcon />
          New Habit
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--sidebar-muted)" }}
        />
        <input
          type="text"
          placeholder="Search habits..."
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
          No habits yet
        </h3>

        <p className="mb-5 text-sm" style={{ color: "var(--sidebar-muted)" }}>
          Start building better habits today
        </p>

        <button
          className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
          style={{ background: "var(--primary)", color: "var(--bg)" }}
        >
          Create your first habit
        </button>
      </div>

      {/* Habit Grid Example */}
      {/* <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
        <HabitCard />
        <HabitCard />
        <HabitCard />
      </div> */}

      {showAddForm && <HabitForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}
