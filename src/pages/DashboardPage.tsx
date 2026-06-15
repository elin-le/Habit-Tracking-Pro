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
            <SummaryCard
                summaryCards={SUMMARY_CARDS}
            />

            <HabitStatistics
                statistics={HABIT_STATISTICS}
            />

            <div className="dashboard-page__content">
                <CategoryOverview
                    categories={CATEGORY_OVERVIEW}
                />

                <GoalProgress
                    goals={GOAL_PROGRESS}
                />
            </div>
        </div>
    );
};

export default DashboardPage;