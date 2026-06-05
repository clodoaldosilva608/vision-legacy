"use client";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge } from "../../../components/ui";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const planosDist = [
  { name: "Free", value: 8432, color: "#9a80ff", price: "R$ 0", churn: "—" },
  { name: "Pro", value: 6125, color: "#3b82f6", price: "R$ 29,90", churn: "2.1%" },
  { name: "Elite", value: 2856, color: "#00c896", price: "R$ 97,00", churn: "1.4%" },
  { name: "Legacy", value: 1019, color: "#d4af37", price: "R$ 297,00", churn: "0.8%" },
];

export default function AssinaturasPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Assinaturas" subtitle="Gestão completa de planos e ciclo de vida." action={<Btn variant="gold" icon="card">Configurar planos</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "MRR", v: "R$ 178.438", d: "+24.6%", c: "#00c896" },
          { t: "ARR", v: "R$ 2.14M", d: "+24.6%", c: "#7c5cfc" },
          { t: "Novos (30d)", v: "356", d: "+22.1%", c: "#3b82f6" },
          { t: "Churn (30d)", v: "2.45%", d: "-0.38%", c: "#ff5c7a" },
        ].map(s => (
          <div key={s.t} className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
            <p className="text-xs font-medium text-white/50">{s.t}</p>
            <p className="mt-2 text-2xl font-extrabold">{s.v}</p>
            <p className="text-xs font-semibold" style={{ color: s.c }}>{s.d} <span className="text-white/40">vs anterior</span></p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <Card title="Receita por plano" className="lg:col-span-7" dark>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={planosDist.map(p => ({ name: p.name, receita: p.value * parseFloat(p.price.replace(/[^\d,.]/g,"").replace(",", ".")) || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `R$ ${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Bar dataKey="receita" radius={[8,8,0,0]}>{planosDist.map(p => <Cell key={p.name} fill={p.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Distribuição" className="lg:col-span-5" dark>
          <div className="flex items-center gap-4">
            <div className="relative h-40 w-40 shrink-0">
              <ResponsiveContainer><PieChart><Pie data={planosDist} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>{planosDist.map(p => <Cell key={p.name} fill={p.color} />)}</Pie></PieChart></ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-extrabold">18.432</span><span className="text-[10px] text-white/40">Total</span></div>
            </div>
            <div className="flex-1 space-y-3">
              {planosDist.map(p => (
                <div key={p.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                  <div className="flex-1"><p className="font-semibold">{p.name}</p><p className="text-[11px] text-white/40">{p.price} · churn {p.churn}</p></div>
                  <span className="font-bold">{p.value.toLocaleString("pt-BR")}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Operações recentes" className="mt-5" dark>
        <div className="space-y-1">
          {[
            { type: "Nova", plan: "Pro", user: "Maria Santos", value: "+R$ 29,90", time: "há 12s" },
            { type: "Upgrade", plan: "Free → Pro", user: "João Silva", value: "+R$ 29,90", time: "há 1m" },
            { type: "Cancelamento", plan: "Pro", user: "Carlos Mendes", value: "-R$ 29,90", time: "há 3m" },
            { type: "Upgrade", plan: "Pro → Elite", user: "Lucas Oliveira", value: "+R$ 67,10", time: "há 8m" },
            { type: "Nova", plan: "Legacy", user: "Patrícia Lemos", value: "+R$ 297,00", time: "há 15m" },
          ].map((o, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5">
              <Badge color={o.type === "Cancelamento" ? "danger" : o.type === "Upgrade" ? "accent" : "success"}>{o.type}</Badge>
              <span className="text-sm text-white/70">{o.plan}</span>
              <span className="flex-1 text-sm font-semibold">{o.user}</span>
              <span className={`font-bold ${o.type === "Cancelamento" ? "text-danger" : "text-success"}`}>{o.value}</span>
              <span className="text-xs text-white/30">{o.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
