export type GoalType = 'streak' | 'total_completions';

export type GoalStatus = 'not_started' | 'in_progress' | 'completed';

export interface Goal {
    id: string;
    habitId: string;
    goalType: GoalType;
    targetValue: number;
    startedDate: string;
    endDate: string;
}

export interface GoalDerived {
    currentProgress: number;
    progressPercent: number;
    status: GoalStatus;
}

export interface GoalWithDerived extends Goal {
    progress: GoalDerived;
}