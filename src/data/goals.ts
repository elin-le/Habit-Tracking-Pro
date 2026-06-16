import type { Goal } from "../shared/types/Goal";

export const mockGoals: Goal[] = [
    // tạo mock goal cho các habit 1,2,4,5,6,8
    // còn habit 3 và 7 kh có goal
    {
        id: "goal-1",
        habitId: "habit-1",
        targetType: "TOTAL_COMPLETIONS",
        targetValue: 30,
        startedDate: "2026-06-01",
        endDate: "2026-06-30",
    },
    {
        id: "goal-2",
        habitId: "habit-2",
        targetType: "TOTAL_COMPLETIONS",
        targetValue: 8,
        startedDate: "2026-06-01",
        endDate: "2026-06-30",
    },
    {
        id: "goal-4",
        habitId: "habit-4",
        targetType: "STREAK",
        targetValue: 21,
        startedDate: "2026-05-01",
        endDate: "2026-05-31",
    },
    {
        id: "goal-5",
        habitId: "habit-5",
        targetType: "TOTAL_COMPLETIONS",
        targetValue: 20,
        startedDate: "2026-06-01",
        endDate: "2026-06-30",
    },
    {
        id: "goal-6",
        habitId: "habit-6",
        targetType: "STREAK",
        targetValue: 10,
        startedDate: "2026-06-02",
        endDate: "2026-06-30",
    },
    {
        id: "goal-8",
        habitId: "habit-8",
        targetType: "TOTAL_COMPLETIONS",
        targetValue: 24,
        startedDate: "2026-04-01",
        endDate: "2026-05-31",
    },
];