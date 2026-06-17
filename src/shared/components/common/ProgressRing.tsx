import React from "react";

export interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    isCompleted?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 80,
    strokeWidth = 7,
    color,
    isCompleted,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const cleanProgress = Math.min(Math.max(progress, 0), 100);
    const offset = circumference - (cleanProgress / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            style={{ transform: "rotate(-90deg)" }}
            aria-hidden="true"
        >
            {/* Track */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="color-mix(in srgb, var(--primary) 12%, transparent)"
                strokeWidth={strokeWidth}
            />
            {/* Progress arc */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isCompleted ? "#10b981" : color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
            />
        </svg>
    );
};
