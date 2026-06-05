"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { Icon, type IconName } from "../components/icons";

/* ── Data ─────────────────────────────────────────── */
const navLinks = [
  {label:"Recursos",  href:"#recursos"},
  {label:"Planos",    href:"/pricing"},
  {label:"Universidade",href:"/sobre"},
  {label:"Comunidade",href:"/comunidade"},
  {label:"Sobre",     href:"/sobre"},
];

const features:[{icon:IconName;title:string;desc:string;grad:string}] = [
  {icon:"hash",      title:"Numerologia",    desc:"Mapa completo Pitagórico com IA que interpreta seus números e ciclos de vida em tempo real.",                   grad:"from-violet-500 to-accent"},
  {icon:"sparkles",  title:"IA Mentora",     desc:"Vision AI™ aprende com você, integra seus dados e entrega insights de mentor, coach e consultor 24/7.",          grad:"from-accent to-indigo-500"},
  {icon:"heart",     title:"Lifestyle Hub",  desc:"Rastreie hábitos, sono, leitura, saúde e bem-estar com gamificação que mantém a consistência.",                  grad:"from-rose-500 to-pink-500"},
  {icon:"briefcase", title:"Business Hub",   desc:"Canvas, SWOT, Roadmaps, Kanban e validação de ideias com IA integrada para escalar seus projetos.",              grad:"from-blue-500 to-sky-400"},
  {icon:"wallet",    title:"Wealth Hub",     desc:"Gerencie ativos, passivos e patrimônio com dashboards, gráficos evolutivos e metas de liberdade financeira.",    grad:"from-gold to-amber-500"},
  {icon:"shield",    title:"Legacy Hub",     desc:"Meça e amplifique seu impacto na família, comunidade e mundo. Construa algo que sobrevive ao tempo.",             grad:"from-emerald-500 to-teal-500"},
] as any;

const stats = [
  {value:"10.000+", label:"Usuários ativos",      icon:"users"   as IconName},
  {value:"50.000+", label:"Metas criadas",         icon:"target"  as IconName},
  {value:"1.2M+",   label:"Interações com IA",    icon:"sparkles"as IconName},
  {value:"R$50M+",  label:"Patrimônio gerenciado", icon:"wallet"  as IconName},
  {value:"98%",     label:"Satisfação",            icon:"star"    as IconName},
];

const testimonials = [
  {text:"O Vision Legacy transformou meu modo de enxergar dinheiro e propósito. Em 6 meses, aumentei minha renda em 40% e finalmente tenho um plano de legado.", name:"Ricardo M.", role:"Empresário", rating:5},
  {text:"A IA Mentora é diferente de tudo que já usei. Ela conhece minha jornada, minha numerologia e me dá conselhos reais — não genéricos.", name:"Juliana S.", role:"Líder de Marketing", rating:5},
  {text:"A comunidade me mantém focado e responsável. Os Masterminds são ouro puro. Consegui lançar meu primeiro produto digital em 90 dias.", name:"Daniel C.", role:"Investidor e Criador", rating:5},
];

const plans = [
  {name:"Free",   price:0,   desc:"Comece agora",          highlight:false, features:["Numerologia básica","Vision Score","3 metas","10 mensagens IA","Discord"]},
  {name:"Pro",    price:29,  desc:"Para evoluir de verdade",highlight:true,  features:["IA Mentora ilimitada","Hubs Business & Wealth","Universidade (6 cursos)","Vision Board","RAG Engine 5GB"]},
  {name:"Elite",  price:97,  desc:"Aceleração total",       highlight:false, features:["Tudo do Pro","Universidade completa","Masterminds mensais","Todas as certificações","RAG ilimitado"]},
  {name:"Legacy", price:297, desc:"Construindo um império", highlight:false, features:["Tudo do Elite","Mentoria 1:1","Marketplace de vendedor","Command Center™","Suporte CEO direto"]},
];

const visionMethod = [
  {l:"V", t:"Vision",      d:"Visão de futuro",        color:"text-accent"},
  {l:"I", t:"Identity",    d:"Quem você é",             color:"text-gold"},
  {l:"S", t:"Strategy",    d:"Planejamento estratégico",color:"text-success"},
  {l:"I", t:"Intelligence",d:"Conhecimento + IA",       color:"text-accent-light"},
  {l:"O", t:"Opportunity", d:"Negócios e crescimento",  color:"text-gold"},
  {l:"N", t:"Navigation",  d:"Execução consistente",    color:"text-success"},
];

const faqItems = [
  {q:"Vision Legacy é um app de numerologia?",       a:"Não. A numerologia é apenas uma ferramenta. Somos um Sistema Operacional de Crescimento Humano com IA, comunidade, planejamento estratégico, negócios e patrimônio."},
  {q:"Como funciona a Vision AI™?",                  a:"Nossa IA aprende com sua jornada, integra seu mapa numerológico, hábitos, metas e patrimônio para dar insights verdadeiramente personalizados — como um mentor que te conhece de verdade."},
  {q:"Posso usar minha própria chave de IA (BYOK)?", a:"Sim! Conecte Gemini, OpenAI, Claude, DeepSeek ou OpenRouter. O consumo vai direto na sua conta, sem markup."},
  {q:"Tem garantia?",                                 a:"7 dias de garantia incondicional. Se não transformar sua visão, devolvemos 100% do valor — sem perguntas."},
  {q:"Funciona no celular?",                          a:"Sim. PWA completo com instalação em tela inicial. Apps nativos iOS e Android em desenvolvimento."},
];

/* ── Typewriter ──────────────────────────────────── */
const words = ["crescimento","patrimônio","legado","propósito","liberdade"];
function TypeWriter() {
  const [wi, setWi] = useState(0);
  const [di, setDi] = useState(0);
  const [del, setDel] = useState(false);
  const word = words[wi];
  useEffect(()=>{
    const t = setTimeout(()=>{
      if(!del){
        if(di < word.length) setDi(d=>d+1);
        else { setTimeout(()=>setDel(true), 1200); }
      } else {
        if(di > 0) setDi(d=>d-1);
        else { setDel(false); setWi(w=>(w+1)%words.length); }
      }
    }, del?60:90);
    return ()=>clearTimeout(t);
  },[di,del,word]);
  return (
    <span className="text-gold-gradient">
      {word.slice(0,di)}
      <span className="inline-block w-[2px] animate-pulse bg-gold ml-0.5 align-middle" style={{height:"0.9em"}}/>
    </span>
  );
}

/* ── Hero mock dashboard ─────────────────────────── */
function HeroMock() {
  return (
    <div className="animate-float relative">
      <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl"/>
      <div className="relative rounded-2xl border border-white/10 bg-secondary/80 p-3 shadow-2xl shadow-accent/10 backdrop-blur">
        <div className="rounded-xl bg-dark p-4">
          <div className="mb-3 flex items-center justify-between">
            <Logo size={22}/>
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 rounded-full bg-gold/30 flex items-center justify-center"><Icon.flame className="h-3 w-3 text-gold"/></div>
              <div className="h-6 w-6 rounded-full bg-accent/30"/></div>
          </div>
          <p className="text-[11px] font-bold text-white/80">Bem-vindo, Clodoaldo! 👋</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[["Vision Score","726","text-gold"],["Sequência","12 dias","text-accent-light"],["Missões","48","text-success"]].map(([t,v,c])=>(
              <div key={t} className="rounded-lg border border-white/5 bg-secondary/60 p-2">
                <p className="text-[8px] text-white/40">{t}</p>
                <p className={`text-xs font-extrabold ${c}`}>{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-secondary/40 p-3">
            <p className="text-[9px] text-white/50 mb-1">Mapa Numerológico</p>
            <div className="flex justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin-slow"/>
                <span className="text-2xl font-extrabold text-gold">8</span>
              </div>
            </div>
            <div className="mt-1 flex justify-around text-[8px] text-white/50">
              <span>Alma: 7</span><span>Dest: 5</span><span>Exp: 11</span>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {["Analisar momento atual","Criar plano de ação"].map(p=>(
              <div key={p} className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-secondary/30 px-2 py-1.5">
                <Icon.sparkles className="h-3 w-3 text-accent"/>
                <span className="text-[9px] text-white/70">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ item ────────────────────────────────────── */
function FaqItem({q,a,open,toggle}:{q:string;a:string;open:boolean;toggle:()=>void}) {
  return (
    <div className={`overflow-hidden rounded-2xl border transition ${open?"border-accent/40 bg-accent/5":"border-white/8 bg-secondary/30"}`}>
      <button onClick={toggle} className="flex w-full items-center gap-3 px-5 py-4 text-left">
        <span className="flex-1 text-sm font-bold">{q}</span>
        <Icon.chevronDown className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 ${open?"rotate-180":""}`}/>
      </button>
      <div className={`grid transition-all duration-300 ${open?"grid-rows-[1fr] pb-5":"grid-rows-[0fr]"}`}>
        <div className="overflow-hidden px-5 text-sm leading-relaxed text-white/60">{a}</div>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────── */
export default function Landing() {
  const [faqOpen, setFaqOpen] = useState<number|null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <header className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${scrolled?"border-white/8 bg-dark/95 shadow-lg shadow-black/20 backdrop-blur-xl":"border-transparent bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/"><Logo size={34}/></Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map(l=>(
              <a key={l.label} href={l.href} className="text-sm font-medium text-white/65 transition hover:text-white">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-semibold text-white/70 hover:text-white sm:block transition">Entrar</Link>
            <Link href="/onboarding" className="gold-gradient rounded-xl px-4 py-2 text-sm font-bold text-dark transition hover:brightness-110 shadow-lg shadow-gold/20">
              Começar agora
            </Link>
            <button onClick={()=>setMobileOpen(v=>!v)} className="text-white/70 lg:hidden">
              {mobileOpen?<Icon.close/>:<Icon.menu/>}
            </button>
          </div>
        </div>
        {mobileOpen&&(
          <nav className="flex flex-col gap-1 border-t border-white/5 px-5 py-4 lg:hidden bg-dark/95">
            {navLinks.map(l=><a key={l.label} href={l.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition">{l.label}</a>)}
            <Link href="/login" className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70">Entrar</Link>
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="hero-gradient relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[130px]"/>
        <div className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-gold/8 blur-[120px]"/>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold text-gold shadow-inner shadow-gold/10">
              <Icon.star className="h-3.5 w-3.5"/> PLATAFORMA #1 DE CRESCIMENTO PESSOAL E BUSINESS
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Transforme autoconhecimento<br/>em <TypeWriter/>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              Autoconhecimento, IA, planejamento estratégico, negócios, finanças e comunidade em uma única plataforma. O sistema operacional da sua evolução humana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/onboarding" className="gold-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-dark shadow-xl shadow-gold/25 transition hover:brightness-110 hover:scale-105">
                Começar minha jornada <Icon.arrowRight className="h-4 w-4"/>
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Ver planos <Icon.play className="h-4 w-4"/>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_,i)=>(
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-dark bg-gradient-to-br from-accent to-gold flex items-center justify-center text-[10px] font-bold text-white">{["C","M","J","A","P"][i]}</div>
                ))}
              </div>
              <p className="text-sm text-white/60"><span className="font-bold text-white">+10.000 visionários</span> já estão construindo legado</p>
            </div>
          </div>
          <div className="animate-fade-up delay-200">
            <HeroMock/>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-8 sm:grid-cols-5">
          {stats.map((s,i)=>{
            const C=Icon[s.icon];
            return (
              <div key={s.label} className={`flex flex-col items-center text-center animate-fade-up delay-${(i+1)*100}`}>
                <C className="h-5 w-5 text-accent-light mb-1.5"/>
                <p className="text-2xl font-extrabold text-gold">{s.value}</p>
                <p className="text-[11px] text-white/50">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── VISION METHOD ── */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">FRAMEWORK PROPRIETÁRIO</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">VISION METHOD™</h2>
          <p className="mt-3 text-white/60">O sistema de 6 pilares para transformar autoconhecimento em legado.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {visionMethod.map((v,i)=>(
            <div key={v.l} className={`animate-fade-up delay-${(i+1)*100} rounded-2xl border border-white/8 bg-secondary/40 p-5 text-center transition hover:border-accent/40 hover:bg-secondary/70`}>
              <p className={`text-4xl font-extrabold ${v.color}`}>{v.l}</p>
              <p className="mt-2 text-sm font-bold text-white">{v.t}</p>
              <p className="mt-1 text-[11px] text-white/50">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="recursos" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">⚡ UM ECOSSISTEMA COMPLETO</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Tudo que você precisa para evoluir</h2>
          <p className="mt-3 text-white/60">Seis pilares integrados, movidos por IA, em uma única plataforma.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f,i)=>{
            const C=Icon[f.icon];
            return (
              <div key={f.title} className={`group animate-fade-up delay-${(i+1)*100} card-hover rounded-2xl border border-white/8 bg-secondary/40 p-6 transition hover:border-white/20`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.grad} shadow-lg`}>
                  <C className="h-6 w-6 text-white"/>
                </div>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                  Explorar <Icon.arrowRight className="h-3 w-3"/>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="noise relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-secondary via-secondary to-accent/10 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/15 blur-[80px]"/>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-slide-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent-light">
                <Icon.sparkles className="h-3 w-3"/> VISION AI™ — A IA QUE TE CONHECE
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">IA que entende você e <br/>potencializa seus resultados</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Nossa IA aprende com você diariamente, analisando seus dados numerológicos, objetivos, hábitos e padrões para entregar insights personalizados e estratégias que realmente funcionam.
              </p>
              <div className="mt-6 space-y-3">
                {["Memória persistente da sua jornada","Integração com seu mapa numerológico","BYOK: use sua própria chave de IA","RAG Engine: treine com seus documentos"].map(f=>(
                  <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Icon.check className="h-4 w-4 text-success shrink-0"/>{f}
                  </div>
                ))}
              </div>
              <Link href="/onboarding" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-light">
                Conheça a IA Mentora <Icon.arrowRight className="h-4 w-4"/>
              </Link>
            </div>
            <div className="animate-slide-right rounded-2xl border border-white/10 bg-dark/60 p-5 space-y-3">
              <div className="flex justify-end">
                <div className="chat-bubble-user max-w-xs rounded-xl bg-white/10 px-4 py-2.5 text-sm">Qual meu próximo passo para liberdade financeira?</div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent"><Icon.sparkles className="h-4 w-4 text-white"/></div>
                <div className="chat-bubble-ai max-w-sm rounded-xl bg-accent/15 px-4 py-3 text-sm">
                  <p className="mb-2 text-white/80 font-medium">Baseado na sua jornada, recomendo 3 pilares agora:</p>
                  {["Aumentar renda em 30% nos próximos 90 dias","Investir 20% da renda mensal em ativos","Criar renda passiva escalável com IA"].map(t=>(
                    <p key={t} className="flex items-start gap-2 text-white/70 text-[13px] mt-1">
                      <Icon.checkCircle className="mt-0.5 h-4 w-4 shrink-0 text-success"/>{t}
                    </p>
                  ))}
                  <p className="mt-3 text-xs text-accent-light">Quer que eu crie um plano detalhado? →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">💬 HISTÓRIAS REAIS</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Quem já transformou sua vida</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t,i)=>(
            <div key={t.name} className={`animate-fade-up delay-${(i+1)*200} card-hover rounded-2xl border border-white/8 bg-secondary/40 p-6 transition hover:border-gold/30`}>
              <div className="flex gap-0.5 text-gold">{[...Array(t.rating)].map((_,j)=><Icon.star key={j} className="h-4 w-4"/>)}</div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-gold text-sm font-bold text-dark">{t.name[0]}</div>
                <div><p className="text-sm font-bold">{t.name}</p><p className="text-xs text-white/50">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-light">PLANOS</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Para cada fase da jornada</h2>
          <p className="mt-3 text-white/60">7 dias de garantia incondicional em todos os planos pagos.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {plans.map((p,i)=>(
            <div key={p.name} className={`animate-fade-up delay-${(i+1)*100} card-hover relative flex flex-col rounded-2xl border-2 p-6 transition
              ${p.highlight?"border-gold bg-gradient-to-b from-gold/10 to-secondary/40 shadow-xl shadow-gold/10":"border-white/8 bg-secondary/40"}`}>
              {p.highlight&&<span className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient rounded-full px-3 py-1 text-[10px] font-extrabold text-dark tracking-wider">MAIS POPULAR</span>}
              <h3 className="text-lg font-extrabold">{p.name}</h3>
              <p className="text-xs text-white/50">{p.desc}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-extrabold">R$ {p.price}</span>
                <span className="mb-1 text-xs text-white/50">/mês</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map(f=><li key={f} className="flex items-start gap-2 text-sm text-white/70"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-success"/>{f}</li>)}
              </ul>
              <Link href="/onboarding" className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition
                ${p.highlight?"gold-gradient text-dark hover:brightness-110 shadow-lg shadow-gold/20":"border border-white/15 text-white hover:bg-white/5"}`}>
                {p.price===0?"Começar grátis":"Assinar agora"}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-accent-light hover:text-accent transition">
            Ver comparativo completo →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-10 space-y-3">
          {faqItems.map((f,i)=>(
            <FaqItem key={i} q={f.q} a={f.a} open={faqOpen===i} toggle={()=>setFaqOpen(faqOpen===i?null:i)}/>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="noise relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-secondary to-gold/10 p-8 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 rounded-full bg-accent/10 blur-3xl"/>
          </div>
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Pronto para construir<br/>seu <span className="text-gold-gradient">legado</span>?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">Comece agora. É gratuito. Sem cartão de crédito.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/onboarding" className="gold-gradient rounded-xl px-8 py-4 text-sm font-extrabold text-dark shadow-xl shadow-gold/25 transition hover:brightness-110 hover:scale-105">
                Começar gratuitamente →
              </Link>
              <Link href="/login" className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10">
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-darker">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo size={34}/>
            <p className="mt-4 max-w-xs text-sm text-white/50">Lifestyle • Business • Vision 🚀<br/>Transforme autoconhecimento em crescimento, patrimônio e legado.</p>
            <div className="mt-5 flex gap-3">
              {["globe","play","discord","users"].map(i=>{const C=Icon[i as IconName];return<C key={i} className="h-5 w-5 text-white/40 hover:text-white transition cursor-pointer"/>;  })}
            </div>
          </div>
          {[
            ["Plataforma", [
              { l: "Recursos",     h: "/#recursos" },
              { l: "Planos",       h: "/pricing"  },
              { l: "Universidade", h: "/sobre"    },
              { l: "IA Mentora",   h: "/dashboard/ia" },
              { l: "Numerologia",  h: "/dashboard/numerologia" },
              { l: "Vision Board", h: "/dashboard/vision-board" },
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
          ].map(([t,items])=>(
            <div key={t as string}>
              <h4 className="text-sm font-bold text-white">{t as string}</h4>
              <ul className="mt-4 space-y-2.5">
                {(items as {l: string; h: string}[]).map(it=><li key={it.l}><Link href={it.h} className="text-sm text-white/50 hover:text-white transition">{it.l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-white/35">
          © 2026 Vision Legacy™ · CNPJ 00.000.000/0001-00 · Todos os direitos reservados. Feito com 💜 no Brasil.
        </div>
      </footer>
    </div>
  );
}
