import { useState, useEffect } from "react";

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

import { useNavigate } from "react-router-dom"
import type { User } from "@/shared/types/User"
import { ROUTES } from "@/shared/constants/appConstants"

const DashboardPage = () => {
    const [selectedCategory] =
        useState("ALL");
    const currentUser: User | null =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY.CURRENT_USER
            ) || "null"
        );
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {
        summaryCards,
        habitStatistics,
        categoryOverview,
        goalProgress,
    } = getDashboardData(selectedCategory);
    const checkins = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_CHECKINS) || "[]") as CheckIn[];
    // console.log("CHECKINS", checkins);
    useEffect(() => {
        if (!currentUser) {
            navigate(ROUTES.AUTH);
        }
    }, [])
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
                        checkins,
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