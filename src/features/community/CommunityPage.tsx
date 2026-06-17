import { useMemo, useState } from 'react';
import { Users2 } from 'lucide-react';
import { useCommunitySearch } from '../../layouts/CommunityLayout';
import LeaderboardPodium from './LeaderboardPodium';
import MemberCard from './MemberCard';
import MemberProfileSheet from './MemberProfileSheet';
import { CATEGORY_LABEL, CATEGORY_EMOJI } from './CommunityTypes';
import type { CommunityMember, HabitCategory } from './CommunityTypes';
import { COMMUNITY_MEMBERS } from '../../data/community';
import { getTopStreak } from './CommunityUtil';

type TabKey = 'discover' | 'leaderboard' | 'following';

const TABS: { key: TabKey; label: string }[] = [
    { key: 'discover', label: 'Khám phá' },
    { key: 'leaderboard', label: 'Bảng dẫn đầu' },
    { key: 'following', label: 'Đang theo dõi' },
];

const CATEGORIES: HabitCategory[] = ['health', 'study', 'mindfulness', 'productivity', 'other'];

/**
 * Read-only community hub. People can browse public profiles — avatar +
 * username only, the phone-number key is never rendered — to see habits,
 * goals and streak stats. There is no edit/delete affordance anywhere in
 * this tree; `MemberProfileSheet` is purely a viewer.
 *
 * Swap `COMMUNITY_MEMBERS` for a real fetch once the community API exists;
 * everything below only depends on the `CommunityMember[]` shape.
 */
export default function CommunityPage() {
    const { searchQuery } = useCommunitySearch();
    const [activeTab, setActiveTab] = useState<TabKey>('discover');
    const [activeCategory, setActiveCategory] = useState<HabitCategory | 'all'>('all');
    const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);

    const sortedByStreak = useMemo(
        () => [...COMMUNITY_MEMBERS].sort((a, b) => getTopStreak(b) - getTopStreak(a)),
        []
    );

    const top3 = sortedByStreak.slice(0, 3);

    const filteredMembers = useMemo(() => {
        // "Following" has no data source yet in this read-only demo — wire up
        // a real follows list here once that concept exists in the backend.
        const base = activeTab === 'following' ? [] : sortedByStreak;
        return base.filter((member) => {
            const matchesSearch = member.user.username.toLowerCase().includes(searchQuery.trim().toLowerCase());
            const matchesCategory =
                activeCategory === 'all' || member.habits.some((h) => h.category === activeCategory);
            return matchesSearch && matchesCategory;
        });
    }, [sortedByStreak, searchQuery, activeCategory, activeTab]);

    return (
        <>
            <nav className="flex gap-5 border-b border-violet-100 dark:border-violet-900/40" aria-label="Danh mục cộng đồng">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative pb-3 text-sm font-semibold transition ${activeTab === tab.key
                                ? 'text-violet-700 dark:text-violet-200'
                                : 'text-violet-400 hover:text-violet-600 dark:text-violet-500 dark:hover:text-violet-300'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                        )}
                    </button>
                ))}
            </nav>

            {activeTab !== 'following' && (
                <section className="py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-400 dark:text-violet-500">
                        Đang dẫn đầu tuần này
                    </p>
                    <div className="mt-4">
                        <LeaderboardPodium top3={top3} onSelect={setSelectedMember} />
                    </div>
                </section>
            )}

            <section className="flex gap-2 overflow-x-auto pb-1 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <CategoryChip active={activeCategory === 'all'} label="Tất cả" onClick={() => setActiveCategory('all')} />
                {CATEGORIES.map((cat) => (
                    <CategoryChip
                        key={cat}
                        active={activeCategory === cat}
                        label={`${CATEGORY_EMOJI[cat]} ${CATEGORY_LABEL[cat]}`}
                        onClick={() => setActiveCategory(cat)}
                    />
                ))}
            </section>

            <section className="mt-4">
                {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMembers.map((member) => {
                            const rankIndex = top3.findIndex((m) => m.user.phone === member.user.phone);
                            return (
                                <MemberCard
                                    key={member.user.phone}
                                    member={member}
                                    rank={rankIndex >= 0 ? rankIndex + 1 : undefined}
                                    onSelect={setSelectedMember}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState tab={activeTab} />
                )}
            </section>

            <MemberProfileSheet member={selectedMember} onClose={() => setSelectedMember(null)} />
        </>
    );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${active
                    ? 'border-violet-600 bg-violet-600 text-white'
                    : 'border-violet-200 bg-white text-violet-600 hover:border-violet-300 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:border-violet-700'
                }`}
        >
            {label}
        </button>
    );
}

function EmptyState({ tab }: { tab: TabKey }) {
    const copy =
        tab === 'following'
            ? {
                title: 'Bạn chưa theo dõi ai',
                body: 'Khám phá cộng đồng và theo dõi những người có hành trình bạn thấy truyền cảm hứng.',
            }
            : {
                title: 'Không tìm thấy thành viên nào',
                body: 'Thử một từ khóa khác hoặc bỏ bớt bộ lọc danh mục.',
            };

    return (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-violet-200 py-12 text-center dark:border-violet-800">
            <Users2 className="h-8 w-8 text-violet-300 dark:text-violet-700" />
            <div>
                <p className="text-sm font-semibold text-violet-700 dark:text-violet-200">{copy.title}</p>
                <p className="mt-1 max-w-xs text-xs text-violet-400 dark:text-violet-500">{copy.body}</p>
            </div>
        </div>
    );
}