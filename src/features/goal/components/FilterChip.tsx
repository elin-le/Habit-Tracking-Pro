import React from "react";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeClass?: string;
  inactiveClass?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  active,
  onClick,
  children,
  activeClass = "bg-primary text-white border-primary shadow-sm",
  inactiveClass = "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
            h-8 px-4 rounded-full text-sm font-semibold
            border transition-all duration-150
            ${active ? activeClass : inactiveClass}
        `}
  >
    {children}
  </button>
);
