import { useState } from "react";
import { UserLayout } from "../../components/UserLayout";
import { Card, PageHeader, Btn, Badge, Progress, Tabs, StatBox } from "../../components/ui";
import { Icon } from "../../components/icons";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

/* ============================================
   UNIVERSIDADE
   ============================================ */
const courses = [
  { t: "Mindset Milionário", cat: "Wealth", duration: "8h 30m", students: 1248, rating: 4.9, p: 65, color: "from-gold to-amber-400" },
  { t: "IA Aplicada a Negócios", cat: "Business", duration: "12h 00m", students: 856, rating: 4.8, p: 30, color: "from-accent to-accent-light" },
  { t: "Numerologia Avançada", cat: "Identity", duration: "6h 15m", students: 2103, rating: 5.0, p: 100, color: "from-rose-500 to-pink-400" },
  { t: "Liberdade Financeira", cat: "Wealth", duration: "10h 45m", students: 1872, rating: 4.7, p: 0, color: "from-emerald-500 to-green-400" },
  { t: "Liderança Visionária", cat: "Growth", duration: "7h 20m", students: 645, rating: 4.9, p: 15, color: "from-blue-500 to-sky-400" },
  { t: "Construindo Legado Familiar", cat: "Legacy", duration: "9h 10m", students: 428, rating: 5.0, p: 0, color: "from-violet-500 to-purple-400" },
];

const trilhas = [
  { t: "Trilha Vision Builder", d: "Do mindset à execução estratégica.", courses: 8, hours: 42, color: "bg-accent" },
  { t: "Trilha Vision Wealth", d: "Construa sua liberdade financeira.", courses: 12, hours: 65, color: "bg-success" },
  { t: "Trilha Vision Legacy", d: "Crie um legado que atravessa gerações.", courses: 10, hours: 58, color: "bg-gold" },
];

export function UniversidadePage() {
  const [tab, setTab] = useState("Todos os cursos");
  return (
    <UserLayout>
      <PageHeader title="Universidade Vision" subtitle="Cursos, trilhas e certificações para sua evolução contínua." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="award">Meus certificados</Btn><Btn variant="gold" icon="search">Buscar curso</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Cursos em andamento" value="3" icon="book" color="#7c5cfc" />
        <StatBox label="Horas estudadas" value="64h" change="+12h este mês" icon="bolt" color="#d4af37" />
        <StatBox label="Certificações" value="5" change="próx: Vision Master" icon="award" color="#00c896" />
        <StatBox label="Ranking aluno" value="#127" change="top 2%" icon="trending" color="#3b82f6" />
      </div>

      <Card title="Trilhas de aprendizado" className="mt-5">
        <div className="grid gap-4 md:grid-cols-3">
          {trilhas.map(t => (
            <div key={t.t} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className={`${t.color} flex h-24 items-center justify-center`}>
                <Icon.layers className="h-10 w-10 text-white/80" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800">{t.t}</h3>
                <p className="mt-1 text-xs text-slate-500">{t.d}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Icon.book className="h-3 w-3" /> {t.courses} cursos</span>
                  <span className="flex items-center gap-1"><Icon.bolt className="h-3 w-3" /> {t.hours}h</span>
                </div>
                <Btn variant="secondary" className="mt-3 w-full justify-center">Iniciar trilha</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5">
        <Tabs items={["Todos os cursos", "Lifestyle", "Business", "Wealth", "Legacy", "IA"]} active={tab} onChange={setTab} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => (
          <Card key={c.t} className="overflow-hidden !p-0">
            <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${c.color}`}>
              <Icon.play className="h-12 w-12 text-white/90" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge color="accent">{c.cat}</Badge>
                <span className="flex items-center gap-0.5 text-xs font-bold text-gold"><Icon.star className="h-3 w-3" />{c.rating}</span>
              </div>
              <h3 className="mt-2 font-bold text-slate-800">{c.t}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Icon.bolt className="h-3 w-3" />{c.duration}</span>
                <span className="flex items-center gap-1"><Icon.users className="h-3 w-3" />{c.students.toLocaleString("pt-BR")} alunos</span>
              </div>
              {c.p > 0 ? (
                <><div className="mt-3"><Progress value={c.p} /></div>
                <Btn variant="primary" className="mt-3 w-full justify-center">{c.p === 100 ? "Revisar curso" : `Continuar (${c.p}%)`}</Btn></>
              ) : (
                <Btn variant="secondary" className="mt-3 w-full justify-center">Começar curso</Btn>
              )}
            </div>
          </Card>
        ))}
      </div>
    </UserLayout>
  );
}

/* ============================================
   COMUNIDADE
   ============================================ */
const channels = [
  { name: "anúncios", unread: 2, type: "text" },
  { name: "geral", unread: 18, type: "text" },
  { name: "wins-do-dia", unread: 5, type: "text" },
  { name: "business", unread: 0, type: "text" },
  { name: "wealth", unread: 12, type: "text" },
  { name: "ia-vision", unread: 3, type: "text" },
  { name: "Mastermind VIP", unread: 1, type: "voice" },
];

const eventos = [
  { t: "Mastermind VIP — Estratégia 2026", d: "Hoje, 20h", participants: 84, type: "Online" },
  { t: "Workshop: IA para Negócios", d: "Amanhã, 19h", participants: 247, type: "Online" },
  { t: "Encontro presencial SP", d: "30/05, 14h", participants: 32, type: "Presencial" },
  { t: "Live Q&A com Clodoaldo", d: "01/06, 21h", participants: 1245, type: "Online" },
];

const ranking = [
  { name: "Maria Souza", pts: 2856, plan: "Elite", rank: 1 },
  { name: "João Silva", pts: 2453, plan: "Pro", rank: 2 },
  { name: "Lucas Almeida", pts: 2301, plan: "Pro", rank: 3 },
  { name: "Ana Oliveira", pts: 2128, plan: "Elite", rank: 4 },
  { name: "Pedro Martins", pts: 1987, plan: "Pro", rank: 5 },
  { name: "Você (Clodoaldo)", pts: 1654, plan: "Pro", rank: 8 },
];

export function ComunidadePage() {
  return (
    <UserLayout>
      <PageHeader title="Comunidade" subtitle="Conecte-se, evolua e construa com outros visionários." action={<Btn variant="primary" icon="discord">Abrir Discord</Btn>} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5865F2]"><Icon.discord className="h-6 w-6 text-white" /></div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Vision Legacy Community</p>
              <p className="text-xs text-slate-500">12.486 membros · 1.247 online agora</p>
            </div>
            <Badge color="success">Conectado</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {channels.map(c => (
              <button key={c.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-accent hover:bg-accent/5">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-slate-400">{c.type === "voice" ? "🎙️" : "#"}</span> {c.name}
                </span>
                {c.unread > 0 && <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">{c.unread}</span>}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Seus cargos no Discord">
          <div className="space-y-2">
            {[
              { c: "Vision Pro", color: "bg-blue-500" },
              { c: "Beta Tester", color: "bg-accent" },
              { c: "Top 10 XP", color: "bg-gold" },
              { c: "Mentorado", color: "bg-success" },
            ].map(r => (
              <div key={r.c} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
                <span className="flex-1 text-sm font-semibold text-slate-700">{r.c}</span>
                <Icon.check className="h-4 w-4 text-success" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Cargos sincronizados automaticamente com seu plano e XP.</p>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Próximos eventos" action={<Btn variant="ghost" icon="calendar">Ver agenda</Btn>}>
          <div className="space-y-3">
            {eventos.map(e => (
              <div key={e.t} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon.calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{e.t}</p>
                  <p className="text-xs text-slate-500">{e.d} · {e.participants} confirmados</p>
                </div>
                <Badge color={e.type === "Online" ? "accent" : "gold"}>{e.type}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Ranking mensal — Top XP">
          <div className="space-y-2">
            {ranking.map(r => (
              <div key={r.name} className={`flex items-center gap-3 rounded-xl p-2 ${r.name.startsWith("Você") ? "bg-accent/10 border border-accent/30" : ""}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold ${r.rank === 1 ? "bg-gold text-dark" : r.rank === 2 ? "bg-slate-300 text-slate-700" : r.rank === 3 ? "bg-orange-300 text-orange-900" : "bg-slate-100 text-slate-500"}`}>{r.rank}</span>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-light" />
                <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{r.name}</p><Badge color={r.plan === "Elite" ? "gold" : "accent"}>{r.plan}</Badge></div>
                <p className="text-sm font-bold text-accent">{r.pts.toLocaleString("pt-BR")} pts</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

/* ============================================
   MARKETPLACE
   ============================================ */
const products = [
  { t: "Curso: Mindset Milionário", price: "R$ 197", cat: "Curso", rating: 4.9, sales: 1248, color: "from-gold to-amber-500" },
  { t: "E-book: Mentalidade Visionária", price: "R$ 47", cat: "E-book", rating: 4.8, sales: 3215, color: "from-accent to-violet-500" },
  { t: "Template: Plano de Negócios PRO", price: "R$ 89", cat: "Template", rating: 5.0, sales: 642, color: "from-emerald-500 to-teal-500" },
  { t: "Mentoria Individual 1h", price: "R$ 497", cat: "Mentoria", rating: 5.0, sales: 128, color: "from-rose-500 to-pink-500" },
  { t: "Sistema de Hábitos Notion", price: "R$ 67", cat: "Template", rating: 4.7, sales: 894, color: "from-blue-500 to-indigo-500" },
  { t: "Pacote: Roadmap de Carreira IA", price: "R$ 297", cat: "Pacote", rating: 4.9, sales: 312, color: "from-orange-500 to-amber-500" },
];

export function MarketplacePage() {
  const [tab, setTab] = useState("Todos");
  return (
    <UserLayout>
      <PageHeader title="Marketplace" subtitle="Produtos digitais selecionados para acelerar sua jornada." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="store">Meus pedidos</Btn><Btn variant="gold" icon="bolt">Vender no Marketplace</Btn></div>
      } />

      <div className="rounded-2xl bg-gradient-to-r from-accent to-violet-600 p-6 text-white">
        <Badge color="gold">⚡ Oferta da semana</Badge>
        <h2 className="mt-3 text-2xl font-extrabold">Pacote Completo Vision Builder</h2>
        <p className="mt-1 max-w-xl text-sm text-white/80">8 cursos + 12 templates + 3 mentorias por apenas R$ 997 (de R$ 2.497).</p>
        <Btn variant="gold" className="mt-4" icon="arrowRight">Aproveitar oferta</Btn>
      </div>

      <div className="mt-5">
        <Tabs items={["Todos", "Cursos", "E-books", "Templates", "Mentorias", "Pacotes"]} active={tab} onChange={setTab} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <Card key={p.t} className="!p-0 overflow-hidden transition hover:shadow-xl">
            <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${p.color}`}>
              <Icon.store className="h-12 w-12 text-white/90" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge color="accent">{p.cat}</Badge>
                <span className="flex items-center gap-0.5 text-xs font-bold text-gold"><Icon.star className="h-3 w-3" />{p.rating}</span>
              </div>
              <h3 className="mt-2 font-bold text-slate-800">{p.t}</h3>
              <p className="text-xs text-slate-500">{p.sales.toLocaleString("pt-BR")} vendas</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-extrabold text-accent">{p.price}</span>
                <Btn variant="primary" icon="bolt">Comprar</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </UserLayout>
  );
}

/* ============================================
   RELATÓRIOS
   ============================================ */
const reportData = ["Jan","Fev","Mar","Abr","Mai","Jun"].map((m, i) => ({
  m, score: [320, 380, 450, 520, 620, 726][i], habitos: [60, 65, 72, 78, 84, 86][i], metas: [3, 5, 6, 8, 11, 12][i]
}));

export function RelatoriosPage() {
  return (
    <UserLayout>
      <PageHeader title="Relatórios" subtitle="Análise completa da sua evolução pessoal." action={<Btn variant="gold" icon="doc">Exportar PDF</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Vision Score" value="726" change="+126 pts em 6 meses" icon="trending" color="#7c5cfc" />
        <StatBox label="Hábitos médios" value="86%" change="+26% em 6 meses" icon="repeat" color="#00c896" />
        <StatBox label="Metas concluídas" value="12" change="+9 em 6 meses" icon="target" color="#d4af37" />
        <StatBox label="Patrimônio" value="+R$ 88k" change="evolução 6m" icon="wallet" color="#3b82f6" />
      </div>

      <Card title="Evolução semestral" className="mt-5">
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="score" fill="#7c5cfc" radius={[6,6,0,0]} name="Vision Score" />
              <Bar dataKey="habitos" fill="#00c896" radius={[6,6,0,0]} name="Hábitos %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Card title="Insights da IA — Últimos 30 dias">
          <ul className="space-y-3">
            {[
              "Você manteve 86% de aderência aos hábitos — recorde pessoal.",
              "Sua produtividade aumentou 23% após adotar a rotina matinal.",
              "Investiu 18% da renda — acima da meta de 15%.",
              "Reduziu tela à noite em 42% — melhor qualidade de sono.",
            ].map(i => (
              <li key={i} className="flex gap-2 text-sm text-slate-600"><Icon.checkCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />{i}</li>
            ))}
          </ul>
        </Card>
        <Card title="Pontos de atenção">
          <ul className="space-y-3">
            {[
              "Tempo de leitura caiu 12% — meta: 30 min/dia.",
              "3 metas estão sem progresso há 14+ dias.",
              "Sequência de meditação interrompida no dia 19/05.",
              "Despesas com lazer aumentaram 28% — revisar orçamento.",
            ].map(i => (
              <li key={i} className="flex gap-2 text-sm text-slate-600"><Icon.bolt className="mt-0.5 h-4 w-4 shrink-0 text-danger" />{i}</li>
            ))}
          </ul>
        </Card>
      </div>
    </UserLayout>
  );
}
