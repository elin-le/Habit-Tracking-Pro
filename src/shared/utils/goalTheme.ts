import type { TargetType } from "../types/Goal";

export const GOAL_THEME = {
    STREAK: {
        name: "orange",
        hex: "#f97316",
        badgeBg: "bg-[#f97316]/15",
        badgeText: "text-[#f97316]",
        progressBar: "bg-[#f97316]",
        glow: "hover:shadow-[#f97316]/10",
        inputFocus: "focus:!border-[#f97316]"
    },
    TOTAL_COMPLETIONS: {
        name: "emerald",
        hex: "#10b981", 
        badgeBg: "bg-[#10b981]/15",
        badgeText: "text-[#10b981]",
        progressBar: "bg-[#10b981]",
        glow: "hover:shadow-[#10b981]/10",
        inputFocus: "focus:!border-[#10b981]"
    }
};

export const getGoalTheme = (type: TargetType) => GOAL_THEME[type];
