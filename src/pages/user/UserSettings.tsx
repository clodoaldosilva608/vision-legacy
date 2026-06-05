import { useState } from "react";
import { UserLayout } from "../../components/UserLayout";
import { Card, Btn, Badge } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";

type Tab = "perfil" | "seguranca" | "preferencias" | "billing" | "ia";

export default function UserSettings() {
  const [tab, setTab] = useState<Tab>("perfil");

  const tabs: { id: Tab; label: string; icon: IconName }[] = [
    { id: "perfil",       label: "Perfil",       icon: "user" as IconName },
    { id: "seguranca",    label: "Segurança",    icon: "shield" as IconName },
    { id: "preferencias", label: "Preferências", icon: "settings" as IconName },
    { id: "billing",      label: "Pagamentos",   icon: "card" as IconName },
    { id: "ia",           label: "IA (BYOK)",    icon: "sparkles" as IconName },
  ];

  return (
    <UserLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500">Personalize sua experiência no Vision Legacy™.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        {/* Sidebar tabs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 h-fit">
          <nav className="space-y-0.5">
            {tabs.map(t => {
              const C = Icon[t.icon];
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition
                    ${tab === t.id ? "bg-accent text-white shadow shadow-accent/20" : "text-slate-600 hover:bg-slate-50"}`}>
                  <C className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {tab === "perfil" && <ProfileTab />}
          {tab === "seguranca" && <SecurityTab />}
          {tab === "preferencias" && <PreferencesTab />}
          {tab === "billing" && <BillingTab />}
          {tab === "ia" && <IATab />}
        </div>
      </div>
    </UserLayout>
  );
}

/* ─── Profile ─────────────────────────────────────────────────── */
function ProfileTab() {
  return (
    <>
      <Card>
        <h3 className="mb-4 font-bold text-slate-800">Foto de perfil</h3>
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-gold text-3xl font-extrabold text-dark shadow-lg shadow-accent/20">
            CS
          </div>
          <div className="flex gap-2">
            <Btn variant="primary" icon="edit">Enviar foto</Btn>
            <Btn variant="ghost">Remover</Btn>
          </div>
        </div>
      </Card>

      <Card title="Informações pessoais">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Nome completo", "Clodoaldo Silva"],
            ["Nome exibido",   "Clodoaldo"],
            ["Email",           "clodoaldo@visionlegacy.com"],
            ["Telefone",        "+55 (11) 98765-4321"],
          ].map(([l, v]) => (
            <div key={l}>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">{l}</label>
              <input defaultValue={v} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-bold text-slate-500">Bio</label>
          <textarea defaultValue="Fundador do Vision Legacy™. Apaixonado por IA, autoconhecimento e construção de legado."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" rows={3} />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Btn variant="secondary" icon="close">Cancelar</Btn>
          <Btn variant="gold" icon="check">Salvar alterações</Btn>
        </div>
      </Card>
    </>
  );
}

/* ─── Security ────────────────────────────────────────────────── */
function SecurityTab() {
  return (
    <>
      <Card title="Senha">
        <p className="mb-4 text-sm text-slate-500">Altere sua senha a cada 90 dias para manter sua conta segura.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Senha atual", "Nova senha", "Confirmar senha"].map(l => (
            <div key={l} className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-bold text-slate-500">{l}</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
            </div>
          ))}
        </div>
        <Btn variant="primary" icon="shield" className="mt-4">Atualizar senha</Btn>
      </Card>

      <Card title="Autenticação de dois fatores">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Icon.shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-bold text-slate-800">2FA está ativo</p>
              <p className="text-sm text-slate-500">Usando aplicativo autenticador (Google Authenticator).</p>
            </div>
          </div>
          <Btn variant="secondary">Gerenciar</Btn>
        </div>
      </Card>

      <Card title="Sessões ativas">
        <div className="space-y-2">
          {[
            { d: "Chrome · Windows · São Paulo, BR", cur: true, time: "Agora" },
            { d: "Safari · iPhone 15 · São Paulo, BR",  cur: false, time: "há 2h" },
            { d: "Discord · Mobile · Rio de Janeiro, BR", cur: false, time: "há 1d" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.cur ? "bg-success/10" : "bg-slate-100"}`}>
                <Icon.globe className={`h-5 w-5 ${s.cur ? "text-success" : "text-slate-400"}`} />
              </div>
              <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{s.d}</p><p className="text-xs text-slate-400">{s.time}</p></div>
              {s.cur ? <Badge color="success">Sessão atual</Badge> : <button className="text-xs font-bold text-danger hover:underline">Encerrar</button>}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

/* ─── Preferences ─────────────────────────────────────────────── */
function PreferencesTab() {
  return (
    <>
      <Card title="Idioma e região">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Idioma</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm">
              <option>Português (BR)</option><option>English (US)</option><option>Español</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Fuso horário</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm">
              <option>(UTC-3) Brasilia</option><option>(UTC-5) New York</option><option>(UTC+0) London</option>
            </select>
          </div>
        </div>
      </Card>

      <Card title="Aparência">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { l: "Claro", c: "from-slate-100 to-white", s: false },
            { l: "Escuro", c: "from-slate-800 to-slate-900", s: true },
            { l: "Sistema", c: "from-slate-100 via-slate-900 to-white", s: false },
          ].map(t => (
            <button key={t.l} className={`rounded-xl border-2 p-4 text-left transition ${t.s ? "border-accent" : "border-slate-200 hover:border-slate-300"}`}>
              <div className={`mb-3 h-16 rounded-lg bg-gradient-to-br ${t.c}`} />
              <p className="text-sm font-semibold text-slate-800">{t.l}</p>
              {t.s && <Badge color="accent">Selecionado</Badge>}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Notificações">
        <div className="space-y-3">
          {[
            { l: "Email — Novidades e promoções",   s: true  },
            { l: "Email — Resumo semanal",          s: true  },
            { l: "Push — Missões diárias",           s: true  },
            { l: "Discord — Menções",                s: true  },
            { l: "Marketing de parceiros",           s: false },
          ].map(n => (
            <div key={n.l} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span className="text-sm font-semibold text-slate-700">{n.l}</span>
              <button className={`relative h-6 w-11 rounded-full transition ${n.s ? "bg-accent" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${n.s ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

/* ─── Billing ─────────────────────────────────────────────────── */
function BillingTab() {
  return (
    <>
      <Card title="Plano atual">
        <div className="rounded-2xl bg-gradient-to-r from-accent/10 to-gold/10 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Plano</p>
            <p className="text-2xl font-extrabold text-slate-900">Vision Pro</p>
            <p className="text-sm text-slate-500">Próxima cobrança: 15/06/2026 · R$ 29,90/mês</p>
          </div>
          <Btn variant="gold" icon="crown">Upgrade para Elite</Btn>
        </div>
      </Card>

      <Card title="Método de pagamento">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold">VISA</div>
            <div>
              <p className="font-bold text-slate-800">•••• •••• •••• 4242</p>
              <p className="text-xs text-slate-400">Titular: Clodoaldo Silva · Expira 12/28</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge color="success">Principal</Badge>
            <Btn variant="secondary" icon="edit">Editar</Btn>
          </div>
        </div>
      </Card>

      <Card title="Histórico de pagamentos">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-400">
              <th className="pb-3 font-semibold">Data</th><th className="pb-3 font-semibold">Descrição</th><th className="pb-3 font-semibold">Valor</th><th className="pb-3 font-semibold">Status</th>
            </tr></thead>
            <tbody>
              {[
                ["15/05/2026", "Vision Pro — Mensal",  "R$ 29,90", "Pago",       true ],
                ["15/04/2026", "Vision Pro — Mensal",  "R$ 29,90", "Pago",       true ],
                ["15/03/2026", "Vision Pro — Mensal",  "R$ 29,90", "Pago",       true ],
                ["15/02/2026", "Vision Pro — Mensal",  "R$ 29,90", "Estornado",  false],
              ].map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-3 text-slate-500">{r[0]}</td>
                  <td className="py-3 font-semibold text-slate-700">{r[1]}</td>
                  <td className="py-3 font-bold text-slate-800">{r[2]}</td>
                  <td className="py-3"><Badge color={r[4] ? "success" : "danger"}>{r[3]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/* ─── BYOK / IA ───────────────────────────────────────────────── */
function IATab() {
  const providers = [
    { n: "Google Gemini", k: "••••••••••••••••4f8a", s: "Ativo",  c: "#4285F4" },
    { n: "OpenAI",       k: "••••••••••••••••7s2m", s: "Ativo",  c: "#10A37F" },
    { n: "Anthropic Claude", k: "••••••••••••••••9k3d", s: "Ativo", c: "#D97757" },
    { n: "DeepSeek",     k: "Não configurado",       s: "Offline",c: "#7c5cfc" },
  ];
  return (
    <>
      <Card title="API Keys (BYOK)">
        <p className="mb-4 text-sm text-slate-500">Conecte suas próprias chaves de IA. O consumo vai direto na sua conta.</p>
        <div className="space-y-2">
          {providers.map(p => (
            <div key={p.n} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <div className="h-9 w-9 rounded-lg" style={{ background: `${p.c}22` }} />
              <div className="flex-1">
                <p className="font-bold text-slate-800">{p.n}</p>
                <p className="font-mono text-xs text-slate-500">{p.k}</p>
              </div>
              <Badge color={p.s === "Ativo" ? "success" : "slate"}>{p.s}</Badge>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800">Testar</button>
              <button className="text-xs font-bold text-slate-500 hover:text-danger">Remover</button>
            </div>
          ))}
        </div>
        <Btn variant="primary" icon="bolt" className="mt-4">Adicionar chave</Btn>
      </Card>

      <Card title="Modelo padrão">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Modelo</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm">
              <option>Gemini 1.5 Pro</option><option>GPT-4o</option><option>Claude 3.5 Sonnet</option><option>DeepSeek V3</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Temperatura</label>
            <input type="range" min="0" max="100" defaultValue="30" className="w-full accent-accent" />
          </div>
        </div>
      </Card>

      <Card title="Privacidade">
        <div className="space-y-2">
          {[
            { l: "Usar minhas conversas para treinar a Vision AI", s: false },
            { l: "Compartilhar estatísticas anônimas de uso",       s: true  },
            { l: "Persistir memória da IA por mais de 30 dias",     s: true  },
          ].map(n => (
            <div key={n.l} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span className="text-sm font-semibold text-slate-700">{n.l}</span>
              <button className={`relative h-6 w-11 rounded-full transition ${n.s ? "bg-accent" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${n.s ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
