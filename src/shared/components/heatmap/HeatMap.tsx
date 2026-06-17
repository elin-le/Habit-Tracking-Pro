import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next"

type Props = {
    data: Record<string, number>;
    weeks?: number;
    title?: string;
};

type DayCell = {
    key: string;
    date: Date;
    count: number;
    inRange: boolean;
};

const LEVEL_CLASSES = [
    "bg-zinc-100 dark:bg-zinc-800",
    "bg-emerald-200 dark:bg-emerald-900",
    "bg-emerald-400 dark:bg-emerald-700",
    "bg-emerald-500 dark:bg-emerald-600",
    "bg-emerald-700 dark:bg-emerald-400",
];

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const toKey = (d: Date) =>
    [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0"),
    ].join("-");

function getLevel(count: number, max: number) {
    if (count <= 0 || max <= 0) return 0;
    const ratio = count / max;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
}

function formatDateLabel(d: Date) {
    return d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export const HeatMap = ({ data, weeks = 12, title = "Activity" }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const { t } = useTranslation();

    const { columns, max } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const end = new Date(today);
        end.setDate(end.getDate() + (6 - end.getDay()));

        const totalDays = weeks * 7;
        const start = new Date(end);
        start.setDate(start.getDate() - totalDays + 1);

        const cells: DayCell[] = [];
        const cursor = new Date(start);
        let maxCount = 0;

        for (let i = 0; i < totalDays; i++) {
            const key = toKey(cursor);
            const count = data[key] ?? 0;
            const inRange = cursor <= today;
            if (inRange) maxCount = Math.max(maxCount, count);

            cells.push({ key, date: new Date(cursor), count, inRange });
            cursor.setDate(cursor.getDate() + 1);
        }

        const cols: DayCell[][] = [];
        for (let i = 0; i < cells.length; i += 7) {
            cols.push(cells.slice(i, i + 7));
        }
        console.log(
            cells.filter(cell => cell.count > 0)
        );
        return { columns: cols, max: maxCount };
    }, [data, weeks]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [columns]);

    const selectedCell = useMemo(() => {
        if (!selected) return null;
        for (const col of columns) {
            const found = col.find((c) => c.key === selected);
            if (found) return found;
        }
        return null;
    }, [selected, columns]);

    const monthLabels = useMemo(() => {
        const labels: { index: number; label: string }[] = [];

        columns.forEach((col, i) => {
            const firstDayOfMonth = col.find(
                cell => cell.date.getDate() === 1
            );

            if (firstDayOfMonth) {
                labels.push({
                    index: i,
                    label: MONTH_LABELS[firstDayOfMonth.date.getMonth()],
                });
            }
        });

        return labels;
    }, [columns]);

    return (
        <div className="w-full rounded-xl border p-3 sm:p-4" style={{
            backgroundColor: "var(--surface-color)",
            borderColor: "var(--border-color, rgb(228 228 231))",
        }}>
            <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {title}
                </h3>
                <div className="truncate text-right text-xs text-zinc-400 dark:text-zinc-500">
                    {selectedCell
                        ? `${formatDateLabel(selectedCell.date)} · ${selectedCell.count} ${selectedCell.count === 1 ? "check-in" : "check-ins"
                        }`
                        : "Tap a day for details"}
                </div>
            </div>

            <div ref={scrollRef} className="-mx-1 overflow-x-auto px-1 pb-1">
                <div className="inline-flex min-w-max flex-col gap-1">
                    <div className="flex pl-5 sm:pl-6" aria-hidden="true">
                        {columns.map((_, i) => {
                            const label = monthLabels.find((m) => m.index === i)?.label;

                            return (
                                <div
                                    key={i}
                                    className="
                    w-[18px]
                    sm:w-[24px]
                    shrink-0
                    text-[10px]
                    text-zinc-400
                    dark:text-zinc-500
                "
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-1 sm:gap-1.5">
                        <div className="flex flex-col gap-[2px] pr-1 sm:gap-1 sm:pr-2" aria-hidden="true">
                            {WEEKDAY_LABELS.map((d, i) => (
                                <div
                                    key={i}
                                    className="h-[10px] w-4 text-[9px] leading-[10px] text-zinc-400 sm:h-3 sm:leading-3 dark:text-zinc-500"
                                >
                                    {i % 2 === 1 ? d : ""}
                                </div>
                            ))}
                        </div>

                        {columns.map((col, ci) => (
                            <div key={ci} className="flex flex-col gap-1 sm:gap-1.5">
                                {col.map((cell) => (
                                    <button
                                        key={cell.key}
                                        type="button"
                                        disabled={!cell.inRange}
                                        onClick={() =>
                                            setSelected((prev) => (prev === cell.key ? null : cell.key))
                                        }
                                        aria-label={`${formatDateLabel(cell.date)}: ${cell.count} check-ins`}
                                        aria-pressed={selected === cell.key}
                                        className={[
                                            "h-[14px] w-[14px] rounded-[3px] sm:h-[18px] sm:w-[18px]",
                                            "motion-safe:transition-transform motion-safe:hover:scale-110",
                                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600",
                                            cell.inRange
                                                ? `${LEVEL_CLASSES[getLevel(cell.count, max)]} cursor-pointer`
                                                : "cursor-default bg-transparent",
                                            selected === cell.key ? "ring-2 ring-emerald-600 ring-offset-1" : "",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                <span>Less</span>
                {LEVEL_CLASSES.map((cls, i) => (
                    <span
                        key={i}
                        aria-hidden="true"
                        className={`h-[10px] w-[10px] rounded-[2px] sm:h-3 sm:w-3 ${cls}`}
                    />
                ))}
                <span>{t("heatmap.more")}</span>
            </div>
        </div>
    );
};