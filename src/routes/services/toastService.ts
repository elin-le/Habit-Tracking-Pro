import { toast } from "sonner";

export const ToastService = {
    success: (msg: string) => toast.success(msg),

    error: (msg: string) => toast.error(msg),

    warning: (msg: string) => toast.warning(msg),

    info: (msg: string) => toast.info(msg),

    achievement: (msg: string) =>
        toast("🏆 Achievement Unlocked", {
            description: msg,
        }),

    streak: (days: number) =>
        toast(`🔥 ${days} Day Streak`, {
            description: "Keep the momentum going!",
        }),

    reminder: (msg: string) =>
        toast("⏰ Reminder", {
            description: msg,
        }),
};