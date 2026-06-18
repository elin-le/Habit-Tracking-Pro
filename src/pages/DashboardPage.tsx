import SummaryCard from "../features/dashboard/components/SummaryCard";
import HabitStatistics from "../features/dashboard/components/HabitStatistics";
import CategoryOverview from "../features/dashboard/components/CategoryOverview";
import GoalProgress from "../features/dashboard/components/GoalProgress";
import { getDashboardData } from "../features/dashboard/services/DashboardService";
import "../features/dashboard/Dashboard.css";
import { HeatMap } from "@/shared/components/heatmap/HeatMap";
import { buildHeatMapData } from "@/shared/components/heatmap/heatmap.util";
import type { CheckIn } from "@/shared/types/CheckIn";
import { STORAGE_KEY } from "@/shared/constants/appConstants";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
    const { t } = useTranslation();
    const selectedCategory = "ALL";
    const {
        summaryCards,
        habitStatistics,
        categoryOverview,
        goalProgress,
    } = getDashboardData(selectedCategory);

    let checkIns: CheckIn[] = [];

    try {
        checkIns = JSON.parse(
            localStorage.getItem(
                STORAGE_KEY.USER_CHECKINS,
            ) || "[]",
        );
    } catch {
        checkIns = [];
    }

    return (
        <div className="dashboard-page">
            {/* Summary */}
            <section className="dashboard-summary">
                <SummaryCard
                    summaryCards={summaryCards}
                />
            </section>

            {/* Charts */}
            <section className="dashboard-grid">
                <div className="dashboard-grid__category">
                    <CategoryOverview
                        categories={categoryOverview}
                    />
                </div>

                <div className="dashboard-grid__statistics">
                    <HabitStatistics
                        statistics={habitStatistics}
                    />
                </div>
            </section>

            {/* Heatmap */}
            <section className="dashboard-heatmap">
                <HeatMap
                    data={buildHeatMapData(
                        checkIns,
                    )}
                    weeks={20}
                    title={t("heatmap.title")}
                />
            </section>

            {/* Goals */}
            <section className="dashboard-goals">
                <GoalProgress
                    goals={goalProgress}
                />
            </section>
        </div>
    );
};

export default DashboardPage;