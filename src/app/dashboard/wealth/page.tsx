"use client";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const wealthEvo = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((m, i) => ({
  m, ativos: 180 + i * 8, liquido: 120 + i * 7,
}));

const assets = [
  { name: "Renda fixa", value: 85000, color: "#7c5cfc" },
  { name: "Ações BR", value: 62000, color: "#3b82f6" },
  { name: "Cripto", value: 28000, color: "#d4af37" },
  { name: "Imóveis", value: 95000, color: "#00c896" },
  { name: "Reserva", value: 18000, color: "#ff5c7a" },
];

const transactions = [
  { type: "in", desc: "Aporte mensal — XP Investimentos", value: "+ R$ 3.200", date: "Hoje", cat: "Investimento" },
  { type: "out", desc: "Cartão Itaú — Lazer", value: "- R$ 850", date: "Ontem", cat: "Despesa" },
  { type: "in", desc: "Cliente premium — Mentoria", value: "+ R$ 5.000", date: "2 dias", cat: "Receita" },
  { type: "out", desc: "Assinatura Notion + Figma", value: "- R$ 240", date: "3 dias", cat: "Despesa" },
  { type: "in", desc: "Dividendos VALE3", value: "+ R$ 420", date: "5 dias", cat: "Renda passiva" },
];

export default function WealthHubPage() {
  return (
    <>
      <PageHeader title="Wealth Hub" subtitle="Gerencie seu patrimônio, ativos e construa liberdade financeira." action={<Btn variant="gold" icon="bolt">Análise com IA</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="Patrimônio Líquido" value="R$ 288.000" change="+8.3% este mês" icon="wallet" color="#7c5cfc" />
        <StatBox label="Renda mensal" value="R$ 22.450" change="+12% vs mês ant." icon="trending" color="#00c896" />
        <StatBox label="Independência" value="38%" change="meta: R$ 1.5M" icon="target" color="#d4af37" />
        <StatBox label="Reserva emergência" value="9 meses" change="garantida" icon="shield" color="#3b82f6" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card title="Evolução patrimonial — 12 meses" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={wealthEvo}>
                <defs>
                  <linearGradient id="w1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc" stopOpacity={0.4} /><stop offset="1" stopColor="#7c5cfc" stopOpacity={0} /></linearGradient>
                  <linearGradient id="w2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00c896" stopOpacity={0.4} /><stop offset="1" stopColor="#00c896" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}k`} />
                <Tooltip formatter={(v: any) => `R$ ${v}.000`} />
                <Area dataKey="ativos" stroke="#7c5cfc" fill="url(#w1)" strokeWidth={2.5} name="Ativos" />
                <Area dataKey="liquido" stroke="#00c896" fill="url(#w2)" strokeWidth={2.5} name="Líquido" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Distribuição de ativos">
          <div className="relative mx-auto h-40 w-40">
            <ResponsiveContainer><PieChart><Pie data={assets} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>{assets.map(a => <Cell key={a.name} fill={a.color} />)}</Pie></PieChart></ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-extrabold text-slate-800">R$ 288k</span>
              <span className="text-[10px] text-slate-400">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {assets.map(a => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                <span className="flex-1 text-slate-600">{a.name}</span>
                <span className="font-bold text-slate-800">R$ {(a.value/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Transações recentes" className="mt-5" action={<Btn variant="ghost" icon="bolt">Nova transação</Btn>}>
        <div className="space-y-1">
          {transactions.map((t, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                {t.type === "in" ? <Icon.trending className="h-5 w-5" /> : <Icon.trendingDown className="h-5 w-5" />}
              </div>
              <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{t.desc}</p><p className="text-xs text-slate-400">{t.date} · {t.cat}</p></div>
              <span className={`font-bold ${t.type === "in" ? "text-success" : "text-danger"}`}>{t.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          { t: "Liberdade financeira", v: "R$ 1.500.000", p: 38 },
          { t: "Casa própria quitada", v: "R$ 800.000", p: 65 },
          { t: "Aposentadoria", v: "R$ 3M (em 20 anos)", p: 12 },
        ].map(g => (
          <Card key={g.t}>
            <p className="text-xs font-semibold text-slate-500">{g.t}</p>
            <p className="my-1 text-lg font-bold text-slate-800">{g.v}</p>
            <Progress value={g.p} color="#d4af37" />
            <p className="mt-2 text-xs font-semibold text-gold">{g.p}% concluído</p>
          </Card>
        ))}
      </div>
    </>
  );
}
