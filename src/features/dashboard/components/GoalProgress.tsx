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

            <div className="space-y-5">
                {goals.map((goal) => (
                    <div key={goal.id}>
                        <div className="flex justify-between mb-2">
                            <span>
                                {t(goal.title)}
                            </span>

                            <span>
                                {goal.progress}%
                            </span>
                        </div>

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