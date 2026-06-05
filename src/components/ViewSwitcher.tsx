"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const views = [
  { to: "/",           label: "Landing",    icon: "globe"    as const, match: (p: string) => p === "/" },
  { to: "/dashboard",  label: "App",        icon: "home"     as const, match: (p: string) => p.startsWith("/dashboard") },
  { to: "/admin",      label: "Admin",      icon: "settings" as const, match: (p: string) => p.startsWith("/admin") },
];

export function ViewSwitcher() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2">
      <div className="flex items-center gap-0.5 rounded-2xl border border-white/15 bg-dark/95 px-1.5 py-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {views.map((v) => {
          const active = v.match(pathname);
          const C = Icon[v.icon];
          return (
            <Link key={v.to} href={v.to}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200
                ${active ? "gold-gradient text-dark shadow-lg shadow-gold/25" : "text-white/50 hover:bg-white/8 hover:text-white"}`}>
              <C className="h-3.5 w-3.5"/>
              <span className="hidden sm:inline">{v.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
