import { Settings, Globe, Lock, Moon } from "lucide-react";
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
    const { readOnly, setReadOnly } = useReadOnly();
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="
                        relative
                        h-10 w-10
                        rounded-xl
                        flex items-center justify-center
                        text-violet-200
                        hover:bg-white/10
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
                    bg-[#1e1448]
                    border-white/10
                    text-white
                "
            >
                <div className="space-y-4">
                    <h3 className="font-semibold text-violet-100">
                        {t("setting.setting")}
                    </h3>
                    <div className="h-px bg-white/10" />

                    {/* Language */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe size={16} />
                            <span>{t("setting.vietnamese")}</span>
                        </div>

                        <Switch
                            checked={i18n.language === "vi"}
                            onCheckedChange={(checked) =>
                                i18n.changeLanguage(checked ? "vi" : "en")
                            }
                        />
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Moon size={16} />
                            <span>{t("setting.darkMode")}</span>
                        </div>

                        <Switch
                            checked={theme === "dark"}
                            onCheckedChange={toggleTheme}
                        />
                    </div>

                    {/* Read Only */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Lock size={16} />
                            <span>Read Only</span>
                        </div>

                        <Switch
                            checked={readOnly}
                            onCheckedChange={setReadOnly}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}