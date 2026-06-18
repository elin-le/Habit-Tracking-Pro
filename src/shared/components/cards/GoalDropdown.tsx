import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";

export interface GoalDropdownProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

const DropdownItem: React.FC<{
    icon: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
    children: React.ReactNode;
}> = ({ icon, onClick, danger, children }) => (
    <button
        role="menuitem"
        onClick={onClick}
        className={`
            flex items-center gap-2.5 w-full px-4 py-2.5
            text-sm font-semibold text-left
            transition-colors duration-100
            ${danger
                ? "text-red-500 hover:bg-red-50/50"
                : "opacity-90 hover:bg-white/5"
            }
        `}
    >
        <span className={danger ? "text-red-400" : "opacity-50"}>{icon}</span>
        {children}
    </button>
);

export const GoalDropdown: React.FC<GoalDropdownProps> = ({ onEdit, onDelete }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Goal options"
                aria-expanded={open}
                className="
                    p-1.5 rounded-lg
                    opacity-50 hover:opacity-100
                    hover:bg-white/10
                    transition-all duration-150
                "
            >
                <MoreVertical size={15} />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div
                        className="
                            absolute right-0 top-8 z-50
                            min-w-[152px] py-1.5
                            border rounded-2xl shadow-2xl
                            overflow-hidden
                            animate-in fade-in slide-in-from-top-2 duration-150
                        "
                        style={{
                            background: "var(--surface)",
                            borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
                        }}
                        role="menu"
                    >
                        <DropdownItem icon={<Edit3 size={13} />} onClick={() => { setOpen(false); onEdit?.(); }}>
                            {t("goals.edit_goal")}
                        </DropdownItem>
                        <div className="my-1 mx-3 border-t" style={{ borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }} />
                        <DropdownItem
                            icon={<Trash2 size={13} />}
                            onClick={() => { setOpen(false); onDelete?.(); }}
                            danger
                        >
                            {t("goals.delete_goal")}
                        </DropdownItem>
                    </div>
                </>
            )}
        </div>
    );
};
