import { UserLayout } from "../../components/UserLayout";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

/* ============================================
   WEALTH HUB
   ============================================ */
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

export function WealthHubPage() {
  return (
    <UserLayout>
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
    </UserLayout>
  );
}

/* ============================================
   LEGACY HUB
   ============================================ */
const legacyMetrics = [
  { t: "Conhecimento compartilhado", v: 86, icon: "book" as IconName, color: "#7c5cfc", desc: "184 conteúdos publicados" },
  { t: "Família", v: 92, icon: "heart" as IconName, color: "#ff5c7a", desc: "Tempo de qualidade: alto" },
  { t: "Impacto comunitário", v: 78, icon: "users" as IconName, color: "#00c896", desc: "12.4k vidas alcançadas" },
  { t: "Contribuição social", v: 65, icon: "shield" as IconName, color: "#d4af37", desc: "R$ 28k doados em 2026" },
  { t: "Patrimônio familiar", v: 70, icon: "wallet" as IconName, color: "#3b82f6", desc: "Holding em estruturação" },
  { t: "Mentoria & sucessão", v: 55, icon: "award" as IconName, color: "#9a80ff", desc: "8 mentorados ativos" },
];

export function LegacyHubPage() {
  return (
    <UserLayout>
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
    </UserLayout>
  );
}

/* ============================================
   PROJETOS (KANBAN)
   ============================================ */
const kanbanCols = [
  { title: "Ideias", color: "bg-slate-200 text-slate-700", items: [
    { t: "Lançar curso de IA aplicada", tags: ["Business", "Educação"], priority: "Média" },
    { t: "Pesquisa de mercado LATAM", tags: ["Pesquisa"], priority: "Baixa" },
  ]},
  { title: "Planejamento", color: "bg-blue-200 text-blue-700", items: [
    { t: "Vision Legacy v2.0", tags: ["Produto"], priority: "Alta" },
    { t: "Estratégia de afiliados", tags: ["Growth"], priority: "Média" },
  ]},
  { title: "Em execução", color: "bg-accent/30 text-accent", items: [
    { t: "Universidade — 3 cursos novos", tags: ["Conteúdo"], priority: "Alta" },
    { t: "Integração Discord Bot", tags: ["Tech"], priority: "Alta" },
    { t: "Campanha de lançamento", tags: ["Marketing"], priority: "Média" },
  ]},
  { title: "Concluído", color: "bg-success/20 text-success", items: [
    { t: "MVP da plataforma", tags: ["Produto"], priority: "Alta" },
    { t: "Sistema de pagamentos", tags: ["Tech"], priority: "Alta" },
  ]},
];

export function ProjetosPage() {
  return (
    <UserLayout>
      <PageHeader title="Projetos" subtitle="Gerencie suas iniciativas com Kanban, checklists e IA." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="layers">Modo lista</Btn><Btn variant="gold" icon="folder">Novo projeto</Btn></div>
      } />

      <div className="grid gap-4 md:grid-cols-4">
        {kanbanCols.map(col => (
          <div key={col.title} className="rounded-2xl bg-slate-100 p-3">
            <div className={`mb-3 flex items-center justify-between rounded-lg px-2.5 py-1.5 ${col.color}`}>
              <span className="text-xs font-bold uppercase">{col.title}</span>
              <span className="rounded bg-white/60 px-1.5 py-0.5 text-[10px] font-bold">{col.items.length}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((it, i) => (
                <div key={i} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
                  <p className="text-sm font-semibold text-slate-700">{it.t}</p>
                  <div className="mt-2 flex flex-wrap gap-1">{it.tags.map(t => <Badge key={t} color="accent">{t}</Badge>)}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge color={it.priority === "Alta" ? "danger" : it.priority === "Média" ? "gold" : "slate"}>{it.priority}</Badge>
                    <div className="flex -space-x-1">
                      {[0,1].map(j => <div key={j} className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-accent to-accent-light" />)}
                    </div>
                  </div>
                </div>
              ))}
              <button className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-400 hover:bg-white"><Icon.bolt className="h-3 w-3" /> Adicionar card</button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}

/* ============================================
   METAS
   ============================================ */
const metas = [
  { t: "Atingir R$ 50k MRR", cat: "Negócio", p: 72, due: "Dez/2026", color: "#7c5cfc" },
  { t: "Publicar livro de IA aplicada", cat: "Legado", p: 35, due: "Ago/2026", color: "#d4af37" },
  { t: "Investir R$ 200k em ações", cat: "Patrimônio", p: 88, due: "Nov/2026", color: "#00c896" },
  { t: "Correr maratona 42km", cat: "Saúde", p: 55, due: "Out/2026", color: "#ff5c7a" },
  { t: "Aprender espanhol fluente", cat: "Aprendizado", p: 42, due: "Dez/2026", color: "#3b82f6" },
  { t: "Construir holding familiar", cat: "Família", p: 25, due: "Mar/2027", color: "#9a80ff" },
];

export function MetasPage() {
  return (
    <UserLayout>
      <PageHeader title="Metas" subtitle="Sistema SMART de metas alinhadas ao seu Vision Method™." action={<Btn variant="gold" icon="target">Nova meta</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Metas ativas" value="12" change="3 prioritárias" icon="target" color="#7c5cfc" />
        <StatBox label="Concluídas no ano" value="18" change="+30% vs ano passado" icon="checkCircle" color="#00c896" />
        <StatBox label="Progresso médio" value="56%" change="ritmo saudável" icon="trending" color="#d4af37" />
        <StatBox label="Próx. vencimento" value="14 dias" change="Meta: maratona" icon="flame" color="#ff5c7a" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metas.map(m => (
          <Card key={m.t}>
            <div className="flex items-start justify-between">
              <Badge color="accent">{m.cat}</Badge>
              <button className="text-slate-400 hover:text-slate-700"><Icon.edit className="h-4 w-4" /></button>
            </div>
            <h3 className="mt-3 font-bold text-slate-800">{m.t}</h3>
            <p className="mt-1 text-xs text-slate-500">Prazo: {m.due}</p>
            <div className="mt-4 flex items-center gap-2">
              <Progress value={m.p} color={m.color} />
              <span className="text-sm font-bold" style={{ color: m.color }}>{m.p}%</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-500"><Icon.checkCircle className="h-3 w-3 text-success" /> 4 marcos</span>
              <span className="flex items-center gap-1 text-slate-500"><Icon.message className="h-3 w-3" /> 12 notas</span>
            </div>
          </Card>
        ))}
      </div>
    </UserLayout>
  );
}

/* ============================================
   HÁBITOS
   ============================================ */
const habits = [
  { name: "Meditar 10 min", days: [1,1,1,1,1,0,1,1,1,1,1,1], streak: 12, color: "#7c5cfc" },
  { name: "Treino físico", days: [1,0,1,1,1,1,0,1,1,1,1,1], streak: 8, color: "#00c896" },
  { name: "Leitura 30 min", days: [1,1,1,1,1,1,1,1,1,1,1,1], streak: 23, color: "#d4af37" },
  { name: "Beber 3L água", days: [0,1,1,0,1,1,1,1,0,1,1,1], streak: 5, color: "#3b82f6" },
  { name: "Diário de gratidão", days: [1,1,0,1,1,1,1,1,1,1,1,1], streak: 18, color: "#ff5c7a" },
  { name: "Sem açúcar refinado", days: [1,1,1,0,1,1,1,1,1,1,1,1], streak: 14, color: "#9a80ff" },
];
const days = ["S","T","Q","Q","S","S","D","S","T","Q","Q","S"];

export function HabitosPage() {
  return (
    <UserLayout>
      <PageHeader title="Hábitos" subtitle="Sistemas vencem objetivos. Construa seu sistema diário." action={<Btn variant="gold" icon="repeat">Novo hábito</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Hábitos ativos" value="9" icon="repeat" color="#7c5cfc" />
        <StatBox label="Streak máximo" value="23 dias" change="Leitura 30 min" icon="flame" color="#ff5c7a" />
        <StatBox label="Aderência semanal" value="86%" change="+4% vs semana ant." icon="trending" color="#00c896" />
        <StatBox label="XP ganho hoje" value="240" change="+3 hábitos" icon="bolt" color="#d4af37" />
      </div>

      <Card title="Tracker semanal" className="mt-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr>
              <th className="pb-2 text-left text-xs font-semibold text-slate-400">Hábito</th>
              {days.map((d, i) => <th key={i} className="pb-2 text-center text-xs font-semibold text-slate-400">{d}</th>)}
              <th className="pb-2 text-right text-xs font-semibold text-slate-400">Streak</th>
            </tr></thead>
            <tbody>
              {habits.map(h => (
                <tr key={h.name} className="border-t border-slate-100">
                  <td className="py-3 text-sm font-semibold text-slate-700">{h.name}</td>
                  {h.days.map((d, i) => (
                    <td key={i} className="py-3 text-center">
                      <div className="mx-auto h-7 w-7 rounded-md transition" style={{ background: d ? h.color : "#f1f5f9", opacity: d ? 1 : 1 }}>
                        {d ? <Icon.check className="mx-auto mt-1 h-5 w-5 text-white" /> : null}
                      </div>
                    </td>
                  ))}
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                      <Icon.flame className="h-3 w-3" /> {h.streak}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </UserLayout>
  );
}
