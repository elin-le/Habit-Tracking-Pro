import SummaryCard from "../components/SummaryCard";
import HabitStatistics from "../components/HabitStatistics";
import CategoryOverview from "../components/CategoryOverview";
import GoalProgress from "../components/GoalProgress";

import {
    SUMMARY_CARDS,
    HABIT_STATISTICS,
    CATEGORY_OVERVIEW,
    GOAL_PROGRESS,
} from "../../../data/dashboard/dashboard";

import "../styles/dashboard.css";

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