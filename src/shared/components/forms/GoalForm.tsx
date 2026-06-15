import React, { useState } from "react";
import { AlertCircle, Flame, Target } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

// Types

export interface GoalFormData {
  id: string;
  habitId: string;
  habitName: string;
  goalType: "STREAK" | "TOTAL_COMPLETIONS";
  targetValue: number;
  startedDate: string;
  endDate?: string;
  progress: {
    currentProgress: number;
    progressPercent: number;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  };
}

interface GoalFormProps {
  habitId: string;
  habitName: string;
  onSubmit?: (data: GoalFormData) => void;
  onCancel?: () => void;
}

interface FormErrors {
  targetValue?: string;
  endDate?: string;
}

// Input base class

// Tailwind class string reused across all inputs — dark mode aware
const INPUT_CLASS = `
    w-full h-12 px-4 rounded-2xl text-sm font-medium
    border border-slate-200 dark:border-slate-700/60
    bg-white dark:bg-slate-800/60
    text-slate-800 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    outline-none
    focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10
    transition-all duration-200
`;

// GoalForm

const GoalForm: React.FC<GoalFormProps> = ({
  habitId,
  habitName,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();

  const [goalType, setGoalType] = useState<"STREAK" | "TOTAL_COMPLETIONS">(
    "STREAK",
  );
  const [targetValue, setTargetValue] = useState("");
  const [startedDate, setStartedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const unit = goalType === "STREAK" ? t("goals.days") : t("goals.times");

  // Validation

  const validate = (): boolean => {
    const next: FormErrors = {};
    const num = Number(targetValue);

    if (!targetValue || isNaN(num) || num <= 0) {
      next.targetValue = t("goals.error_target_required");
    }
    if (endDate && endDate < startedDate) {
      next.endDate = t("goals.error_end_before_start");
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Submit

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const num = Number(targetValue);

    if (onSubmit) {
      onSubmit({
        id: "goal_" + Math.random().toString(36).slice(2, 11),
        habitId,
        habitName,
        goalType,
        targetValue: num,
        startedDate,
        endDate: endDate || undefined,
        progress: {
          currentProgress: 0,
          progressPercent: 0,
          status: "NOT_STARTED",
        },
      });
    }
  };

  // Clear errors on change

  const clearError = (key: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Habit badge */}
      <div
        className="
                flex items-center gap-3 w-full
                bg-indigo-50/50 dark:bg-indigo-950/20
                border border-indigo-100/50 dark:border-indigo-800/30
                rounded-2xl p-3
            "
      >
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
          <Target size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider leading-none mb-1">
            {t("goals.form_for")}
          </span>
          <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 leading-none">
            {habitName}
          </span>
        </div>
      </div>

      {/* Goal type selector */}
      <fieldset>
        <legend className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block">
          {t("goals.goal_type")}
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["STREAK", "TOTAL_COMPLETIONS"] as const).map((type) => {
            const active = goalType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setGoalType(type)}
                aria-pressed={active}
                className={`
                                    flex flex-col items-center gap-1.5
                                    py-4 px-2 rounded-2xl border-2
                                    transition-all duration-200 cursor-pointer text-center
                                    ${
                                      active
                                        ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)] shadow-sm"
                                        : "border-slate-100 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                    }
                                `}
              >
                {type === "STREAK" ? (
                  <Flame size={24} strokeWidth={2} />
                ) : (
                  <Target size={24} strokeWidth={2} />
                )}
                <span className="font-bold text-base mt-1.5">
                  {type === "STREAK"
                    ? t("goals.type_streak")
                    : t("goals.type_total")}
                </span>
                <span className="text-[11px] tracking-tight opacity-75 leading-tight px-0">
                  {type === "STREAK"
                    ? t("goals.type_streak_desc")
                    : t("goals.type_total_desc")}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Target value */}
      <div>
        <label
          htmlFor="targetValue"
          className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block"
        >
          {t("goals.target_value")}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            id="targetValue"
            type="number"
            inputMode="numeric"
            min={1}
            value={targetValue}
            onChange={(e) => {
              setTargetValue(e.target.value);
              clearError("targetValue");
            }}
            placeholder="0"
            aria-invalid={!!errors.targetValue}
            aria-describedby={
              errors.targetValue ? "targetValue-error" : undefined
            }
            className={`${INPUT_CLASS} pr-14 ${errors.targetValue ? "border-red-400 dark:border-red-500 focus:ring-red-400/20" : ""}`}
          />
          <span className="absolute right-4 text-sm font-medium text-slate-400 dark:text-slate-500 pointer-events-none">
            {unit}
          </span>
        </div>
        {errors.targetValue && (
          <p
            id="targetValue-error"
            className="flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle size={11} />
            {errors.targetValue}
          </p>
        )}
      </div>

      {/* Date fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Start date */}
        <div>
          <label
            htmlFor="startedDate"
            className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block"
          >
            {t("goals.started_date")}
          </label>
          <input
            id="startedDate"
            type="date"
            value={startedDate}
            onChange={(e) => setStartedDate(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        {/* End date (optional) */}
        <div>
          <label
            htmlFor="endDate"
            className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block truncate"
          >
            {t("goals.end_date")}
            <span className="ml-1 font-normal text-xs text-slate-400 dark:text-slate-500">
              ({t("goals.optional")})
            </span>
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            min={startedDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              clearError("endDate");
            }}
            aria-invalid={!!errors.endDate}
            className={`${INPUT_CLASS} ${errors.endDate ? "border-red-400 dark:border-red-500" : ""}`}
          />
          {errors.endDate && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={11} />
              {errors.endDate}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-2">
        <Button
          variant="secondary"
          size="default"
          type="button"
          onClick={onCancel}
        >
          {t("goals.cancel")}
        </Button>
        <Button variant="default" size="default" type="submit">
          {t("goals.create_goal")}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
