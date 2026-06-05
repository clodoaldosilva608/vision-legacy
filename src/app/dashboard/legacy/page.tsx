"use client";
import { Card, PageHeader, Btn, Progress } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";

const legacyMetrics = [
  { t: "Conhecimento compartilhado", v: 86, icon: "book" as IconName, color: "#7c5cfc", desc: "184 conteúdos publicados" },
  { t: "Família", v: 92, icon: "heart" as IconName, color: "#ff5c7a", desc: "Tempo de qualidade: alto" },
  { t: "Impacto comunitário", v: 78, icon: "users" as IconName, color: "#00c896", desc: "12.4k vidas alcançadas" },
  { t: "Contribuição social", v: 65, icon: "shield" as IconName, color: "#d4af37", desc: "R$ 28k doados em 2026" },
  { t: "Patrimônio familiar", v: 70, icon: "wallet" as IconName, color: "#3b82f6", desc: "Holding em estruturação" },
  { t: "Mentoria & sucessão", v: 55, icon: "award" as IconName, color: "#9a80ff", desc: "8 mentorados ativos" },
];

export default function LegacyHubPage() {
  return (
    <>
      <PageHeader title="Legacy Hub" subtitle="Construa um legado que impacta e inspira gerações." action={<Btn variant="gold" icon="award">Visualizar manifesto</Btn>} />

      <Card className="mb-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl gold-gradient">
            <Icon.crown className="h-10 w-10 text-dark" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gold">Vision Legacy Score</p>
            <p className="text-4xl font-extrabold text-slate-900">74<span className="text-lg text-slate-400">/100</span></p>
            <p className="text-sm text-slate-500">Você está no nível <b className="text-accent">Construtor</b>. Próximo nível: Legado (em 26 pts).</p>
          </div>
          <div className="hidden sm:block">
            <Progress value={74} color="#d4af37" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {legacyMetrics.map(m => { const C = Icon[m.icon]; return (
          <Card key={m.t}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${m.color}1a` }}><C className="h-5 w-5" style={{ color: m.color }} /></div>
              <span className="text-2xl font-extrabold" style={{ color: m.color }}>{m.v}</span>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">{m.t}</p>
            <p className="text-xs text-slate-500">{m.desc}</p>
            <div className="mt-3"><Progress value={m.v} color={m.color} /></div>
          </Card>
        );})}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Cápsula do tempo — Carta para 2046">
          <div className="rounded-xl bg-gradient-to-br from-gold/10 to-accent/10 p-5 italic text-slate-600">
            "Você chegou onde sonhou. Lembre-se: o legado que mais importa não é o que você acumulou, mas o que você multiplicou em vidas. Continue construindo o invisível..."
          </div>
          <Btn variant="secondary" icon="edit" className="mt-3">Editar carta</Btn>
        </Card>
        <Card title="Pessoas impactadas">
          <div className="space-y-3">
            {[
              { n: "Mentorados ativos", v: "8", c: "+2 este mês" },
              { n: "Alunos formados", v: "342", c: "+45 este mês" },
              { n: "Membros comunidade", v: "12.486", c: "+1.2k este mês" },
              { n: "Famílias apoiadas (ONG)", v: "67", c: "+8 este ano" },
            ].map(p => (
              <div key={p.n} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div><p className="text-sm font-semibold text-slate-700">{p.n}</p><p className="text-xs text-slate-400">{p.c}</p></div>
                <p className="text-2xl font-extrabold text-accent">{p.v}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
