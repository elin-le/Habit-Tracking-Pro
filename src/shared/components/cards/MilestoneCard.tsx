import React from "react";
import { useTranslation } from "react-i18next";
import { Award } from "lucide-react";
import type { Milestone } from "../../types/Goal";

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> =
  {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-800/50",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-900/30",
      text: "text-rose-700 dark:text-rose-300",
      border: "border-rose-200 dark:border-rose-800/50",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-800/50",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800/50",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800/50",
    },
  };

export interface MilestoneCardProps {
  milestones: Milestone[];
  habitColor?: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestones = [],
  habitColor = "indigo",
}) => {
  const { t } = useTranslation();

  // Tìm mốc cao nhất đã đạt được
  const highestReached = [...milestones].reverse().find((m) => m.isReached);

  if (!highestReached) {
    return null;
  }

  const themeClasses = COLOR_MAP[habitColor] || COLOR_MAP["indigo"];

  return (
    <div
      className={`mt-4 p-4 rounded-2xl border flex items-center gap-3 ${themeClasses.bg} ${themeClasses.border} ${themeClasses.text}`}
    >
      <Award
        size={24}
        className={`text-${habitColor}-500 dark:text-${habitColor}-400`}
      />
      <span className="font-semibold text-sm">
        {t(highestReached.labelKey)}
      </span>
    </div>
  );
};
