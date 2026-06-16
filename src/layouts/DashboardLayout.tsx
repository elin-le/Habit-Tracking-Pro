import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./styles/dashboard-layout.css";

import { SIDEBAR_MENUS } from "../data/dashboard"

const DashboardLayout = () => {
    const { t } = useTranslation();

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="dashboard-sidebar__logo">
                    HabitPro
                </div>

                <nav className="dashboard-sidebar__nav">
                    {SIDEBAR_MENUS.map((item) => (
                        <button
                            key={item.id}
                            className={`dashboard-sidebar__item ${item.active
                                ? "dashboard-sidebar__item--active"
                                : ""
                                }`}
                        >
                            {t(item.label)}
                        </button>
                    ))}
                </nav>

                <div className="dashboard-sidebar__user">
                    Alex Johnson
                </div>
            </aside>

            <div className="dashboard-content">
                <header className="dashboard-header">
                    <div>
                        <h1 className="dashboard-header__title">
                            {t("dashboard.title")}
                        </h1>

                        <p className="dashboard-header__subtitle">
                            {t("dashboard.welcome")}
                        </p>
                    </div>

                    <button className="dashboard-header__button">
                        + {t("habit.newHabit")}
                    </button>
                </header>

                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;