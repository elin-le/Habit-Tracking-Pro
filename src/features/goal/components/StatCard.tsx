import React from "react";
import "../Goals.css";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div
    className="
            flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl
            border goal-stat-card
        "
  >
    <div className="flex flex-col gap-2">
      {icon}
      <p className="text-[11px] font-bold uppercase tracking-wide opacity-60 leading-snug">
        {label}
      </p>
    </div>
    <p className="text-xl sm:text-2xl font-black text-[var(--text)]">{value}</p>
  </div>
);