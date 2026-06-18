import { useTranslation } from "react-i18next";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import type { HabitStatisticsType } from "../../../shared/types/Dashboard";

interface HabitStatisticsProps {
    statistics: HabitStatisticsType[];
}

const HabitStatistics = ({
    statistics,
}: HabitStatisticsProps) => {
    const { t } = useTranslation();

    if (!statistics.length) {
        return (
            <div className="dashboard-card">
                <h2 className="dashboard-card__title">
                    {t("dashboard.completionRate")}
                </h2>

                <p className="text-secondary">
                    {t("dashboard.noData")}
                </p>
            </div>
        );
    }

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.completionRate")}
            </h2>

            <div className="completion-chart">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={statistics}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                padding: "6px 10px",
                                fontSize: "12px",
                            }}
                            labelStyle={{
                                margin: 0,
                                padding: 0,
                                lineHeight: "14px",
                            }}
                            itemStyle={{
                                margin: 0,
                                padding: 0,
                                lineHeight: "14px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{
                                r: 4,
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HabitStatistics;