import { mockHabits } from "../../data/habit";
import { mockHabitSchedules } from "../../data/habit_schedule";
import { mockCategories } from "../../data/category";
import { MockUsers } from "../../data/users";
import { STORAGE_KEY } from "../constants/appConstants";

export const seedData = () => {
  const users = localStorage.getItem(STORAGE_KEY.USERS);
  if (!users) {
    localStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(MockUsers));

    console.log("Seeded users data");
  }
};

export const seedHabits = () => {
  const habits = localStorage.getItem(STORAGE_KEY.USER_HABITS);
  if (!habits) {
    localStorage.setItem(STORAGE_KEY.USER_HABITS, JSON.stringify(mockHabits));
    console.log("Seeded habits data");
  }
};

export const seedHabitSchedules = () => {
  const schedules = localStorage.getItem(STORAGE_KEY.USER_HABIT_SCHEDULES);
  if (!schedules) {
    localStorage.setItem(
      STORAGE_KEY.USER_HABIT_SCHEDULES,
      JSON.stringify(mockHabitSchedules),
    );
    console.log("Seeded habit schedules data");
  }
};

export const seedCategories = () => {
  const categories = localStorage.getItem(STORAGE_KEY.CATEGORYS);
  if (!categories) {
    localStorage.setItem(STORAGE_KEY.CATEGORYS, JSON.stringify(mockCategories));
    console.log("Seeded categories data");
  }
};
