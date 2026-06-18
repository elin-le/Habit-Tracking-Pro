import React from "react";
import { useTranslation } from "react-i18next";
import { Trophy, Sparkles, Award, Flame } from "lucide-react";
import type { Milestone } from "../../../shared/types/Goal.ts";
import "../Goals.css";

type RewardLevel = "completed" | "near" | "milestone" | "motivation" | null;

interface RewardBannerProps {
  level: RewardLevel;
  milestones?: Milestone[];
  themeHex: string;
  themeName: string;
}

export const RewardBanner: React.FC<RewardBannerProps> = ({
  level,
  milestones = [],
  themeHex,
}) => {
  const { t } = useTranslation();
  if (!level) return null;

  const highestReached = [...milestones].reverse().find((m) => m.isReached);

  const config = {
    completed: {
      color: "#10b981",
      darkColor: "#059669",
      icon: <Trophy size={28} strokeWidth={1.5} />,
      eyebrow: t("goals.completed").toUpperCase(),
      headline: t("goals.congrats_completed"),
    },
    near: {
      color: "#8b5cf6",
      darkColor: "#7c3aed",
      icon: <Sparkles size={28} strokeWidth={1.5} />,
      eyebrow: "80%+",
      headline: t("goals.congrats_near"),
    },
    milestone: {
      color: themeHex,
      darkColor: themeHex,
      icon: <Award size={28} strokeWidth={1.5} />,
      eyebrow: "",
      headline: highestReached ? t(highestReached.labelKey) : "",
    },
    motivation: {
      color: "#f97316",
      darkColor: "#ea580c",
      icon: <Flame size={28} strokeWidth={1.5} />,
      eyebrow: t("goals.motivation_eyebrow", "CỐ GẮNG LÊN"),
      headline: t(
        "goals.motivation_headline",
        "Hành trình ngàn dặm bắt đầu từ một bước chân. Bạn làm được mà!",
      ),
    },
  }[level];

  return (
    <div
      className="relative overflow-hidden rounded-2xl reward-banner-card"
      style={{
        "--reward-color": config.color,
        "--reward-dark-color": config.darkColor,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none reward-banner-bg"
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px] reward-banner-top-line"
      />

      <div className="relative flex items-stretch gap-0 min-h-[72px]">
        <div
          className="shrink-0 flex items-center justify-center w-20 reward-banner-icon-container"
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl reward-banner-icon-box"
          >
            {config.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3.5 flex flex-col justify-center">
          {config.eyebrow && (
            <p
              className="text-[10px] font-black tracking-[0.14em] mb-1 reward-banner-eyebrow"
            >
              {config.eyebrow}
            </p>
          )}
          <p
            className="text-[13px] font-semibold leading-snug text-[var(--text)]/80"
          >
            {config.headline}
          </p>
        </div>
      </div>
    </div>
  );
};
