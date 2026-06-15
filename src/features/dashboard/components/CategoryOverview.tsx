import { CategoryOverviewType } from "../Dashboard.type";

interface CategoryOverviewProps {
    categories: CategoryOverviewType[];
}

const CategoryOverview = ({
    categories,
}: CategoryOverviewProps) => {
    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                Category Overview
            </h2>

            <div className="space-y-5">
                {categories.map((item) => (
                    <div key={item.id}>
                        <div className="flex justify-between mb-2">
                            <span>{item.category}</span>

                            <span>{item.progress}%</span>
                        </div>

                        <div className="dashboard-progress">
                            <div
                                className="dashboard-progress__fill"
                                style={{
                                    width: `${item.progress}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryOverview;