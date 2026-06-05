import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge, Tabs } from "../../components/ui";
import { Icon } from "../../components/icons";

/* ============================================
   CONFIGURAÇÕES
   ============================================ */
export function AdminConfigPage() {
  const [tab, setTab] = useState("Geral");
  return (
    <AdminLayout>
      <AdminPageHeader title="Configurações" subtitle="Configurações gerais da plataforma." action={<Btn variant="gold" icon="check">Salvar alterações</Btn>} />
      <Tabs items={["Geral","Branding","Integrações","Email","Pagamentos","Segurança"]} active={tab} onChange={setTab} dark />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Identidade da plataforma" dark>
          <div className="space-y-4">
            {[
              { l: "Nome da plataforma", v: "Vision Legacy™" },
              { l: "Slogan", v: "Lifestyle • Business • Vision 🚀" },
              { l: "URL primária", v: "https://visionlegacy.com" },
              { l: "Email de suporte", v: "suporte@visionlegacy.com" },
              { l: "CNPJ", v: "00.000.000/0001-00" },
            ].map(f => (
              <div key={f.l}>
                <label className="text-xs font-semibold text-white/50">{f.l}</label>
                <input defaultValue={f.v} className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2 text-sm focus:border-accent outline-none" />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Idiomas e mercados" dark>
          <div className="space-y-3">
            {[
              { l: "PT-BR (Português Brasil)", active: true, default: true },
              { l: "EN-US (English US)", active: true, default: false },
              { l: "ES (Español)", active: true, default: false },
              { l: "FR-FR (Français)", active: false, default: false },
            ].map(l => (
              <div key={l.l} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
                <span className="flex-1 font-semibold">{l.l}</span>
                {l.default && <Badge color="gold">Padrão</Badge>}
                <button className={`h-6 w-11 rounded-full p-0.5 transition ${l.active ? "bg-accent" : "bg-white/10"}`}>
                  <span className={`block h-5 w-5 rounded-full bg-white transition ${l.active ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          <h4 className="mt-5 mb-2 text-sm font-bold">Integrações ativas</h4>
          <div className="space-y-2">
            {[
              { n: "Supabase", s: "Conectado", c: "#00c896" },
              { n: "Stripe", s: "Conectado", c: "#7c5cfc" },
              { n: "Mercado Pago", s: "Conectado", c: "#3b82f6" },
              { n: "Discord OAuth", s: "Conectado", c: "#5865F2" },
              { n: "Resend (Email)", s: "Conectado", c: "#d4af37" },
            ].map(i => (
              <div key={i.n} className="flex items-center gap-3 rounded-xl border border-white/5 p-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: i.c }} />
                <span className="flex-1 text-sm font-semibold">{i.n}</span>
                <Badge color="success">{i.s}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

/* ============================================
   EQUIPE
   ============================================ */
const team = [
  { name: "Clodoaldo Silva", email: "clodoaldo@vl.com", role: "Super Admin", access: "Total", color: "gold" },
  { name: "Maria Santos", email: "maria@vl.com", role: "Admin", access: "Total", color: "accent" },
  { name: "João Editor", email: "joao@vl.com", role: "Editor", access: "Conteúdo + CMS", color: "blue" },
  { name: "Ana Mentora", email: "ana@vl.com", role: "Mentor", access: "Mentoria + CRM", color: "success" },
  { name: "Carlos Mod", email: "carlos@vl.com", role: "Moderador", access: "Comunidade", color: "accent" },
  { name: "Lucas Suporte", email: "lucas@vl.com", role: "Suporte", access: "Tickets + Users", color: "slate" },
];

export function AdminEquipePage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Equipe & Permissões" subtitle="Gestão de papéis administrativos." action={<Btn variant="gold" icon="users">Convidar membro</Btn>} />

      <Card dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Membro</th>
              <th className="pb-3 text-left font-medium">Papel</th>
              <th className="pb-3 text-left font-medium">Acesso</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {team.map(m => (
                <tr key={m.email} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-light" /><div><p className="font-semibold">{m.name}</p><p className="text-[11px] text-white/40">{m.email}</p></div></div></td>
                  <td><Badge color={m.color as any}>{m.role}</Badge></td>
                  <td className="text-white/70">{m.access}</td>
                  <td className="text-right"><div className="flex justify-end gap-1">
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-danger"><Icon.ban className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Matriz de permissões" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Permissão</th>
              {["Super Admin","Admin","Editor","Mentor","Moderador","Suporte"].map(r => <th key={r} className="pb-3 text-center font-medium">{r}</th>)}
            </tr></thead>
            <tbody>
              {[
                { p: "Gerenciar usuários", v: [1,1,0,0,0,1] },
                { p: "Configurar IA", v: [1,1,0,0,0,0] },
                { p: "CMS / Cursos", v: [1,1,1,0,0,0] },
                { p: "CRM / Vendas", v: [1,1,0,1,0,1] },
                { p: "Discord", v: [1,1,0,0,1,0] },
                { p: "Financeiro", v: [1,1,0,0,0,0] },
                { p: "Logs / Auditoria", v: [1,1,0,0,0,0] },
                { p: "Backups", v: [1,0,0,0,0,0] },
              ].map(r => (
                <tr key={r.p} className="border-b border-white/5">
                  <td className="py-2 font-semibold">{r.p}</td>
                  {r.v.map((x, i) => (
                    <td key={i} className="py-2 text-center">{x ? <Icon.check className="mx-auto h-4 w-4 text-success" /> : <span className="text-white/20">—</span>}</td>
                  ))}
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
   LOGS / AUDITORIA
   ============================================ */
const logs = [
  { time: "23/05 14:32:08", user: "Clodoaldo Silva", action: "Editou prompt mestre da IA", level: "warning" },
  { time: "23/05 14:18:42", user: "Maria Santos", action: "Suspendeu usuário ricardo@email.com", level: "danger" },
  { time: "23/05 13:55:21", user: "Sistema", action: "Backup automático concluído (2.4 GB)", level: "info" },
  { time: "23/05 13:42:08", user: "João Editor", action: "Publicou curso 'Liderança Visionária'", level: "success" },
  { time: "23/05 12:18:42", user: "Sistema", action: "Pagamento processado: R$ 297,00 (Pedro M.)", level: "info" },
  { time: "23/05 11:55:21", user: "Sistema", action: "Falha temporária API Gemini — recuperado em 12s", level: "warning" },
  { time: "23/05 10:42:08", user: "Carlos Mod", action: "Aplicou ban no Discord: spammer#1234", level: "danger" },
  { time: "23/05 10:18:42", user: "Ana Mentora", action: "Iniciou mentoria com Lucas Almeida", level: "success" },
];

export function AdminLogsPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Logs & Auditoria" subtitle="Rastreamento completo de ações administrativas." action={<Btn variant="gold" icon="doc">Exportar logs</Btn>} />

      <div className="mb-5 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
          <p className="text-xs text-white/50">Eventos (24h)</p>
          <p className="text-2xl font-extrabold">2.418</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
          <p className="text-xs text-white/50">Alertas críticos</p>
          <p className="text-2xl font-extrabold text-danger">3</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
          <p className="text-xs text-white/50">Ações administrativas</p>
          <p className="text-2xl font-extrabold">142</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
          <p className="text-xs text-white/50">Status do sistema</p>
          <p className="text-2xl font-extrabold text-success">100%</p>
        </div>
      </div>

      <Card title="Stream de eventos" dark>
        <div className="space-y-1 font-mono text-xs">
          {logs.map((l, i) => (
            <div key={i} className="flex items-center gap-3 rounded px-2 py-2 hover:bg-white/5">
              <span className="text-white/40">{l.time}</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                l.level === "danger" ? "bg-danger/20 text-danger" :
                l.level === "warning" ? "bg-amber-500/20 text-amber-400" :
                l.level === "success" ? "bg-success/20 text-success" :
                "bg-accent/20 text-accent"
              }`}>{l.level.toUpperCase()}</span>
              <span className="text-accent-light">{l.user}</span>
              <span className="flex-1 text-white/80">{l.action}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   NOTIFICAÇÕES
   ============================================ */
export function AdminNotificacoesPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Notificações" subtitle="Push, email, Discord e campanhas segmentadas." action={<Btn variant="gold" icon="bell">Nova campanha</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Enviadas (mês)</p><p className="text-xl font-extrabold">184.218</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Taxa de abertura</p><p className="text-xl font-extrabold text-success">68.4%</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Taxa de clique</p><p className="text-xl font-extrabold text-accent">24.1%</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Campanhas ativas</p><p className="text-xl font-extrabold">12</p></div>
      </div>

      <Card title="Campanhas recentes" className="mt-5" dark>
        <div className="space-y-2">
          {[
            { t: "Lançamento Curso IA", c: "Email + Push", target: "8.421 usuários", open: "72%", status: "Concluída" },
            { t: "Mastermind hoje 20h", c: "Push + Discord", target: "Vision Pro+", open: "84%", status: "Em curso" },
            { t: "Reativação 30d", c: "Email", target: "Inativos", open: "32%", status: "Em curso" },
            { t: "Black Friday 2026", c: "Email + Push", target: "Todos", open: "—", status: "Agendada" },
          ].map(c => (
            <div key={c.t} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <Icon.bell className="h-5 w-5 text-accent" />
              <div className="flex-1"><p className="font-semibold">{c.t}</p><p className="text-xs text-white/40">{c.c} · {c.target}</p></div>
              <span className="text-sm text-success">Open {c.open}</span>
              <Badge color={c.status === "Concluída" ? "success" : c.status === "Em curso" ? "accent" : "gold"}>{c.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   BACKUPS
   ============================================ */
export function AdminBackupsPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Backups" subtitle="Backups automáticos diários · retenção de 30 dias." action={<Btn variant="gold" icon="database">Fazer backup agora</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Último backup</p><p className="text-xl font-extrabold text-success">há 3h</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Tamanho total</p><p className="text-xl font-extrabold">72.4 GB</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Backups armazenados</p><p className="text-xl font-extrabold">30</p></div>
        <div className="rounded-2xl border border-white/8 bg-secondary/50 p-4"><p className="text-xs text-white/50">Status</p><p className="text-xl font-extrabold text-success">Saudável</p></div>
      </div>

      <Card title="Histórico de backups" className="mt-5" dark>
        <div className="space-y-1">
          {Array.from({length: 8}, (_, i) => ({ d: `${23-i}/05/2026 ${["02","02","02","02","02","02","02","02"][i]}:00`, size: `${(2.4 - i*0.02).toFixed(2)} GB`, status: i === 0 ? "Atual" : "OK" })).map(b => (
            <div key={b.d} className="flex items-center gap-3 rounded-xl border border-white/5 p-3 hover:bg-white/5">
              <Icon.database className="h-5 w-5 text-accent" />
              <div className="flex-1"><p className="font-semibold">{b.d}</p><p className="text-xs text-white/40">Banco completo + Storage</p></div>
              <span className="text-sm text-white/60">{b.size}</span>
              <Badge color={b.status === "Atual" ? "gold" : "success"}>{b.status}</Badge>
              <Btn variant="ghost" icon="external">Restaurar</Btn>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
