import { useTranslation } from "react-i18next";
import type { SummaryCardType } from "../../../shared/types/Dashboard";

interface SummaryCardProps {
    summaryCards: SummaryCardType[];
}

const SummaryCard = ({
    summaryCards,
}: SummaryCardProps) => {
    const { t } = useTranslation();

    if (!summaryCards.length) {
        return null;
    }

    return (
        <div className="summary-grid">
            {summaryCards.map((item) => {
                const value =
                    item.completed !== undefined &&
                    item.total !== undefined
                        ? `${item.completed}/${item.total}`
                        : item.value;

                return (
                    <div
                        key={item.id}
                        className="dashboard-card summary-card"
                    >
                        <p className="summary-card__label">
                            {t(item.title)}
                        </p>

                        <h2
                            className="summary-card__value"
                            title={String(value)}
                        >
                            {value}
                        </h2>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCard;