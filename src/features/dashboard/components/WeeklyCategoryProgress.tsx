import { memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { WeeklyCategoryProgressType } from "../../../shared/types/Dashboard";

interface WeeklyCategoryProgressProps {
    data: WeeklyCategoryProgressType[];
}

const COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
];

const WeeklyCategoryProgress = memo(({ data }: WeeklyCategoryProgressProps) => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!data || data.length === 0) {
        return (
            <div className="dashboard-card">
                <h2 className="dashboard-card__title">
                    {t("dashboard.weeklyProgressByCategory")}
                </h2>
                <p className="text-secondary">{t("dashboard.noData")}</p>
            </div>
        );
    }

    const categories = Object.keys(data[0]).filter((key) => key !== "day");
    const tickFontSize = isMobile ? 10 : 12;
    const infoFontSize = isMobile ? 10 : 12;

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.weeklyProgressByCategory")}
            </h2>
            <div className="w-full overflow-hidden" style={{ minHeight: isMobile ? 250 : 300, minWidth: 0 }}>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                    <BarChart
                        data={data}
                        barCategoryGap="10%"
                        barGap={2}
                        margin={{
                            top: 10,
                            right: 10,
                            left: isMobile ? -30 : -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: tickFontSize, fill: "#94a3b8" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: tickFontSize, fill: "#94a3b8" }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(139, 92, 246, 0.05)" }}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                fontSize: `${infoFontSize}px`
                            }}
                        />
                        <Legend
                            verticalAlign="top"
                            align="center"
                            iconType="circle"
                            iconSize={isMobile ? 6 : 8}
                            wrapperStyle={{
                                paddingBottom: "20px",
                                fontSize: `${infoFontSize}px`,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                left: 0
                            }}
                        />
                        {categories.map((category, index) => (
                            <Bar
                                key={category}
                                dataKey={category}
                                fill={COLORS[index % COLORS.length]}
                                radius={[5, 5, 0, 0]}
                                maxBarSize={isMobile ? 30 : 50}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default WeeklyCategoryProgress;