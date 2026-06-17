// useHabits.ts — gộp hết
import { useState } from "react";
import type { Habit } from "../types/Habit";
import { STORAGE_KEY } from "../constants/appConstants";

function readHabits(): Habit[] {
  const raw = localStorage.getItem(STORAGE_KEY.USER_HABITS);
  return raw ? JSON.parse(raw) : [];
}

function writeHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY.USER_HABITS, JSON.stringify(habits));
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => readHabits());

  const createHabit = (habit: Habit) => {
    const next = [habit, ...habits];
    setHabits(next);
    writeHabits(next);
  };

  const updateHabit = (updated: Habit) => {
    const next = habits.map((h) => (h.id === updated.id ? updated : h));
    console.log(next);
    setHabits(next);
    writeHabits(next);
  };

  const deleteHabit = (id: string) => {
    const next = habits.filter((h) => h.id !== id);
    setHabits(next);
    writeHabits(next);
  };

  return { habits, createHabit, updateHabit, deleteHabit };
}
