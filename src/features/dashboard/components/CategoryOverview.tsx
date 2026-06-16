import { useTranslation } from "react-i18next";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { type CategoryOverviewType } from "../Dashboard.type";

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

const CategoryOverview = ({
    categories,
}: CategoryOverviewProps) => {
    const { t } = useTranslation();

    const chartData = categories.map((item) => ({
        name: t(item.category),
        value: item.progress,
    }));

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.categoryOverview")}
            </h2>

            <div className="category-overview">

                <div className="category-chart">
                    <ResponsiveContainer
                        width="100%"
                        height={240}
                    >
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="category-legend">
                    {chartData.map((item, index) => (
                        <div
                            key={item.name}
                            className="category-legend__item"
                        >
                            <span
                                className="category-legend__dot"
                                style={{
                                    backgroundColor:
                                        COLORS[
                                        index %
                                        COLORS.length
                                        ],
                                }}
                            />

                            <span>
                                {item.name}
                            </span>

                            <strong>
                                {item.value}%
                            </strong>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CategoryOverview;