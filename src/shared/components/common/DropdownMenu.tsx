import { Archive, Edit2, Pause, Play, Target, Trash2 } from "lucide-react";

interface DropdownMenuProps {
  onClose: () => void;
}

const items = [
  {
    icon: <Edit2 size={14} />,
    label: "Edit",
    action: () => console.log("Edit clicked"),
  },
  {
    icon: <Target size={14} />,
    label: "Set Goal",
    action: () => console.log("Set Goal clicked"),
  },
  // habit.status === "Active" ? Pause : Resume
  {
    icon: <Play size={14} />,
    label: "Resume",
    action: () => console.log("Resume clicked"),
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

export function DropdownMenu({ onClose }: DropdownMenuProps) {
  return (
    <div
      className="absolute right-5 top-25 z-100 min-w-40 overflow-hidden rounded-xl border shadow-lg"
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
          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors"
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
          {item.label}
        </button>
      ))}
    </div>
  );
}
