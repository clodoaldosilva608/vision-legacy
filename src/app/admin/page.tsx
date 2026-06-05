"use client";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function KTile({ label, value, icon, color, trend, delta }: { label: string; value: string; icon: string; color: string; trend?: number[]; delta?: string }) {
  const C = Icon[icon as keyof typeof Icon];
  return (
    <div className="flex gap-4 rounded-3xl border border-white/8 bg-gradient-to-br from-secondary to-dark p-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${color}22` }}>
        <C className="h-7 w-7" style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{label}</p>
        <p className="mt-1 text-3xl font-extrabold" style={{ color }}>{value}</p>
        {delta && <p className="mt-0.5 text-xs font-bold text-success">{delta}</p>}
        {trend && (
          <div className="mt-2 h-10">
            <ResponsiveContainer>
              <AreaChart data={trend.map((v, i) => ({ i, v }))}>
                <Area type="monotone" dataKey="v" stroke={color} fill={`${color}22`} strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const usersOnline = [
    { t: "Usuários agora", v: "1.847" },
    { t: "Em conversa IA", v: "342" },
    { t: "Em preenchendo onboarding", v: "84" },
    { t: "Em checkout", v: "23" },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="VISION COMMAND CENTER™"
        subtitle="Painel exclusivo do Founder — visão em tempo real."
        action={<button className="gold-gradient rounded-xl px-5 py-2.5 text-sm font-bold text-dark">ATUALIZAR ↻</button>}
      />

      <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-secondary via-dark to-gold/10 p-6 mb-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Ao Vivo</p>
            <h2 className="mt-1 text-2xl font-extrabold">Plataforma em tempo real</h2>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">● Online</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usersOnline.map((u) => (
            <div key={u.t} className="rounded-2xl bg-dark/70 p-4">
              <p className="text-xs text-white/50">{u.t}</p>
              <p className="mt-1 text-2xl font-extrabold text-gold">{u.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KTile label="MRR" value="R$ 178.438" icon="dollar" color="#d4af37" delta="+24.6%" trend={[40, 55, 62, 78, 88, 95, 98]} />
        <KTile label="ARR" value="R$ 2.14M" icon="trending" color="#00c896" delta="+186%" trend={[20, 35, 48, 65, 80, 95, 100]} />
        <KTile label="Usuários online" value="1.847" icon="users" color="#7c5cfc" delta="+12.4%" trend={[40, 55, 50, 78, 70, 88, 95]} />
        <KTile label="Conversões hoje" value="48" icon="bolt" color="#ff5c7a" delta="+32.1%" trend={[10, 18, 25, 32, 38, 42, 48]} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card title="Receita em tempo real (últimas 24h)" dark className="lg:col-span-8">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={Array.from({ length: 24 }, (_, i) => ({ h: `${i}h`, v: 500 + Math.round(Math.abs(Math.sin(i / 3) * 3000)) }))}>
                <defs><linearGradient id="cc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d4af37" stopOpacity={0.4} /><stop offset="1" stopColor="#d4af37" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="h" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Area type="monotone" dataKey="v" stroke="#d4af37" strokeWidth={2.5} fill="url(#cc1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Status crítico" dark className="lg:col-span-4">
          <div className="space-y-3">
            {[
              { t: "Serviços principais", v: "100%", c: "#00c896", p: 100 },
              { t: "Latência média", v: "142ms", c: "#00c896", p: 85 },
              { t: "Erros (1h)", v: "0.24%", c: "#d4af37", p: 24 },
              { t: "Limite IA Gemini", v: "68%", c: "#7c5cfc", p: 68 },
              { t: "Storage utilizado", v: "42%", c: "#00c896", p: 42 },
              { t: "Memória RAG", v: "12GB / 50GB", c: "#3b82f6", p: 24 },
            ].map((s) => (
              <div key={s.t}>
                <div className="mb-1 flex justify-between text-xs"><span className="text-white/70">{s.t}</span><span className="font-bold" style={{ color: s.c }}>{s.v}</span></div>
                <div className="h-2 rounded-full bg-white/5"><div className="h-2 rounded-full" style={{ width: `${s.p}%`, background: s.c }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card title="Top assinantes / MRR" dark className="lg:col-span-6">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={[{ n: "Elite", v: 2856 }, { n: "Pro", v: 6125 }, { n: "Legacy", v: 1019 }, { n: "Free", v: 8432 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="n" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="#d4af37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Engajamento por canal (24h)" dark className="lg:col-span-6">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={Array.from({ length: 12 }, (_, i) => ({ h: i, v1: 100 + Math.round(Math.sin(i / 2) * 50 + i * 10), v2: 50 + Math.round(Math.cos(i / 3) * 30 + i * 8) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Line type="monotone" dataKey="v1" stroke="#7c5cfc" strokeWidth={2.5} dot={false} name="Discord" />
                <Line type="monotone" dataKey="v2" stroke="#d4af37" strokeWidth={2.5} dot={false} name="App" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Stream de eventos — CEO" dark className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { t: "Novo Legacy assinante", d: "Rafael M. · R$ 297", c: "#d4af37" },
            { t: "Venda marketplace #1.000", d: "E-book: Mentalidade Visionária", c: "#00c896" },
            { t: "Marca de 18.432 usuários", d: "Plataforma cresceu +18% em 30 dias", c: "#7c5cfc" },
            { t: "Mastermind cheio (100/100)", d: "Evento de amanhã", c: "#d4af37" },
            { t: "1 milhão de mensagens IA", d: "Consumo saudável", c: "#00c896" },
            { t: "Conexão 12.000 no Discord", d: "Cargo LEGACY aplicado a 87 membros", c: "#5865F2" },
          ].map((e, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${e.c}22` }}>
                <Icon.bolt className="h-5 w-5" style={{ color: e.c }} />
              </div>
              <div className="flex-1"><p className="font-bold">{e.t}</p><p className="text-xs text-white/40">{e.d}</p></div>
              <span className="text-[10px] text-white/30">agora</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
