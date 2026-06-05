"use client";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const lifestyleData = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d, i) => ({
  d, sono: [7, 6.5, 8, 7, 6, 9, 8.5][i], foco: [80, 70, 90, 85, 60, 95, 75][i],
}));

const habitsList = [
  { name: "Meditar 10 min", streak: 12, done: true, color: "#7c5cfc" },
  { name: "Treino físico", streak: 8, done: true, color: "#00c896" },
  { name: "Leitura 30 min", streak: 23, done: true, color: "#d4af37" },
  { name: "Beber 3L água", streak: 5, done: false, color: "#3b82f6" },
  { name: "Diário de gratidão", streak: 18, done: false, color: "#ff5c7a" },
];

export default function LifestylePage() {
  return (
    <>
      <PageHeader title="Lifestyle Hub" subtitle="Hábitos, sono, foco e bem-estar para a sua melhor versão." action={<Btn variant="gold" icon="bolt">Adicionar hábito</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="Sono médio" value="7h 32m" change="+12 min vs semana" icon="sun" color="#7c5cfc" />
        <StatBox label="Treinos" value="5/7" change="meta semanal" icon="heart" color="#00c896" />
        <StatBox label="Foco profundo" value="4h 12m" change="+8% vs semana" icon="bolt" color="#d4af37" />
        <StatBox label="Wellbeing Score" value="82/100" change="ótimo nível" icon="star" color="#ff5c7a" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card title="Sono x Foco - Últimos 7 dias" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={lifestyleData}>
                <defs>
                  <linearGradient id="ls1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc" stopOpacity={0.4} /><stop offset="1" stopColor="#7c5cfc" stopOpacity={0} /></linearGradient>
                  <linearGradient id="ls2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00c896" stopOpacity={0.4} /><stop offset="1" stopColor="#00c896" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area dataKey="sono" stroke="#7c5cfc" fill="url(#ls1)" strokeWidth={2} name="Sono (h)" />
                <Area dataKey="foco" stroke="#00c896" fill="url(#ls2)" strokeWidth={2} name="Foco (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Hábitos de hoje">
          <div className="space-y-3">
            {habitsList.map(h => (
              <div key={h.name} className="flex items-center gap-3">
                <button className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition ${h.done ? "border-success bg-success text-white" : "border-slate-300"}`}>
                  {h.done && <Icon.check className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${h.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{h.name}</p>
                  <div className="mt-1 flex items-center gap-1.5"><Icon.flame className="h-3 w-3 text-orange-500" /><span className="text-[11px] text-slate-500">{h.streak} dias</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          { title: "Saúde", icon: "heart" as IconName, items: ["Consultas: 2 marcadas", "Exames: em dia", "Suplementos: 4 ativos"] },
          { title: "Rotina matinal", icon: "sun" as IconName, items: ["Despertar: 06:00", "Meditação: 10 min", "Exercício: 45 min"] },
          { title: "Leitura ativa", icon: "book" as IconName, items: ["A Lei do Triunfo — 65%", "Sapiens — pausado", "Próximo: Atomic Habits"] },
        ].map(s => { const C = Icon[s.icon]; return (
          <Card key={s.title}>
            <div className="mb-3 flex items-center gap-2"><C className="h-5 w-5 text-accent" /><h3 className="font-bold text-slate-800">{s.title}</h3></div>
            <ul className="space-y-2 text-sm text-slate-600">{s.items.map(i => <li key={i} className="flex gap-2"><Icon.check className="h-4 w-4 text-success" />{i}</li>)}</ul>
          </Card>
        );})}
      </div>
    </>
  );
}
