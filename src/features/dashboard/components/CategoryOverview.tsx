import { useTranslation } from "react-i18next";
import { type CategoryOverviewType } from "../Dashboard.type";

interface CategoryOverviewProps {
    categories: CategoryOverviewType[];
}

const CategoryOverview = ({
    categories,
}: CategoryOverviewProps) => {
    const { t } = useTranslation();

    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card__title">
                {t("dashboard.categoryOverview")}
            </h2>

            <div className="space-y-5">
                {categories.map((item) => (
                    <div key={item.id}>
                        <div className="flex justify-between mb-2">
                            <span>
                                {t(item.category)}
                            </span>

                            <span>
                                {item.progress}%
                            </span>
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