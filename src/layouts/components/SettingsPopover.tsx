
import { useEffect } from "react"
import { Settings, Globe, Moon } from "lucide-react";
import { Switch } from "../../shared/components/ui/switch";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../../shared/components/ui/popover";

import { useReadOnly } from "@/context/ReadOnlyContext";
import { useTheme } from "../../shared/hooks/useTheme";
import { useTranslation } from "react-i18next";

export default function SettingsPopover() {
    const { readOnly } = useReadOnly();
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");

        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="
        relative
        h-10 w-10
        rounded-xl
        flex items-center justify-center

        text-violet-600

        hover:bg-violet-50
        dark:hover:bg-white/10

        transition
    "
                >
                    <Settings size={18} />

                    {readOnly && (
                        <span
                            className="
                                absolute
                                top-1 right-1
                                w-2 h-2
                                rounded-full
                                bg-amber-400
                            "
                        />
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="
        w-80

        border

        bg-white
        text-zinc-900
        border-zinc-200

        dark:bg-indigo-900
        dark:text-zinc-100
        dark:border-zinc-800
    "
            >
                <div className="space-y-4">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {t("setting.setting")}
                    </h3>
                    <div className="h-px bg-zinc-200 dark:bg-indigo-600" />

                    {/* Language */}
                    <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-zinc-100 dark:hover:bg-indigo-800 transition-colors">
                        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                            <Globe size={16} />
                            <span className="text-zinc-900 dark:text-zinc-100">
                                {t("setting.vietnamese")}
                            </span>
                        </div>

                        <Switch
                            checked={i18n.language === "vi"}
                            onCheckedChange={(checked) =>
                                i18n.changeLanguage(checked ? "vi" : "en")
                            }
                        />
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-zinc-100 dark:hover:bg-indigo-800 transition-colors">
                        <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-400">
                            <Moon size={16} />
                            <span className="text-zinc-900 dark:text-zinc-100">{t("setting.darkMode")}</span>
                        </div>

                        <Switch
                            checked={theme === "dark"}
                            onCheckedChange={toggleTheme}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}