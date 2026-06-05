import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminPageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ title, action, children, className = "", dark = false }: { title?: string; action?: ReactNode; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${dark ? "border-white/8 bg-secondary/50" : "border-slate-200 bg-white"} ${className}`}>
      {title && <div className="mb-4 flex items-center justify-between"><h3 className={`font-bold ${dark ? "text-white" : "text-slate-800"}`}>{title}</h3>{action}</div>}
      {children}
    </div>
  );
}

export function Btn({ children, variant = "primary", icon, className = "", onClick }: { children: ReactNode; variant?: "primary" | "secondary" | "gold" | "ghost" | "danger"; icon?: IconName; className?: string; onClick?: () => void }) {
  const styles: Record<string, string> = {
    primary: "bg-accent text-white hover:bg-accent-light",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    gold: "gold-gradient text-dark hover:brightness-110",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-danger text-white hover:brightness-110",
  };
  const C = icon ? Icon[icon] : null;
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${styles[variant]} ${className}`}>
      {C && <C className="h-4 w-4" />}{children}
    </button>
  );
}

export function Badge({ children, color = "accent" }: { children: ReactNode; color?: "accent" | "success" | "danger" | "gold" | "slate" | "blue" }) {
  const map: Record<string, string> = {
    accent: "bg-accent/10 text-accent",
    success: "bg-success/15 text-success",
    danger: "bg-danger/15 text-danger",
    gold: "bg-gold/15 text-gold",
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-100 text-blue-600",
  };
  return <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${map[color]}`}>{children}</span>;
}

export function Progress({ value, color = "#7c5cfc" }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className="h-2 rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export function StatBox({ label, value, change, icon, color = "#7c5cfc" }: { label: string; value: string; change?: string; icon: IconName; color?: string }) {
  const C = Icon[icon];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${color}1a` }}>
          <C className="h-4 w-4" style={{ color }} />
        </div>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
      {change && <p className="text-xs font-semibold text-success">{change}</p>}
    </div>
  );
}

export function Tabs({ items, active, onChange, dark = false }: { items: string[]; active: string; onChange: (v: string) => void; dark?: boolean }) {
  return (
    <div className={`flex gap-1 overflow-x-auto rounded-xl p-1 ${dark ? "bg-secondary" : "bg-slate-100"}`}>
      {items.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${active === t ? (dark ? "bg-accent text-white" : "bg-white text-slate-800 shadow") : (dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-800")}`}>
          {t}
        </button>
      ))}
    </div>
  );
}

export function EmptyHint({ icon, title, desc }: { icon: IconName; title: string; desc: string }) {
  const C = Icon[icon];
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10"><C className="h-7 w-7 text-accent" /></div>
      <h3 className="mt-3 font-bold text-slate-700">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-slate-400">{desc}</p>
    </div>
  );
}
