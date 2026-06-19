import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { useCheckIns } from "@/shared/hooks/useCheckIns";
import type { Habit } from "@/shared/types/Habit";
import { useMemo } from "react";
import { CATEGORY_ICONS } from "@/shared/constants/appConstants";
import { mockCategories } from "@/data/category";

type LayoutContext = {
  habits: Habit[];
};

export function HabitHistoryPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { habitId } = useParams<{ habitId: string }>();
  const { habits } = useOutletContext<LayoutContext>();

  // tìm thói quen hiện tại theo ID
  const habit = habits.find((h) => h.id === habitId);
  const category = useMemo(() => {
    if (!habit) return null;
    return mockCategories.find((c) => c.id === habit.categoryId);
  }, [habit]);

  const { checkIns, getHistoryByHabitId } = useCheckIns();
  // lấy toàn bộ lịch sử check-in của habit này và sắp xếp ngày mới nhất lên đầu
  const historyRecords = useMemo(() => {
    if (!habitId) return [];
    return getHistoryByHabitId(habitId);
  }, [habitId, checkIns]);

  if (!habit) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-medium">{t("habit.no")}</p>
        <button onClick={() => navigate("/habits")} className="mt-4 text-sm text-blue-500 underline">
          {t("common.back")}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-4 animate-in">
      {/* back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium transition-colors hover:text-violet-500"
        style={{ color: "var(--sidebar-muted)" }}
      >
        <ArrowLeft size={16} />
        {t("common.back")}
      </button>

      {/* header */}
      <div
        className="mb-8 flex items-start gap-4 rounded-2xl border p-6 shadow-sm"
        style={{
          background: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)"
        }}
      >
        {/* icon cate */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-md"
          style={{
            background: "color-mix(in srgb, var(--primary) 25%, transparent)",
          }}
        >
          <span className="text-2xl">{CATEGORY_ICONS[habit.categoryId]}</span>
        </div>

        {/* habit */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-medium mb-2 truncate" style={{ color: "var(--text)" }}>
            {habit.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* category */}
            <span
              className="rounded-full px-2.5 py-1 text-xs font-medium"
              style={{
                background: "color-mix(in srgb, var(--primary) 15%, transparent)",
                color: "var(--primary)",
              }}
            >
              {t(`habit_form.${category?.name}`) ?? habit.categoryId}
            </span>

            {/* tần suất (DAILY / DAY_OF_WEEK) */}
            <span
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium"
              style={{
                background: "color-mix(in srgb, var(--primary) 8%, var(--bg))",
                color: "var(--sidebar-muted)",
              }}
            >
              <Calendar size={12} />
              {habit.frequencyType === "DAILY"
                ? t("habit_form.DAILY")
                : t("habit_form.DAY_OF_WEEK")}
            </span>
          </div>

          <p className="text-sm" style={{ color: "var(--sidebar-muted)" }}>
            {t("habit_form.target-p-days")}: <span className="font-semibold text-violet-500">{habit.targetPerDay}</span>
          </p>
        </div>
      </div>

      {/* Danh sách lịch sử hiển thị Timeline */}
      <h2 className="text-lg font-medium mb-4" style={{ color: "var(--text)" }}>{t("checkin.history")}</h2>

      {historyRecords.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm" style={{ color: "var(--sidebar-muted)" }}>
          {t("checkin.no")}
        </div>
      ) : (
        <div className="relative border-l pl-4 ml-2 flex flex-col gap-6" style={{ borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }}>
          {historyRecords.map((record: any) => {
            const isTargetMet = record.completionCount >= habit.targetPerDay;

            return (
              <div key={record.id} className="relative flex items-center justify-between">
                {/* line cho đẹp */}
                <div className="absolute -left-[25px] bg-white rounded-full p-0.5">
                  {isTargetMet ? (
                    <CheckCircle2 size={18} className="text-green-500 fill-green-50" />
                  ) : (
                    <Circle size={18} className="text-amber-500 fill-amber-50" />
                  )}
                </div>

                {/* nội dung ngày tháng */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {new Date(record.checkedAt).toLocaleDateString(i18n.language, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs capitalize mt-0.5" style={{ color: isTargetMet ? "#22c55e" : "#f59e0b" }}>
                    {isTargetMet ? t("checkin.completed") : t("checkin.not_finished")}
                  </span>
                </div>

                {/* số lượng hoàn thành */}
                <div className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: isTargetMet ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)",
                    color: isTargetMet ? "#22c55e" : "#f59e0b"
                  }}>
                  {record.completionCount} / {habit.targetPerDay}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}