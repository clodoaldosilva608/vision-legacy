import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Icon } from "../components/icons";

const planos = [
  {
    name: "Free", price: 0, period: "/mês", desc: "Começe sua jornada",
    color: "border-white/10 bg-secondary", highlight: false,
    features: [
      "Mapa numerológico completo",
      "Vision Score básico",
      "3 metas ativas",
      "3 hábitos diários",
      "Dashboard pessoal",
      "Comunidade Discord",
      "10 mensagens IA / mês",
    ],
    notIncluded: ["Business Hub", "Wealth Hub", "Universidade", "Certificações"],
    cta: "Começar grátis",
  },
  {
    name: "Pro", price: 29, period: "/mês", desc: "Para quem quer evoluir",
    color: "border-accent bg-accent/10", highlight: true, tag: "MAIS POPULAR",
    features: [
      "Tudo do Free",
      "IA Mentora ilimitada (Vision AI™)",
      "Metas + Hábitos ilimitados",
      "Business & Wealth Hub completo",
      "Vision Board completo",
      "Universidade — 6 cursos",
      "RAG Engine (5GB)",
      "Certificações até Vision Builder",
      "Suporte prioritário",
    ],
    notIncluded: ["Vision Elite masterminds", "Certificações Legacy", "Conta de vendedor"],
    cta: "Assinar Pro",
  },
  {
    name: "Elite", price: 97, period: "/mês", desc: "Aceleração total",
    color: "border-gold/40 bg-gold/10", highlight: false, tag: "PREMIUM",
    features: [
      "Tudo do Pro",
      "Universidade completa (todos os cursos)",
      "Todas as certificações",
      "RAG ilimitado (50GB)",
      "Biblioteca Knowledge Base",
      "Mentorias em grupo (Mastermind)",
      "Workshops exclusivos mensais",
      "Perfil público personalizado",
    ],
    notIncluded: ["Mentoria 1:1", "Conta de vendedor"],
    cta: "Assinar Elite",
  },
  {
    name: "Legacy", price: 297, period: "/mês", desc: "Construindo um império",
    color: "border-gold bg-gradient-to-b from-gold/20 to-secondary", highlight: false, tag: "⚡ LEGACY",
    features: [
      "Tudo do Elite",
      "Mentoria 1:1 com Founder",
      "Mastermind VIP exclusivo",
      "Conta de vendedor no Marketplace",
      "Vision Command Center™",
      "Relatórios executivos",
      "Acesso vitalício a novidades",
      "Cargo LEGACY no Discord",
      "Suporte direto CEO",
    ],
    notIncluded: [],
    cta: "Assinar Legacy",
  },
];

const faqs = [
  { q: "Posso cancelar a qualquer momento?", a: "Sim. Planos mensais podem ser cancelados a qualquer momento. Você mantém o acesso até o fim do período pago." },
  { q: "Qual plano é ideal para mim?", a: "Se você está começando, Pro é perfeito. Se quer acelerar, Elite. Se quer construir um império, Legacy." },
  { q: "Como funciona a garantia?", a: "7 dias de teste — se não gostar, reembolso integral sem perguntas." },
  { q: "Posso usar minha chave de IA?", a: "Sim! Nosso sistema BYOK suporta Gemini, OpenAI, Claude, DeepSeek e OpenRouter." },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/"><Logo size={32} /></Link>
          <nav className="hidden gap-8 lg:flex">{["Recursos", "Universidade", "Comunidade"].map(l => <a key={l} href="#" className="text-sm font-medium text-white/70 hover:text-white">{l}</a>)}</nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm font-semibold text-white/70 hover:text-white">Entrar</Link>
            <Link to="/onboarding" className="gold-gradient rounded-xl px-4 py-2 text-sm font-bold text-dark">Começar agora</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-20 text-center">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">PLANOS PARA CADA FASE DA JORNADA</span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Investir em você<br/>é o melhor negócio do mundo</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">Comece grátis. Evolua quando quiser. 7 dias de garantia incondicional.</p>
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-secondary p-1">
          <button onClick={() => setYearly(false)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${!yearly ? "gold-gradient text-dark" : "text-white/60"}`}>Mensal</button>
          <button onClick={() => setYearly(true)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${yearly ? "gold-gradient text-dark" : "text-white/60"}`}>Anual <span className="text-[10px] text-success">-20%</span></button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-5 lg:grid-cols-4">
          {planos.map((p) => {
            const price = yearly ? Math.round(p.price * 12 * 0.8) : p.price;
            return (
              <div key={p.name} className={`relative flex flex-col rounded-3xl border-2 p-7 ${p.color}`}>
                {p.tag && <span className="gold-gradient absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wider text-dark">{p.tag}</span>}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-extrabold">{p.name}</h3>
                </div>
                <p className="mt-1 text-xs text-white/50">{p.desc}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-extrabold">R$ {price}</span>
                  <span className="mb-1 text-sm text-white/50">{yearly ? "/ano" : p.period}</span>
                </div>
                <Link to="/onboarding" className={`mt-5 block rounded-xl py-3 text-center text-sm font-bold transition ${p.highlight ? "gold-gradient text-dark hover:brightness-110" : "border border-white/15 hover:bg-white/5"}`}>{p.cta}</Link>
                <div className="mt-6 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-success">INCLUSO</p>
                  <ul className="mt-2 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/80"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{f}</li>
                    ))}
                  </ul>
                </div>
                {p.notIncluded.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">NÃO INCLUSO</p>
                    <ul className="mt-2 space-y-1">
                      {p.notIncluded.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-white/30"><span className="mt-1">✕</span>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-accent/30 bg-accent/10 p-6 sm:p-10">
          <div>
            <Badge2>⚡ PARA EMPRESAS E EQUIPES</Badge2>
            <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">Plano Enterprise & Mastermind</h3>
            <p className="mt-2 max-w-xl text-white/60">Para equipes, empresas, famílias e grupos que querem construir legado juntos. Licenças em lote, onboarding dedicado, dados privados.</p>
          </div>
          <button className="gold-gradient rounded-xl px-6 py-3.5 text-sm font-bold text-dark">Falar com vendas →</button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-center text-3xl font-extrabold">Perguntas frequentes</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-secondary/40">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                <span className="text-sm font-bold">{f.q}</span>
                <Icon.chevronDown className={`h-4 w-4 shrink-0 text-white/50 transition ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Badge2({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">{children}</span>;
}
