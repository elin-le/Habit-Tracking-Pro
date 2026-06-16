import { Archive, Edit2, Pause, Play, Target, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DropdownMenuProps {
  status: string;
  onClose: () => void;
  onUpdate: () => void;
}

export function DropdownMenu({ onClose, status, onUpdate }: DropdownMenuProps) {
  const { t } = useTranslation();
  const items = [
    {
      icon: <Edit2 size={14} />,
      label: "Edit",
      action: onUpdate,
    },
    {
      icon: <Target size={14} />,
      label: "SetGoal",
      action: () => console.log("Set Goal clicked"),
    },
    {
      icon: status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />,
      label: status === "ACTIVE" ? "Pause" : "Resume",
      action:
        status === "ACTIVE"
          ? () => console.log("Pause clicked")
          : () => console.log("Resume clicked"),
    },
    {
      icon: <Archive size={14} />,
      label: "Archive",
      action: () => console.log("Archive clicked"),
    },
    {
      icon: <Trash2 size={14} />,
      label: "Delete",
      action: () => console.log("Delete clicked"),
      danger: true,
    },
  ];

  return (
    <div
      className="absolute right-3 top-3 z-100 min-w-40 overflow-hidden rounded-xl border shadow-lg"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
      }}
      onMouseLeave={onClose}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.action}
          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors cursor-pointer"
          style={{
            color: item.danger ? "#ef4444" : "var(--sidebar-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = item.danger
              ? "color-mix(in srgb, #ef4444 10%, transparent)"
              : "color-mix(in srgb, var(--primary) 8%, transparent)";
            e.currentTarget.style.color = item.danger
              ? "#ef4444"
              : "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = item.danger
              ? "#ef4444"
              : "var(--sidebar-muted)";
          }}
        >
          {item.icon}
          {t(`dd-menu.${item.label}`)}
        </button>
      ))}
    </div>
  );
}
