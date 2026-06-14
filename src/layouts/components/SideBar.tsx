import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../shared/constants/appConstants"
import { useTranslation } from "react-i18next"
import { NotificationBadge } from '../../features/notifications/component/NotificationBadge';


function HomeIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            <path d="M9 21V12h6v9" />
        </svg>
    );
}

function HabitsIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="8" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
            <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
    );
}

function GoalsIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
    );
}

function StatisticsIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18M5 20V12m4 8V8m4 12V4m4 16v-6" />
        </svg>
    );
}

function BellIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    );
}

function SettingsIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
    );
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
    const { t } = useTranslation();

    const NAV_ITEMS = [
        { to: ROUTES.DASHBOARD, label: t("sidebar.dashboard"), icon: HomeIcon },
        { to: ROUTES.HABITS, label: t("sidebar.habits"), icon: HabitsIcon },
        { to: ROUTES.GOALS, label: t("sidebar.goals"), icon: GoalsIcon },
        { to: ROUTES.STATISTICS, label: t("sidebar.statistics"), icon: StatisticsIcon },
        { to: "/dashboard/notifications", label: t('sidebar.notifications'), icon: BellIcon, badge: <NotificationBadge /> },
        // { to: "/settings", label: "Settings", icon: SettingsIcon },
    ];


    return (
        <div className="flex flex-col h-full px-3 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">HabitPro</span>
                {/* Close button - mobile only */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-auto lg:hidden text-violet-300 hover:text-white transition-colors"
                        aria-label="Close sidebar"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === ROUTES.DASHBOARD}
                        onClick={onClose}
                        className={({ isActive }) =>
                            [
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-violet-600 text-white"
                                    : "text-violet-300 hover:bg-white/[0.06] hover:text-violet-100",
                            ].join(" ")
                        }
                    >
                        <Icon />
                        <span className="flex-1">{label}</span>
                        {badge !== undefined && (
                            <span className="bg-red-500 text-white text-[11px] font-semibold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5">
                                {badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 mt-4">
                <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    AJ
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate leading-tight">Alex Johnson</p>
                    <p className="text-xs text-violet-400 truncate leading-tight">alex@email.com</p>
                </div>
            </div>
        </div>
    );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[220px] min-h-screen bg-[#1a1040] shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Drawer */}
            <aside
                className={[
                    "fixed top-0 left-0 bottom-0 z-50 w-[220px] bg-[#1a1040] flex flex-col transition-transform duration-300 lg:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
            >
                <SidebarContent onClose={onClose} />
            </aside>
        </>
    );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-violet-600 hover:bg-violet-50 transition-colors"
            aria-label="Open menu"
        >
            <MenuIcon />
        </button>
    );
}