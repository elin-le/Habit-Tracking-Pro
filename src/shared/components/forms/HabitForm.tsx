import Button from "../ui/Button";
import { Modal } from "../ui/Modal";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Style dùng chung cho input/select/textarea
const inputStyle: React.CSSProperties = {
  background: "var(--surface)",
  borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
  color: "var(--text)",
};

const labelClass = "mb-2 block text-sm font-medium";
const labelStyle: React.CSSProperties = { color: "var(--sidebar-muted)" };

interface HabitFormProps {
  onClose: () => void;
}

export function HabitForm({ onClose }: HabitFormProps) {
  return (
    <Modal title="Create Habit" onClose={onClose} size="md">
      <div className="flex flex-col gap-5">
        {/* Habit Name */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Habit Name *
          </label>
          <input
            placeholder="e.g. Morning meditation..."
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            style={
              {
                ...inputStyle,
                "--tw-ring-color":
                  "color-mix(in srgb, var(--primary) 12%, transparent)",
              } as React.CSSProperties
            }
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--primary)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor =
                inputStyle.borderColor as string)
            }
          />
        </div>

        {/* Category + Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>
              Category
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3"
              style={inputStyle}
            >
              <option>Health</option>
              <option>Study</option>
              <option>Work</option>
              <option>Mindfulness</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>
              Priority
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3"
              style={inputStyle}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Frequency
          </label>
          <div className="flex gap-2">
            <button
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium"
              style={{
                borderColor: "var(--primary)",
                background:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              Daily
            </button>

            <button
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium"
              style={inputStyle}
            >
              Specific Days
            </button>
          </div>
        </div>

        {/* Active Days */}
        <div>
          <label className="mb-3 block text-sm font-medium" style={labelStyle}>
            Active Days
          </label>
          <div className="flex gap-2">
            {DAY_LABELS.map((day) => (
              <button
                key={day}
                className="flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold text-white transition hover:scale-105"
                style={{
                  borderColor: "var(--primary)",
                  background: "var(--primary)",
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Target + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>
              Target per Day
            </label>
            <input
              type="number"
              value="1"
              readOnly
              className="w-full rounded-xl border px-4 py-3"
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>
              Status
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3"
              style={inputStyle}
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {/* Reminder */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Reminder Note
          </label>
          <textarea
            rows={3}
            placeholder="Add a motivating note..."
            className="w-full rounded-xl border px-4 py-3"
            style={inputStyle}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary">Create Habit</Button>
        </div>
      </div>
    </Modal>
  );
}
