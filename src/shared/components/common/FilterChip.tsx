import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/Button";

interface FilterChipProps {
  children: React.ReactNode;
  active?: boolean;
}

export function FilterChip({ children, active = false }: FilterChipProps) {
  return (
    <Button
      variant="ghost"
      // onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        "focus-visible:ring-0 focus-visible:ring-offset-0", // bỏ focus ring mặc định shadcn
        "h-auto", // override height cố định của shadcn Button
      )}
      style={
        active
          ? {
              background: "var(--primary)",
              borderColor: "var(--primary)",
              color: "#fff",
              boxShadow:
                "0 0 0 2px color-mix(in srgb, var(--primary) 18%, transparent)",
            }
          : {
              background: "transparent",
              borderColor:
                "color-mix(in srgb, var(--primary) 18%, transparent)",
              color: "var(--sidebar-muted)",
            }
      }
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.background =
            "color-mix(in srgb, var(--primary) 8%, transparent)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = "var(--sidebar-muted)";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {children}
    </Button>
  );
}
