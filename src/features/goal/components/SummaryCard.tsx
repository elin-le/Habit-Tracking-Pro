import React from "react";
import "../Goals.css";

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  iconClass: string;
  activeColorClass?: string;
  onClick?: () => void;
  active?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  label,
  value,
  iconClass,
  activeColorClass = "border-[var(--primary)] ring-1 ring-[var(--primary)]/15",
  onClick,
  active,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className={`
            flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl text-left w-full
            border transition-all duration-200
            ${onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : "cursor-default"}
            ${active ? activeColorClass : "border-transparent"}
        `}
    style={{
      background: active ? undefined : "color-mix(in srgb, var(--surface) 80%, transparent)",
      borderColor: active
        ? undefined
        : "color-mix(in srgb, var(--primary) 12%, transparent)",
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
