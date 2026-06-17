import { useState } from "react";

import SummaryCard from "../features/dashboard/components/SummaryCard";
import HabitStatistics from "../features/dashboard/components/HabitStatistics";
import CategoryOverview from "../features/dashboard/components/CategoryOverview";
import GoalProgress from "../features/dashboard/components/GoalProgress";

import { getDashboardData } from "../features/dashboard/services/DashboardService";

import "../features/dashboard/Dashboard.css";

const DashboardPage = () => {
    const [selectedCategory, setSelectedCategory] =
        useState("ALL");

    const {
        summaryCards,
        habitStatistics,
        categoryOverview,
        goalProgress,
    } = getDashboardData(selectedCategory);

    return (
        <div className="dashboard-page">

            {/* Summary Cards */}
            <section className="dashboard-summary">
                <SummaryCard
                    summaryCards={summaryCards}
                />
            </section>

            {/* Dashboard Content */}
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

                <div className="dashboard-grid__goals">
                    <GoalProgress
                        goals={goalProgress}
                    />
                </div>

            </section>

        </div>
    );
};

export default DashboardPage;