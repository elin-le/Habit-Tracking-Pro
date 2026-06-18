import { STORAGE_KEY } from "../../../shared/constants/appConstants";
import type { Habit } from "../../../shared/types/Habit";
import type { CheckIn } from "../../../shared/types/CheckIn";
import type { Category } from "../../../shared/types/Category";
import type { GoalWithDerived } from "../../../shared/types/Goal";

import {
    getCurrentStreak,
    getLongestStreak,
} from "../../habit/calculators/GoalCalculator";

import { getAllGoalsWithProgress } from "../../goal/services/GoalService";

import type {
    SummaryCardType,
    HabitStatisticsType,
    CategoryOverviewType,
    GoalProgressType,
} from "../../../shared/types/Dashboard";

export type DashboardData = {
    summaryCards: SummaryCardType[];
    habitStatistics: HabitStatisticsType[];
    categoryOverview: CategoryOverviewType[];
    goalProgress: GoalProgressType[];
};

const DAY_SHORT = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

function getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(
        date.getMonth() + 1,
    ).padStart(2, "0");
    const day = String(
        date.getDate(),
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function readHabits(): Habit[] {
    try {
        const raw = localStorage.getItem(
            STORAGE_KEY.USER_HABITS,
        );

        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function readCheckIns(): CheckIn[] {
    try {
        const raw = localStorage.getItem(
            STORAGE_KEY.USER_CHECKINS,
        );

        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function readCategories(): Category[] {
    try {
        const raw = localStorage.getItem(
            STORAGE_KEY.CATEGORYS,
        );

        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function getActiveHabits(
    habits: Habit[],
): Habit[] {
    return habits.filter(
        (habit) => habit.status === "ACTIVE",
    );
}

function isHabitCompletedOnDate(
    habit: Habit,
    checkIns: CheckIn[],
    dateKey: string,
): boolean {
    const checkIn = checkIns.find(
        (c) =>
            c.habitId === habit.id &&
            c.checkedAt === dateKey,
    );

    const target =
        typeof habit.targetPerDay === "number"
            ? habit.targetPerDay
            : 0;

    return (
        (checkIn?.completionCount ?? 0) >= target
    );
}

function buildSummaryCards(
    habits: Habit[],
    activeHabits: Habit[],
    checkIns: CheckIn[],
): SummaryCardType[] {
    const todayKey = getDateKey(new Date());

    const completedToday = activeHabits.filter(
        (habit) =>
            isHabitCompletedOnDate(
                habit,
                checkIns,
                todayKey,
            ),
    ).length;

    const currentStreak = activeHabits.reduce(
        (max, habit) => {
            const habitCheckIns =
                checkIns.filter(
                    (checkIn) =>
                        checkIn.habitId ===
                        habit.id,
                );

            return Math.max(
                max,
                getCurrentStreak(
                    habitCheckIns,
                    Number(habit.targetPerDay) || 1,
                ),
            );
        },
        0,
    );

    const longestStreak = activeHabits.reduce(
        (max, habit) => {
            const habitCheckIns =
                checkIns.filter(
                    (checkIn) =>
                        checkIn.habitId ===
                        habit.id,
                );

            return Math.max(
                max,
                getLongestStreak(
                    habitCheckIns,
                    Number(habit.targetPerDay) || 1,
                ),
            );
        },
        0,
    );

    return [
        {
            id: 1,
            title: "dashboard.completedToday",
            completed: completedToday,
            total: activeHabits.length,
        },
        {
            id: 2,
            title: "dashboard.activeHabits",
            value: activeHabits.length,
        },
        {
            id: 3,
            title: "dashboard.currentStreak",
            value: `${currentStreak} Days`,
        },
        {
            id: 4,
            title: "dashboard.longestStreak",
            value: `${longestStreak} Days`,
        },
    ];
}

function buildHabitStatistics(
    activeHabits: Habit[],
    checkIns: CheckIn[],
): HabitStatisticsType[] {
    if (activeHabits.length === 0) {
        return DAY_SHORT.map((day) => ({
            day,
            rate: 0,
        }));
    }

    const stats: HabitStatisticsType[] = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(
            date.getDate() - i,
        );

        const dateKey = getDateKey(date);

        const completed =
            activeHabits.filter((habit) =>
                isHabitCompletedOnDate(
                    habit,
                    checkIns,
                    dateKey,
                ),
            ).length;

        stats.push({
            day: DAY_SHORT[date.getDay()],
            rate: Math.round(
                (completed /
                    activeHabits.length) *
                    100,
            ),
        });
    }

    return stats;
}

function buildCategoryOverview(
    activeHabits: Habit[],
    categories: Category[],
): CategoryOverviewType[] {
    return categories
        .map((category) => {
            const habitCount =
                activeHabits.filter(
                    (habit) =>
                        habit.categoryId ===
                        category.id,
                ).length;

            return {
                id: category.id,
                category: category.name,
                progress: habitCount,
            };
        })
        .filter(
            (category) =>
                category.progress > 0,
        );
}

function buildGoalProgress(
    goals: GoalWithDerived[],
    habits: Habit[],
): GoalProgressType[] {
    return goals
        .filter(
            (goal) =>
                goal.progress.status !==
                "COMPLETED",
        )
        .map((goal) => {
            const habit = habits.find(
                (item) =>
                    item.id === goal.habitId,
            );

            return {
                id: goal.id,
                title:
                    habit?.name ??
                    goal.habitId,
                progress: Math.min(
                    Math.max(
                        goal.progress
                            .progressPercent,
                        0,
                    ),
                    100,
                ),
            };
        });
}

export function computeDashboardData(
    habits: Habit[],
    checkIns: CheckIn[],
    goals: GoalWithDerived[],
    categories: Category[],
    selectedCategory?: string,
): DashboardData {
    const activeHabits =
        getActiveHabits(habits);

    const filteredHabits =
        selectedCategory &&
        selectedCategory !== "ALL"
            ? activeHabits.filter(
                  (habit) =>
                      habit.categoryId ===
                      selectedCategory,
              )
            : activeHabits;

    const filteredGoals =
        selectedCategory &&
        selectedCategory !== "ALL"
            ? goals.filter((goal) =>
                  filteredHabits.some(
                      (habit) =>
                          habit.id ===
                          goal.habitId,
                  ),
              )
            : goals;

    return {
        summaryCards:
            buildSummaryCards(
                habits,
                filteredHabits,
                checkIns,
            ),

        habitStatistics:
            buildHabitStatistics(
                filteredHabits,
                checkIns,
            ),

        categoryOverview:
            buildCategoryOverview(
                activeHabits,
                categories,
            ),

        goalProgress:
            buildGoalProgress(
                filteredGoals,
                habits,
            ),
    };
}

export function getDashboardData(
    selectedCategory?: string,
): DashboardData {
    const habits = readHabits();
    const checkIns = readCheckIns();
    const categories =
        readCategories();

    let goals: GoalWithDerived[] = [];

    try {
        goals =
            getAllGoalsWithProgress();
    } catch {
        goals = [];
    }

    return computeDashboardData(
        habits,
        checkIns,
        goals,
        categories,
        selectedCategory,
    );
}