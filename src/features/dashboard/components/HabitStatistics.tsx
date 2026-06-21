import { memo, useState, useEffect } from "react";
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

const HabitStatistics = memo(({
    statistics,
}: HabitStatisticsProps) => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

            <div className="completion-chart" style={{ width: '100%', minWidth: 0 }}>
                <ResponsiveContainer width="100%" height={isMobile ? 220 : 270}>
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
                            vertical={false}
                            stroke="#e2e8f0"
                        />

                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                padding: "6px 10px",
                                fontSize: "11px",
                                borderRadius: "8px",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{
                                r: 3,
                                fill: "#8b5cf6",
                                strokeWidth: 2,
                                stroke: "#fff"
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default HabitStatistics;