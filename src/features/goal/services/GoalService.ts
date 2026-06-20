import type { Goal, GoalDerived, GoalWithDerived, GoalStatus } from "../../../shared/types/Goal";
import { STORAGE_KEY } from "../../../shared/constants/appConstants";
import { calculateMilestones } from "../calculators/MilestoneCalculator";
import type { Habit } from "../../../shared/types/Habit";
import { getCurrentStreakInRange, getTotalCompletion, getLongestStreak, getCompletionRate, getDailySummary } from "../../habit/calculators/GoalCalculator";
import type { CheckIn } from "../../../shared/types/CheckIn";

// Hàm lấy tất cả goals
const getAllGoals = (): Goal[] => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY.USER_GOALS) || "[]");
    } catch (error) {
        console.error("Failed to parse goals", error);
        return [] as Goal[];
    }
}

// Hàm lấy goals của user hiện tại dựa vào habitIds
export const getGoals = (userHabitIds: string[]): Goal[] => {
    try {
        const allGoals : Goal[] = getAllGoals();
        // lọc ra goal của user hiện tại
        return allGoals.filter((goal : Goal) => userHabitIds.includes(goal.habitId));
    } catch (e) {
        console.error("Failed to parse goals", e);
        return [];
    }
};

// Hàm lưu tất cả goals
export const setGoals = (goals: Goal[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY.USER_GOALS, JSON.stringify(goals))
    } catch (e) {
        console.error("Failed to save goals", e);
    }
};

// Hàm lấy goal theo id của goal và habit
export const getGoalById = (id: string, userHabitIds: string[]): Goal | undefined => {
    return getGoals(userHabitIds).find(g => g.id === id);
};

// Hàm tạo goal mới
export const createGoal = (goalData: Omit<Goal, 'id'>): Goal => {
    const allGoals = getAllGoals();
    
    const newGoal: Goal = {
        ...goalData,
        id: crypto.randomUUID(),
    };

    allGoals.push(newGoal);
    setGoals(allGoals);
    return newGoal;
};

// Hàm update goal
export const updateGoal = (id: string, goalData: Partial<Goal>): Goal | undefined => {
    const allGoals = getAllGoals();

    const index = allGoals.findIndex(g => g.id === id);
    if (index === -1) return undefined;

    allGoals[index] = { ...allGoals[index], ...goalData };
    setGoals(allGoals);
    return allGoals[index];
};

// Hàm delete goal
export const deleteGoal = (id: string): void => {
    const allGoals = getAllGoals();
    const newGoals = allGoals.filter(g => g.id !== id);
    setGoals(newGoals);
}

// Hàm tính goal progress (bao gồm currentProgress, %, status) và danh sách các milestone của goal này
export const calculateCoreGoalProgress = (goal: Goal, checkins: CheckIn[], targetPerDay: number): GoalDerived => {
    let currentProgress = 0;

    if (goal.targetType === 'STREAK') {
        currentProgress = getCurrentStreakInRange(goal, checkins, targetPerDay);
    } else if (goal.targetType === 'TOTAL_COMPLETIONS') {
        currentProgress = getTotalCompletion(goal, targetPerDay, checkins);
    }

    currentProgress = Math.max(0, currentProgress);
    const progressPercent = Math.min(Math.round((currentProgress / goal.targetValue) * 100), 100);
    let status: GoalStatus;

    if (progressPercent >= 100) {
        status = 'COMPLETED';
    } else if (progressPercent > 0) {
        status = 'IN_PROGRESS';
    } else {
        status = 'NOT_STARTED';
    }

    const milestones = calculateMilestones(goal.targetValue, progressPercent);

    return {
        currentProgress,
        progressPercent,
        status,
        milestones
    };
};

// Hàm tính goal stats (bao gồm bestStreak, completionRate) và weeklyHistory của goal đó
export const calculateGoalStats = (goal: Goal, checkins: CheckIn[], targetPerDay:number) => {
    const habitCheckins = checkins.filter(c => c.habitId === goal.habitId);
    const bestStreak = getLongestStreak(habitCheckins, targetPerDay);
    const completionRate = getCompletionRate(goal.startedDate, goal.endDate || new Date().toISOString(), habitCheckins, targetPerDay);
    const summary = getDailySummary(habitCheckins, targetPerDay);
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
        stats: {
            bestStreak,
            completionRate
        },
        weeklyHistory
    };
}

// Hàm tính toán dữ liệu cơ bản liên quan đến goal
export const calculateGoalProgress = (goal: Goal, checkins: CheckIn[], targetPerDay: number) : GoalWithDerived => {
    const habitCheckins = checkins.filter(c => c.habitId === goal.habitId);
    const progress = calculateCoreGoalProgress(goal, habitCheckins, targetPerDay);

    // trả về 1 goal có thêm progress -> GoalWithDerived
    // Không tính toán stats và weeklyHistory ở đây nữa để tối ưu performance
    return {
        ...goal,
        progress : progress,
    };
};

// Hàm lấy toàn bộ goal của user hiện tại kèm theo progress và stats
export const getAllGoalsWithProgress = (userHabits: Habit[], checkIns: CheckIn[]): GoalWithDerived[] => {
    const userHabitIds = userHabits.map(h => h.id);
    const goals = getGoals(userHabitIds);

    // loop qua từng goal để tính progress và stats -> GoalWithDerived
    return goals.map(goal => {
        const habit = userHabits.find(h => h.id === goal.habitId);
        const targetPerDay = Number(habit?.targetPerDay || 1);
        return calculateGoalProgress(goal, checkIns, targetPerDay);
    });
};
