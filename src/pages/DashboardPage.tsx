import SummaryCard from "../features/dashboard/components/SummaryCard";
import HabitStatistics from "../features/dashboard/components/HabitStatistics";
import CategoryOverview from "../features/dashboard/components/CategoryOverview";
import GoalProgress from "../features/dashboard/components/GoalProgress";

import {
    SUMMARY_CARDS,
    HABIT_STATISTICS,
    CATEGORY_OVERVIEW,
    GOAL_PROGRESS,
} from "../data/dashboard";

import "../features/dashboard/Dashboard.css";

const DashboardPage = () => {
    return (
        <div className="dashboard-page">

            {/* Summary */}
            <section className="dashboard-summary">
                <SummaryCard
                    summaryCards={SUMMARY_CARDS}
                />
            </section>

            {/* Main Content */}
            <section className="dashboard-grid">

                <div className="dashboard-grid__category">
                    <CategoryOverview
                        categories={CATEGORY_OVERVIEW}
                    />
                </div>

                <div className="dashboard-grid__statistics">
                    <HabitStatistics
                        statistics={HABIT_STATISTICS}
                    />
                </div>

                <div className="dashboard-grid__goals">
                    <GoalProgress
                        goals={GOAL_PROGRESS}
                    />
                </div>

            </section>

        </div>
    );
};

export default DashboardPage;