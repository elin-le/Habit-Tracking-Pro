// useHabits.ts
import { useState } from "react";
import type { Habit } from "../types/Habit";
import { STORAGE_KEY } from "../constants/appConstants";

function readAllHabits(): Habit[] {
  const raw = localStorage.getItem(STORAGE_KEY.USER_HABITS);
  return raw ? JSON.parse(raw) : [];
}

function writeAllHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY.USER_HABITS, JSON.stringify(habits));
}

export function useHabits(userId: string) {
  const [habits, setHabits] = useState<Habit[]>(() =>
    readAllHabits().filter((h) => h.userId === userId),
  );

  const createHabit = (habit: Habit) => {
    const allHabits = readAllHabits(); // đọc lại toàn bộ, không chỉ phần đã filter trong state
    const next = [habit, ...allHabits];
    writeAllHabits(next);
    setHabits(next.filter((h) => h.userId === userId));
  };

  const updateHabit = (updated: Habit) => {
    const allHabits = readAllHabits();
    const next = allHabits.map((h) => (h.id === updated.id ? updated : h));
    writeAllHabits(next);
    setHabits(next.filter((h) => h.userId === userId));
  };

  const deleteHabit = (id: string) => {
    const allHabits = readAllHabits();
    const next = allHabits.filter((h) => h.id !== id);
    writeAllHabits(next);
    setHabits(next.filter((h) => h.userId === userId));
  };

  return { habits, createHabit, updateHabit, deleteHabit };
}
