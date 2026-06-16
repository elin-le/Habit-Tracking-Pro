// useCategories.ts
import { useState } from "react";
import type { Category } from "../types/Category";
import { mockCategories } from "../../data/category";
import { STORAGE_KEY } from "../constants/appConstants";

function readCategories(): Category[] {
  const raw = localStorage.getItem(STORAGE_KEY.CATEGORYS);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY.CATEGORYS, JSON.stringify(mockCategories));
  return mockCategories;
}

function writeCategories(categories: Category[]) {
  localStorage.setItem(STORAGE_KEY.CATEGORYS, JSON.stringify(categories));
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() =>
    readCategories(),
  );

  const getCategoryById = (id: string): Category | undefined =>
    categories.find((c) => c.id === id);

  const createCategory = (category: Category) => {
    const next = [...categories, category];
    setCategories(next);
    writeCategories(next);
  };

  const updateCategory = (updated: Category) => {
    const next = categories.map((c) => (c.id === updated.id ? updated : c));
    setCategories(next);
    writeCategories(next);
  };

  const deleteCategory = (id: string) => {
    const next = categories.filter((c) => c.id !== id);
    setCategories(next);
    writeCategories(next);
  };

  return {
    categories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
