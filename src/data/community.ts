import type { CommunityMember } from '../features/community/CommunityTypes';

/**
 * Example dataset shaped exactly like `CommunityMember[]`. Swap this for a
 * real fetch (React Query, SWR, a plain useEffect — whatever the rest of the
 * app uses) once the community API exists; nothing else in this feature
 * needs to change since everything is typed against `CommunityMember`.
 */
export const COMMUNITY_MEMBERS: CommunityMember[] = [
    {
        user: { phone: '0901234567', username: 'minh.tran', avatar: 'https://i.pravatar.cc/150?img=12' },
        stats: {
            ownerPhone: '0901234567',
            memberSince: '2025-02-14',
            totalHabits: 4,
            longestStreak: 58,
            completionRate: 92,
            totalCheckIns: 312,
            last7Days: [3, 3, 2, 3, 3, 1, 3],
        },
        habits: [
            { id: 'h1', ownerPhone: '0901234567', name: 'Chạy bộ buổi sáng', emoji: '🏃', category: 'health', frequency: 'daily', currentStreak: 41, bestStreak: 58, completionRate: 95 },
            { id: 'h2', ownerPhone: '0901234567', name: 'Đọc sách 20 phút', emoji: '📖', category: 'study', frequency: 'daily', currentStreak: 23, bestStreak: 40, completionRate: 88 },
            { id: 'h3', ownerPhone: '0901234567', name: 'Thiền 10 phút', emoji: '🧘', category: 'mindfulness', frequency: 'daily', currentStreak: 12, bestStreak: 30, completionRate: 80 },
            { id: 'h4', ownerPhone: '0901234567', name: 'Uống 2L nước', emoji: '💧', category: 'health', frequency: 'daily', currentStreak: 19, bestStreak: 35, completionRate: 90 },
        ],
        goals: [
            { id: 'g1', ownerPhone: '0901234567', title: 'Chạy 100km trong tháng', unit: 'km', current: 78, target: 100, deadline: '2026-06-30', status: 'on_track' },
            { id: 'g2', ownerPhone: '0901234567', title: 'Đọc 12 cuốn sách năm nay', unit: 'cuốn', current: 5, target: 12, deadline: '2026-12-31', status: 'on_track' },
        ],
    },
    {
        user: { phone: '0912345678', username: 'lan.pham', avatar: 'https://i.pravatar.cc/150?img=47' },
        stats: {
            ownerPhone: '0912345678',
            memberSince: '2025-05-01',
            totalHabits: 3,
            longestStreak: 64,
            completionRate: 97,
            totalCheckIns: 401,
            last7Days: [3, 3, 3, 3, 3, 3, 2],
        },
        habits: [
            { id: 'h5', ownerPhone: '0912345678', name: 'Yoga buổi sáng', emoji: '🧘‍♀️', category: 'health', frequency: 'daily', currentStreak: 64, bestStreak: 64, completionRate: 98 },
            { id: 'h6', ownerPhone: '0912345678', name: 'Viết nhật ký', emoji: '📝', category: 'mindfulness', frequency: 'daily', currentStreak: 30, bestStreak: 45, completionRate: 91 },
            { id: 'h7', ownerPhone: '0912345678', name: 'Học tiếng Anh', emoji: '🗣️', category: 'study', frequency: 'daily', currentStreak: 15, bestStreak: 22, completionRate: 84 },
        ],
        goals: [
            { id: 'g3', ownerPhone: '0912345678', title: 'Hoàn thành khóa IELTS', unit: 'buổi', current: 18, target: 20, deadline: '2026-07-15', status: 'on_track' },
        ],
    },
    {
        user: { phone: '0923456789', username: 'duc.nguyen', avatar: 'https://i.pravatar.cc/150?img=33' },
        stats: {
            ownerPhone: '0923456789',
            memberSince: '2024-11-20',
            totalHabits: 5,
            longestStreak: 50,
            completionRate: 75,
            totalCheckIns: 260,
            last7Days: [2, 0, 2, 3, 1, 2, 2],
        },
        habits: [
            { id: 'h8', ownerPhone: '0923456789', name: 'Tập gym', emoji: '🏋️', category: 'health', frequency: 'daily', currentStreak: 9, bestStreak: 50, completionRate: 70 },
            { id: 'h9', ownerPhone: '0923456789', name: 'Lập trình side project', emoji: '💻', category: 'productivity', frequency: 'daily', currentStreak: 9, bestStreak: 33, completionRate: 78 },
            { id: 'h10', ownerPhone: '0923456789', name: 'Ngủ trước 23h', emoji: '😴', category: 'health', frequency: 'daily', currentStreak: 4, bestStreak: 20, completionRate: 60 },
            { id: 'h11', ownerPhone: '0923456789', name: 'Đọc tin công nghệ', emoji: '📰', category: 'study', frequency: 'daily', currentStreak: 9, bestStreak: 28, completionRate: 82 },
            { id: 'h12', ownerPhone: '0923456789', name: 'Dọn bàn làm việc', emoji: '🧹', category: 'other', frequency: 'weekly', currentStreak: 6, bestStreak: 12, completionRate: 88 },
        ],
        goals: [
            { id: 'g4', ownerPhone: '0923456789', title: 'Ra mắt app cá nhân', unit: '%', current: 40, target: 100, deadline: '2026-09-01', status: 'at_risk' },
        ],
    },
    {
        user: { phone: '0934567890', username: 'hoa.le', avatar: 'https://i.pravatar.cc/150?img=25' },
        stats: {
            ownerPhone: '0934567890',
            memberSince: '2025-08-09',
            totalHabits: 3,
            longestStreak: 27,
            completionRate: 86,
            totalCheckIns: 150,
            last7Days: [1, 2, 2, 0, 2, 3, 2],
        },
        habits: [
            { id: 'h13', ownerPhone: '0934567890', name: 'Uống vitamin', emoji: '💊', category: 'health', frequency: 'daily', currentStreak: 27, bestStreak: 27, completionRate: 93 },
            { id: 'h14', ownerPhone: '0934567890', name: 'Học vẽ', emoji: '🎨', category: 'study', frequency: 'daily', currentStreak: 11, bestStreak: 18, completionRate: 80 },
            { id: 'h15', ownerPhone: '0934567890', name: 'Gọi điện cho gia đình', emoji: '📞', category: 'other', frequency: 'weekly', currentStreak: 5, bestStreak: 9, completionRate: 85 },
        ],
        goals: [
            { id: 'g5', ownerPhone: '0934567890', title: 'Vẽ 30 bức trong năm', unit: 'bức', current: 30, target: 30, deadline: '2026-06-01', status: 'completed' },
        ],
    },
    {
        user: { phone: '0945678901', username: 'quan.vo', avatar: 'https://i.pravatar.cc/150?img=15' },
        stats: {
            ownerPhone: '0945678901',
            memberSince: '2025-03-30',
            totalHabits: 4,
            longestStreak: 35,
            completionRate: 81,
            totalCheckIns: 210,
            last7Days: [2, 2, 1, 2, 0, 1, 2],
        },
        habits: [
            { id: 'h16', ownerPhone: '0945678901', name: 'Đi bộ 8000 bước', emoji: '🚶', category: 'health', frequency: 'daily', currentStreak: 16, bestStreak: 35, completionRate: 84 },
            { id: 'h17', ownerPhone: '0945678901', name: 'Học guitar', emoji: '🎸', category: 'study', frequency: 'daily', currentStreak: 8, bestStreak: 21, completionRate: 76 },
            { id: 'h18', ownerPhone: '0945678901', name: 'Lên kế hoạch ngày mới', emoji: '🗒️', category: 'productivity', frequency: 'daily', currentStreak: 16, bestStreak: 25, completionRate: 90 },
            { id: 'h19', ownerPhone: '0945678901', name: 'Không dùng điện thoại trước ngủ', emoji: '📵', category: 'mindfulness', frequency: 'daily', currentStreak: 3, bestStreak: 14, completionRate: 65 },
        ],
        goals: [
            { id: 'g6', ownerPhone: '0945678901', title: 'Chơi trọn 1 bài guitar', unit: '%', current: 70, target: 100, deadline: '2026-08-20', status: 'on_track' },
            { id: 'g7', ownerPhone: '0945678901', title: 'Giảm 3kg', unit: 'kg', current: 1, target: 3, deadline: '2026-07-01', status: 'at_risk' },
        ],
    },
    {
        user: { phone: '0956789012', username: 'thuy.dang', avatar: 'https://i.pravatar.cc/150?img=44' },
        stats: {
            ownerPhone: '0956789012',
            memberSince: '2025-01-05',
            totalHabits: 3,
            longestStreak: 73,
            completionRate: 94,
            totalCheckIns: 365,
            last7Days: [3, 2, 3, 3, 3, 3, 3],
        },
        habits: [
            { id: 'h20', ownerPhone: '0956789012', name: 'Thiền buổi tối', emoji: '🧘', category: 'mindfulness', frequency: 'daily', currentStreak: 73, bestStreak: 73, completionRate: 96 },
            { id: 'h21', ownerPhone: '0956789012', name: 'Viết blog cá nhân', emoji: '✍️', category: 'productivity', frequency: 'weekly', currentStreak: 20, bestStreak: 20, completionRate: 100 },
            { id: 'h22', ownerPhone: '0956789012', name: 'Nấu ăn lành mạnh', emoji: '🥗', category: 'health', frequency: 'daily', currentStreak: 30, bestStreak: 50, completionRate: 89 },
        ],
        goals: [
            { id: 'g8', ownerPhone: '0956789012', title: 'Viết 52 bài blog trong năm', unit: 'bài', current: 24, target: 52, deadline: '2026-12-31', status: 'on_track' },
        ],
    },
    {
        user: { phone: '0967890123', username: 'nam.bui', avatar: 'https://i.pravatar.cc/150?img=8' },
        stats: {
            ownerPhone: '0967890123',
            memberSince: '2025-09-12',
            totalHabits: 2,
            longestStreak: 14,
            completionRate: 68,
            totalCheckIns: 88,
            last7Days: [1, 0, 1, 0, 1, 1, 0],
        },
        habits: [
            { id: 'h23', ownerPhone: '0967890123', name: 'Tập thể dục 15 phút', emoji: '🤸', category: 'health', frequency: 'daily', currentStreak: 2, bestStreak: 14, completionRate: 62 },
            { id: 'h24', ownerPhone: '0967890123', name: 'Đọc tin tài chính', emoji: '📈', category: 'study', frequency: 'daily', currentStreak: 2, bestStreak: 9, completionRate: 74 },
        ],
        goals: [
            { id: 'g9', ownerPhone: '0967890123', title: 'Tiết kiệm 5 triệu', unit: 'triệu', current: 2, target: 5, deadline: '2026-07-31', status: 'at_risk' },
        ],
    },
    {
        user: { phone: '0978901234', username: 'anh.do', avatar: 'https://i.pravatar.cc/150?img=58' },
        stats: {
            ownerPhone: '0978901234',
            memberSince: '2026-06-10',
            totalHabits: 0,
            longestStreak: 0,
            completionRate: 0,
            totalCheckIns: 0,
            last7Days: [0, 0, 0, 0, 0, 0, 0],
        },
        habits: [],
        goals: [],
    },
];