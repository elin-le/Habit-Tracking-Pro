import {
  MoreVertical,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "../common/DropdownMenu";

export function HabitCard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
      }}
    >
      {/* Status Stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: "var(--primary)" }}
      />

      {/* Goal Banner */}
      <div
        className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs"
        style={{
          background: "color-mix(in srgb, #f59e0b 8%, transparent)",
          borderColor: "color-mix(in srgb, #f59e0b 25%, transparent)",
          color: "var(--text)",
        }}
      >
        🏆 Goal Achieved!
      </div>

      {/* Header */}
      <div className="mb-4 flex items-start gap-3 pl-2">
        <span className="text-2xl">💧</span>
        <div className="flex-1">
          <h3
            className="truncate text-base font-medium"
            style={{ color: "var(--text)" }}
          >
            Drink Water
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className="rounded-full px-2 py-1 text-xs"
              style={{
                background:
                  "color-mix(in srgb, var(--primary) 15%, transparent)",
                color: "var(--primary)",
              }}
            >
              Health
            </span>
            <span
              className="rounded-full px-2 py-1 text-xs"
              style={{
                background: "color-mix(in srgb, #ef4444 12%, transparent)",
                color: "#ef4444",
              }}
            >
              High
            </span>
          </div>
        </div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ color: "var(--sidebar-muted)" }}
          onClick={() => setMenuOpen(true)}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-3 gap-2 pl-2">
        {[
          ["🔥 Current", "15d"],
          ["Best", "30d"],
          ["Rate", "85%"],
        ].map(([label, val]) => (
          <div
            className="rounded-lg p-3"
            style={{
              background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-wide"
              style={{ color: "var(--sidebar-muted)" }}
            >
              {label}
            </span>
            <p
              className="text-lg font-semibold"
              style={{ color: "var(--text)" }}
            >
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* Checkin */}
      <div
        className="flex items-center gap-4 rounded-xl p-4"
        style={{
          background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-4 text-sm font-semibold"
          style={{ borderColor: "var(--primary)", color: "var(--text)" }}
        >
          3/5
        </div>
        <div className="flex-1">
          <div
            className="mb-2 flex items-center gap-2 text-sm"
            style={{ color: "#4ade80" }}
          >
            <CheckCircle size={14} /> Completed today!
          </div>
          <div className="flex gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--sidebar-muted)",
                color: "var(--sidebar-muted)",
              }}
            >
              <ChevronDown size={14} />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--primary)",
                background:
                  "color-mix(in srgb, var(--primary) 12%, transparent)",
                color: "var(--primary)",
              }}
            >
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
        <div
          className="max-w-25 text-right text-xs italic"
          style={{ color: "var(--sidebar-muted)" }}
        >
          Drink 2L today
        </div>
      </div>

      {menuOpen && <DropdownMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
