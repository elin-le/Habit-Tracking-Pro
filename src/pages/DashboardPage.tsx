import { useState, useEffect, useMemo } from "react";
import SummaryCard from "../features/dashboard/components/SummaryCard";
import HabitStatistics from "../features/dashboard/components/HabitStatistics";
import CategoryOverview from "../features/dashboard/components/CategoryOverview";
import GoalProgress from "../features/dashboard/components/GoalProgress";
import WeeklyCategoryProgress from "../features/dashboard/components/WeeklyCategoryProgress";
import { getDashboardData } from "../features/dashboard/services/DashboardService";
import "../features/dashboard/Dashboard.css";
import { HeatMap } from "@/shared/components/heatmap/HeatMap";
import { buildHeatMapData } from "@/shared/components/heatmap/heatmap.util";
import type { User } from "@/shared/types/User";
import {
    STORAGE_KEY,
    ROUTES,
} from "@/shared/constants/appConstants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface DashboardPageProps {
    userId?: string;
}

const DashboardPage = ({
    userId,
}: DashboardPageProps) => {
    const [selectedCategory] = useState("ALL");
    const { t } = useTranslation();
    const navigate = useNavigate();

    const currentUser: User | null = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "null");
        } catch {
            return null;
        }
    }, []);

    useEffect(() => {
        if (!currentUser) {
            navigate(ROUTES.AUTH);
        }
    }, [currentUser, navigate]);

    const dashboardUserId = userId || currentUser?.phone;

    const dashboardData = useMemo(() => {
        if (!dashboardUserId) return null;
        return getDashboardData(dashboardUserId, selectedCategory);
    }, [dashboardUserId, selectedCategory]);

    const heatMapData = useMemo(() => {
        if (!dashboardData?.checkins) return {};
        return buildHeatMapData(dashboardData.checkins);
    }, [dashboardData?.checkins]);

    if (!dashboardData) return null;

    return (
        <div className="dashboard-page">
            {/* Summary */}
            <section className="dashboard-summary">
                <SummaryCard summaryCards={dashboardData.summaryCards} />
            </section>

            {/* Charts Grid */}
            <section className="dashboard-grid">
                <div className="dashboard-grid__category">
                    <CategoryOverview categories={dashboardData.categoryOverview} />
                </div>

                <div className="dashboard-grid__right">
                    <div className="dashboard-grid__statistics">
                        <HabitStatistics statistics={dashboardData.habitStatistics} />
                    </div>

                    <div className="dashboard-grid__heatmap">
                        <HeatMap
                            data={heatMapData}
                            weeks={20}
                            title={t("heatmap.title")}
                        />
                    </div>
                </div>
            </section>

            {/* Goals */}
            <section className="dashboard-goals">
                <GoalProgress goals={dashboardData.goalProgress} />
            </section>

            {/* Weekly Progress by Category*/}
            <section className="dashboard-weekly-category">
                <WeeklyCategoryProgress data={dashboardData.weeklyCategoryProgress} />
            </section>
        </div>
    );
};

export default DashboardPage;