import type { Goal, GoalWithDerived } from "../../../shared/types/Goal";
import { STORAGE_KEY } from "../../../shared/constants/appConstants";
import { calculateMilestones } from "../calculators/MilestoneCalculator";
import type { Habit } from "../../../shared/types/Habit";
import { getCurrentStreakInRange, getTotalCompletion, getLongestStreak, getCompletionRate, getDailySummary } from "../../habit/calculators/GoalCalculator";
import type { CheckIn } from "../../../shared/types/CheckIn";

export const getGoals = (): Goal[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY.USER_GOALS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to parse goals", e);
        return [];
    }
};

export const setGoals = (goals: Goal[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY.USER_GOALS, JSON.stringify(goals))
    } catch (e) {
        console.error("Failed to save goals", e);
    }
};

export const getGoalById = (id: string): Goal | undefined => {
    return getGoals().find(g => g.id === id);
};

export const createGoal = (goalData: Omit<Goal, 'id'>): Goal => {
    const goals = getGoals();
    const allCheckIns: CheckIn[] = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_CHECKINS) || "[]");
    const allHabits: Habit[] = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_HABITS) || "[]");
    const habit = allHabits.find(h => h.id === goalData.habitId);
    const targetPerDay = habit ? habit.targetPerDay : 1;

    // validate mỗi habit chỉ có 1 goal đang thực hiện
    validateNoActiveGoalForHabit(goalData.habitId, goals, allCheckIns, targetPerDay);

    const newGoal: Goal = {
        ...goalData,
        id: `goal-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`,
    };

    goals.push(newGoal);
    setGoals(goals);
    return newGoal;
};

export const updateGoal = (id: string, goalData: Partial<Goal>): Goal | undefined => {
    const goals = getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index === -1) return undefined;

    goals[index] = { ...goals[index], ...goalData };
    setGoals(goals);
    return goals[index];
};

export const deleteGoal = (id: string): void => {
    const goals = getGoals();
    const newGoals = goals.filter(g => g.id !== id);
    setGoals(newGoals);
}

export const calculateGoalProgress = (goal: Goal, checkins: CheckIn[], targetPerDay: number): GoalWithDerived => {
    let currentProgress = 0;

    if (goal.targetType === 'STREAK') {
        currentProgress = getCurrentStreakInRange(goal, checkins, targetPerDay);
    } else if (goal.targetType === 'TOTAL_COMPLETIONS') {
        currentProgress = getTotalCompletion(goal, targetPerDay, checkins);
    }

    currentProgress = Math.max(0, currentProgress);
    const progressPercent = Math.min(Math.round((currentProgress / goal.targetValue) * 100), 100);
    let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

    if (progressPercent >= 100) {
        status = 'COMPLETED';
    } else if (progressPercent > 0) {
        status = 'IN_PROGRESS';
    } else {
        status = 'NOT_STARTED';
    }

    const milestones = calculateMilestones(goal.targetValue, progressPercent);
    const bestStreak = getLongestStreak(checkins, targetPerDay);
    const completionRate = getCompletionRate(goal.startedDate, goal.endDate || new Date().toISOString(), checkins, targetPerDay);
    const summary = getDailySummary(checkins, targetPerDay);
    const weeklyHistory = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().split("T")[0];
        
        const dayStr = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d);
        weeklyHistory.push({
            day: dayStr,
            value: summary[dateKey]?.completed ? 100 : 0
        });
    }

    return {
        ...goal,
        progress: {
            currentProgress,
            progressPercent,
            status,
            milestones
        },
        stats: {
            bestStreak,
            completionRate
        },
        weeklyHistory
    };
};

export const validateNoActiveGoalForHabit = (habitId: string, goasl: Goal[], checkins: CheckIn[], targetPerDay: number): void => {
    const habitGoals = goasl.filter(g => g.habitId === habitId);

    for (const rawGoal of habitGoals) {
        const goalWithProgress = calculateGoalProgress(rawGoal, checkins, targetPerDay);
        if (goalWithProgress.progress.status === "IN_PROGRESS" || goalWithProgress.progress.status === "NOT_STARTED") {
            throw new Error("Habit này đã có mục tiêu đang được thực hiện. Vui lòng hoàn thành hoặc lưu trữ mục tiêu cũ trước.");
        }
    }
}


export const getAllGoalsWithProgress = (): GoalWithDerived[] => {
    const goals = getGoals();
    const allCheckIns: CheckIn[] = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_CHECKINS) || "[]");
    const allHabits: Habit[] = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_HABITS) || "[]");

    return goals.map(goal => {
        const habit = allHabits.find(h => h.id === goal.habitId);
        const targetPerDay = habit ? habit.targetPerDay : 1;
        return calculateGoalProgress(goal, allCheckIns, targetPerDay);
    });
};
