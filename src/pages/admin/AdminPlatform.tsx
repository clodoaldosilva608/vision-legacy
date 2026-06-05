import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge, Tabs, Progress } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";

function MiniStat({ title, value, icon, color = "#7c5cfc" }: { title: string; value: string; icon: IconName; color?: string }) {
  const C = Icon[icon];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-secondary/50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}22` }}><C className="h-5 w-5" style={{ color }} /></div>
      <div><p className="text-xs text-white/50">{title}</p><p className="text-xl font-extrabold">{value}</p></div>
    </div>
  );
}

/* ============================================
   ADMIN NUMEROLOGIA
   ============================================ */
export function AdminNumerologiaPage() {
  const interpretations = [
    { n: 1, theme: "Liderança", text: "O número 1 representa início, ambição e liderança..." },
    { n: 2, theme: "Cooperação", text: "Número de parceria, diplomacia e sensibilidade..." },
    { n: 3, theme: "Comunicação", text: "Criatividade, expressão artística e otimismo..." },
    { n: 7, theme: "Sabedoria", text: "Busca espiritual, análise profunda e introspecção..." },
    { n: 8, theme: "Poder", text: "Realização material, autoridade e prosperidade..." },
    { n: 11, theme: "Iluminação", text: "Mestre número. Intuição elevada, missão espiritual..." },
    { n: 22, theme: "Construtor Mestre", text: "Capacidade de manifestar grandes obras no mundo material..." },
  ];
  return (
    <AdminLayout>
      <AdminPageHeader title="Numerologia" subtitle="Configure interpretações, ciclos e regras." action={<Btn variant="gold" icon="hash">Adicionar número</Btn>} />
      <Card title="Interpretações dos números" dark>
        <div className="space-y-2">
          {interpretations.map(i => (
            <div key={i.n} className="flex items-center gap-3 rounded-xl border border-white/5 p-3 hover:bg-white/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-2xl font-extrabold text-accent">{i.n}</div>
              <div className="flex-1"><p className="font-bold">{i.theme}</p><p className="text-xs text-white/50">{i.text}</p></div>
              <Btn variant="ghost" icon="edit">Editar</Btn>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Ciclos de vida" className="mt-5" dark>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { c: "Primeiro Ciclo", age: "0 - 28 anos", t: "Formação" },
            { c: "Segundo Ciclo", age: "28 - 56 anos", t: "Produção" },
            { c: "Terceiro Ciclo", age: "56+ anos", t: "Colheita" },
          ].map(x => (
            <div key={x.c} className="rounded-xl border border-white/8 bg-dark p-4">
              <p className="text-xs text-white/40">{x.age}</p>
              <p className="font-bold">{x.c}</p>
              <p className="mt-1 text-sm text-accent">{x.t}</p>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN ARQUÉTIPOS
   ============================================ */
const arquetipos = [
  { n: "Construtor", e: "🏗️", color: "from-blue-500 to-blue-600", users: 2148 },
  { n: "Visionário", e: "🔮", color: "from-accent to-violet-500", users: 1842 },
  { n: "Estrategista", e: "♟️", color: "from-emerald-500 to-emerald-600", users: 1521 },
  { n: "Mentor", e: "🧙", color: "from-gold to-amber-500", users: 1284 },
  { n: "Executor", e: "⚡", color: "from-orange-500 to-orange-600", users: 1156 },
  { n: "Líder", e: "👑", color: "from-rose-500 to-pink-600", users: 982 },
  { n: "Inovador", e: "💡", color: "from-cyan-500 to-cyan-600", users: 856 },
  { n: "Explorador", e: "🌍", color: "from-indigo-500 to-indigo-600", users: 643 },
];

export function AdminArquetiposPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Arquétipos" subtitle="Personalize os arquétipos identificados pela IA." action={<Btn variant="gold" icon="cube">Novo arquétipo</Btn>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {arquetipos.map(a => (
          <Card key={a.n} dark className="!p-0 overflow-hidden">
            <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${a.color} text-5xl`}>{a.e}</div>
            <div className="p-4">
              <h3 className="font-bold">{a.n}</h3>
              <p className="mt-1 text-xs text-white/50">{a.users.toLocaleString("pt-BR")} usuários classificados</p>
              <div className="mt-3 flex gap-1"><Btn variant="secondary" icon="edit" className="!py-1.5 text-xs">Editar</Btn></div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN IA (Vision AI)
   ============================================ */
export function AdminIAPage() {
  const [tab, setTab] = useState("Prompts");
  return (
    <AdminLayout>
      <AdminPageHeader title="Vision AI™" subtitle="Configure o cérebro da plataforma." action={<Btn variant="gold" icon="bolt">Testar IA</Btn>} />
      <Tabs items={["Prompts","Provedores","Memória","Regras","Modelos"]} active={tab} onChange={setTab} dark />

      <Card title="Prompt Mestre" className="mt-5" dark action={<Btn variant="ghost" icon="edit">Editar</Btn>}>
        <pre className="overflow-x-auto rounded-xl bg-dark p-4 text-sm leading-relaxed text-white/80">{`Você é a Vision AI™, mentora pessoal de IA do Vision Legacy™.

PERSONALIDADE:
- Acolhedora, estratégica, direta e baseada em dados.
- Combina visão de coach, mentor, consultor e planejador.

CONTEXTO:
- O usuário está em uma jornada de crescimento pessoal,
  patrimônio e construção de legado.
- Use o framework VISION METHOD™ (V-I-S-I-O-N).

INSTRUÇÕES:
1. Sempre cite os dados do usuário (Vision Score, arquétipo, ciclo).
2. Sugira ações concretas com OKRs e prazos.
3. Use linguagem brasileira, empática e poderosa.
4. Quando relevante, integre numerologia + estratégia.`}</pre>
      </Card>

      <Card title="Provedores de IA" className="mt-5" dark>
        <div className="space-y-3">
          {[
            { n: "Gemini Pro", status: "Ativo", default: true, models: "gemini-1.5-pro, gemini-1.5-flash" },
            { n: "OpenAI", status: "Ativo", default: false, models: "gpt-4o, gpt-4o-mini" },
            { n: "Anthropic Claude", status: "Ativo", default: false, models: "claude-3.5-sonnet" },
            { n: "DeepSeek", status: "Ativo", default: false, models: "deepseek-v3, deepseek-r1" },
            { n: "OpenRouter", status: "Ativo", default: false, models: "Multi-modelo (50+)" },
          ].map(p => (
            <div key={p.n} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20"><Icon.brain className="h-5 w-5 text-accent" /></div>
              <div className="flex-1"><p className="font-bold">{p.n} {p.default && <Badge color="gold">Padrão</Badge>}</p><p className="text-xs text-white/40">{p.models}</p></div>
              <Badge color="success">{p.status}</Badge>
              <Btn variant="ghost" icon="settings">Config</Btn>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN MARKETPLACE
   ============================================ */
const adminProducts = [
  { t: "Curso: IA para Negócios", cat: "Curso", seller: "Vision Team", price: "R$ 297", sales: 243, status: "Ativo" },
  { t: "E-book: Mentalidade Visionária", cat: "E-book", seller: "Clodoaldo Silva", price: "R$ 47", sales: 186, status: "Ativo" },
  { t: "Template: Plano de Negócios", cat: "Template", seller: "Vision Team", price: "R$ 89", sales: 112, status: "Ativo" },
  { t: "Mentoria Individual", cat: "Mentoria", seller: "Ana Mentora", price: "R$ 497", sales: 13, status: "Ativo" },
  { t: "Pacote Vision Builder", cat: "Pacote", seller: "Vision Team", price: "R$ 997", sales: 6, status: "Ativo" },
  { t: "Curso novo (em revisão)", cat: "Curso", seller: "Marina C.", price: "R$ 197", sales: 0, status: "Pendente" },
];

export function AdminMarketplacePage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Marketplace" subtitle="Produtos, pedidos e comissões." action={<Btn variant="gold" icon="store">Aprovar produtos</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Produtos ativos" value="124" icon="store" color="#7c5cfc" />
        <MiniStat title="Vendas (mês)" value="1.842" icon="trending" color="#00c896" />
        <MiniStat title="Receita marketplace" value="R$ 42k" icon="dollar" color="#d4af37" />
        <MiniStat title="Comissão paga" value="R$ 12.6k" icon="card" color="#3b82f6" />
      </div>

      <Card title="Produtos" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Produto</th>
              <th className="pb-3 text-left font-medium">Categoria</th>
              <th className="pb-3 text-left font-medium">Vendedor</th>
              <th className="pb-3 text-right font-medium">Preço</th>
              <th className="pb-3 text-right font-medium">Vendas</th>
              <th className="pb-3 text-center font-medium">Status</th>
            </tr></thead>
            <tbody>
              {adminProducts.map(p => (
                <tr key={p.t} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 font-semibold">{p.t}</td>
                  <td><Badge color="accent">{p.cat}</Badge></td>
                  <td className="text-white/70">{p.seller}</td>
                  <td className="text-right font-bold text-gold">{p.price}</td>
                  <td className="text-right">{p.sales}</td>
                  <td className="text-center"><Badge color={p.status === "Ativo" ? "success" : "gold"}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN DISCORD
   ============================================ */
export function AdminDiscordPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Comunidade Discord" subtitle="Gestão do servidor Discord oficial." action={<Btn variant="gold" icon="discord">Abrir Discord</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Membros totais" value="12.486" icon="users" color="#5865F2" />
        <MiniStat title="Online agora" value="1.247" icon="flame" color="#00c896" />
        <MiniStat title="Mensagens (30d)" value="78.245" icon="message" color="#7c5cfc" />
        <MiniStat title="Eventos realizados" value="32" icon="calendar" color="#d4af37" />
      </div>

      <Card title="Cargos sincronizados" className="mt-5" dark>
        <div className="space-y-2">
          {[
            { r: "Vision Free", m: 8421, color: "bg-slate-500" },
            { r: "Vision Pro", m: 3214, color: "bg-blue-500" },
            { r: "Vision Elite", m: 856, color: "bg-success" },
            { r: "Vision Legacy", m: 87, color: "bg-gold" },
            { r: "Mentor", m: 12, color: "bg-accent" },
            { r: "Moderador", m: 8, color: "bg-rose-500" },
          ].map(r => (
            <div key={r.r} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <span className={`h-3 w-3 rounded-full ${r.color}`} />
              <span className="flex-1 font-semibold">{r.r}</span>
              <span className="text-sm text-white/60">{r.m.toLocaleString("pt-BR")} membros</span>
              <Btn variant="ghost" icon="settings">Config</Btn>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Eventos agendados" className="mt-5" dark>
        <div className="space-y-2">
          {[
            { t: "Mastermind VIP — 2026", d: "Hoje, 20h", p: 84 },
            { t: "Workshop IA para Negócios", d: "Amanhã, 19h", p: 247 },
            { t: "Live Q&A com Founder", d: "01/06, 21h", p: 1245 },
          ].map(e => (
            <div key={e.t} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <Icon.calendar className="h-5 w-5 text-accent" />
              <div className="flex-1"><p className="font-semibold">{e.t}</p><p className="text-xs text-white/40">{e.d} · {e.p} confirmados</p></div>
              <Btn variant="ghost" icon="edit">Editar</Btn>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN CRM
   ============================================ */
export function AdminCRMPage() {
  const stages = [
    { s: "Lead", count: 1842, color: "#9a80ff", value: "R$ 0" },
    { s: "Trial Pro", count: 384, color: "#3b82f6", value: "R$ 11.481" },
    { s: "MQL", count: 216, color: "#7c5cfc", value: "R$ 64.584" },
    { s: "SQL", count: 124, color: "#d4af37", value: "R$ 123.876" },
    { s: "Cliente", count: 86, color: "#00c896", value: "R$ 358.420" },
  ];
  const leads = [
    { name: "Maria Souza", email: "maria@empresa.com", stage: "SQL", source: "Instagram", score: 92 },
    { name: "João Silva", email: "joao@empresa.com", stage: "MQL", source: "YouTube", score: 78 },
    { name: "Lucas Almeida", email: "lucas@empresa.com", stage: "Trial Pro", source: "Indicação", score: 65 },
    { name: "Ana Oliveira", email: "ana@empresa.com", stage: "Cliente", source: "Google", score: 100 },
    { name: "Pedro Martins", email: "pedro@empresa.com", stage: "Lead", source: "TikTok", score: 42 },
  ];
  return (
    <AdminLayout>
      <AdminPageHeader title="CRM Interno" subtitle="Pipeline de leads, trials e clientes." action={<Btn variant="gold" icon="users">Novo lead</Btn>} />
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map(s => (
          <div key={s.s} className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
            <span className="h-2 w-12 rounded-full block" style={{ background: s.color }} />
            <p className="mt-2 text-xs text-white/50">{s.s}</p>
            <p className="text-xl font-extrabold">{s.count}</p>
            <p className="text-xs font-semibold text-success">{s.value}</p>
          </div>
        ))}
      </div>

      <Card title="Leads ativos" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Lead</th>
              <th className="pb-3 text-left font-medium">Estágio</th>
              <th className="pb-3 text-left font-medium">Fonte</th>
              <th className="pb-3 text-right font-medium">Score</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.email} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-light" /><div><p className="font-semibold">{l.name}</p><p className="text-[11px] text-white/40">{l.email}</p></div></div></td>
                  <td><Badge color={l.stage === "Cliente" ? "success" : l.stage === "SQL" ? "gold" : "accent"}>{l.stage}</Badge></td>
                  <td className="text-white/70">{l.source}</td>
                  <td className="text-right"><div className="flex justify-end items-center gap-2"><div className="w-16"><Progress value={l.score} color={l.score > 80 ? "#00c896" : l.score > 60 ? "#d4af37" : "#ff5c7a"} /></div><span className="font-bold">{l.score}</span></div></td>
                  <td className="text-right"><Btn variant="ghost" icon="message">Contatar</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN AFILIADOS
   ============================================ */
export function AdminAfiliadosPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Afiliados" subtitle="Gestão de programa de afiliados e comissões." action={<Btn variant="gold" icon="trending">Novo afiliado</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Afiliados ativos" value="248" icon="users" color="#7c5cfc" />
        <MiniStat title="Vendas via afiliados" value="623" icon="trending" color="#00c896" />
        <MiniStat title="Comissões pagas" value="R$ 18.4k" icon="dollar" color="#d4af37" />
        <MiniStat title="Taxa de conversão" value="6.8%" icon="bolt" color="#ff5c7a" />
      </div>

      <Card title="Top afiliados" className="mt-5" dark>
        <div className="space-y-2">
          {[
            { n: "Roberto Influencer", v: 84, c: "R$ 8.420" },
            { n: "Carla Coach", v: 62, c: "R$ 6.180" },
            { n: "Mateus Pro", v: 48, c: "R$ 4.860" },
            { n: "Sandra Mentora", v: 32, c: "R$ 3.250" },
            { n: "Eduardo Investidor", v: 28, c: "R$ 2.840" },
          ].map((a, i) => (
            <div key={a.n} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <span className="text-lg font-extrabold text-white/30">{i+1}</span>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-light" />
              <div className="flex-1"><p className="font-semibold">{a.n}</p><p className="text-xs text-white/40">{a.v} vendas</p></div>
              <span className="font-bold text-success">{a.c}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
