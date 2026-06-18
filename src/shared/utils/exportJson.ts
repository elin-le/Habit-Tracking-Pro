import type { CheckIn } from "../types/CheckIn";
import type { Goal } from "../types/Goal";
import type { Habit } from "../types/Habit";

export const exportJson = (
  habits: Habit[],
  goals: Goal[],
  checkIns: CheckIn[],
) => {
  const data = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    habits,
    goals,
    checkIns,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `habit-tracker-${new Date().toISOString().slice(0, 10)}.json`;

  link.click();

  URL.revokeObjectURL(url);
};
