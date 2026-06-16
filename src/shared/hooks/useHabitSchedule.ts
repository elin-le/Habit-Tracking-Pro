import { useState } from "react";
import type { HabitSchedule } from "../types/HabitSchedule";
import { STORAGE_KEY } from "../constants/appConstants";

function readHabitSchedules(): HabitSchedule[] {
  const raw = localStorage.getItem(STORAGE_KEY.USER_HABIT_SCHEDULES);
  return raw ? JSON.parse(raw) : [];
}

function writeHabitSchedules(habitSchedules: HabitSchedule[]) {
  localStorage.setItem(
    STORAGE_KEY.USER_HABIT_SCHEDULES,
    JSON.stringify(habitSchedules),
  );
}

export function useHabitSchedule() {
  const [habitSchedules, setHabitSchedules] = useState<HabitSchedule[]>(() =>
    readHabitSchedules(),
  );

  const createHabitSchedules = (newSchedules: HabitSchedule[]) => {
    const next = [...newSchedules, ...habitSchedules];
    setHabitSchedules(next);
    writeHabitSchedules(next);
  };

  const getSchedulesByHabitId = (habitId: string) => {
    return habitSchedules.filter((s) => s.habitId === habitId);
  };

  const replaceHabitSchedules = (
    habitId: string,
    newSchedules: HabitSchedule[],
  ) => {
    const next = [
      ...habitSchedules.filter((s) => s.habitId !== habitId),
      ...newSchedules,
    ];
    setHabitSchedules(next);
    writeHabitSchedules(next);
  };

  const deleteHabitSchedulesByHabitId = (habitId: string) => {
    const next = habitSchedules.filter((s) => s.habitId !== habitId);
    setHabitSchedules(next);
    writeHabitSchedules(next);
  };

  return {
    habitSchedules,
    createHabitSchedules,
    getSchedulesByHabitId,
    replaceHabitSchedules,
    deleteHabitSchedulesByHabitId,
  };
}
