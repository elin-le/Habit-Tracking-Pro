import SummaryCard from "./components/SummaryCard";
import HabitStatistics from "./components/HabitStatistics";
import CategoryOverview from "./components/CategoryOverview";
import GoalProgress from "./components/GoalProgress";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <SummaryCard />

      <HabitStatistics />

      <CategoryOverview />

      <GoalProgress />
    </div>
  );
}