import { useLocation, useNavigate } from "react-router-dom";
import {ROUTES} from "@/shared/constants/appConstants"

const TABS = [
  {
    value: "home",
    label: "Home",
    path: ROUTES.DASHBOARD,
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
    path: ROUTES.GOALS,
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
    path: ROUTES.HABITS,
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
  value: "community",
  label: "Community",
  path: ROUTES.COMMUNITY,
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
      <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="10" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
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