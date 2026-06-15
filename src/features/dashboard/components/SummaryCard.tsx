import { type SummaryCardType } from "../Dashboard.type";

interface SummaryCardProps {
    summaryCards: SummaryCardType[];
}

const SummaryCard = ({
    summaryCards,
}: SummaryCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryCards.map((item) => (
                <div
                    key={item.id}
                    className="dashboard-card"
                >
                    <p className="text-sm text-secondary">
                        {item.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {item.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default SummaryCard;