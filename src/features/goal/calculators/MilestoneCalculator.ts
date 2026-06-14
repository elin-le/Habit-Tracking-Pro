import type { Milestone } from "../../../shared/types/Goal";

export const calculateMilestones = (targetValue: number, progressPercent: number): Milestone[] => {
    const baseMilestone = [
        { targetPercent: 80, labelKey: 'goals.milestones.encouragement' },
        { targetPercent: 100, labelKey: 'goals.milestones.achieved' }
    ];

    if (targetValue >= 10) {
        baseMilestone.unshift({ targetPercent: 50, labelKey: 'goals.milestones.halfway' });
    }
    if (targetValue > 30) {
        baseMilestone.unshift({ targetPercent: 25, labelKey: 'goals.milestones.start' });
    }

    return baseMilestone.map(m => ({
        ...m,
        isReached: progressPercent >= m.targetPercent
    }));
};