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

import type { HabitStatisticsType } from "../Dashboard.type";

interface HabitStatisticsProps {
    statistics: HabitStatisticsType[];
}

const HabitStatistics = ({
    statistics,
}: HabitStatisticsProps) => {
    const { t } = useTranslation();

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.completionRate")}
            </h2>

            <div className="completion-chart">
                <ResponsiveContainer
                    width="100%"
                    height={390}
                >
                    <LineChart data={statistics}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HabitStatistics;