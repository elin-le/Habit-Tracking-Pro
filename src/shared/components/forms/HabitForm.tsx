import { useState } from "react";
import {
  DAY_LABELS,
  DAY_OF_WEEK_MAP,
  STORAGE_KEY,
} from "../../constants/appConstants";
import type {
  FrequencyType,
  Habit,
  HabitStatus,
  Priority,
} from "../../types/Habit";

import { useTranslation } from "react-i18next";
import type { HabitSchedule } from "../../types/HabitSchedule";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { toast } from "sonner";
import type { Category } from "@/shared/types/Category";
import type { User } from "@/shared/types/User";
import { useLocation, useNavigate } from "react-router-dom";

// Style dùng chung cho input/select/textarea
const inputStyle: React.CSSProperties = {
  background: "var(--surface)",
  borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
  color: "var(--text)",
};

const labelClass = "mb-2 block text-sm font-medium";
const labelStyle: React.CSSProperties = { color: "var(--sidebar-muted)" };

interface HabitFormProps {
  initial?: Partial<Habit>;
  initialSchedules?: HabitSchedule[];
  onClose: () => void;
  onSubmit: (data: Habit) => void;
  onSubmitSchedules: (schedules: HabitSchedule[]) => void;
  categories: Category[];
}

export function HabitForm({
  initial,
  initialSchedules,
  onClose,
  onSubmit,
  onSubmitSchedules,
  categories,
}: HabitFormProps) {
  const currentUser = JSON.parse(
    localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}",
  ) as User;
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const isPaused = initial?.status === "PAUSED";

  const [nameError, setNameError] = useState("");
  const [targetPerDayError, setTargetPerDayError] = useState("");
  const [activeDays, setActiveDays] = useState<number[]>(() => {
    if (!initialSchedules) return [];
    // convert DayOfWeek string → index
    return initialSchedules
      .map((s) => DAY_OF_WEEK_MAP.indexOf(s.dayOfWeek))
      .filter((i) => i !== -1);
  });
  const [form, setForm] = useState<{
    name: string;
    categoryId: string;
    frequencyType: FrequencyType;
    targetPerDay: number | "";
    priority: Priority;
    status: HabitStatus;
  }>({
    name: initial?.name ?? "",
    categoryId: initial?.categoryId ?? "cat_health",
    frequencyType: initial?.frequencyType ?? ("DAILY" as FrequencyType),
    targetPerDay: (initial?.targetPerDay ?? 1) as number | "",
    priority: initial?.priority ?? ("LOW" as Priority),
    status: initial?.status ?? ("ACTIVE" as HabitStatus),
  });

  const validateName = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return `${t("habit_form.val-name-1")}`;
    if (trimmed.length < 2) return `${t("habit_form.val-name-2")}`;
    if (trimmed.length > 50) return `${t("habit_form.val-name-3")}`;
    return "";
  };

  const validateTargetPerDay = (value: number | ""): string => {
    if (value === "" || value < 1) return `${t("habit_form.val-name-4")}`;
    return "";
  };

  const toggleDay = (dayIndex: number) => {
    setActiveDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex],
    );
  };

  const handleSubmit = () => {
    const nameError = validateName(form.name);
    const targetError = validateTargetPerDay(form.targetPerDay);

    setNameError(nameError);
    setTargetPerDayError(targetError);

    if (nameError || targetError) return;

    const newHabit: Habit = {
      ...form,
      id: initial?.id ?? crypto.randomUUID(),
      userId: initial?.userId ?? currentUser.phone,
    };

    onSubmit(newHabit);

    if (form.frequencyType === "DAY_OF_WEEK" && activeDays.length > 0) {
      const schedules: HabitSchedule[] = activeDays.map((dayIndex) => ({
        id: crypto.randomUUID(),
        habitId: newHabit.id,
        dayOfWeek: DAY_OF_WEEK_MAP[dayIndex], // map number -> string
      }));

      onSubmitSchedules(schedules);
    } else {
      onSubmitSchedules([]);
    }

    if (initial?.id) {
      toast.success(`"${newHabit.name}" ${t("habit_form.updated")}`);
    } else {
      toast.success(`"${newHabit.name}" ${t("habit_form.created")}`);
    }

    onClose();
  };

  return (
    <Modal
      title={
        initial?.id ? `${t("habit_form.title2")}` : `${t("habit_form.title1")}`
      }
      onClose={onClose}
      size="md"
    >
      <div className="flex flex-col gap-5">
        {/* Habit Name */}
        <div>
          <div className="flex justify-between">
            <label className={labelClass} style={labelStyle}>
              {t("habit_form.name")}
            </label>
            <p className="text-sm text-gray-500">{form.name.length}/50</p>
          </div>
          <input
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }));
              setNameError(validateName(form.name));
              if (nameError) setNameError(validateName(e.target.value)); // validate lại khi đang gõ (nếu đã từng lỗi)
            }}
            placeholder="e.g. Morning meditation..."
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4"
            style={
              {
                ...inputStyle,
                borderColor: nameError
                  ? "#ef4444"
                  : (inputStyle.borderColor as string),
                "--tw-ring-color": nameError
                  ? "color-mix(in srgb, #ef4444 12%, transparent)"
                  : "color-mix(in srgb, var(--primary) 12%, transparent)",
              } as React.CSSProperties
            }
            maxLength={50}
            onFocus={(e) => {
              if (!nameError)
                e.currentTarget.style.borderColor = "var(--primary)";
            }}
          />
          {nameError && (
            <p className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
              {nameError}
            </p>
          )}
        </div>

        {/* Category + Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>
              {t("habit_form.category")}
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3 cursor-pointer"
              style={inputStyle}
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoryId: e.target.value }))
              }
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {t(`habit_form.${cat.name}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>
              {t("habit_form.priority")}
            </label>
            <select
              className="w-full rounded-xl border px-4 py-3 cursor-pointer"
              style={inputStyle}
              value={form.priority}
              onChange={(e) =>
                setForm((f) => ({ ...f, priority: e.target.value as Priority }))
              }
            >
              <option value="LOW">{t("habit_form.LOW")}</option>
              <option value="MEDIUM">{t("habit_form.MEDIUM")}</option>
              <option value="HIGH">{t("habit_form.HIGH")}</option>
            </select>
          </div>
        </div>

        {/* Frequency */}
        <div>
          {isPaused && (
            <p
              className="mt-1 text-xs"
              style={{ color: "oklch(44.2% 0.017 285.786)" }}
            >
              {t("habit_form.paused-hint")}
            </p>
          )}
          <label className={labelClass} style={labelStyle}>
            {t("habit_form.frequency")}
          </label>
          <div className="flex gap-2 ">
            <button
              type="button"
              onClick={() =>
                !isPaused && setForm({ ...form, frequencyType: "DAILY" })
              }
              disabled={isPaused}
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium cursor-pointer disabled:cursor-not-allowed"
              style={
                form.frequencyType === "DAILY"
                  ? {
                      borderColor: "var(--primary)",
                      background:
                        "color-mix(in srgb, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }
                  : inputStyle
              }
            >
              {t("habit_form.DAILY")}
            </button>

            <button
              type="button"
              onClick={() =>
                !isPaused && setForm({ ...form, frequencyType: "DAY_OF_WEEK" })
              }
              disabled={isPaused}
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium cursor-pointer disabled:cursor-not-allowed"
              style={
                form.frequencyType === "DAY_OF_WEEK"
                  ? {
                      borderColor: "var(--primary)",
                      background:
                        "color-mix(in srgb, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }
                  : inputStyle
              }
            >
              {t("habit_form.DAY_OF_WEEK")}
            </button>
          </div>
        </div>

        {/* Active Days — chỉ hiện khi DAY_OF_WEEK */}
        {form.frequencyType === "DAY_OF_WEEK" && (
          <div>
            <label
              className="mb-3 block text-sm font-medium"
              style={labelStyle}
            >
              {t("habit_form.a-days")}
            </label>
            <div className="flex gap-2">
              {DAY_LABELS.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => !isPaused && toggleDay(index)}
                  disabled={isPaused}
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
                  style={
                    activeDays.includes(index)
                      ? {
                          borderColor: "var(--primary)",
                          background: "var(--primary)",
                          color: "#fff",
                        }
                      : { ...inputStyle, color: "var(--sidebar-muted)" }
                  }
                >
                  {t(`days.${day}`)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Target + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>
              {t("habit_form.target-p-days")}
            </label>
            <input
              type="number"
              min={1}
              max={999}
              disabled={isPaused}
              value={form.targetPerDay}
              onChange={(e) => {
                if (isPaused) return;
                const value = e.target.value;

                if (value === "") {
                  setForm((f) => ({ ...f, targetPerDay: "" })); // ✅ callback form
                  setTargetPerDayError(validateTargetPerDay(""));
                  return;
                }

                const numValue = Math.min(999, Number(value));

                setForm((f) => ({ ...f, targetPerDay: numValue }));
                setTargetPerDayError(validateTargetPerDay(numValue));
              }}
              onFocus={(e) => {
                if (!targetPerDayError)
                  e.currentTarget.style.borderColor = "var(--primary)";
              }}
              className="w-full rounded-xl border px-4 py-3 disabled:cursor-not-allowed"
              style={
                {
                  ...inputStyle,

                  borderColor: targetPerDayError
                    ? "#ef4444"
                    : (inputStyle.borderColor as string),

                  "--tw-ring-color": targetPerDayError
                    ? "color-mix(in srgb, #ef4444 12%, transparent)"
                    : "color-mix(in srgb, var(--primary) 12%, transparent)",
                } as React.CSSProperties
              }
            />
            {targetPerDayError && (
              <p className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
                {targetPerDayError}
              </p>
            )}
          </div>

          {!initial?.id && (
            <div>
              <label className={labelClass} style={labelStyle}>
                {t("habit_form.status")}
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as HabitStatus,
                  }))
                }
                className="w-full rounded-xl border px-4 py-3"
                style={inputStyle}
              >
                <option value="ACTIVE">{t("habit_form.s-1")}</option>
                <option value="PAUSED">{t("habit_form.s-2")}</option>
                <option value="ARCHIVED">{t("habit_form.s-3")}</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
            style={{
              borderColor:
                "color-mix(in srgb, var(--primary) 20%, transparent)",
              background: "color-mix(in srgb, var(--primary) 4%, transparent)",
              color: "var(--text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--primary) 10%, transparent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--primary) 4%, transparent)";
            }}
          >
            {t("habit_form.btn_cancel")}
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              if (!location.pathname.includes("/habits")) {
                navigate("/dashboard/habits");
              }
            }}
            className="cursor-pointer"
          >
            {form.name
              ? `${t("habit_form.btn_create2")}`
              : `${t("habit_form.btn_create1")}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
