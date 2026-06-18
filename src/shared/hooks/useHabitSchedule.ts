// useHabitSchedule.ts
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

function readAllHabitsFromStorage(): Habit[] {
  const raw = localStorage.getItem(STORAGE_KEY.USER_HABITS);
  return raw ? JSON.parse(raw) : [];
}

export function useHabitSchedule(userId: string) {
  // tự tính userHabitIds MỖI LẦN cần dùng, đọc trực tiếp từ localStorage (luôn mới nhất)
  const getUserHabitIds = () => {
    return readAllHabitsFromStorage()
      .filter((h) => h.userId === userId)
      .map((h) => h.id);
  };

  const [habitSchedules, setHabitSchedules] = useState<HabitSchedule[]>(() => {
    const ids = getUserHabitIds();
    return readAllHabitSchedules().filter((s) => ids.includes(s.habitId));
  });

  const createHabitSchedules = (newSchedules: HabitSchedule[]) => {
    const allSchedules = readAllHabitSchedules();
    const next = [...newSchedules, ...allSchedules];
    writeAllHabitSchedules(next);

    const ids = getUserHabitIds(); // đọc lại NGAY LÚC NÀY, đã có habit mới vì createHabit (bước 1) đã ghi localStorage xong
    setHabitSchedules(next.filter((s) => ids.includes(s.habitId)));
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

    const ids = getUserHabitIds();
    setHabitSchedules(next.filter((s) => ids.includes(s.habitId)));
  };

  const deleteHabitSchedulesByHabitId = (habitId: string) => {
    const allSchedules = readAllHabitSchedules();
    const next = allSchedules.filter((s) => s.habitId !== habitId);
    writeAllHabitSchedules(next);

    const ids = getUserHabitIds();
    setHabitSchedules(next.filter((s) => ids.includes(s.habitId)));
  };

  return {
    habitSchedules,
    createHabitSchedules,
    getSchedulesByHabitId,
    replaceHabitSchedules,
    deleteHabitSchedulesByHabitId,
  };
}
