import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import { ROUTES } from "../shared/constants/appConstants";
import { HabitsPage } from "../features/habit/page/HabitsPage";

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
        path: ROUTES.HABITS,
        element: <HabitsPage />,
      },

      //   {
      //     path: ROUTES.GOALS,
      //     element: <GoalsPage />,
      //   },

      //   {
      //     path: ROUTES.STATISTICS,
      //     element: <StatisticsPage />,
      //   },

      //   {
      //     path: ROUTES.NOTIFICATIONS,
      //     element: <NotificationsPage />,
      //   },

      //   {
      //     path: ROUTES.SETTINGS,
      //     element: <SettingsPage />,
      //   },
    ],
  },

  //   {
  //     path: "*",
  //     element: <Navigate to={ROUTES.DASHBOARD} replace />,
  //   },
]);
