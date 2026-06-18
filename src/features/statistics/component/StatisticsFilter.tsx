import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FilterChip } from "../../../shared/components/common/FilterChip";
import type { Priority } from "../../../shared/types/Habit";
import type { Category } from "../../../shared/types/Category";

interface Props {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  selectedPriority: Priority | null;
  onPriorityChange: (p: Priority | null) => void;
  onClearAll: () => void;
}

/* Bộ lọc cho Statistics - (Danh mục + Mức ưu tiên + Xóa bộ lọc). */
export function StatisticsFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  onClearAll,
}: Props) {
  const { t } = useTranslation();
  const activeCount = (selectedCategory ? 1 : 0) + (selectedPriority ? 1 : 0);

  return (
    <div className="rounded-2xl border border-[var(--primary)]/15 bg-[var(--surface)] p-5">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-[var(--primary)]" />
        <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
          {t("habit_filter.title")}
        </span>
        {activeCount > 0 && (
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white bg-[var(--primary)]">
            {activeCount}
          </span>
        )}
        <button
          className="ml-auto text-xs font-medium text-[var(--primary)] hover:opacity-80 cursor-pointer"
          onClick={onClearAll}
        >
          {t("habit_filter.btn_clear")}
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Danh mục */}
        <div>
          <p className="mb-2 text-sm font-medium">{t("habit_filter.category")}</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={!selectedCategory} onClick={() => onCategoryChange(null)}>
              {t("habit_filter.cat-0")}
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat.id}
                active={selectedCategory === cat.id}
                onClick={() => onCategoryChange(cat.id)}
              >
                {t(`habit_form.${cat.name}`)}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Mức ưu tiên */}
        <div>
          <p className="mb-2 text-sm font-medium">{t("habit_filter.priority")}</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={!selectedPriority} onClick={() => onPriorityChange(null)}>
              {t("habit_filter.pri-0")}
            </FilterChip>
            <FilterChip active={selectedPriority === "LOW"} onClick={() => onPriorityChange("LOW")}>
              {t("habit_filter.pri-1")}
            </FilterChip>
            <FilterChip active={selectedPriority === "MEDIUM"} onClick={() => onPriorityChange("MEDIUM")}>
              {t("habit_filter.pri-2")}
            </FilterChip>
            <FilterChip active={selectedPriority === "HIGH"} onClick={() => onPriorityChange("HIGH")}>
              {t("habit_filter.pri-3")}
            </FilterChip>
          </div>
        </div>
      </div>
    </div>
  );
}