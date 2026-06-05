import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const dateChart = ["01","05","10","15","20","25","30"].map((d, i) => ({ d, v: [40,55,62,78,88,95,98][i] * 1000 }));

function KCard({ title, value, change, up = true, icon, color = "#7c5cfc", chart = true }: { title: string; value: string; change: string; up?: boolean; icon: IconName; color?: string; chart?: boolean }) {
  const C = Icon[icon];
  return (
    <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-white/50">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}22` }}><C className="h-4 w-4" style={{ color }} /></div>
      </div>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      <p className={`text-xs font-semibold ${up ? "text-success" : "text-danger"}`}>{change} <span className="text-white/40">vs anterior</span></p>
      {chart && <div className="mt-1 h-6"><ResponsiveContainer><LineChart data={dateChart}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} /></LineChart></ResponsiveContainer></div>}
    </div>
  );
}

/* ============================================
   ANALYTICS
   ============================================ */
const acqSources = [
  { name: "Instagram", value: 38.7, color: "#E1306C" },
  { name: "Google", value: 24.2, color: "#4285F4" },
  { name: "TikTok", value: 16.8, color: "#000000" },
  { name: "YouTube", value: 10.4, color: "#FF0000" },
  { name: "Indicação", value: 6.0, color: "#00c896" },
  { name: "Outros", value: 3.9, color: "#9a80ff" },
];

const funnel = [
  { stage: "Visitantes", v: 124583, pct: 100 },
  { stage: "Cadastros (Free)", v: 12842, pct: 10.3 },
  { stage: "Ativaram (D7)", v: 7892, pct: 6.3 },
  { stage: "Trial Pro", v: 3214, pct: 2.6 },
  { stage: "Convertidos", v: 1842, pct: 1.5 },
];

export function AnalyticsPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Analytics" subtitle="Visão profunda de aquisição, conversão e retenção." action={<Btn variant="gold" icon="doc">Exportar relatório</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KCard title="Visitantes únicos" value="124.583" change="+18.4%" icon="globe" color="#7c5cfc" />
        <KCard title="Taxa de conversão" value="14.4%" change="+2.1%" icon="trending" color="#00c896" />
        <KCard title="Custo de aquisição" value="R$ 42,30" change="-8.2%" icon="dollar" color="#d4af37" />
        <KCard title="Retenção 30d" value="68.2%" change="+5.4%" icon="repeat" color="#3b82f6" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <Card title="Funil de conversão" className="lg:col-span-7" dark>
          <div className="space-y-3">
            {funnel.map((f, i) => (
              <div key={f.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-white/70">{f.stage}</span>
                  <span className="font-bold">{f.v.toLocaleString("pt-BR")} <span className="text-xs text-white/40">({f.pct}%)</span></span>
                </div>
                <div className="h-8 rounded-lg bg-white/5">
                  <div className="flex h-8 items-center rounded-lg pl-3 text-xs font-bold text-white" style={{ width: `${f.pct}%`, minWidth: 60, background: ["#7c5cfc","#9a80ff","#3b82f6","#00c896","#d4af37"][i] }}>
                    {((f.v / funnel[i-1]?.v) * 100 || 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Fontes de aquisição" className="lg:col-span-5" dark>
          <div className="space-y-3">
            {acqSources.map(s => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm"><span className="text-white/70">{s.name}</span><span className="font-bold">{s.value}%</span></div>
                <div className="h-2 rounded-full bg-white/5"><div className="h-2 rounded-full" style={{ width: `${s.value * 2.5}%`, background: s.color }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Aquisição diária (90 dias)" className="mt-5" dark>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={Array.from({length:30},(_,i)=>({d:`${i+1}`,v:200+Math.round(Math.abs(Math.sin(i/3))*250),pago:80+Math.round(Math.abs(Math.cos(i/3))*120)}))}>
              <defs><linearGradient id="aq1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc" stopOpacity={0.4} /><stop offset="1" stopColor="#7c5cfc" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Area dataKey="v" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#aq1)" name="Visitantes" />
              <Area dataKey="pago" stroke="#d4af37" strokeWidth={2.5} fill="#d4af3720" name="Pagantes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   USUÁRIOS
   ============================================ */
const usersList = [
  { name: "Maria Souza", email: "maria.souza@email.com", plan: "Elite", status: "Ativo", country: "🇧🇷 BR", joined: "12 dias", xp: 2856 },
  { name: "João Silva", email: "joao.silva@email.com", plan: "Pro", status: "Ativo", country: "🇧🇷 BR", joined: "23 dias", xp: 2453 },
  { name: "Lucas Almeida", email: "lucas.a@email.com", plan: "Pro", status: "Ativo", country: "🇵🇹 PT", joined: "1 mês", xp: 2301 },
  { name: "Ana Oliveira", email: "ana.oliveira@email.com", plan: "Elite", status: "Ativo", country: "🇧🇷 BR", joined: "2 meses", xp: 2128 },
  { name: "Pedro Martins", email: "pedro.m@email.com", plan: "Pro", status: "Ativo", country: "🇪🇸 ES", joined: "2 meses", xp: 1987 },
  { name: "Carlos Mendes", email: "carlos@email.com", plan: "Free", status: "Inativo", country: "🇧🇷 BR", joined: "3 meses", xp: 432 },
  { name: "Juliana Costa", email: "ju.costa@email.com", plan: "Legacy", status: "Ativo", country: "🇧🇷 BR", joined: "4 meses", xp: 3812 },
  { name: "Ricardo Lima", email: "ricardo@email.com", plan: "Pro", status: "Suspenso", country: "🇺🇸 US", joined: "5 meses", xp: 1245 },
];

export function UsuariosPage() {
  const [filter, setFilter] = useState("Todos");
  return (
    <AdminLayout>
      <AdminPageHeader title="Usuários" subtitle="18.432 usuários cadastrados." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="doc">Exportar CSV</Btn><Btn variant="gold" icon="users">Convidar</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KCard title="Total" value="18.432" change="+12.5%" icon="users" color="#7c5cfc" chart={false} />
        <KCard title="Ativos (30d)" value="7.892" change="+10.1%" icon="flame" color="#00c896" chart={false} />
        <KCard title="Premium" value="3.842" change="+18.3%" icon="crown" color="#d4af37" chart={false} />
        <KCard title="Suspensos" value="42" change="+3" up={false} icon="ban" color="#ff5c7a" chart={false} />
      </div>

      <Card className="mt-5" dark>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Icon.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input placeholder="Buscar por nome, email, ID..." className="w-full rounded-lg border border-white/10 bg-dark py-2 pl-10 pr-3 text-sm outline-none focus:border-accent" />
          </div>
          {["Todos","Free","Pro","Elite","Legacy","Suspensos"].map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === f ? "bg-accent text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Usuário</th>
              <th className="pb-3 text-left font-medium">Plano</th>
              <th className="pb-3 text-left font-medium">Status</th>
              <th className="pb-3 text-left font-medium">País</th>
              <th className="pb-3 text-left font-medium">Cadastro</th>
              <th className="pb-3 text-right font-medium">XP</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.email} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-light" /><div><p className="font-semibold">{u.name}</p><p className="text-[11px] text-white/40">{u.email}</p></div></div></td>
                  <td><Badge color={u.plan === "Legacy" ? "gold" : u.plan === "Elite" ? "success" : u.plan === "Pro" ? "accent" : "slate"}>{u.plan}</Badge></td>
                  <td><Badge color={u.status === "Ativo" ? "success" : u.status === "Suspenso" ? "danger" : "slate"}>{u.status}</Badge></td>
                  <td className="text-white/70">{u.country}</td>
                  <td className="text-white/60">{u.joined}</td>
                  <td className="text-right font-bold">{u.xp.toLocaleString("pt-BR")}</td>
                  <td className="text-right"><div className="flex justify-end gap-1">
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-danger"><Icon.ban className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
          <span>Mostrando 8 de 18.432 usuários</span>
          <div className="flex gap-1">{["1","2","3","...","2304"].map(p => <button key={p} className={`rounded-lg px-3 py-1 ${p === "1" ? "bg-accent text-white" : "bg-white/5 hover:bg-white/10"}`}>{p}</button>)}</div>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ASSINATURAS
   ============================================ */
const planosDist = [
  { name: "Free", value: 8432, color: "#9a80ff", price: "R$ 0", churn: "—" },
  { name: "Pro", value: 6125, color: "#3b82f6", price: "R$ 29,90", churn: "2.1%" },
  { name: "Elite", value: 2856, color: "#00c896", price: "R$ 97,00", churn: "1.4%" },
  { name: "Legacy", value: 1019, color: "#d4af37", price: "R$ 297,00", churn: "0.8%" },
];

export function AssinaturasPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Assinaturas" subtitle="Gestão completa de planos e ciclo de vida." action={<Btn variant="gold" icon="card">Configurar planos</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KCard title="MRR" value="R$ 178.438" change="+24.6%" icon="dollar" color="#00c896" />
        <KCard title="ARR" value="R$ 2.14M" change="+24.6%" icon="trending" color="#7c5cfc" />
        <KCard title="Novos (30d)" value="356" change="+22.1%" icon="users" color="#3b82f6" />
        <KCard title="Churn (30d)" value="2.45%" change="-0.38%" up={false} icon="trendingDown" color="#ff5c7a" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <Card title="Receita por plano" className="lg:col-span-7" dark>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={planosDist.map(p => ({ name: p.name, receita: (p.value * parseFloat(p.price.replace(/[^\d,]/g,"").replace(",", "."))) || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `R$ ${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => `R$ ${v.toLocaleString("pt-BR")}`} contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Bar dataKey="receita" radius={[8,8,0,0]}>{planosDist.map(p => <Cell key={p.name} fill={p.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Distribuição" className="lg:col-span-5" dark>
          <div className="flex items-center gap-4">
            <div className="relative h-40 w-40 shrink-0">
              <ResponsiveContainer><PieChart><Pie data={planosDist} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>{planosDist.map(p => <Cell key={p.name} fill={p.color} />)}</Pie></PieChart></ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-extrabold">18.432</span><span className="text-[10px] text-white/40">Total</span></div>
            </div>
            <div className="flex-1 space-y-3">
              {planosDist.map(p => (
                <div key={p.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                  <div className="flex-1"><p className="font-semibold">{p.name}</p><p className="text-[11px] text-white/40">{p.price} · churn {p.churn}</p></div>
                  <span className="font-bold">{p.value.toLocaleString("pt-BR")}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Operações recentes" className="mt-5" dark>
        <div className="space-y-1">
          {[
            { type: "Nova", plan: "Pro", user: "Maria Santos", value: "+R$ 29,90", time: "há 12s", color: "text-success" },
            { type: "Upgrade", plan: "Free → Pro", user: "João Silva", value: "+R$ 29,90", time: "há 1m", color: "text-accent" },
            { type: "Cancelamento", plan: "Pro", user: "Carlos Mendes", value: "-R$ 29,90", time: "há 3m", color: "text-danger" },
            { type: "Upgrade", plan: "Pro → Elite", user: "Lucas Oliveira", value: "+R$ 67,10", time: "há 8m", color: "text-success" },
            { type: "Nova", plan: "Legacy", user: "Patrícia Lemos", value: "+R$ 297,00", time: "há 15m", color: "text-gold" },
          ].map((o, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5">
              <Badge color={o.type === "Cancelamento" ? "danger" : o.type === "Upgrade" ? "accent" : "success"}>{o.type}</Badge>
              <span className="text-sm text-white/70">{o.plan}</span>
              <span className="flex-1 text-sm font-semibold">{o.user}</span>
              <span className={`font-bold ${o.color}`}>{o.value}</span>
              <span className="text-xs text-white/30">{o.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   RECEITAS
   ============================================ */
export function ReceitasPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Receitas" subtitle="Análise financeira detalhada da plataforma." action={<Btn variant="gold" icon="doc">Relatório financeiro</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KCard title="Receita total (mês)" value="R$ 178.438" change="+24.6%" icon="dollar" color="#00c896" />
        <KCard title="Receita total (ano)" value="R$ 1.84M" change="+186%" icon="trending" color="#7c5cfc" />
        <KCard title="Ticket médio" value="R$ 67,30" change="+8.4%" icon="card" color="#d4af37" />
        <KCard title="Marketplace" value="R$ 42.156" change="+32.1%" icon="store" color="#9a80ff" />
      </div>

      <Card title="Receita acumulada — 12 meses" className="mt-5" dark>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m,i)=>({m,subs:80+i*9,market:20+i*3,mentorias:10+i*2}))}>
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

/* ============================================
   IA & CONSUMO
   ============================================ */
const providers = [
  { name: "Gemini Pro", calls: 124583, tokens: "18.4M", cost: "R$ 1.245", up: 14.2, color: "#4285F4" },
  { name: "OpenAI GPT-4o", calls: 84231, tokens: "12.8M", cost: "R$ 982", up: 8.4, color: "#10A37F" },
  { name: "Claude 3.5 Sonnet", calls: 32412, tokens: "8.2M", cost: "R$ 678", up: 24.1, color: "#D97757" },
  { name: "DeepSeek V3", calls: 15214, tokens: "5.8M", cost: "R$ 124", up: 42.3, color: "#7c5cfc" },
  { name: "OpenRouter", calls: 4231, tokens: "1.2M", cost: "R$ 89", up: 6.2, color: "#9a80ff" },
];

export function IAConsumoPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="IA & Consumo" subtitle="Monitoramento de uso, custos e performance dos provedores." action={<Btn variant="gold" icon="settings">Configurar providers</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KCard title="Mensagens (30d)" value="256.432" change="+14.2%" icon="message" color="#7c5cfc" />
        <KCard title="Tokens consumidos" value="45.2M" change="+18.7%" icon="bolt" color="#d4af37" />
        <KCard title="Usuários ativos IA" value="6.125" change="+11.3%" icon="users" color="#00c896" />
        <KCard title="Custo estimado" value="R$ 3.456" change="+9.8%" up={false} icon="dollar" color="#ff5c7a" />
      </div>

      <Card title="Provedores de IA" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Provedor</th>
              <th className="pb-3 text-right font-medium">Chamadas</th>
              <th className="pb-3 text-right font-medium">Tokens</th>
              <th className="pb-3 text-right font-medium">Custo</th>
              <th className="pb-3 text-right font-medium">Variação</th>
              <th className="pb-3 text-center font-medium">Status</th>
            </tr></thead>
            <tbody>
              {providers.map(p => (
                <tr key={p.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: p.color }} />{p.name}</div></td>
                  <td className="text-right font-semibold">{p.calls.toLocaleString("pt-BR")}</td>
                  <td className="text-right text-white/70">{p.tokens}</td>
                  <td className="text-right font-bold">{p.cost}</td>
                  <td className="text-right font-bold text-success">+{p.up}%</td>
                  <td className="text-center"><Badge color="success">Online</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Consumo diário de tokens (30 dias)" className="mt-5" dark>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={Array.from({length:30},(_,i)=>({d:`${i+1}`,v:800+Math.round(Math.abs(Math.sin(i/2))*1200)}))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}k`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Bar dataKey="v" fill="#7c5cfc" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AdminLayout>
  );
}
