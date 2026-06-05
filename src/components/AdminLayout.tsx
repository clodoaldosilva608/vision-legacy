"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon, type IconName } from "./icons";

const groups: { title: string; items: { label: string; icon: IconName; to: string }[] }[] = [
  { title: "Administração", items: [
    { label: "Dashboard",   icon: "home",     to: "/admin" },
    { label: "Analytics",   icon: "chart",    to: "/admin/analytics" },
    { label: "Usuários",    icon: "users",    to: "/admin/usuarios" },
    { label: "Assinaturas", icon: "card",     to: "/admin/assinaturas" },
    { label: "Receitas",    icon: "dollar",   to: "/admin/receitas" },
    { label: "IA e Consumo",icon: "sparkles", to: "/admin/ia-consumo" },
  ]},
  { title: "Conteúdo", items: [
    { label: "Universidade",    icon: "book",     to: "/admin/universidade" },
    { label: "Blog",            icon: "doc",      to: "/admin/blog" },
    { label: "Biblioteca (RAG)",icon: "database", to: "/admin/rag" },
    { label: "Certificações",   icon: "award",    to: "/admin/certificacoes" },
    { label: "Missões",         icon: "target",   to: "/admin/missoes" },
    { label: "Gamificação",     icon: "bolt",     to: "/admin/gamificacao" },
  ]},
  { title: "Plataforma", items: [
    { label: "Numerologia", icon: "hash",     to: "/admin/numerologia" },
    { label: "Arquétipos",  icon: "cube",     to: "/admin/arquetipos" },
    { label: "IA (Vision AI)",icon: "brain",  to: "/admin/ia" },
    { label: "Marketplace", icon: "store",    to: "/admin/marketplace" },
    { label: "Discord",     icon: "discord",  to: "/admin/discord" },
    { label: "CRM",         icon: "users",    to: "/admin/crm" },
    { label: "Afiliados",   icon: "trending", to: "/admin/afiliados" },
  ]},
  { title: "Sistema", items: [
    { label: "Command Center",icon: "crown",    to: "/admin" },
    { label: "Configurações", icon: "settings", to: "/admin/configuracoes" },
    { label: "Equipe",        icon: "shield",   to: "/admin/equipe" },
    { label: "Logs",          icon: "doc",      to: "/admin/logs" },
    { label: "Notificações",  icon: "bell",     to: "/admin/notificacoes" },
    { label: "Backups",       icon: "database", to: "/admin/backups" },
  ]},
];

function pageTitle(path: string): string {
  const flat = groups.flatMap(g => g.items);
  const match = flat.find(i => i.to === path);
  if (match) return match.label;
  if (path === "/admin") return "Command Center";
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1]?.replace(/-/g, " ") || "Admin";
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitle(pathname);
  const parts = pathname.split("/").filter(Boolean);

  return (
    <div className="min-h-screen bg-darker text-white">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-dark shadow-2xl shadow-black/40 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
          <Logo size={28} badge="Admin" />
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white lg:hidden">
            <Icon.close className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
          {groups.map(g => (
            <div key={g.title}>
              <p className="px-2.5 pb-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/30">{g.title}</p>
              <div className="space-y-0.5">
                {g.items.map(it => {
                  const C = Icon[it.icon];
                  const isActive = it.to === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(it.to);
                  return (
                    <Link key={it.label} href={it.to} onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition
                        ${isActive
                          ? "bg-gradient-to-r from-accent to-accent/80 text-white shadow shadow-accent/20"
                          : "text-white/50 hover:bg-white/5 hover:text-white"}`}>
                      <C className="h-[17px] w-[17px] shrink-0" />
                      <span className="truncate">{it.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 p-3 space-y-2">
          <Link href="/" className="flex w-full items-center justify-center gap-2 rounded-xl gold-gradient py-2.5 text-[13px] font-extrabold text-dark shadow shadow-gold/20 hover:brightness-110 transition">
            Ver plataforma <Icon.external className="h-4 w-4" />
          </Link>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-[12px] font-semibold text-white/70 hover:bg-white/10 transition">
            <Icon.logout className="h-3.5 w-3.5" /> Sair
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />}

      {/* Main */}
      <div className="lg:pl-[240px]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-dark/90 px-5 py-3 shadow-sm backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="text-white/60 hover:text-white lg:hidden">
            <Icon.menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-1.5 text-[11px] text-white/40 md:flex">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            {parts.slice(1).map((p, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                <Icon.chevronRight className="h-3 w-3 text-white/20" />
                <span className={i === arr.length - 1 ? "text-white font-semibold" : "hover:text-white"}>
                  {p.replace(/-/g, " ")}
                </span>
              </span>
            ))}
          </div>

          {/* Search */}
          <div className="relative hidden flex-1 max-w-md md:block mx-4">
            <Icon.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input placeholder="Buscar usuários, pedidos, conteúdo..." className="w-full rounded-xl border border-white/10 bg-secondary py-2 pl-10 pr-16 text-[13px] outline-none focus:border-accent transition" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">⌘K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition lg:flex">
              <Icon.sun className="h-4 w-4" />
            </button>
            <button className="relative h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition hidden md:flex">
              <Icon.bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-extrabold text-white">8</span>
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 px-2 py-1.5 hover:border-gold/50 transition cursor-pointer">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gold-gradient text-xs font-extrabold text-dark">CS</div>
              <div className="hidden text-left sm:block">
                <p className="text-[11px] font-extrabold text-white leading-tight">Clodoaldo</p>
                <p className="text-[9px] text-gold">Super Admin</p>
              </div>
              <Icon.chevronDown className="h-3 w-3 text-white/40" />
            </div>
          </div>
        </header>

        {/* Mobile title */}
        <div className="border-b border-white/5 px-5 py-2 md:hidden">
          <h1 className="text-sm font-extrabold">{title}</h1>
        </div>

        <main className="p-5 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
