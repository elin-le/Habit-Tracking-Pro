import { SlidersHorizontal } from "lucide-react";
import { FilterChip } from "../common/FilterChip";

export function HabitFilter() {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={16} style={{ color: "var(--primary)" }} />

        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--sidebar-muted)" }}
        >
          Filters
        </span>

        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          3
        </span>

        <button
          className="ml-auto text-xs font-medium transition-colors"
          style={{ color: "var(--primary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Category */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active>All</FilterChip>
            <FilterChip>Health</FilterChip>
            <FilterChip>Study</FilterChip>
            <FilterChip>Work</FilterChip>
            <FilterChip>Mindfulness</FilterChip>
            <FilterChip>Other</FilterChip>
          </div>
        </div>

        {/* Priority */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Priority
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active>All</FilterChip>
            <FilterChip>Low</FilterChip>
            <FilterChip>Medium</FilterChip>
            <FilterChip>High</FilterChip>
          </div>
        </div>

        {/* Status */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active>All</FilterChip>
            <FilterChip>Active</FilterChip>
            <FilterChip>Paused</FilterChip>
            <FilterChip>Archived</FilterChip>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Frequency
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active>All</FilterChip>
            <FilterChip>Daily</FilterChip>
            <FilterChip>Specific Days</FilterChip>
          </div>
        </div>
      </div>
    </div>
  );
}
