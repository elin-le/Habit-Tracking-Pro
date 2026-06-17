import { useTranslation } from "react-i18next";
import { type GoalProgressType } from "../Dashboard.type";

interface GoalProgressProps {
    goals: GoalProgressType[];
}

const GoalProgress = ({
    goals,
}: GoalProgressProps) => {
    const { t } = useTranslation();

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.goalProgress")}
            </h2>

            <div className="goal-grid">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="goal-card"
                    >
                        <p className="goal-card__title">
                            {goal.title}
                        </p>

                        <h3 className="goal-card__value">
                            {goal.progress}%
                        </h3>

                        <div className="dashboard-progress">
                            <div
                                className="dashboard-progress__fill"
                                style={{
                                    width: `${goal.progress}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalProgress;