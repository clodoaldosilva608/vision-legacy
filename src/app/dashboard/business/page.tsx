"use client";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const bmcSections = [
  { t: "Parceiros-chave", c: "Comunidade Discord, mentores, agências de IA", color: "bg-blue-50" },
  { t: "Atividades-chave", c: "Curadoria de conteúdo, desenvolvimento de IA, lives", color: "bg-purple-50" },
  { t: "Proposta de valor", c: "Sistema operacional de crescimento humano com IA + numerologia + comunidade", color: "bg-gold/10" },
  { t: "Relacionamento", c: "Comunidade, IA mentora 24/7, mentorias", color: "bg-pink-50" },
  { t: "Segmentos", c: "Profissionais 25-45, empreendedores, criadores", color: "bg-emerald-50" },
  { t: "Recursos-chave", c: "Marca Vision Legacy™, IA proprietária, Discord", color: "bg-indigo-50" },
  { t: "Canais", c: "App, Instagram, YouTube, Discord", color: "bg-orange-50" },
  { t: "Estrutura de custos", c: "IA APIs, infra Supabase, marketing, equipe", color: "bg-red-50" },
  { t: "Fontes de receita", c: "Assinaturas (Free/Pro/Elite/Legacy), marketplace, mentorias", color: "bg-yellow-50" },
];

const swot = [
  { t: "Forças", color: "bg-success/10 text-success", items: ["IA proprietária", "Comunidade engajada", "Marca premium", "Equipe especializada"] },
  { t: "Fraquezas", color: "bg-danger/10 text-danger", items: ["Captação inicial", "Dependência de APIs externas", "Pequena equipe"] },
  { t: "Oportunidades", color: "bg-accent/10 text-accent", items: ["Mercado de IA em alta", "Crescimento de educação digital", "Expansão internacional"] },
  { t: "Ameaças", color: "bg-gold/15 text-gold", items: ["Big Techs no segmento", "Mudanças regulatórias IA", "Saturação de mercado"] },
];

export default function BusinessHubPage() {
  return (
    <>
      <PageHeader title="Business Hub" subtitle="Planeje, valide e escale seus negócios." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="layers">Novo projeto</Btn><Btn variant="gold" icon="bolt">Validar ideia com IA</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="Projetos ativos" value="7" change="+2 este mês" icon="folder" color="#7c5cfc" />
        <StatBox label="Ideias validadas" value="23" change="+5 este mês" icon="bolt" color="#d4af37" />
        <StatBox label="OKRs concluídos" value="12/18" change="67% trimestre" icon="target" color="#00c896" />
        <StatBox label="Reuniões agendadas" value="14" change="próx. 7 dias" icon="calendar" color="#3b82f6" />
      </div>

      <Card title="Business Model Canvas" className="mt-5" action={<Btn variant="ghost" icon="edit">Editar</Btn>}>
        <div className="grid gap-3 md:grid-cols-5">
          {bmcSections.slice(0, 5).map(s => (
            <div key={s.t} className={`${s.color} rounded-xl p-3`}>
              <p className="text-xs font-bold text-slate-700">{s.t}</p>
              <p className="mt-1 text-xs text-slate-500">{s.c}</p>
            </div>
          ))}
          {bmcSections.slice(5).map(s => (
            <div key={s.t} className={`${s.color} rounded-xl p-3 md:col-span-2`}>
              <p className="text-xs font-bold text-slate-700">{s.t}</p>
              <p className="mt-1 text-xs text-slate-500">{s.c}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {swot.map(s => (
          <Card key={s.t}>
            <span className={`mb-3 inline-block rounded-lg px-2.5 py-1 text-xs font-bold ${s.color}`}>{s.t}</span>
            <ul className="space-y-2">{s.items.map(i => <li key={i} className="flex gap-2 text-sm text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />{i}</li>)}</ul>
          </Card>
        ))}
      </div>

      <Card title="Roadmap 2026" className="mt-5">
        <div className="space-y-3">
          {[
            { q: "Q1", p: 100, items: ["Validação MVP", "Beta privado 100 users", "Discord lançado"] },
            { q: "Q2", p: 75, items: ["Lançamento público", "Integração BYOK", "Universidade v1"] },
            { q: "Q3", p: 40, items: ["Marketplace", "Mobile apps", "Certificações"] },
            { q: "Q4", p: 10, items: ["Expansão LATAM", "API pública", "Enterprise plan"] },
          ].map(r => (
            <div key={r.q} className="flex items-center gap-4">
              <div className="w-12 shrink-0 text-center">
                <p className="text-lg font-extrabold text-accent">{r.q}</p>
                <p className="text-[10px] text-slate-400">{r.p}%</p>
              </div>
              <div className="flex-1">
                <Progress value={r.p} />
                <div className="mt-2 flex flex-wrap gap-1">{r.items.map(i => <Badge key={i} color={r.p === 100 ? "success" : r.p > 50 ? "accent" : "slate"}>{i}</Badge>)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
