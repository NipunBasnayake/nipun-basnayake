import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_35px_rgba(15,23,42,0.45)] backdrop-blur",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
