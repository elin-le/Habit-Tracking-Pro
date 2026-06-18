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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.2" : "1.7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    value: "goals",
    label: "Goals",
    path: "/dashboard/goals",
    icon: (active: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.2" : "1.7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "habits",
    label: "Habits",
    path: "/dashboard/habits",
    icon: (active: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.2" : "1.7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    value: "notifications",
    label: "Alerts",
    path: "/dashboard/notifications",
    icon: (active: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.2" : "1.7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    value: "stats",
    label: "Stats",
    path: "/dashboard/statistics",
    icon: (active: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? "2.2" : "1.7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 20h18M5 20V12m4 8V8m4 12V4m4 16v-6" />
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
      style={{
        background: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.10)",
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-3">
        {TABS.map((tab) => {
          const active =
            tab.value === "home"
              ? location.pathname === tab.path
              : location.pathname.startsWith(tab.path);

          return (
            <button
              key={tab.value}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center transition-all duration-200 flex-1"
            >
              <span
                className="relative flex items-center justify-center transition-all duration-200"
                style={{
                  width: active ? "54px" : "42px",
                  height: "40px",
                  borderRadius: active ? "20px" : "18px",
                  background: active
                    ? "color-mix(in srgb, var(--primary) 14%, transparent)"
                    : "transparent",
                  color: active
                    ? "var(--primary)"
                    : "color-mix(in srgb, var(--text) 40%, transparent)",
                }}
              >
                {tab.icon(active)}

                {tab.value === "notifications" && unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-[10px] font-bold min-w-[19px] h-[19px] rounded-full flex items-center justify-center px-1"
                    style={{ background: "#ef4444", boxShadow: "0 0 0 2px var(--surface)" }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>

              <span
                className="text-[9px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap mt-0.5"
                style={{
                  color: active
                    ? "var(--primary)"
                    : "color-mix(in srgb, var(--text) 38%, transparent)",
                }}
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