"use client";
import { useState } from "react";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const numbers = [
  { key: "Destino", value: 5, color: "#7c5cfc", desc: "Liberdade, mudança e aventura. Você é movido por novas experiências." },
  { key: "Expressão", value: 11, color: "#d4af37", desc: "Mestre número. Intuição elevada e missão espiritual." },
  { key: "Alma", value: 7, color: "#00c896", desc: "Sabedoria interior, espiritualidade e busca por verdade." },
  { key: "Personalidade", value: 22, color: "#ff5c7a", desc: "O Construtor Mestre. Capaz de transformar visão em realidade." },
  { key: "Maturidade", value: 3, color: "#3b82f6", desc: "Criatividade, comunicação e expressão artística." },
  { key: "Ciclo Atual", value: 8, color: "#f59e0b", desc: "Poder, realização e prosperidade material." },
];

export default function NumerologiaPage() {
  const [tab, setTab] = useState("Visão Geral");
  return (
    <>
      <PageHeader title="Mapa Numerológico" subtitle="Descubra os números que regem sua jornada." action={
        <Btn variant="gold" icon="doc">Exportar PDF</Btn>
      } />

      <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
        {["Visão Geral", "Interpretações", "Ciclos", "Compatibilidade"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${tab === t ? "border-accent text-accent" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-slate-500">Mapa pessoal de Clodoaldo Silva</p>
          <p className="text-xs text-slate-400">Nascimento: 23/05/1984 — Ciclo de Poder</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.key} className="rounded-xl border border-slate-200 p-4 transition hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{n.key}</span>
                  <span className="text-2xl font-extrabold" style={{ color: n.color }}>{n.value}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{n.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Radar Numerológico">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={numbers.map(n => ({ key: n.key, v: n.value > 9 ? n.value / 11 * 10 : n.value }))}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="key" tick={{ fontSize: 10, fill: "#64748b" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="v" fill="#7c5cfc" fillOpacity={0.4} stroke="#7c5cfc" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Insights da IA sobre seu mapa" className="mt-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10"><Icon.sparkles className="h-5 w-5 text-accent" /></div>
          <div>
            <p className="text-sm leading-relaxed text-slate-600">
              Seu mapa revela uma combinação rara: <b>Personalidade 22 (Construtor Mestre) + Expressão 11 (Mestre Intuitivo)</b>. Em 2026, ciclo pessoal 8 indica um ano de <b>conquistas materiais e poder</b> — momento ideal para escalar projetos.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Foque em projetos de longo prazo", "Negociações são favoráveis", "Cuidado com burnout"].map(t => (
                <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          { l: "Ano Pessoal", v: "8", d: "Poder e Realização" },
          { l: "Mês Pessoal", v: "4", d: "Estrutura e Disciplina" },
          { l: "Dia Pessoal", v: "9", d: "Conclusão e Sabedoria" },
        ].map(c => (
          <Card key={c.l}>
            <p className="text-xs font-semibold text-slate-500">{c.l}</p>
            <p className="my-2 text-4xl font-extrabold text-accent">{c.v}</p>
            <p className="text-sm text-slate-500">{c.d}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
