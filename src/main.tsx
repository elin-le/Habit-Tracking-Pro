import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "./i18n";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";

import {
  seedData,
  seedHabits,
  seedHabitSchedules,
  seedCategories,
  seedGoals
} from "./shared/utils/seedData";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from './features/notifications/context/NotificationContext';
import { ReadOnlyProvider } from "./context/ReadOnlyContext"

seedData();
seedHabits();
seedHabitSchedules();
seedCategories();
seedGoals();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider >
      <NotificationProvider>
        <ReadOnlyProvider>
          <RouterProvider router={router} />
          <Toaster
            richColors
            position="top-right"
            closeButton
            expand
          />
        </ReadOnlyProvider>
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
);
