import { useTranslation } from "react-i18next";
import { type HabitStatisticsType } from "../Dashboard.type";

interface HabitStatisticsProps {
    statistics: HabitStatisticsType;
}

const HabitStatistics = ({
    statistics,
}: HabitStatisticsProps) => {
    const { t } = useTranslation();

    const STATISTICS = [
        {
            label: t("dashboard.currentStreak"),
            value: `${statistics.currentStreak} ${t("dashboard.days")}`,
        },
        {
            label: t("dashboard.longestStreak"),
            value: `${statistics.longestStreak} ${t("dashboard.days")}`,
        },
        {
            label: t("dashboard.completionRate"),
            value: `${statistics.completionRate}%`,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATISTICS.map((item) => (
                <div
                    key={item.label}
                    className="dashboard-card"
                >
                    <p className="text-sm text-secondary">
                        {item.label}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {item.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default HabitStatistics;