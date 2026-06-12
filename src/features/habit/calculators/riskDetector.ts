export type HabitRisk =
    | "SAFE"
    | "WARNING"
    | "AT_RISK";

export const getHabitRisk = (
    completionRate: number
): HabitRisk => {
    if (completionRate >= 80)
        return "SAFE";

    if (completionRate >= 50)
        return "WARNING";

    return "AT_RISK";
};