export type HabitRisk =
    | "SAFE"
    | "WARNING"
    | "AT_RISK";

export const getHabitRisk = (
    completionRate: number,
    currentStreak: number,
    completedToday: boolean
): HabitRisk => {

    if (
        currentStreak > 0 &&
        !completedToday
    ) {
        return "AT_RISK";
    }

    if (completionRate < 80) {
        return "WARNING";
    }

    return "SAFE";
};