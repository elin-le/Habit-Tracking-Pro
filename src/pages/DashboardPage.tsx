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
import type { Habit } from "@/shared/types/Habit";
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
    const [selectedCategory] =
        useState("ALL");

    const { t } = useTranslation();
    const navigate = useNavigate();

    const currentUser: User | null =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY.CURRENT_USER,
            ) || "null",
        );

    useEffect(() => {
        if (!currentUser) {
            navigate(ROUTES.AUTH);
        }
    }, [currentUser, navigate]);

    const dashboardUserId =
        userId || currentUser?.phone;

    const {
        summaryCards,
        habitStatistics,
        categoryOverview,
        goalProgress,
    } = getDashboardData(
        dashboardUserId,
        selectedCategory,
    );

    const allHabits: Habit[] =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY.USER_HABITS,
            ) || "[]",
        );

    const userHabits =
        allHabits.filter(
            (habit) =>
                habit.userId ===
                dashboardUserId,
        );

    const habitIds = userHabits.map(
        (habit) => habit.id,
    );

    const checkins = (
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY.USER_CHECKINS,
            ) || "[]",
        ) as CheckIn[]
    ).filter((checkIn) =>
        habitIds.includes(
            checkIn.habitId,
        ),
    );

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
                {/* Left */}
                <div className="dashboard-grid__category">
                    <CategoryOverview
                        categories={
                            categoryOverview
                        }
                    />
                </div>

                {/* Right */}
                <div className="dashboard-grid__right">
                    {/* Completion Rate */}
                    <div className="dashboard-grid__statistics">
                        <HabitStatistics
                            statistics={
                                habitStatistics
                            }
                        />
                    </div>

                    {/* Frequency of Check-in */}
                    <div className="dashboard-grid__heatmap">
                        <HeatMap
                            data={buildHeatMapData(
                                checkins,
                            )}
                            weeks={20}
                            title={t(
                                "heatmap.title",
                            )}
                        />
                    </div>
                </div>
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