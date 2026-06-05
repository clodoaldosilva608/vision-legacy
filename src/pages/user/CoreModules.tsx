import { useState } from "react";
import { UserLayout } from "../../components/UserLayout";
import { Card, PageHeader, Btn, Badge, Progress, Tabs, StatBox } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

/* ============================================
   NUMEROLOGIA
   ============================================ */
const numbers = [
  { key: "Destino", value: 5, color: "#7c5cfc", desc: "Liberdade, mudança e aventura. Você é movido por novas experiências." },
  { key: "Expressão", value: 11, color: "#d4af37", desc: "Mestre número. Intuição elevada e missão espiritual." },
  { key: "Alma", value: 7, color: "#00c896", desc: "Sabedoria interior, espiritualidade e busca por verdade." },
  { key: "Personalidade", value: 22, color: "#ff5c7a", desc: "O Construtor Mestre. Capaz de transformar visão em realidade." },
  { key: "Maturidade", value: 3, color: "#3b82f6", desc: "Criatividade, comunicação e expressão artística." },
  { key: "Ciclo Atual", value: 8, color: "#f59e0b", desc: "Poder, realização e prosperidade material." },
];

export function NumerologiaPage() {
  const [tab, setTab] = useState("Visão Geral");
  return (
    <UserLayout>
      <PageHeader title="Mapa Numerológico" subtitle="Descubra os números que regem sua jornada." action={
        <Btn variant="gold" icon="doc">Exportar PDF</Btn>
      } />

      <Tabs items={["Visão Geral", "Interpretações", "Ciclos", "Compatibilidade"]} active={tab} onChange={setTab} />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
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
              Seu mapa revela uma combinação rara: <b>Personalidade 22 (Construtor Mestre) + Expressão 11 (Mestre Intuitivo)</b>. Você possui a capacidade única de transformar visões grandiosas em realidades concretas. Em 2026, ciclo pessoal 8 indica um ano de <b>conquistas materiais e poder</b> — momento ideal para escalar projetos de negócio e construção patrimonial.
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
    </UserLayout>
  );
}

/* ============================================
   IA MENTORA
   ============================================ */
const conversations = [
  { id: 1, title: "Plano de carreira 2026", time: "Agora", active: true },
  { id: 2, title: "Análise do meu Business Model", time: "Ontem" },
  { id: 3, title: "Estratégia de investimentos", time: "2 dias" },
  { id: 4, title: "Rotina matinal de alta performance", time: "5 dias" },
  { id: 5, title: "Análise do meu arquétipo", time: "1 semana" },
];

const messages = [
  { role: "ai", text: "Olá Clodoaldo! Sou sua Vision AI™. Como posso te ajudar hoje?" },
  { role: "user", text: "Quero criar um plano estratégico para 2026 focado em crescimento de receita." },
  { role: "ai", text: "Perfeito! Com base no seu Vision Score (726) e arquétipo Visionário, sugiro 4 pilares:\n\n1. **Diversificação de receita** — 3 novas fontes\n2. **Automação com IA** — reduzir 40% do tempo operacional\n3. **Comunidade premium** — lançar mastermind R$ 5k/mês\n4. **Investimentos passivos** — 25% da renda em ativos\n\nQuer que eu detalhe cada pilar com OKRs trimestrais?" },
  { role: "user", text: "Sim, comece pelo pilar 1." },
];

export function IAPage() {
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState("Gemini Pro");
  return (
    <UserLayout>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
            <Icon.sparkles className="h-6 w-6 text-accent" /> Vision AI™
          </h1>
          <p className="text-sm text-slate-500">Sua mentora pessoal de IA</p>
        </div>
        <div className="flex gap-2">
          <select value={provider} onChange={e => setProvider(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold">
            <option>Gemini Pro</option><option>GPT-4o</option><option>Claude 3.5</option><option>DeepSeek V3</option>
          </select>
          <Btn variant="secondary" icon="settings">BYOK</Btn>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <Btn variant="primary" icon="message" className="mb-4 w-full justify-center">Nova conversa</Btn>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Conversas</p>
          <div className="space-y-1">
            {conversations.map(c => (
              <button key={c.id} className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition ${c.active ? "bg-accent/10 text-accent" : "hover:bg-slate-100 text-slate-600"}`}>
                <Icon.message className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{c.title}</span>
                <span className="shrink-0 text-[10px] text-slate-400">{c.time}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-gradient-to-br from-accent/10 to-gold/10 p-3">
            <p className="text-xs font-bold text-slate-700">Memory Engine</p>
            <p className="mt-1 text-[11px] text-slate-500">142 lembranças ativas</p>
            <div className="mt-2"><Progress value={68} /></div>
            <p className="mt-2 text-[11px] text-slate-500">Contexto: 68% utilizado</p>
          </div>
        </Card>

        <Card className="flex h-[640px] flex-col lg:col-span-3">
          <div className="-mt-1 mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="font-bold text-slate-800">Plano de carreira 2026</p>
              <p className="text-xs text-slate-400">Modelo: {provider} • RAG ativo • 24 mensagens</p>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Icon.doc className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Icon.edit className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent"><Icon.sparkles className="h-4 w-4 text-white" /></div>}
                <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-tr-sm bg-accent text-white" : "rounded-tl-sm bg-slate-100 text-slate-700"}`}>
                  {m.text}
                </div>
                {m.role === "user" && <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-accent to-accent-light" />}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 p-2">
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Pergunte sobre metas, negócios, finanças, hábitos..." className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none" rows={2} />
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <div className="flex gap-1">
                {["doc", "hash", "bolt"].map(i => <button key={i} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><span className="block h-4 w-4">{(() => { const C = Icon[i as IconName]; return <C className="h-4 w-4" />; })()}</span></button>)}
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white">Enviar <Icon.send className="h-4 w-4" /></button>
            </div>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

/* ============================================
   LIFESTYLE
   ============================================ */
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

export function LifestylePage() {
  return (
    <UserLayout>
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
                <Area dataKey="sono" stroke="#7c5cfc" fill="url(#ls1)" strokeWidth={2} />
                <Area dataKey="foco" stroke="#00c896" fill="url(#ls2)" strokeWidth={2} />
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
    </UserLayout>
  );
}

/* ============================================
   BUSINESS HUB
   ============================================ */
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

export function BusinessHubPage() {
  return (
    <UserLayout>
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
    </UserLayout>
  );
}
