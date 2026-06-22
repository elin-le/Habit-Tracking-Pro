import { useState, memo } from "react";
import { useTranslation } from "react-i18next";

import type { GoalProgressType } from "../../../shared/types/Dashboard";

interface GoalProgressProps {
    goals: GoalProgressType[];
}

const GoalProgress = memo(({
    goals,
}: GoalProgressProps) => {
    const { t } = useTranslation();

    const [expanded, setExpanded] =
        useState(false);

    if (!goals.length) {
        return (
            <div className="dashboard-card">
                <h2 className="dashboard-card__title">
                    {t("dashboard.goalProgress")}
                </h2>

                <p className="text-secondary">
                    {t("dashboard.noGoals")}
                </p>
            </div>
        );
    }

    const displayedGoals = expanded
        ? goals
        : goals.slice(0, 3);

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.goalProgress")}
            </h2>

            <div className="goal-grid">
                {displayedGoals.map((goal) => {
                    const progress = Math.min(
                        Math.max(goal.progress, 0),
                        100,
                    );

                    return (
                        <div
                            key={goal.id}
                            className="goal-card"
                        >
                            <p
                                className="goal-card__title"
                                title={goal.title}
                            >
                                {goal.title}
                            </p>

                            <h3 className="goal-card__value">
                                {progress}%
                            </h3>

                            <div className="dashboard-progress">
                                <div
                                    className="dashboard-progress__fill"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {goals.length > 3 && (
                <button
                    type="button"
                    className="goal-toggle-btn"
                    onClick={() =>
                        setExpanded(
                            (prev) => !prev,
                        )
                    }
                >
                    {expanded
                        ? t(
                              "dashboard.showLess",
                          )
                        : t(
                              "dashboard.showMore",
                          )}
                </button>
            )}
        </div>
    );
});

export default GoalProgress;