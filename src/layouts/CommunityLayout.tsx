import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Search, Moon, Sun, ChevronLeft, X } from 'lucide-react';

interface CommunityLayoutProps {
  title?: string;
  subtitle?: string;
  /** Pass this only when Community is pushed on top of something else (e.g. opened from a tab bar, omit it). */
  onBack?: () => void;
}

/** Shape handed down to nested routes through <Outlet context>. */
interface CommunityContext {
  searchQuery: string;
}

/**
 * Dedicated chrome for the whole Community section. Used directly as a
 * route `element`, the same way MainLayout/AuthLayout are:
 *
 *   { path: ROUTES.COMMUNITY, element: <CommunityLayout />, children: [...] }
 *
 * It owns the search box in its sticky header and the dark/light toggle,
 * then hands the current search text down to whichever child route is
 * active via React Router's Outlet context. Read it from any nested page
 * with `useCommunitySearch()`.
 */
export default function CommunityLayout({ title = 'Cộng đồng', subtitle, onBack }: CommunityLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem('htp-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('htp-theme', next ? 'dark' : 'light');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8F5FD] text-violet-950 dark:bg-[#150f23] dark:text-violet-50">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />
      <div className="pointer-events-none absolute right-0 top-40 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-500/10" />

      <header className="sticky top-0 z-30 border-b border-violet-100/80 bg-[#F8F5FD]/80 backdrop-blur-md dark:border-violet-900/40 dark:bg-[#150f23]/80">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 sm:px-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Quay lại"
              className="flex-shrink-0 rounded-full p-1.5 text-violet-500 transition hover:bg-violet-100 dark:text-violet-300 dark:hover:bg-violet-900/40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {searchOpen ? (
            <div className="flex flex-1 items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1.5 dark:border-violet-800 dark:bg-violet-950/40">
              <Search className="h-4 w-4 flex-shrink-0 text-violet-400" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên người dùng..."
                className="w-full bg-transparent text-sm text-violet-950 placeholder:text-violet-400 focus:outline-none dark:text-violet-50"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
                aria-label="Đóng tìm kiếm"
                className="flex-shrink-0 text-violet-400 hover:text-violet-600 dark:hover:text-violet-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-between">
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="truncate text-xs text-violet-500 dark:text-violet-400">{subtitle}</p>}
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Tìm kiếm"
                  className="rounded-full p-2 text-violet-500 transition hover:bg-violet-100 dark:text-violet-300 dark:hover:bg-violet-900/40"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
                  className="rounded-full p-2 text-violet-500 transition hover:bg-violet-100 dark:text-violet-300 dark:hover:bg-violet-900/40"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6">
        <Outlet context={{ searchQuery } satisfies CommunityContext} />
      </main>
    </div>
  );
}

/** Read the search text the layout's header is currently holding, from any nested route. */
export function useCommunitySearch() {
  return useOutletContext<CommunityContext>();
}