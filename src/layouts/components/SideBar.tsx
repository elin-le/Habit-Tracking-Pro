import { NavLink } from "react-router-dom";
import { ROUTES } from "../../shared/constants/appConstants"
import { useTranslation } from "react-i18next"
import { NotificationBadge } from '../../features/notifications/component/NotificationBadge';
import type { User } from "../../shared/types/User"
import { STORAGE_KEY } from "../../shared/constants/appConstants"

const SIDEBAR_WIDTH = "260px";

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

function CommunityIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* User giữa */}
            <circle cx="12" cy="8" r="3" />
            <path d="M7.5 19c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />

            {/* User trái */}
            <circle cx="5.5" cy="10" r="2" />
            <path d="M2.5 18c0-1.8 1.4-3 3.2-3" />

            {/* User phải */}
            <circle cx="18.5" cy="10" r="2" />
            <path d="M21.5 18c0-1.8-1.4-3-3.2-3" />
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
    const currentUser = JSON.parse(
        localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "{}"
    ) as User;
    const NAV_ITEMS = [
        { to: ROUTES.DASHBOARD, label: t("sidebar.dashboard"), icon: HomeIcon },
        { to: ROUTES.HABITS, label: t("sidebar.habits"), icon: HabitsIcon },
        { to: ROUTES.GOALS, label: t("sidebar.goals"), icon: GoalsIcon },
        { to: "/dashboard/statistics", label: t("sidebar.statistics"), icon: StatisticsIcon },
        { to: ROUTES.COMMUNITY, label: t("sidebar.community"), icon: CommunityIcon, highlight: true, badge: "NEW", },
        { to: "/dashboard/notifications", label: t('sidebar.notifications'), icon: BellIcon, badge: <NotificationBadge /> },
    ];


    return (
        <div className="flex flex-col h-full px-3 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                    <img
                        src="/favicon.svg"
                        alt="Habit Tracking Pro"
                        className="w-full h-full object-contain"
                    />
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
            <nav className="flex flex-col gap-2 flex-1">
                {NAV_ITEMS.map(
                    ({ to, label, icon: Icon, badge, highlight }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === ROUTES.DASHBOARD}
                            onClick={onClose}
                            className={({ isActive }) =>
                                [
                                    "relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300",

                                    isActive
                                        ? "bg-violet-600 text-white"
                                        : "text-violet-300 hover:bg-white/[0.06] hover:text-violet-100",

                                    highlight &&
                                    !isActive &&
                                    `
                            border border-violet-400/40
                            bg-gradient-to-r
                            from-violet-600/25
                            via-violet-500/10
                            to-violet-600/25
                            shadow-[0_0_25px_rgba(139,92,246,0.35)]
                            community-highlight
                        `,
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                            }
                        >
                            {/* Glow pulse */}
                            {highlight && (
                                <span
                                    className="
                            absolute inset-0
                            rounded-xl
                            bg-violet-500/10
                            animate-pulse
                            pointer-events-none
                        "
                                />
                            )}

                            {/* Sparkle */}
                            {highlight && (
                                <span
                                    className="
                            absolute right-2 top-2
                            w-2 h-2
                            rounded-full
                            bg-yellow-300
                            animate-ping
                        "
                                />
                            )}

                            <Icon className="relative z-10" />

                            <span className="relative z-10 flex items-center gap-1 flex-1">
                                {label}

                                {highlight && (
                                    <span className="text-yellow-300 text-xs">
                                        ✨
                                    </span>
                                )}
                            </span>
                            {badge && (
                                <span
                                    className="
                            relative z-10
                            px-2 py-0.5
                            rounded-full
                            text-[10px]
                            font-bold
                            bg-white
                            text-violet-700
                        "
                                >
                                    {badge}
                                </span>
                            )}
                        </NavLink>
                    )
                )}
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 mt-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 bg-violet-600">
                    <img
                        src={currentUser.avt}
                        alt={currentUser.username}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate leading-tight">{currentUser.username}</p>
                    <p className="text-xs text-violet-400 truncate leading-tight">{currentUser.phone}</p>
                </div>
            </div>
        </div>
    );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className="hidden lg:flex flex-col min-h-screen bg-[#1a1040] shrink-0"
                style={{ width: SIDEBAR_WIDTH }}
            >
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
                style={{ width: SIDEBAR_WIDTH }}
                className={[
                    "fixed top-0 left-0 bottom-0 z-50 bg-[#1a1040] flex flex-col transition-transform duration-300 lg:hidden",
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