import { useState } from "react";
import type { HabitSchedule } from "../types/HabitSchedule";
import type { Habit } from "../types/Habit";
import { STORAGE_KEY } from "../constants/appConstants";

function readAllHabitSchedules(): HabitSchedule[] {
  const raw = localStorage.getItem(STORAGE_KEY.USER_HABIT_SCHEDULES);
  return raw ? JSON.parse(raw) : [];
}

function writeAllHabitSchedules(habitSchedules: HabitSchedule[]) {
  localStorage.setItem(
    STORAGE_KEY.USER_HABIT_SCHEDULES,
    JSON.stringify(habitSchedules),
  );
}

export function useHabitSchedule(userHabits: Habit[]) {
  const userHabitIds = userHabits.map((h) => h.id);

  const [habitSchedules, setHabitSchedules] = useState<HabitSchedule[]>(() =>
    readAllHabitSchedules().filter((s) => userHabitIds.includes(s.habitId)),
  );

  const createHabitSchedules = (newSchedules: HabitSchedule[]) => {
    const allSchedules = readAllHabitSchedules(); // đọc toàn bộ, không chỉ phần đã filter
    const next = [...newSchedules, ...allSchedules];
    writeAllHabitSchedules(next);
    setHabitSchedules(next.filter((s) => userHabitIds.includes(s.habitId)));
  };

  const getSchedulesByHabitId = (habitId: string) => {
    return habitSchedules.filter((s) => s.habitId === habitId);
  };

  const replaceHabitSchedules = (
    habitId: string,
    newSchedules: HabitSchedule[],
  ) => {
    const allSchedules = readAllHabitSchedules();
    const next = [
      ...allSchedules.filter((s) => s.habitId !== habitId),
      ...newSchedules,
    ];
    writeAllHabitSchedules(next);
    setHabitSchedules(next.filter((s) => userHabitIds.includes(s.habitId)));
  };

  const deleteHabitSchedulesByHabitId = (habitId: string) => {
    const allSchedules = readAllHabitSchedules();
    const next = allSchedules.filter((s) => s.habitId !== habitId);
    writeAllHabitSchedules(next);
    setHabitSchedules(next.filter((s) => userHabitIds.includes(s.habitId)));
  };

  return {
    habitSchedules,
    createHabitSchedules,
    getSchedulesByHabitId,
    replaceHabitSchedules,
    deleteHabitSchedulesByHabitId,
  };
}
