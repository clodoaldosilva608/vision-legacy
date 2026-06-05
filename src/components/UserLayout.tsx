"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon, type IconName } from "./icons";

const navGroups: { title?: string; items: { label: string; icon: IconName; to: string; badge?: string; color?: string }[] }[] = [
  {
    items: [
      { label: "Dashboard",    icon: "home",      to: "/dashboard" },
      { label: "Numerologia",  icon: "hash",      to: "/dashboard/numerologia" },
      { label: "IA Mentora",   icon: "sparkles",  to: "/dashboard/ia",          badge: "AI" },
      { label: "Vision Board", icon: "layers",    to: "/dashboard/vision-board" },
    ],
  },
  {
    title: "Desenvolvimento",
    items: [
      { label: "Lifestyle",    icon: "heart",     to: "/dashboard/lifestyle" },
      { label: "Business Hub", icon: "briefcase", to: "/dashboard/business" },
      { label: "Wealth Hub",   icon: "wallet",    to: "/dashboard/wealth" },
      { label: "Legacy Hub",   icon: "shield",    to: "/dashboard/legacy" },
    ],
  },
  {
    title: "Execução",
    items: [
      { label: "Projetos",     icon: "folder",    to: "/dashboard/projetos" },
      { label: "Metas",        icon: "target",    to: "/dashboard/metas" },
      { label: "Hábitos",      icon: "repeat",    to: "/dashboard/habitos" },
    ],
  },
  {
    title: "Comunidade",
    items: [
      { label: "Universidade", icon: "book",      to: "/dashboard/universidade" },
      { label: "Comunidade",   icon: "users",     to: "/dashboard/comunidade" },
      { label: "Marketplace",  icon: "store",     to: "/dashboard/marketplace" },
      { label: "Perfil Público",icon:"users",     to: "/dashboard/perfil" },
      { label: "Relatórios",   icon: "chart",     to: "/dashboard/relatorios" },
      { label: "Configurações", icon: "settings",  to: "/dashboard/configuracoes" },
    ],
  },
];

const notifications = [
  { t: "Badge 'Leitor Mestre' desbloqueado!", time: "5m",  c: "#d4af37" },
  { t: "Missão diária concluída — +50 XP",   time: "1h",  c: "#00c896" },
  { t: "Mastermind Discord hoje às 20h",     time: "2h",  c: "#5865F2" },
  { t: "Vision Score subiu para 726 🎉",      time: "1d",  c: "#7c5cfc" },
];

export function UserLayout({ children }: { children: ReactNode }) {
  const [sideOpen, setSideOpen]   = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen]   = useState(false);
  const pathname = usePathname();

  const pageTitle = (() => {
    const p = pathname.split("/").pop() ?? "dashboard";
    return { dashboard:"Dashboard", numerologia:"Numerologia", ia:"IA Mentora", lifestyle:"Lifestyle",
      business:"Business Hub", wealth:"Wealth Hub", legacy:"Legacy Hub", projetos:"Projetos",
      metas:"Metas", habitos:"Hábitos", universidade:"Universidade", comunidade:"Comunidade",
      marketplace:"Marketplace", "vision-board":"Vision Board", perfil:"Perfil", relatorios:"Relatórios",
    }[p] ?? "Vision Legacy";
  })();

  return (
    <div className="min-h-screen bg-[#f0f2f8] text-slate-800">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[230px] flex-col bg-dark shadow-2xl transition-transform duration-300 lg:translate-x-0 ${sideOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
          <Logo size={30}/>
          <button onClick={()=>setSideOpen(false)} className="text-white/50 hover:text-white lg:hidden"><Icon.close className="h-5 w-5"/></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {navGroups.map((g, gi) => (
            <div key={gi}>
              {g.title && <p className="px-3 pt-1 pb-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/30">{g.title}</p>}
              {g.items.map(n => {
                const C = Icon[n.icon];
                const isActive = pathname === n.to || (n.to !== "/dashboard" && pathname.startsWith(n.to));
                return (
                  <Link key={n.label} href={n.to} onClick={()=>setSideOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 
                      ${isActive
                        ? "bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/25"
                        : "text-white/55 hover:bg-white/6 hover:text-white"
                      }`}>
                    <C className="h-[18px] w-[18px] shrink-0"/>
                    <span className="flex-1 text-[13px]">{n.label}</span>
                    {n.badge && (
                      <span className="rounded-md bg-gold/20 px-1.5 py-0.5 text-[9px] font-extrabold text-gold">{n.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* XP Bar + Upgrade */}
        <div className="px-3 pb-4 space-y-3">
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-white/70">XP · Nível 14</span>
              <span className="text-[11px] font-bold text-gold">18.400 / 20k</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-gold to-amber-400" style={{width:"92%"}}/>
            </div>
            <p className="mt-1 text-[10px] text-white/40">1.600 XP para Nível 15</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-accent/25 to-gold/15 border border-accent/20 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon.crown className="h-4 w-4 text-gold"/>
              <span className="text-xs font-extrabold text-white">Upgrade para Elite</span>
            </div>
            <p className="text-[11px] text-white/55 mb-3">Masterminds, todos os cursos e muito mais.</p>
            <Link href="/pricing" className="block w-full rounded-xl bg-gradient-to-r from-accent to-accent/80 py-2 text-center text-xs font-extrabold text-white shadow-lg shadow-accent/30 hover:brightness-110 transition">
              Ver planos
            </Link>
          </div>
        </div>

        {/* User bottom */}
        <div className="border-t border-white/5 px-3 py-3">
          <button onClick={()=>setUserOpen(!userOpen)} className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-white/5 transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-gold text-sm font-bold text-dark shadow">CS</div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white leading-tight">Clodoaldo Silva</p>
              <p className="text-[10px] text-white/45">Vision Pro</p>
            </div>
            <Icon.chevronDown className="h-4 w-4 text-white/40"/>
          </button>
          {userOpen && (
            <div className="mt-1 rounded-xl border border-white/10 bg-secondary/80 overflow-hidden">
              {[
                {to:"/dashboard/perfil", icon:"users" as IconName,    l:"Perfil público"},
                {to:"/pricing",          icon:"crown" as IconName,    l:"Planos"},
                {to:"/ajuda",            icon:"message" as IconName,  l:"Central de ajuda"},
              ].map(it=>{ const C=Icon[it.icon]; return (
                <Link key={it.l} href={it.to} className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition">
                  <C className="h-4 w-4"/>{it.l}
                </Link>
              );})}
              <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-danger hover:bg-danger/10 transition">
                <Icon.logout className="h-4 w-4"/>Sair
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Overlay ── */}
      {sideOpen && <div onClick={()=>setSideOpen(false)} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"/>}

      {/* ── Main ── */}
      <div className="lg:pl-[230px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/80 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl">
          <button onClick={()=>setSideOpen(true)} className="text-slate-500 hover:text-slate-800 lg:hidden transition">
            <Icon.menu className="h-5 w-5"/>
          </button>

          <div className="hidden lg:block">
            <span className="text-base font-extrabold text-slate-800">{pageTitle}</span>
          </div>

          {/* Search */}
          <div className="relative hidden flex-1 max-w-md sm:block mx-4">
            <Icon.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
            <input placeholder="Buscar na plataforma..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-20 text-sm text-slate-800 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"/>
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">Ctrl K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Streak */}
            <div className="flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-100 px-2.5 py-1.5">
              <Icon.flame className="h-4 w-4 text-orange-500"/>
              <span className="text-sm font-extrabold text-orange-600">12</span>
            </div>

            {/* XP */}
            <div className="hidden items-center gap-1.5 rounded-xl bg-accent/8 border border-accent/20 px-2.5 py-1.5 sm:flex">
              <Icon.bolt className="h-4 w-4 text-accent"/>
              <span className="text-sm font-extrabold text-accent">18.4k XP</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={()=>{setNotifOpen(!notifOpen);setUserOpen(false)}}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-accent/40 hover:text-accent transition">
                <Icon.bell className="h-5 w-5"/>
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-extrabold text-white">4</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                    <p className="font-bold text-slate-800">Notificações</p>
                    <button className="text-xs font-semibold text-accent">Marcar todas</button>
                  </div>
                  {notifications.map((n,i)=>(
                    <div key={i} className="flex items-start gap-3 border-b border-slate-50 px-4 py-3 hover:bg-slate-50 transition">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{background:n.c}}/>
                      <div className="flex-1"><p className="text-sm font-medium text-slate-700">{n.t}</p><p className="text-xs text-slate-400">{n.time} atrás</p></div>
                    </div>
                  ))}
                  <div className="px-4 py-3 text-center"><button className="text-xs font-semibold text-accent">Ver todas as notificações</button></div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm cursor-pointer hover:border-accent/40 transition">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-gold text-xs font-extrabold text-dark">CS</div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-extrabold text-slate-800 leading-tight">Clodoaldo</p>
                <p className="text-[10px] text-slate-400">Vision Pro</p>
              </div>
              <Icon.chevronDown className="h-4 w-4 text-slate-400"/>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
