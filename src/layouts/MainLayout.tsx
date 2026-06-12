import { Outlet } from "react-router-dom";
import { useState } from "react";

import SideBar from "./components/SideBar";
import Header from "./components/Header";
import BottomTabBar from "./components/BottomTabBar";

import { useTranslation } from "react-i18next";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          title={t("header.greeting")}
          subtitle={t("header.subtitle")}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}
