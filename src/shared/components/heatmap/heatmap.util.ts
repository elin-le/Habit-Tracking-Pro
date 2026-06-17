import type { CheckIn } from "../../types/CheckIn"

export const buildHeatMapData = (checkins: CheckIn[]) => {
    const map: Record<string, number> = {};

    for (const c of checkins) {
        const date = new Date(c.checkedAt)
            .toISOString()
            .split("T")[0];

        map[date] = (map[date] || 0) + c.completionCount;
    }

    return map;
};