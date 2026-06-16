import type { HabitStatus } from "@/shared/types/Habit";
import {
  Archive,
  ArchiveRestore,
  Edit2,
  Pause,
  Play,
  Target,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface DropdownMenuProps {
  habitName: string;
  status: string;
  onClose: () => void;
  onUpdate: () => void;
  onUpdateStatus: (status: HabitStatus) => void;
  onDelete: () => void;
}

export function DropdownMenu({
  habitName,
  status,
  onClose,
  onUpdate,
  onUpdateStatus,
  onDelete,
}: DropdownMenuProps) {
  const { t } = useTranslation();

  const handleUpdateStatus = (newStatus: HabitStatus) => {
    onUpdateStatus(newStatus);
    onClose();
    const messages: Record<HabitStatus, string> = {
      PAUSED: `"${habitName}" ${t("habit_toast.toast-1")}`,
      ACTIVE: `"${habitName}" ${t("habit_toast.toast-2")}`,
      ARCHIVED: `"${habitName}" ${t("habit_toast.toast-3")}`,
    };
    toast.success(messages[newStatus]);
  };

  const items = [
    ...(status !== "ARCHIVED"
      ? [{ icon: <Edit2 size={14} />, label: "Edit", action: onUpdate }]
      : []),

    ...(status === "ACTIVE"
      ? [
          {
            icon: <Target size={14} />,
            label: "Set Goal",
            action: () => console.log("Set Goal"),
          },
        ]
      : []),

    ...(status === "ACTIVE"
      ? [
          {
            icon: <Pause size={14} />,
            label: "Pause",
            action: () => handleUpdateStatus("PAUSED"),
          },
          {
            icon: <Archive size={14} />,
            label: "Archive",
            action: () => handleUpdateStatus("ARCHIVED"),
          },
        ]
      : status === "PAUSED"
        ? [
            {
              icon: <Play size={14} />,
              label: "Resume",
              action: () => handleUpdateStatus("ACTIVE"),
            },
            {
              icon: <Archive size={14} />,
              label: "Archive",
              action: () => handleUpdateStatus("ARCHIVED"),
            },
          ]
        : [
            {
              icon: <ArchiveRestore size={14} />,
              label: "Unarchive",
              action: () => handleUpdateStatus("ACTIVE"),
            },
          ]),

    {
      icon: <Trash2 size={14} />,
      label: "Delete",
      action: onDelete,
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
