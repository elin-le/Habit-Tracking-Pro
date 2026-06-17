import { useState } from "react";
import { STORAGE_KEY } from "../constants/appConstants";
import type { CheckIn } from "../types/CheckIn";

function readCheckInsFromStorage(): CheckIn[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY.USER_CHECKINS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCheckInsToStorage(checkIns: CheckIn[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY.USER_CHECKINS,
      JSON.stringify(checkIns),
    );
  } catch {
    // ignore
  }
}

function createCheckInId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `checkin_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>(() =>
    readCheckInsFromStorage(),
  );

  const getCheckInsByDate = (checkedAt: string) => {
    return checkIns.filter(
      (checkIn) => checkIn.checkedAt === checkedAt,
    );
  };

  const getCheckIn = (habitId: string, checkedAt: string) => {
    return checkIns.find(
      (checkIn) =>
        checkIn.habitId === habitId &&
        checkIn.checkedAt === checkedAt,
    );
  };

  const getHistoryByHabitId = (habitId: string) => {
    return checkIns
      .filter((checkIn) => checkIn.habitId === habitId)
      .sort(
        (a, b) =>
          new Date(b.checkedAt).getTime() -
          new Date(a.checkedAt).getTime(),
      );
  };

  const upsertCheckIn = (
    habitId: string,
    checkedAt: string,
    completionCount: number,
  ) => {
    const nextCount = Math.max(0, completionCount);

    const existing = checkIns.find(
      (checkIn) =>
        checkIn.habitId === habitId &&
        checkIn.checkedAt === checkedAt,
    );

    const next = existing
      ? checkIns.map((checkIn) =>
          checkIn.id === existing.id
            ? {
                ...checkIn,
                completionCount: nextCount,
              }
            : checkIn,
        )
      : [
          ...checkIns,
          {
            id: createCheckInId(),
            habitId,
            checkedAt,
            completionCount: nextCount,
          },
        ];

    setCheckIns(next);
    writeCheckInsToStorage(next);
  };

  return {
    checkIns,
    getCheckInsByDate,
    getCheckIn,
    getHistoryByHabitId,
    upsertCheckIn,
  };
}