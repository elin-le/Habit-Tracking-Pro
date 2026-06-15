export type GoalType = 'STREAK' | 'TOTAL_COMPLETIONS';

export type GoalStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

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