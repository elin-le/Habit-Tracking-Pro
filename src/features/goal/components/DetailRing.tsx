import React from "react";
import "../Goals.css";

interface DetailRingProps {
  percent: number;
  color: string;
}

export const DetailRing: React.FC<DetailRingProps> = ({ percent, color }) => {
  const size = 72;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.min(percent, 100) / 100) * circ;

  return (
    <div className="relative w-[72px] h-[72px] shrink-0">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="color-mix(in srgb, var(--primary) 15%, transparent)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="goal-ring-progress"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-black"
        style={{ color }}
      >
        {percent}%
      </span>
    </div>
  );
};
