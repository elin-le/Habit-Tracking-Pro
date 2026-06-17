import { useState } from "react";

import SummaryCard from "../features/dashboard/components/SummaryCard";
import HabitStatistics from "../features/dashboard/components/HabitStatistics";
import CategoryOverview from "../features/dashboard/components/CategoryOverview";
import GoalProgress from "../features/dashboard/components/GoalProgress";

import { getDashboardData } from "../features/dashboard/services/DashboardService";

import "../features/dashboard/Dashboard.css";

import { HeatMap } from "@/shared/components/heatmap/HeatMap";
import { buildHeatMapData } from "@/shared/components/heatmap/heatmap.util"
import type { CheckIn } from "@/shared/types/CheckIn"
import { STORAGE_KEY } from "@/shared/constants/appConstants"

const DashboardPage = () => {
    const [selectedCategory, setSelectedCategory] =
        useState("ALL");

    const {
        summaryCards,
        habitStatistics,
        categoryOverview,
        goalProgress,
    } = getDashboardData(selectedCategory);
    const checkins = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_CHECKINS) || "[]") as CheckIn[];
    console.log("CHECKINS", checkins);
    return (
        <div className="dashboard-page">
            {/* Summary Cards */}
            <section className="dashboard-summary">
                <SummaryCard
                    summaryCards={summaryCards}
                />
            </section>

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

            <section className="dashboard-heatmap">
                <HeatMap data={buildHeatMapData(checkins)} weeks={20} />
            </section>

            <section className="dashboard-goals">
                <GoalProgress goals={goalProgress} />
            </section>
        </div>
    );
};

export default DashboardPage;