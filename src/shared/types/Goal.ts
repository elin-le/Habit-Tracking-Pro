export type TargetType = 'STREAK' | 'TOTAL_COMPLETIONS';

export type GoalStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface Milestone {
    targetPercent: number;
    labelKey: string;
    isReached: boolean;
}

export interface Goal {
    id: string;
    habitId: string;
    targetType: TargetType;
    targetValue: number;
    startedDate: string;
    endDate: string;
}

export interface GoalDerived {
    currentProgress: number;
    progressPercent: number;
    status: GoalStatus;
    milestones: Milestone[];
}

export interface GoalWithDerived extends Goal {
    progress: GoalDerived;
    stats?: {
        bestStreak: number;
        completionRate: number;
    };
    weeklyHistory?: {
        day: string;
        value: number;
    }[];
}