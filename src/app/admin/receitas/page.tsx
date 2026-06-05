"use client";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card, Btn } from "../../../components/ui";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function ReceitasPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Receitas" subtitle="Análise financeira detalhada da plataforma." action={<Btn variant="gold" icon="doc">Relatório financeiro</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Receita total (mês)", v: "R$ 178.438", d: "+24.6%", c: "#00c896" },
          { t: "Receita total (ano)", v: "R$ 1.84M", d: "+186%", c: "#7c5cfc" },
          { t: "Ticket médio", v: "R$ 67,30", d: "+8.4%", c: "#d4af37" },
          { t: "Marketplace", v: "R$ 42.156", d: "+32.1%", c: "#9a80ff" },
        ].map(s => (
          <div key={s.t} className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
            <p className="text-xs font-medium text-white/50">{s.t}</p>
            <p className="mt-2 text-2xl font-extrabold">{s.v}</p>
            <p className="text-xs font-semibold" style={{ color: s.c }}>{s.d} <span className="text-white/40">vs anterior</span></p>
          </div>
        ))}
      </div>

      <Card title="Receita acumulada — 12 meses" className="mt-5" dark>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m,i)=>({ m, subs: 80+i*9, market: 20+i*3, mentorias: 10+i*2 }))}>
              <defs><linearGradient id="rev1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc" stopOpacity={0.4} /><stop offset="1" stopColor="#7c5cfc" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${v}k`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Area dataKey="subs" stackId="1" stroke="#7c5cfc" fill="url(#rev1)" name="Assinaturas" />
              <Area dataKey="market" stackId="1" stroke="#d4af37" fill="#d4af3740" name="Marketplace" />
              <Area dataKey="mentorias" stackId="1" stroke="#00c896" fill="#00c89640" name="Mentorias" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card title="Top produtos do marketplace" dark>
          {[
            { t: "Curso: IA para Negócios", v: "R$ 24.832", sales: 243 },
            { t: "E-book: Mentalidade Visionária", v: "R$ 15.420", sales: 186 },
            { t: "Template: Plano de Negócios", v: "R$ 8.950", sales: 112 },
            { t: "Mentoria Premium 1h", v: "R$ 6.450", sales: 13 },
            { t: "Pacote Vision Builder", v: "R$ 5.982", sales: 6 },
          ].map((p, i) => (
            <div key={p.t} className="flex items-center gap-3 border-b border-white/5 py-3 last:border-0">
              <span className="text-lg font-extrabold text-white/30">{i+1}</span>
              <div className="flex-1"><p className="text-sm font-semibold">{p.t}</p><p className="text-[11px] text-white/40">{p.sales} vendas</p></div>
              <span className="font-bold text-success">{p.v}</span>
            </div>
          ))}
        </Card>

        <Card title="Métodos de pagamento" dark>
          {[
            { m: "Stripe (Cartão)", v: 68.4, color: "#7c5cfc", value: "R$ 122.014" },
            { m: "Mercado Pago (PIX)", v: 21.2, color: "#00c896", value: "R$ 37.829" },
            { m: "Mercado Pago (Cartão)", v: 7.8, color: "#d4af37", value: "R$ 13.918" },
            { m: "Boleto", v: 2.6, color: "#9a80ff", value: "R$ 4.677" },
          ].map(m => (
            <div key={m.m} className="border-b border-white/5 py-3 last:border-0">
              <div className="mb-1 flex items-center justify-between text-sm"><span className="text-white/70">{m.m}</span><span className="font-bold">{m.value}</span></div>
              <div className="flex items-center gap-3"><div className="flex-1 h-2 rounded-full bg-white/5"><div className="h-2 rounded-full" style={{ width: `${m.v}%`, background: m.color }} /></div><span className="w-12 text-right text-xs text-white/40">{m.v}%</span></div>
            </div>
          ))}
        </Card>
      </div>
    </AdminLayout>
  );
}
