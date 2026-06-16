import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../features/notifications/context/NotificationContext";

const TABS = [
  {
    value: "home",
    label: "Home",
    path: "/dashboard",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    value: "notifications",
    label: "Alerts",
    path: "/dashboard/notifications",
    icon: (_active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    value: "habits",
    label: "Habits",
    path: "/dashboard/habits",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          fill={active ? "currentColor" : "none"}
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          fill={active ? "currentColor" : "none"}
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          fill={active ? "currentColor" : "none"}
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          fill={active ? "currentColor" : "none"}
        />
      </svg>
    ),
  },
  {
    value: "stats",
    label: "Stats",
    path: "/dashboard/statistics",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          fill="none"
          stroke={active ? "#7c3aed" : "currentColor"}
        />
      </svg>
    ),
  },
  {
    value: "profile",
    label: "Profile",
    path: "/profile",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="8" r="4" fill={active ? "currentColor" : "none"} />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useContext(NotificationContext);

  return (
    <nav
      style={{ background: "var(--surface)" }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-violet-100 pb-safe"
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {TABS.map((tab) => {
          const active = tab.value === "home"
            ? location.pathname === tab.path
            : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.value}
              onClick={() => navigate(tab.path)}
              className={[
                "relative flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors",
                active ? "text-violet-600" : "text-gray-400",
              ].join(" ")}
            >
              <div className="relative">
                {tab.icon(active)}
                {tab.value === "notifications" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[8px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 border border-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span
                className={[
                  "text-[10px] font-medium",
                  active ? "text-violet-600" : "text-gray-400",
                ].join(" ")}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
