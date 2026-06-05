"use client";
import { useState } from "react";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const channels = [
  { name: "anúncios", unread: 2, type: "text" },
  { name: "geral", unread: 18, type: "text" },
  { name: "wins-do-dia", unread: 5, type: "text" },
  { name: "business", unread: 0, type: "text" },
  { name: "wealth", unread: 12, type: "text" },
  { name: "ia-vision", unread: 3, type: "text" },
  { name: "Mastermind VIP", unread: 1, type: "voice" },
];

const eventos = [
  { t: "Mastermind VIP — Estratégia 2026", d: "Hoje, 20h", participants: 84, type: "Online" },
  { t: "Workshop: IA para Negócios", d: "Amanhã, 19h", participants: 247, type: "Online" },
  { t: "Encontro presencial SP", d: "30/05, 14h", participants: 32, type: "Presencial" },
  { t: "Live Q&A com Clodoaldo", d: "01/06, 21h", participants: 1245, type: "Online" },
];

const ranking = [
  { name: "Maria Souza", pts: 2856, plan: "Elite", rank: 1 },
  { name: "João Silva", pts: 2453, plan: "Pro", rank: 2 },
  { name: "Lucas Almeida", pts: 2301, plan: "Pro", rank: 3 },
  { name: "Ana Oliveira", pts: 2128, plan: "Elite", rank: 4 },
  { name: "Pedro Martins", pts: 1987, plan: "Pro", rank: 5 },
  { name: "Você (Clodoaldo)", pts: 1654, plan: "Pro", rank: 8 },
];

export default function ComunidadePage() {
  return (
    <>
      <PageHeader title="Comunidade" subtitle="Conecte-se, evolua e construa com outros visionários." action={<Btn variant="primary" icon="discord">Abrir Discord</Btn>} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5865F2]"><Icon.discord className="h-6 w-6 text-white" /></div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Vision Legacy Community</p>
              <p className="text-xs text-slate-500">12.486 membros · 1.247 online agora</p>
            </div>
            <Badge color="success">Conectado</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {channels.map(c => (
              <button key={c.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-accent hover:bg-accent/5">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-slate-400">{c.type === "voice" ? "🎙️" : "#"}</span> {c.name}
                </span>
                {c.unread > 0 && <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">{c.unread}</span>}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Seus cargos no Discord">
          <div className="space-y-2">
            {[
              { c: "Vision Pro", color: "bg-blue-500" },
              { c: "Beta Tester", color: "bg-accent" },
              { c: "Top 10 XP", color: "bg-gold" },
              { c: "Mentorado", color: "bg-success" },
            ].map(r => (
              <div key={r.c} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
                <span className="flex-1 text-sm font-semibold text-slate-700">{r.c}</span>
                <Icon.check className="h-4 w-4 text-success" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Cargos sincronizados automaticamente com seu plano e XP.</p>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Próximos eventos" action={<Btn variant="ghost" icon="calendar">Ver agenda</Btn>}>
          <div className="space-y-3">
            {eventos.map(e => (
              <div key={e.t} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon.calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{e.t}</p>
                  <p className="text-xs text-slate-500">{e.d} · {e.participants} confirmados</p>
                </div>
                <Badge color={e.type === "Online" ? "accent" : "gold"}>{e.type}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Ranking mensal — Top XP">
          <div className="space-y-2">
            {ranking.map(r => (
              <div key={r.name} className={`flex items-center gap-3 rounded-xl p-2 ${r.name.startsWith("Você") ? "bg-accent/10 border border-accent/30" : ""}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold ${r.rank === 1 ? "bg-gold text-dark" : r.rank === 2 ? "bg-slate-300 text-slate-700" : r.rank === 3 ? "bg-orange-300 text-orange-900" : "bg-slate-100 text-slate-500"}`}>{r.rank}</span>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-light" />
                <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{r.name}</p><Badge color={r.plan === "Elite" ? "gold" : "accent"}>{r.plan}</Badge></div>
                <p className="text-sm font-bold text-accent">{r.pts.toLocaleString("pt-BR")} pts</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
