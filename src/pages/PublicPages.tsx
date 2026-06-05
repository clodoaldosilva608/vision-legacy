import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Icon, type IconName } from "../components/icons";
import { Badge } from "../components/ui";

/* ========== NAV SHARED ========== */
function PublicNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/"><Logo size={32} /></Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {[["/","Início"],["/pricing","Planos"],["/blog","Blog"],["/comunidade","Comunidade"],["/sobre","Sobre"]].map(([h, l]) => (
            <a key={l} href={h} className="text-sm font-medium text-white/70 hover:text-white">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/ajuda" className="hidden text-sm font-medium text-white/70 hover:text-white sm:block">Ajuda</Link>
          <Link to="/login" className="text-sm font-semibold text-white/80 hover:text-white">Entrar</Link>
          <Link to="/onboarding" className="gold-gradient rounded-xl px-4 py-2 text-sm font-bold text-dark hover:brightness-110">Começar agora</Link>
        </div>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-darker">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo size={32} />
          <p className="mt-4 max-w-xs text-sm text-white/50">Plataforma AI-First de crescimento pessoal, negócios e construção de legado.</p>
          <div className="mt-5 flex gap-3 text-white/50">
            {["globe","play","message","users"].map(i => { const C = Icon[i as keyof typeof Icon]; return <C key={i} className="h-5 w-5" />;})}
          </div>
        </div>
        {[
          ["Plataforma", [
            { l: "Recursos",     h: "/#recursos" },
            { l: "Planos",       h: "/pricing"  },
            { l: "Universidade", h: "/sobre"    },
            { l: "IA Mentora",   h: "/dashboard/ia" },
            { l: "Numerologia",  h: "/dashboard/numerologia" },
          ]],
          ["Empresa", [
            { l: "Sobre nós",    h: "/sobre" },
            { l: "Blog",         h: "/blog"  },
            { l: "Contato",      h: "/contato" },
            { l: "Status",       h: "/status" },
          ]],
          ["Suporte", [
            { l: "Central de Ajuda", h: "/ajuda" },
            { l: "Comunidade",       h: "/comunidade" },
            { l: "Termos de Uso",    h: "/termos" },
            { l: "Privacidade/LGPD", h: "/lgpd" },
            { l: "Recuperar senha",  h: "/recuperar-senha" },
          ]],
        ].map(([t, items]) => (
          <div key={t as string}>
            <h4 className="text-sm font-bold text-white">{t as string}</h4>
            <ul className="mt-4 space-y-2.5">{(items as {l: string; h: string}[]).map(it => <li key={it.l}><a href={it.h} className="text-sm text-white/50 hover:text-white">{it.l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">© 2026 Vision Legacy™. Todos os direitos reservados.</div>
    </footer>
  );
}

/* ========== SOBRE ========== */
export function SobrePage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-5xl px-5 py-20 text-center">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">NOSSA HISTÓRIA</span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">Uma plataforma para transformar <span className="text-gold-gradient">vidas</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">Vision Legacy™ nasceu da crença de que autoconhecimento + IA + comunidade podem gerar transformações exponenciais.</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Missão", d: "Capacitar milhões de pessoas a transformar autoconhecimento em crescimento, patrimônio e legado." },
            { t: "Visão", d: "Tornar-se a principal plataforma global de desenvolvimento humano impulsionada por IA." },
            { t: "Valores", d: "Crescimento contínuo, responsabilidade, liberdade, prosperidade, legado e comunidade." },
          ].map(s => (
            <div key={s.t} className="rounded-3xl border border-white/10 bg-secondary/40 p-8">
              <h3 className="text-xl font-extrabold text-gold">{s.t}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-accent/30 bg-gradient-to-r from-accent/10 to-gold/10 p-10">
          <h2 className="text-3xl font-extrabold">O Vision Method™</h2>
          <p className="mt-3 max-w-2xl text-white/60">Nosso framework proprietário de 6 pilares que combina autoconhecimento, IA estratégica e execução.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-6">
            {[["V","Vision","Visão de futuro"],["I","Identity","Quem você é"],["S","Strategy","Planejamento"],["I","Intelligence","Conhecimento + IA"],["O","Opportunity","Negócios"],["N","Navigation","Execução"]].map(([l, t, d]) => (
              <div key={l} className="rounded-2xl bg-dark/60 p-4">
                <p className="text-3xl font-extrabold text-gold">{l}</p>
                <p className="mt-1 text-sm font-bold text-white">{t}</p>
                <p className="text-xs text-white/50">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[["Clodoaldo Silva","Founder & CEO"],["Maria Santos","CTO"],["João Mendes","CMO"],["Ana Oliveira","Head of Community"]].map(([n, r]) => (
            <div key={n} className="rounded-2xl border border-white/10 bg-secondary/30 p-5 text-center">
              <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-br from-accent to-accent-light" />
              <p className="font-bold">{n}</p>
              <p className="text-xs text-white/50">{r}</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

/* ========== BLOG PÚBLICO ========== */
export function BlogPage() {
  const posts = [
    { t: "O Vision Method™: a estrutura por trás da plataforma", c: "Metodologia", date: "22 Mai", views: "12.4k", img: "from-accent to-violet-600" },
    { t: "10 hábitos dos visionários de alto impacto", c: "Lifestyle", date: "20 Mai", views: "8.4k", img: "from-emerald-500 to-teal-600" },
    { t: "Como a IA vai transformar seu negócio em 2026", c: "Business", date: "18 Mai", views: "15.1k", img: "from-gold to-amber-600" },
    { t: "Numerologia aplicada: o que seu mapa diz sobre você", c: "Identity", date: "15 Mai", views: "6.8k", img: "from-rose-500 to-pink-600" },
    { t: "Guia definitivo de investimentos para visionários", c: "Wealth", date: "12 Mai", views: "9.2k", img: "from-blue-500 to-indigo-600" },
    { t: "Construindo legado: investindo nas gerações futuras", c: "Legacy", date: "08 Mai", views: "4.1k", img: "from-slate-500 to-slate-700" },
  ];
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">BLOG VISION</span>
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Conhecimento que <span className="text-gold-gradient">transforma</span></h1>
            <p className="mt-3 max-w-xl text-white/60">Artigos sobre autoconhecimento, IA, negócios, finanças e construção de legado.</p>
          </div>
          <div className="relative">
            <Icon.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input placeholder="Buscar artigo..." className="rounded-xl border border-white/10 bg-secondary px-10 py-3 text-sm outline-none focus:border-accent" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <div key={p.t} className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-secondary/30 transition hover:border-accent/40 hover:bg-secondary/50">
              <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${p.img}`}>
                <Icon.doc className="h-10 w-10 text-white/80" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-light">{p.c}</span>
                  <span className="text-[11px] text-white/40">{p.date} · {p.views} views</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-tight">{p.t}</h3>
                <p className="mt-2 text-sm text-white/50">Leia agora. Transforme já.</p>
                <button className="mt-4 flex items-center gap-1 text-sm font-bold text-accent">Ler artigo <Icon.arrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

/* ========== CENTRAL DE AJUDA ========== */
export function AjudaPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Como funciona o teste de 7 dias?", a: "Ao assinar qualquer plano, você tem 7 dias para explorar. Se não quiser continuar, basta cancelar — sem multas e sem perguntas." },
    { q: "Posso cancelar a qualquer momento?", a: "Sim. Cancelamento é instantâneo e você mantém o acesso até o fim do período pago." },
    { q: "A Vision AI usa os meus dados?", a: "Nunca. Seus dados pessoais e numerológicos são privados. A IA usa apenas o contexto da sua própria jornada." },
    { q: "Como funciona o BYOK (Bring Your Own Key)?", a: "Você pode conectar sua própria chave do Gemini, OpenAI, Claude, DeepSeek ou OpenRouter. O consumo vai direto na sua conta — sem sobrecusto da Vision Legacy." },
    { q: "A plataforma é acessível no celular?", a: "Sim! Temos PWA completo com instalação em home screen, além de apps nativos em desenvolvimento." },
    { q: "Vocês têm plano para empresas ou equipes?", a: "Sim. Plano Enterprise com onboarding dedicado, dados privados e licenças em lote. Entre em contato com vendas@visionlegacy.com." },
    { q: "Como funciona o Marketplace?", a: "Em breve, qualquer criador da comunidade poderá vender cursos, e-books, templates e mentorias. A plataforma retém 10%." },
  ];
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Central de Ajuda</h1>
        <p className="mt-4 text-white/60">Tudo o que você precisa saber sobre o Vision Legacy™.</p>
        <div className="relative mx-auto mt-6 max-w-xl">
          <Icon.search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input placeholder="Buscar ajuda..." className="w-full rounded-2xl border border-white/10 bg-secondary px-12 py-4 text-sm outline-none focus:border-accent" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <h2 className="mb-5 text-2xl font-extrabold">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-secondary/40">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                <span className="text-sm font-bold">{f.q}</span>
                <Icon.chevronDown className={`h-4 w-4 shrink-0 text-white/50 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{f.a}</p>}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center">
          <Icon.message className="mx-auto h-8 w-8 text-accent-light" />
          <h3 className="mt-3 text-xl font-bold">Ainda com dúvidas?</h3>
          <p className="mt-1 text-sm text-white/60">Nossa comunidade e equipe estão prontas para te ajudar.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button className="gold-gradient rounded-xl px-5 py-3 text-sm font-bold text-dark">Falar com suporte</button>
            <Link to="/comunidade" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/5">Entrar na comunidade</Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

/* ========== COMUNIDADE PÚBLICA ========== */
export function ComunidadePublicaPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">COMUNIDADE VISION</span>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Uma tribo de <span className="text-gold-gradient">visionários</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">Mais de 12.000 pessoas construindo juntas um legado — no Discord oficial da Vision Legacy™.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="gold-gradient rounded-xl px-6 py-3.5 text-sm font-bold text-dark">Entrar no Discord</button>
          <Link to="/pricing" className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">Ver planos</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-5 md:grid-cols-4">
          {[["12.486","Membros"],["24/7","Ativos"],["32","Eventos/mês"],["8","Cargos automáticos"]].map(([v, l]) => (
            <div key={l} className="rounded-3xl border border-white/10 bg-secondary/40 p-6 text-center">
              <p className="text-4xl font-extrabold text-gold">{v}</p>
              <p className="mt-2 text-sm text-white/60">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "Cargos automáticos por plano", d: "Free, Pro, Elite e Legacy — seu status no Discord acompanha sua assinatura." },
            { t: "Mastermind VIP", d: "Encontros exclusivos com Founder e outros Legacy — networking de alto nível." },
            { t: "Networking global", d: "Visionários do Brasil, Portugal, EUA, Espanha e + de 30 países." },
          ].map(f => (
            <div key={f.t} className="rounded-3xl border border-white/10 bg-secondary/40 p-7">
              <Icon.users className="h-8 w-8 text-accent-light" />
              <h3 className="mt-3 text-lg font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-white/60">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

/* ========== LOGIN ========== */
export function LoginPage() {
  const [isSignup, setSignup] = useState(false);
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
        <Link to="/" className="mx-auto"><Logo size={38} /></Link>
        <h1 className="mt-8 text-center text-3xl font-extrabold">{isSignup ? "Criar sua conta" : "Entrar na plataforma"}</h1>
        <p className="mt-2 text-center text-sm text-white/50">{isSignup ? "Comece a construir seu legado." : "Bem-vindo(a) de volta."}</p>

        <div className="mt-8 space-y-3">
          {["Continuar com Google","Continuar com Discord","Continuar com Apple"].map(p => (
            <button key={p} className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-secondary px-5 py-3.5 text-sm font-bold transition hover:bg-white/5">{p}</button>
          ))}
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-white/40">
          <div className="h-px flex-1 bg-white/10" /> OU <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-3">
          {isSignup && <input placeholder="Nome completo" className="w-full rounded-xl border border-white/15 bg-secondary px-5 py-3.5 text-sm outline-none focus:border-accent" />}
          <input type="email" placeholder="seu@email.com" className="w-full rounded-xl border border-white/15 bg-secondary px-5 py-3.5 text-sm outline-none focus:border-accent" />
          <input type="password" placeholder="Senha" className="w-full rounded-xl border border-white/15 bg-secondary px-5 py-3.5 text-sm outline-none focus:border-accent" />
          <Link to="/dashboard" className="gold-gradient block rounded-xl py-3.5 text-center text-sm font-bold text-dark">{isSignup ? "Criar conta" : "Entrar"}</Link>
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          {isSignup ? "Já tem conta? " : "Não tem conta? "}
          <button onClick={() => setSignup(!isSignup)} className="font-bold text-accent-light hover:text-accent">{isSignup ? "Entrar" : "Criar conta"}</button>
        </p>
      </div>
    </div>
  );
}

/* ========== LGPD / TERMOS ========== */
export function LgpdPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-extrabold">Política de Privacidade & LGPD</h1>
        <p className="mt-2 text-white/50">Última atualização: 23 de maio de 2026</p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/70">
          {[
            { t: "1. Resumo", d: "Sua privacidade é sagrada. A Vision Legacy™ coleta apenas o mínimo necessário para entregar uma experiência personalizada, e nunca compartilhamos seus dados numerológicos com terceiros." },
            { t: "2. Dados coletados", d: "Nome, email, data de nascimento (apenas para cálculo numerológico), senha, dados de uso e preferências. Se você escolher BYOK, sua chave de IA é armazenada criptografada e nunca é exposta." },
            { t: "3. Uso dos dados", d: "Entregar a plataforma, personalizar sua jornada, comunicar novidades (apenas com consentimento), e gerar insights agregados — nunca individualizados." },
            { t: "4. Seus direitos (LGPD)", d: "A qualquer momento, você pode pedir: acesso aos seus dados, correção, exclusão definitiva, portabilidade ou restrição de uso. Basta enviar email para privacidade@visionlegacy.com." },
            { t: "5. Segurança", d: "Criptografia AES-256, autenticação JWT + OAuth, Row-Level Security no banco, 2FA opcional, logs de auditoria e monitoramento de ameaças em tempo real." },
            { t: "6. Cookies", d: "Usamos cookies essenciais e analíticos. Você pode desativar não-essenciais no seu primeiro acesso. Respeitamos DNT (Do Not Track)." },
            { t: "7. Contato", d: "Controlador de dados: Vision Legacy Tech Ltda. Encarregado LGPD: privacidade@visionlegacy.com" },
          ].map(s => (
            <div key={s.t}>
              <h2 className="text-lg font-bold text-white">{s.t}</h2>
              <p className="mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

/* ========== 404 ========== */
/* ========== RECUPERAR SENHA ========== */
export function RecuperarSenhaPage() {
  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto block w-fit"><Logo size={36}/></Link>
        <h1 className="mt-8 text-center text-3xl font-extrabold">Recuperar senha</h1>
        <p className="mt-2 text-center text-sm text-white/55">Digite seu email. Enviaremos um link para redefinir.</p>
        <div className="mt-6 space-y-3">
          <input type="email" placeholder="seu@email.com" className="w-full rounded-xl border border-white/12 bg-secondary/60 px-5 py-3.5 text-sm outline-none focus:border-accent focus:bg-secondary"/>
          <Link to="/login" className="gold-gradient block rounded-xl py-3.5 text-center text-sm font-extrabold text-dark shadow-lg shadow-gold/20 hover:brightness-110 transition">
            Enviar link
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-white/50">Lembrou? <Link to="/login" className="text-accent-light font-bold hover:underline">Entrar</Link></p>
      </div>
    </div>
  );
}

/* ========== CONTATO ========== */
export function ContatoPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-extrabold">Fale com a gente</h1>
        <p className="mt-3 text-white/60">Responderemos em até 24h úteis.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { icon: "message" as IconName, t: "Suporte geral", v: "suporte@visionlegacy.com" },
            { icon: "dollar"  as IconName, t: "Parcerias",    v: "parcerias@visionlegacy.com" },
            { icon: "users"   as IconName, t: "Imprensa",     v: "imprensa@visionlegacy.com" },
          ].map((c) => { const C = Icon[c.icon]; return (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-secondary/40 p-5 text-center">
              <C className="mx-auto h-6 w-6 text-accent"/>
              <p className="mt-3 font-bold">{c.t}</p>
              <p className="mt-1 text-sm text-white/60">{c.v}</p>
            </div>
          );})}
        </div>
        <form className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-secondary/40 p-6 sm:grid-cols-2">
          <input placeholder="Nome" className="rounded-xl border border-white/12 bg-dark px-4 py-3 text-sm outline-none focus:border-accent"/>
          <input placeholder="Email" type="email" className="rounded-xl border border-white/12 bg-dark px-4 py-3 text-sm outline-none focus:border-accent"/>
          <input placeholder="Assunto" className="rounded-xl border border-white/12 bg-dark px-4 py-3 text-sm outline-none focus:border-accent sm:col-span-2"/>
          <textarea placeholder="Mensagem" rows={6} className="rounded-xl border border-white/12 bg-dark px-4 py-3 text-sm outline-none focus:border-accent sm:col-span-2"/>
          <button type="button" className="gold-gradient rounded-xl py-3 text-sm font-extrabold text-dark shadow-lg shadow-gold/20 sm:col-span-2">Enviar mensagem</button>
        </form>
      </section>
      <PublicFooter/>
    </div>
  );
}

/* ========== TERMOS DE USO ========== */
export function TermosPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-extrabold">Termos de Uso</h1>
        <p className="mt-2 text-white/50">Última atualização: 23/05/2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
          {[
            { t: "1. Aceitação", d: "Ao acessar a Vision Legacy™, você concorda com estes termos." },
            { t: "2. Uso permitido", d: "Você se compromete a não usar a plataforma para fins ilegais, spam ou que violem direitos de terceiros." },
            { t: "3. Propriedade intelectual", d: "Todo o conteúdo é de titularidade da Vision Legacy™ ou licenciado. Reprodução proibida sem autorização." },
            { t: "4. Contas e assinaturas", d: "Você é responsável pela sua conta. Compartilhar credenciais é proibido." },
            { t: "5. Garantia", d: "Oferecemos 7 dias de garantia. A Vision AI™ pode cometer erros — use seu julgamento." },
            { t: "6. Rescisão", d: "Podemos suspender contas que violem estes termos ou coloquem a plataforma em risco." },
          ].map(s => (
            <div key={s.t}>
              <h2 className="text-lg font-bold text-white">{s.t}</h2>
              <p className="mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter/>
    </div>
  );
}

/* ========== STATUS ========== */
export function StatusPage() {
  const systems = [
    { n: "Plataforma (App)",    s: "Operacional", c: "#00c896", lat: "142ms" },
    { n: "API Gateway",         s: "Operacional", c: "#00c896", lat: "89ms" },
    { n: "Vision AI™ (Gemini)", s: "Operacional", c: "#00c896", lat: "312ms" },
    { n: "Discord Bot",         s: "Operacional", c: "#00c896", lat: "210ms" },
    { n: "Email (Resend)",      s: "Operacional", c: "#00c896", lat: "45ms" },
    { n: "Pagamentos (Stripe)", s: "Operacional", c: "#00c896", lat: "180ms" },
    { n: "CDN (Storage)",       s: "Degradação",  c: "#f59e0b", lat: "1.2s" },
  ];
  return (
    <div className="min-h-screen bg-dark text-white">
      <PublicNav />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-success opacity-75"/><span className="relative inline-flex h-3 w-3 rounded-full bg-success"/></span>
          <h1 className="text-3xl font-extrabold">Todos os sistemas operacionais</h1>
        </div>
        <p className="mt-1 text-sm text-white/50">Última checagem: há 2 minutos</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-secondary/40">
          {systems.map((s, i) => (
            <div key={s.n} className={`flex items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-white/5" : ""}`}>
              <span className="h-2 w-2 rounded-full" style={{ background: s.c }}/>
              <span className="flex-1 font-semibold">{s.n}</span>
              <span className="text-xs text-white/40 tabular">{s.lat}</span>
              <span className="w-24 text-right"><Badge color={s.c === "#00c896" ? "success" : "gold"}>{s.s}</Badge></span>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-bold">Uptime — últimos 90 dias</h2>
          <div className="mt-4 grid grid-cols-[repeat(30,1fr)] gap-1">
            {Array.from({ length: 90 }).map((_, i) => {
              const op = Math.random();
              const bg = op > 0.99 ? "#f59e0b" : op > 0.95 ? "#00c896" : "#00c896";
              return <div key={i} title={`${i+1} dias atrás · ${op > 0.95 ? "uptime 100%" : "uptime 99%"}`} className="h-8 rounded-sm" style={{ background: bg, opacity: 0.2 + op * 0.8 }} />;
            })}
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  );
}

/* ========== CONECTAR DISCORD (mock) ========== */
export function ConectarDiscordPage() {
  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-secondary/60 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5865F2] shadow-lg shadow-[#5865F2]/30">
          <Icon.discord className="h-9 w-9 text-white"/>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold">Conectar Discord</h1>
        <p className="mt-2 text-sm text-white/55">Autorize o Vision Legacy a sincronizar seu perfil, cargos e atividade.</p>
        <div className="mt-6 space-y-2 text-left rounded-2xl bg-dark/60 p-5 text-sm">
          {["Ler seu usuário e cargos","Enviar mensagens de sistema","Adicionar cargos automaticamente","Ler eventos da comunidade"].map(p => (
            <div key={p} className="flex items-center gap-2 text-white/70"><Icon.check className="h-4 w-4 text-success"/>{p}</div>
          ))}
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/dashboard" className="rounded-xl border border-white/15 px-6 py-2.5 text-sm font-semibold hover:bg-white/5 transition">Cancelar</Link>
          <Link to="/dashboard/comunidade" className="rounded-xl bg-[#5865F2] px-6 py-2.5 text-sm font-extrabold shadow-lg shadow-[#5865F2]/30 hover:brightness-110 transition">Autorizar</Link>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-5 text-center text-white">
      <p className="text-gold-gradient text-8xl font-extrabold sm:text-9xl">404</p>
      <h1 className="mt-2 text-3xl font-extrabold">Esta página ainda é um sonho</h1>
      <p className="mt-3 max-w-md text-white/60">Você está no caminho certo — mas aqui não tem nada por enquanto. Que tal voltar para sua jornada?</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="gold-gradient rounded-xl px-6 py-3 text-sm font-bold text-dark">Ir para o início</Link>
        <Link to="/dashboard" className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/5">Meu dashboard</Link>
      </div>
    </div>
  );
}
