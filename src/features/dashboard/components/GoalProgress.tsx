import { GoalProgressType } from "../Dashboard.type";

interface GoalProgressProps {
    goals: GoalProgressType[];
}

const GoalProgress = ({
    goals,
}: GoalProgressProps) => {
    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                Goal Progress
            </h2>

            <div className="space-y-5">
                {goals.map((goal) => (
                    <div key={goal.id}>
                        <div className="flex justify-between mb-2">
                            <span>{goal.title}</span>

                            <span>{goal.progress}%</span>
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