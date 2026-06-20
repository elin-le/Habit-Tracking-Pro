import { useEffect, useState } from "react";
import type { ReactNode } from "react";
function useCountUp(target: number, duration = 700) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}
interface Props { icon: ReactNode; accent: string; label: string; value: number; suffix?: string; }
export function OverviewCard({ icon, accent, label, value, suffix = "" }: Props) {
  const animated = useCountUp(value);
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[var(--primary)]/15 bg-[var(--surface)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)]/35 hover:shadow-[0_12px_30px_rgba(124,58,237,0.15)]">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-4xl font-black leading-none tracking-tight tabular-nums">{animated}<span className="text-2xl">{suffix}</span></p>
        <p className="text-xs opacity-60 font-semibold mt-1.5 truncate">{label}</p>
      </div>
    </div>
  );
}