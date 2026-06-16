import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../constants/appConstants";
import type { CheckIn } from "../types/CheckIn";

function readCheckInsFromStorage(): CheckIn[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY.USER_CHECKINS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeCheckInsToStorage(checkIns: CheckIn[]) {
  try {
    localStorage.setItem(STORAGE_KEY.USER_CHECKINS, JSON.stringify(checkIns));
  } catch (e) {
    // ignore
  }
}

function createCheckInId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `checkin_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

let globalCheckIns: CheckIn[] = readCheckInsFromStorage();
const subscribers = new Set<(next: CheckIn[]) => void>();

function notifySubscribers(next: CheckIn[]) {
  subscribers.forEach((s) => {
    try {
      s(next);
    } catch (e) {
      // ignore subscriber errors
    }
  });
}

function persistGlobal(next: CheckIn[]) {
  globalCheckIns = next;
  writeCheckInsToStorage(next);
  notifySubscribers(next);
}

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>(globalCheckIns);

  useEffect(() => {
    const sub = (next: CheckIn[]) => setCheckIns(next);
    subscribers.add(sub);
    // In case storage changed before subscription
    setCheckIns(globalCheckIns);
    return () => {
      subscribers.delete(sub);
    };
  }, []);

  const getCheckInsByDate = (checkedAt: string) =>
    globalCheckIns.filter((checkIn) => checkIn.checkedAt === checkedAt);

  const getCheckIn = (habitId: string, checkedAt: string) =>
    globalCheckIns.find(
      (checkIn) => checkIn.habitId === habitId && checkIn.checkedAt === checkedAt,
    );
  const getHistoryByHabitId = (habitId: string) => {
    return globalCheckIns
      .filter((checkIn) => checkIn.habitId === habitId)
      .sort((a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime());
   };

  const upsertCheckIn = (
    habitId: string,
    checkedAt: string,
    completionCount: number,
  ) => {
    const nextCount = Math.max(0, completionCount);
    const existing = globalCheckIns.find(
      (c) => c.habitId === habitId && c.checkedAt === checkedAt,
    );

    const next = existing
      ? globalCheckIns.map((checkIn) =>
          checkIn.id === existing.id ? { ...checkIn, completionCount: nextCount } : checkIn,
        )
      : [
          ...globalCheckIns,
          {
            id: createCheckInId(),
            habitId,
            checkedAt,
            completionCount: nextCount,
          },
        ];

    persistGlobal(next);
  };

  return {
    checkIns,
    getCheckInsByDate,
    getCheckIn,
    upsertCheckIn,
    getHistoryByHabitId
  };
}
