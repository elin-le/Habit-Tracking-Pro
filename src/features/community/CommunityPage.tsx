import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Phone, Users, UserRound, X } from "lucide-react";

import type { User } from "@/shared/types/User";
import { STORAGE_KEY } from "@/shared/constants/appConstants";
import { ROUTES } from "@/shared/constants/appConstants";
import { useReadOnly } from "@/context/ReadOnlyContext";
import DashboardPage from "@/pages/DashboardPage";
/* ─────────────────────────────────────────
   Avatar with graceful fallback
───────────────────────────────────────── */
const GRADIENT_PALETTE = [
  "from-violet-400 to-indigo-500",
  "from-sky-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-fuchsia-400 to-purple-500",
];

function getGradient(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENT_PALETTE[Math.abs(hash) % GRADIENT_PALETTE.length];
}

interface AvatarProps {
  avt: string;
  username: string;
  size?: "md" | "lg";
}

function Avatar({ avt, username, size = "md" }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const dim = size === "lg" ? "w-20 h-20" : "w-14 h-14 sm:w-16 sm:h-16";

  if (avt && !imgError) {
    return (
      <img
        src={avt}
        alt={username}
        onError={() => setImgError(true)}
        className={`${dim} rounded-full object-cover ring-2 ring-white/60 dark:ring-gray-700/60`}
      />
    );
  }

  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br ${getGradient(username)}
                        flex items-center justify-center ring-2 ring-white/60 dark:ring-gray-700/60`}
    >
      <span className="text-white font-bold text-lg leading-none">
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   User Card
───────────────────────────────────────── */
interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <button
      onClick={() => onClick(user)}
      className="
                group flex flex-col items-center gap-2.5 p-4 w-full
                rounded-2xl text-left cursor-pointer
                bg-white dark:bg-gray-800/70
                border border-gray-100 dark:border-gray-700/60
                shadow-sm
                hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/60
                hover:-translate-y-0.5
                active:scale-95 active:shadow-none
                transition-all duration-200 ease-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
            "
    >
      {/* Avatar + online dot */}
      <div className="relative">
        <Avatar avt={user.avt} username={user.username} />
        <span
          className="
                        absolute bottom-0 right-0
                        w-3.5 h-3.5 rounded-full
                        bg-emerald-400 dark:bg-emerald-500
                        border-2 border-white dark:border-gray-800
                    "
        />
      </div>

      {/* Name */}
      <p
        className="
                w-full text-center text-sm font-semibold leading-tight
                text-gray-800 dark:text-gray-100
                group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                transition-colors line-clamp-1
            "
      >
        {user.username}
      </p>

      {/* Phone */}
      <div className="flex items-center gap-1 w-full justify-center">
        <Phone
          size={10}
          className="text-gray-400 dark:text-gray-500 flex-shrink-0"
        />
        <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate leading-none">
          {user.phone}
        </p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────
   Empty State
───────────────────────────────────────── */
function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400 dark:text-gray-500">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Users size={28} className="opacity-50" />
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">
          {query ? "No results found" : "No members yet"}
        </p>
        <p className="text-sm mt-1">
          {query
            ? `Nothing matched "${query}"`
            : "Members will appear here once they join"}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CommunityPage
───────────────────────────────────────── */
const CommunityPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const users = JSON.parse(
    localStorage.getItem(STORAGE_KEY.USERS) || "[]",
  ) as User[];
  const currentUser: User | null = JSON.parse(
    localStorage.getItem(STORAGE_KEY.CURRENT_USER) || "null",
  );
  const { setReadOnly } = useReadOnly();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = query
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query) || u.phone.includes(query),
      )
    : users;

  const handleUserClick = (user: User) => {
    setReadOnly(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH);
    }
  }, []);
  if (selectedUser) {
    return (
      <>
        <button
          onClick={() => {
            setSelectedUser(null);
            setReadOnly(false);
          }}
        >
          Back
        </button>

        <DashboardPage userId={selectedUser.phone} />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-10 sm:px-6 sm:pt-7">
        {/* ── Top bar ── */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            aria-label="Go back"
            className="
                            flex-shrink-0 p-2.5 rounded-xl
                            bg-white dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            text-gray-600 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700
                            active:scale-90
                            shadow-sm transition-all duration-150
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                        "
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
              Community
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {query
                ? `${filtered.length} of ${users.length} members`
                : `${users.length} member${users.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Icon badge */}
          <div
            className="
                        flex-shrink-0 p-2.5 rounded-xl
                        bg-indigo-50 dark:bg-indigo-900/30
                        text-indigo-500 dark:text-indigo-400
                    "
          >
            <UserRound size={18} />
          </div>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-5 sm:mb-6">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
                            w-full py-3 pl-10 pr-10
                            rounded-xl text-sm
                            bg-white dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            text-gray-900 dark:text-gray-100
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/70
                            focus:border-transparent
                            transition-all
                        "
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="
                                absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-400 dark:text-gray-500
                                hover:text-gray-600 dark:hover:text-gray-300
                                transition-colors
                            "
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div
            className="
                            grid gap-3 sm:gap-4
                            grid-cols-2
                            xs:grid-cols-3
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                        "
          >
            {filtered.map((user) => (
              <UserCard
                key={user.phone}
                user={user}
                onClick={handleUserClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
