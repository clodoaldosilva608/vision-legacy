import { AdminLayout } from "../components/AdminLayout";
import { Card, Badge } from "../components/ui";
import { Icon, type IconName } from "../components/icons";
import {
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

/* ─── Data ───────────────────────────────────────────────── */
const kpis = [
  { label: "Usuários", value: "18.432", change: "+12.5%", icon: "users", color: "#7c5cfc", up: true },
  { label: "Ativos 30d", value: "7.892",  change: "+10.1%", icon: "flame", color: "#f59e0b", up: true },
  { label: "MRR",       value: "R$ 178.438", change: "+24.6%", icon: "dollar", color: "#00c896", up: true },
  { label: "Novos",     value: "1.256",    change: "+8.2%",  icon: "users",  color: "#3b82f6", up: true },
  { label: "Churn",     value: "2,43%",    change: "-0.8%",  icon: "trendingDown", color: "#ff5c7a", up: false },
  { label: "LTV",       value: "R$ 396",   change: "+6.7%",  icon: "card",   color: "#9a80ff", up: true },
] as const;

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  d: String(i + 1),
  v: 8000 + Math.round(Math.abs(Math.sin(i / 3) * 35000)) + i * 300,
}));

const plansData = [
  { name: "Free",   value: 8432, color: "#9a80ff", pct: "45.8%" },
  { name: "Pro",    value: 6125, color: "#3b82f6", pct: "33.2%" },
  { name: "Elite",  value: 2856, color: "#00c896", pct: "15.5%" },
  { name: "Legacy", value: 1019, color: "#d4af37", pct: "5.5%" },
];

const activity = [
  { icon: "users"    as IconName, title: "Novo usuário registrado", sub: "joao.silva@email.com",      time: "agora", color: "#7c5cfc" },
  { icon: "card"     as IconName, title: "Assinatura Pro realizada", sub: "R$ 29,90 — Stripe",        time: "1 min", color: "#00c896" },
  { icon: "doc"      as IconName, title: "Novo conteúdo publicado", sub: "Curso: IA Aplicada",         time: "2 min", color: "#3b82f6" },
  { icon: "dollar"   as IconName, title: "Pagamento aprovado",      sub: "R$ 97,00 — Plano Elite",    time: "3 min", color: "#f59e0b" },
  { icon: "ban"      as IconName, title: "Assinatura cancelada",    sub: "maria.santos@email.com",    time: "5 min", color: "#ff5c7a" },
  { icon: "sparkles" as IconName, title: "Nova conversa IA",        sub: "Usuário: rafael.m",         time: "8 min", color: "#7c5cfc" },
];

const quickActions = [
  { label: "Novo Usuário",    icon: "users"    as IconName },
  { label: "Novo Conteúdo",   icon: "doc"      as IconName },
  { label: "Nova Missão",     icon: "target"   as IconName },
  { label: "Novo Produto",    icon: "store"    as IconName },
  { label: "Notificação",     icon: "bell"     as IconName },
  { label: "Exportar Relatório", icon: "external" as IconName },
];

const topPlans = [
  { name: "Vision Pro",    revenue: 98732, pct: 55.3 },
  { name: "Vision Elite",  revenue: 58924, pct: 33.0 },
  { name: "Vision Legacy", revenue: 17842, pct: 10.0 },
  { name: "Vision Free",   revenue: 9398,  pct: 5.3 },
];

const topProducts = [
  { t: "Curso: IA para Negócios",        v: 24832, s: 243 },
  { t: "E-book: Mentalidade Visionária", v: 15420, s: 186 },
  { t: "Template: Plano de Negócios",    v: 8950,  s: 112 },
  { t: "Mentoria Premium",              v: 6461,  s: 13 },
];

const services = ["Supabase", "API IA (Gemini)", "Discord Bot", "Email (Resend)", "Pagamentos"];

/* ─── Components ──────────────────────────────────────── */
function KpiCard({ label, value, change, icon, color, up = true }: {
  label: string; value: string; change: string; icon: IconName; color: string; up?: boolean;
}) {
  const C = Icon[icon];
  return (
    <div className="card-hover relative overflow-hidden rounded-2xl border border-white/8 bg-secondary/50 p-5 transition">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${color}1a` }}>
          <C className="h-4 w-4" style={{ color }} />
        </div>
      </div>
      <p className="mt-2 text-2xl font-extrabold tabular">{value}</p>
      <p className={`mt-0.5 flex items-center gap-1 text-[11px] font-semibold ${up ? "text-success" : "text-danger"}`}>
        {up ? <Icon.arrowUp className="h-3 w-3" /> : <Icon.trendingDown className="h-3 w-3" />} {change}
      </p>
      <div className="absolute -right-6 -bottom-6 h-20 w-20 opacity-30">
        <ResponsiveContainer>
          <LineChart data={revenueData.slice(0, 8)}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Admin() {
  return (
    <AdminLayout>
      {/* ── KPI Grid ── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* ── Revenue + Plans + Activity ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-12">
        {/* Revenue */}
        <Card className="xl:col-span-5" dark>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Receita (MRR) — 30 dias</h3>
              <p className="text-[11px] text-white/45">Crescimento contínuo desde abril</p>
            </div>
            <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-dark px-2 py-1 text-[11px] text-white/60">
              30 dias <Icon.chevronDown className="h-3 w-3" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-gold tabular">R$ 178.438,75</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-success">
            <Icon.arrowUp className="h-3 w-3" /> +24.6% vs período anterior
          </div>
          <div className="mt-2 h-48">
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7c5cfc" stopOpacity={.45} />
                    <stop offset="1" stopColor="#7c5cfc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#ffffff40" }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "#ffffff40" }} axisLine={false} tickLine={false} width={42} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Area type="monotone" dataKey="v" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#adminRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Plans */}
        <Card className="xl:col-span-4" dark>
          <h3 className="mb-4 font-bold">Usuários por Plano</h3>
          <div className="flex items-center gap-4">
            <div className="relative h-44 w-44 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={plansData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3} stroke="none">
                    {plansData.map(p => <Cell key={p.name} fill={p.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold tabular">18.432</span>
                <span className="text-[10px] text-white/45">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              {plansData.map(p => (
                <div key={p.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="flex-1 text-white/70">{p.name}</span>
                  <span className="tabular font-bold">{p.value.toLocaleString("pt-BR")}</span>
                  <span className="tabular text-[11px] text-white/40 w-12 text-right">{p.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card className="xl:col-span-3" dark>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Atividade</h3>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" /> Ao vivo
            </span>
          </div>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {activity.map((a, i) => {
              const C = Icon[a.icon];
              return (
                <div key={i} className="flex items-start gap-3 rounded-xl p-2 hover:bg-white/5 transition">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${a.color}22` }}>
                    <C className="h-4 w-4" style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate">{a.title}</p>
                    <p className="text-[11px] text-white/40 truncate">{a.sub}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-white/35">{a.time}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── Users + AI + Community + Actions ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-12">
        <Card className="xl:col-span-4" dark>
          <h3 className="mb-4 font-bold">Base de Usuários</h3>
          <div className="h-48">
            <ResponsiveContainer>
              <LineChart data={revenueData.slice(0, 14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#ffffff40" }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#ffffff40" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Line type="monotone" dataKey="v" name="Novos" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="v" name="Ativos" stroke="#00c896" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="xl:col-span-2" dark>
          <h3 className="mb-3 font-bold">Uso da IA</h3>
          <div className="space-y-3">
            {[
              { l: "Mensagens", v: "124.583", d: "+14.2%", c: "#7c5cfc" },
              { l: "Tokens",     v: "45.2M",   d: "+18.7%", c: "#f59e0b" },
              { l: "Custo",      v: "R$ 3.456", d: "+9.8%",  c: "#ff5c7a" },
            ].map(a => (
              <div key={a.l} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <span className="h-2 w-2 rounded-full" style={{ background: a.c }} />
                <div className="flex-1"><p className="text-[11px] text-white/50">{a.l}</p><p className="text-sm font-extrabold tabular">{a.v}</p></div>
                <span className="text-[11px] font-bold text-success">{a.d}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-2" dark>
          <h3 className="mb-3 font-bold">Comunidade</h3>
          <div className="space-y-3">
            {[
              { l: "Discord members", v: "5.432", d: "+12.5%", c: "#5865F2" },
              { l: "Eventos",       v: "32",     d: "+14.3%", c: "#7c5cfc" },
              { l: "Engagement",    v: "68.2%",  d: "+6.7%",  c: "#00c896" },
            ].map(a => (
              <div key={a.l} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <span className="h-2 w-2 rounded-full" style={{ background: a.c }} />
                <div className="flex-1"><p className="text-[11px] text-white/50">{a.l}</p><p className="text-sm font-extrabold tabular">{a.v}</p></div>
                <span className="text-[11px] font-bold text-success">{a.d}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-4" dark>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">Ações Rápidas</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {quickActions.map(q => {
              const C = Icon[q.icon];
              return (
                <button key={q.label} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 p-3 text-[12px] font-semibold text-white/70 hover:border-accent/40 hover:bg-accent/10 hover:text-white transition">
                  <C className="h-4 w-4 text-accent-light" /> {q.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 to-gold/10 p-3">
            <p className="text-[11px] font-bold text-white/60">💡 Dica da IA</p>
            <p className="mt-1 text-sm">O Churn caiu 0.38% esta semana. Considere enviar uma campanha de reengajamento para 432 usuários inativos.</p>
          </div>
        </Card>
      </div>

      {/* ── Bottom: Top plans, products, active users, services ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-12">
        <Card className="xl:col-span-3" dark>
          <h3 className="mb-4 font-bold">Top Planos por Receita</h3>
          <div className="space-y-3">
            {topPlans.map((p, i) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold">{p.name}</span>
                  <span className="tabular text-white/70">R$ {p.revenue.toLocaleString("pt-BR")}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-2 rounded-full progress-animated" style={{ width: `${p.pct}%`, background: ["#7c5cfc", "#00c896", "#d4af37", "#3b82f6"][i] }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-3" dark>
          <h3 className="mb-4 font-bold">Produtos do Marketplace</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.t} className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-white/5 transition">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-[11px] font-extrabold tabular">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">{p.t}</p>
                  <p className="text-[11px] text-white/45">{p.s} vendas</p>
                </div>
                <span className="tabular text-[13px] font-bold text-gold">R$ {(p.v / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-3" dark>
          <h3 className="mb-4 font-bold">Usuários mais Ativos</h3>
          <div className="space-y-2.5">
            {[
              { n: "Maria Souza",   p: "Elite",  s: 2856 },
              { n: "João Silva",    p: "Pro",    s: 2453 },
              { n: "Lucas Almeida", p: "Pro",    s: 2301 },
              { n: "Ana Oliveira",  p: "Elite",  s: 2128 },
              { n: "Pedro Martins", p: "Pro",    s: 1987 },
            ].map(u => (
              <div key={u.n} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-white/5 transition">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-gold text-xs font-extrabold text-dark">
                  {u.n.split(" ").map(s => s[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">{u.n}</p>
                  <Badge color={u.p === "Elite" ? "gold" : "accent"}>{u.p}</Badge>
                </div>
                <span className="tabular font-extrabold text-gold">{u.s.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-3" dark>
          <h3 className="mb-4 font-bold">Status dos Serviços</h3>
          <p className="mb-3 text-[11px] text-white/45">Todos os sistemas operacionais</p>
          <div className="space-y-2.5">
            {services.map(s => (
              <div key={s} className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="flex-1 text-sm text-white/75">{s}</span>
                <span className="text-[11px] font-bold text-success">● Online</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
