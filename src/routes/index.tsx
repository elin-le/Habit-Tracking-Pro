import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import CommunityLayout from "../layouts/CommunityLayout"

import { ROUTES } from "../shared/constants/appConstants";

import { HabitsPage } from "../features/habit/page/HabitsPage";
import { HabitHistoryPage } from "../features/habit/components/HabitHistoryPage";
import GoalsPage from "../features/goal/page/GoalsPage";
import { NotificationsPage } from "../pages/NotificationsPage";

import StatisticsPage from "../pages/StatisticsPage";
import DashboardPage from "../pages/DashboardPage";
import CommunityPage from "../features/community/CommunityPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={ROUTES.AUTH} replace />,
  },

  {
    path: ROUTES.AUTH,
    element: <AuthLayout />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: ROUTES.HABITS,
        element: <HabitsPage />,
      },
      {
        path: "habits/:habitId/history",
        element: <HabitHistoryPage />,
      },

      {
        path: ROUTES.GOALS,
        element: <GoalsPage />,
      },

      {
        path: "statistics",
        element: <StatisticsPage />,
      },

      {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
  {
    path: ROUTES.COMMUNITY,
    element: <CommunityLayout />,
    children: [
      {
        index: true,
        element: <CommunityPage />
      }
    ]
  }
]);
