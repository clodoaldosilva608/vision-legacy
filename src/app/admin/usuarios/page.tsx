"use client";
import { useState } from "react";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const usersList = [
  { name: "Maria Souza", email: "maria.souza@email.com", plan: "Elite", status: "Ativo", country: "🇧🇷 BR", joined: "12 dias", xp: 2856 },
  { name: "João Silva", email: "joao.silva@email.com", plan: "Pro", status: "Ativo", country: "🇧🇷 BR", joined: "23 dias", xp: 2453 },
  { name: "Lucas Almeida", email: "lucas.a@email.com", plan: "Pro", status: "Ativo", country: "🇵🇹 PT", joined: "1 mês", xp: 2301 },
  { name: "Ana Oliveira", email: "ana.oliveira@email.com", plan: "Elite", status: "Ativo", country: "🇧🇷 BR", joined: "2 meses", xp: 2128 },
  { name: "Pedro Martins", email: "pedro.m@email.com", plan: "Pro", status: "Ativo", country: "🇪🇸 ES", joined: "2 meses", xp: 1987 },
  { name: "Carlos Mendes", email: "carlos@email.com", plan: "Free", status: "Inativo", country: "🇧🇷 BR", joined: "3 meses", xp: 432 },
  { name: "Juliana Costa", email: "ju.costa@email.com", plan: "Legacy", status: "Ativo", country: "🇧🇷 BR", joined: "4 meses", xp: 3812 },
  { name: "Ricardo Lima", email: "ricardo@email.com", plan: "Pro", status: "Suspenso", country: "🇺🇸 US", joined: "5 meses", xp: 1245 },
];

export default function UsuariosPage() {
  const [filter, setFilter] = useState("Todos");
  return (
    <AdminLayout>
      <AdminPageHeader title="Usuários" subtitle="18.432 usuários cadastrados." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="doc">Exportar CSV</Btn><Btn variant="gold" icon="users">Convidar</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Total", v: "18.432", d: "+12.5%", i: "users", c: "#7c5cfc" },
          { t: "Ativos (30d)", v: "7.892", d: "+10.1%", i: "flame", c: "#00c896" },
          { t: "Premium", v: "3.842", d: "+18.3%", i: "crown", c: "#d4af37" },
          { t: "Suspensos", v: "42", d: "+3", i: "ban", c: "#ff5c7a" },
        ].map(s => { const C = Icon[s.i as keyof typeof Icon]; return (
          <div key={s.t} className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium text-white/50">{s.t}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${s.c}22` }}><C className="h-4 w-4" style={{ color: s.c }} /></div>
            </div>
            <p className="mt-2 text-2xl font-extrabold">{s.v}</p>
            <p className="text-xs font-semibold text-success">{s.d} <span className="text-white/40">vs anterior</span></p>
          </div>
        );})}
      </div>

      <Card className="mt-5" dark>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Icon.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input placeholder="Buscar por nome, email, ID..." className="w-full rounded-lg border border-white/10 bg-dark py-2 pl-10 pr-3 text-sm outline-none focus:border-accent" />
          </div>
          {["Todos","Free","Pro","Elite","Legacy","Suspensos"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === f ? "bg-accent text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Usuário</th>
              <th className="pb-3 text-left font-medium">Plano</th>
              <th className="pb-3 text-left font-medium">Status</th>
              <th className="pb-3 text-left font-medium">País</th>
              <th className="pb-3 text-left font-medium">Cadastro</th>
              <th className="pb-3 text-right font-medium">XP</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.email} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-light" /><div><p className="font-semibold">{u.name}</p><p className="text-[11px] text-white/40">{u.email}</p></div></div></td>
                  <td><Badge color={u.plan === "Legacy" ? "gold" : u.plan === "Elite" ? "success" : u.plan === "Pro" ? "accent" : "slate"}>{u.plan}</Badge></td>
                  <td><Badge color={u.status === "Ativo" ? "success" : u.status === "Suspenso" ? "danger" : "slate"}>{u.status}</Badge></td>
                  <td className="text-white/70">{u.country}</td>
                  <td className="text-white/60">{u.joined}</td>
                  <td className="text-right font-bold">{u.xp.toLocaleString("pt-BR")}</td>
                  <td className="text-right"><div className="flex justify-end gap-1">
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-danger"><Icon.ban className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
          <span>Mostrando 8 de 18.432 usuários</span>
          <div className="flex gap-1">{["1","2","3","...","2304"].map(p => <button key={p} className={`rounded-lg px-3 py-1 ${p === "1" ? "bg-accent text-white" : "bg-white/5 hover:bg-white/10"}`}>{p}</button>)}</div>
        </div>
      </Card>
    </AdminLayout>
  );
}
