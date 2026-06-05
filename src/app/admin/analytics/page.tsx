"use client";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const funnel = [
  { stage: "Visitantes", v: 124583, pct: 100 },
  { stage: "Cadastros (Free)", v: 12842, pct: 10.3 },
  { stage: "Ativaram (D7)", v: 7892, pct: 6.3 },
  { stage: "Trial Pro", v: 3214, pct: 2.6 },
  { stage: "Convertidos", v: 1842, pct: 1.5 },
];

const acqSources = [
  { name: "Instagram", value: 38.7, color: "#E1306C" },
  { name: "Google", value: 24.2, color: "#4285F4" },
  { name: "TikTok", value: 16.8, color: "#7c5cfc" },
  { name: "YouTube", value: 10.4, color: "#FF0000" },
  { name: "Indicação", value: 6.0, color: "#00c896" },
  { name: "Outros", value: 3.9, color: "#9a80ff" },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Analytics" subtitle="Visão profunda de aquisição, conversão e retenção." action={<Btn variant="gold" icon="doc">Exportar relatório</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Visitantes únicos", v: "124.583", d: "+18.4%", c: "#7c5cfc", i: "globe" },
          { t: "Taxa de conversão", v: "14.4%", d: "+2.1%", c: "#00c896", i: "trending" },
          { t: "Custo de aquisição", v: "R$ 42,30", d: "-8.2%", c: "#d4af37", i: "dollar" },
          { t: "Retenção 30d", v: "68.2%", d: "+5.4%", c: "#3b82f6", i: "repeat" },
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

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <Card title="Funil de conversão" className="lg:col-span-7" dark>
          <div className="space-y-3">
            {funnel.map((f, i) => (
              <div key={f.stage}>
                <div className="mb-1 flex items-center justify-between text-sm"><span className="text-white/70">{f.stage}</span><span className="font-bold">{f.v.toLocaleString("pt-BR")} <span className="text-xs text-white/40">({f.pct}%)</span></span></div>
                <div className="h-8 rounded-lg bg-white/5">
                  <div className="flex h-8 items-center rounded-lg pl-3 text-xs font-bold text-white" style={{ width: `${f.pct}%`, minWidth: 60, background: ["#7c5cfc","#9a80ff","#3b82f6","#00c896","#d4af37"][i] }}>
                    {((f.v / (funnel[i-1]?.v ?? f.v)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Fontes de aquisição" className="lg:col-span-5" dark>
          <div className="space-y-3">
            {acqSources.map(s => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm"><span className="text-white/70">{s.name}</span><span className="font-bold">{s.value}%</span></div>
                <div className="h-2 rounded-full bg-white/5"><div className="h-2 rounded-full" style={{ width: `${s.value * 2.5}%`, background: s.color }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Aquisição diária (30 dias)" className="mt-5" dark>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={Array.from({length:30},(_,i) => ({ d:`${i+1}`, v: 200+Math.round(Math.abs(Math.sin(i/3))*250), pago: 80+Math.round(Math.abs(Math.cos(i/3))*120) }))}>
              <defs><linearGradient id="aq1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc" stopOpacity={0.4} /><stop offset="1" stopColor="#7c5cfc" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Area dataKey="v" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#aq1)" name="Visitantes" />
              <Area dataKey="pago" stroke="#d4af37" strokeWidth={2.5} fill="#d4af3720" name="Pagantes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AdminLayout>
  );
}
