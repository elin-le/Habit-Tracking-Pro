import React, { useEffect, useRef, useState } from "react";
import type { TargetType } from "../../types/Goal";
import { AlertCircle, Flame, Target, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { getGoalTheme } from "../../utils/goalTheme";
import "./GoalForm.css";

// Types

export interface GoalFormData {
  habitId: string;
  targetType: TargetType;
  targetValue: number;
  startedDate: string;
  endDate?: string;
}

interface GoalFormProps {
  habitId: string;
  habitName: string;
  initialData?: Partial<GoalFormData>;
  onSubmit?: (data: GoalFormData) => void;
  onCancel?: () => void;
}

interface FormErrors {
  targetValue?: string;
  endDate?: string;
}

const GOAL_TYPES = [
  {
    value: "STREAK" as const,
    icon: Flame,
    labelKey: "goals.type_streak",
    descKey: "goals.type_streak_desc",
  },
  {
    value: "TOTAL_COMPLETIONS" as const,
    icon: Target,
    labelKey: "goals.type_total",
    descKey: "goals.type_total_desc",
  },
];

// GoalForm
const GoalForm: React.FC<GoalFormProps> = ({
  habitId,
  habitName,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();

  const [targetType, setTargetType] = useState<TargetType>(
    initialData?.targetType || "STREAK"
  );
  const currentTheme = getGoalTheme(targetType);
  const [targetValue, setTargetValue] = useState(
    initialData?.targetValue?.toString() || ""
  );
  const [startedDate, setStartedDate] = useState(
    initialData?.startedDate || new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [errors, setErrors] = useState<FormErrors>({});

  const isStreak = targetType === "STREAK";

  const handleTargetTypeChange = (type: TargetType) => {
    setTargetType(type);
    if (type === "STREAK") {
      setErrors((prev) => ({ ...prev, endDate: undefined }));
    } else {
      setEndDate("");
    }
  };

  // Auto-compute end date for STREAK goals
  const computeStreakEndDate = (start: string, days: number): string => {
    const date = new Date(start);
    date.setDate(date.getDate() + days - 1);
    return date.toISOString().split("T")[0];
  };

  // Validation
  const validateTargetValue = (): string | undefined => {
    const inputValue = Number(targetValue);
    if(!targetValue || isNaN(inputValue) || inputValue <= 0){
      return t("goals.error_target_required");
    }
  }

  const validateEndDate = (): string | undefined => {
    if(isStreak || !endDate) return undefined;
    if(endDate < startedDate) return t("goals.error_end_before_start");
    if(endDate <= new Date().toISOString().split("T")[0]) return t("goals.error_end_before_today");
  }

  const validate = (): boolean => {
    const next: FormErrors = {
      targetValue: validateTargetValue(),
      endDate: validateEndDate()
    };

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Clear errors on change
  const clearError = (key: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  
  // Side effects
  const prevStartedDate = useRef(startedDate);
  
  useEffect(() => {
    if(!isStreak) return;
    const days = Number(targetValue);
    if(days > 0) {
      setEndDate(computeStreakEndDate(startedDate, days));
    }
  }, [targetValue, startedDate, isStreak]);

  useEffect(() => {
    if(isStreak || endDate === "") return;
    
    const oldStart = prevStartedDate.current;
    const newStart = startedDate;

    const spanMs = new Date(endDate).getTime() - new Date(oldStart).getTime();
    const newEnd = new Date(new Date(startedDate).getTime() + spanMs).toISOString().split("T")[0];
    
    setEndDate(newEnd);
    prevStartedDate.current = newStart;

  }, [startedDate]);

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      habitId,
      targetType,
      targetValue: Number(targetValue),
      startedDate,
      ...(isStreak ? {} : endDate && { endDate }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Habit badge */}
      <div
        className={`
          flex items-center gap-4 p-4 rounded-2xl mb-6
          border border-slate-100 dark:border-slate-800/60
          ${currentTheme.badgeBg}
        `}
      >
        <div
          className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0 ${currentTheme.badgeText}`}
        >
          <Target size={18} />
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[11px] font-medium uppercase tracking-wider leading-none mb-1 ${currentTheme.badgeText} opacity-80`}
          >
            {t("goals.form_for")}
          </span>
          <span
            className={`text-sm font-bold leading-none ${currentTheme.badgeText}`}
          >
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
          {GOAL_TYPES.map(({ value, icon: Icon, labelKey, descKey }) => {
            const active = targetType === value;
            const itemTheme = getGoalTheme(value); // Lấy theme riêng của STREAK hoặc TOTAL

            return (
              <button
                key={value}
                type="button"
                onClick={() => handleTargetTypeChange(value)}
                aria-pressed={active}
                style={{ borderColor: active ? itemTheme.hex : undefined }}
                className={`
                    flex flex-col items-center gap-1.5
                    py-4 px-2 rounded-2xl border-2
                    transition-all duration-200 cursor-pointer text-center
                    ${
                      active
                        ? `${itemTheme.badgeBg} ${itemTheme.badgeText} shadow-sm`
                        : "border-slate-100 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }
                `}
              >
                <Icon size={24} strokeWidth={2} />
                <span className="font-bold text-base mt-1.5">
                  {t(labelKey)}
                </span>
                <span className="text-[11px] tracking-tight opacity-75 leading-tight">
                  {t(descKey)}
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
            className={`
              goal-input pl-4 pr-20 no-spin-buttons 
              ${currentTheme.inputFocus}
              ${errors.targetValue ? "goal-input-error" : ""}
            `}
          />
          <span className="absolute right-4 text-sm font-medium text-slate-400 dark:text-slate-500 pointer-events-none">
            {t(isStreak ? "goals.days" : "goals.sessions")}
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
      <div>
        <label
          htmlFor="startedDate"
          className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block"
        >
          {t("goals.started_date")}
        </label>
        <div className="relative flex items-center">
          <Calendar
            size={16}
            className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            id="startedDate"
            type="date"
            value={startedDate}
            onChange={(e) => setStartedDate(e.target.value)}
            className="goal-input pl-10 pr-4 appearance-none"
          />
        </div>
      </div>

      {!isStreak && (
        <div>
          <label
            htmlFor="endDate"
            className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1"
          >
            {t("goals.end_date")}
            <span className="font-normal text-xs text-slate-400 dark:text-slate-500">
              ({t("goals.optional")})
            </span>
          </label>
          <div className="relative flex items-center">
            <Calendar
              size={16}
              className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
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
              aria-describedby={errors.endDate ? "endDate-error" : undefined}
              className={`goal-input pl-10 pr-4 appearance-none ${errors.endDate ? "goal-input-error" : ""}`}
            />
          </div>
          {errors.endDate && (
            <p
              id="endDate-error"
              className="flex items-center gap-1 text-xs text-red-500 mt-1.5"
            >
              <AlertCircle size={11} />
              {errors.endDate}
            </p>
          )}
        </div>
      )}

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
        <Button
          type="submit"
          className="flex-1 text-white border-transparent"
          style={{ backgroundColor: currentTheme.hex }}
        >
          {initialData ? t("goals.edit_goal") : t("goals.create_goal")}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
