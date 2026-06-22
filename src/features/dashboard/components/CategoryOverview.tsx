import { memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import type { CategoryOverviewType } from "../../../shared/types/Dashboard";

interface CategoryOverviewProps {
    categories: CategoryOverviewType[];
}

const COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
];

const CategoryOverview = memo(({
    categories,
}: CategoryOverviewProps) => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!categories.length) {
        return (
            <div className="dashboard-card">
                <h2 className="dashboard-card__title">
                    {t("dashboard.categoryOverview")}
                </h2>

                <p className="text-secondary">
                    {t("dashboard.noData")}
                </p>
            </div>
        );
    }

    const total = categories.reduce(
        (sum, item) => sum + item.progress,
        0,
    );

    const chartData = categories.map((item) => ({
        name: item.category,
        value: item.progress,
        percent:
            total > 0
                ? Math.round(
                      (item.progress / total) * 100,
                  )
                : 0,
    }));

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.categoryOverview")}
            </h2>

            <div className="category-overview">
                <div className="category-chart" style={{ width: '100%', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={isMobile ? 260 : 350}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="55%"
                                outerRadius="80%"
                                paddingAngle={3}
                            >
                                {chartData.map(
                                    (_, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />
                                    ),
                                )}
                            </Pie>

                        <Tooltip
                            formatter={(value, _, item) => [
                                `${value} Habits (${item.payload.percent}%)`,
                                item.payload.name,
                            ]}
                            contentStyle={{
                                padding: "6px 8px",
                                fontSize: "12px",
                                borderRadius: "8px",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="category-legend">
                    {chartData.map(
                        (item, index) => (
                            <div
                                key={item.name}
                                className="category-legend__item"
                            >
                                <div className="category-legend__left">
                                    <div
                                        className="category-legend__dot"
                                        style={{
                                            backgroundColor:
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ],
                                        }}
                                    />

                                    <span className="category-legend__label">
                                        {item.name}
                                    </span>
                                </div>

                                <span className="category-legend__value">
                                    {item.value} (
                                    {item.percent}%)
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
});

export default CategoryOverview;