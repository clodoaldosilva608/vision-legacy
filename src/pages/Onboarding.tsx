import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Icon, type IconName } from "../components/icons";

const STEPS = [
  { id: "auth",     title: "Crie sua conta",           subtitle: "Sua jornada começa agora. É gratuito.", emoji: "🚀" },
  { id: "name",     title: "Como você se chama?",      subtitle: "Usado para calcular sua Expressão e Alma.", emoji: "👤" },
  { id: "birth",    title: "Quando você nasceu?",       subtitle: "Calculamos seu Número de Destino e ciclos.", emoji: "🎂" },
  { id: "goals",    title: "O que você quer alcançar?", subtitle: "Escolha até 3 objetivos principais.", emoji: "🎯" },
  { id: "pillars",  title: "Quais pilares te movem?",   subtitle: "Personalizamos sua experiência.", emoji: "⚡" },
  { id: "result",   title: "Seu mapa inicial!",         subtitle: "Vision AI™ analisou seu perfil.", emoji: "✨" },
];

const GOALS: {icon: IconName; label: string; color: string}[] = [
  { icon: "wallet",    label: "Liberdade financeira",    color: "border-gold/50 bg-gold/10 text-gold" },
  { icon: "briefcase", label: "Empreender com sucesso",  color: "border-blue-400/50 bg-blue-400/10 text-blue-400" },
  { icon: "heart",     label: "Saúde e bem-estar",       color: "border-rose-400/50 bg-rose-400/10 text-rose-400" },
  { icon: "users",     label: "Família e relacionamentos",color: "border-emerald-400/50 bg-emerald-400/10 text-emerald-400" },
  { icon: "brain",     label: "Autoconhecimento",        color: "border-violet-400/50 bg-violet-400/10 text-violet-400" },
  { icon: "award",     label: "Carreira de alto nível",  color: "border-amber-400/50 bg-amber-400/10 text-amber-400" },
  { icon: "shield",    label: "Construir legado",        color: "border-teal-400/50 bg-teal-400/10 text-teal-400" },
  { icon: "globe",     label: "Viajar pelo mundo",       color: "border-sky-400/50 bg-sky-400/10 text-sky-400" },
];

const PILLARS = [
  { key: "Lifestyle", icon: "heart" as IconName,    color: "from-rose-500 to-pink-600",    desc: "Hábitos, saúde e bem-estar." },
  { key: "Business",  icon: "briefcase" as IconName, color: "from-blue-500 to-indigo-600",  desc: "Negócios e empreendedorismo." },
  { key: "Wealth",    icon: "wallet" as IconName,    color: "from-gold to-amber-500",       desc: "Patrimônio e liberdade financeira." },
  { key: "Legacy",    icon: "shield" as IconName,    color: "from-emerald-500 to-teal-600", desc: "Impacto e legado duradouro." },
];

function calcDestino(d: string, m: string, y: string): number {
  const nums = (d + m + y).split("").map(Number);
  let sum = nums.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum || 5;
}

const archetypes: Record<number, { name: string; desc: string; traits: string[] }> = {
  1: { name: "Líder",        desc: "Você nasceu para liderar e abrir novos caminhos.",          traits: ["Pioneiro","Determinado","Visionário"] },
  2: { name: "Diplomata",    desc: "Sua sensibilidade cria pontes e harmonia.",                 traits: ["Empático","Cooperativo","Intuitivo"] },
  3: { name: "Criativo",     desc: "Expressão, comunicação e alegria são seus superpoderes.",   traits: ["Criativo","Comunicativo","Inspirador"] },
  4: { name: "Construtor",   desc: "Você constrói fundações sólidas e duradouras.",             traits: ["Disciplinado","Confiável","Metódico"] },
  5: { name: "Explorador",   desc: "Liberdade, mudança e novas experiências te definem.",       traits: ["Curioso","Adaptável","Dinâmico"] },
  6: { name: "Curador",      desc: "Você nutre, cuida e cria beleza ao seu redor.",             traits: ["Amoroso","Responsável","Harmonioso"] },
  7: { name: "Sábio",        desc: "Busca interior, análise e espiritualidade são seu caminho.",traits: ["Analítico","Espiritual","Profundo"] },
  8: { name: "Realizador",   desc: "Poder, prosperidade e conquistas materiais são naturais.",  traits: ["Ambicioso","Estratégico","Poderoso"] },
  9: { name: "Humanista",    desc: "Compaixão global e legado humanitário te movem.",           traits: ["Altruísta","Visionário","Transformador"] },
  11:{ name: "Iluminado",    desc: "Mestre Intuitivo — missão espiritual elevada.",             traits: ["Intuitivo","Inspirador","Sensível"] },
  22:{ name: "Arquiteto",    desc: "Mestre Construtor — manifesta visões grandiosas.",          traits: ["Visionário","Prático","Poderoso"] },
};

export default function Onboarding() {
  const [step, setStep]         = useState(0);
  const [name, setName]         = useState("");
  const [day, setDay]           = useState("23");
  const [month, setMonth]       = useState("05");
  const [year, setYear]         = useState("1984");
  const [goals, setGoals]       = useState<string[]>([]);
  const [pillars, setPillars]   = useState<string[]>([]);
  const [email, setEmail]       = useState("");
  const [pass, setPass]         = useState("");
  const nav = useNavigate();

  const destino = calcDestino(day, month, year);
  const arch = archetypes[destino] ?? archetypes[5];

  const toggleItem = (list: string[], set: (v: string[]) => void, val: string, max = 99) => {
    set(list.includes(val) ? list.filter(x => x !== val) : list.length < max ? [...list, val] : list);
  };

  const canNext = () => {
    if (step === 0) return email.includes("@");
    if (step === 1) return name.trim().length > 2;
    if (step === 2) return day && month && year.length === 4;
    if (step === 3) return goals.length > 0;
    if (step === 4) return pillars.length > 0;
    return true;
  };

  const next = () => step < STEPS.length - 1 ? setStep(s => s + 1) : nav("/dashboard");

  return (
    <div className="flex min-h-screen bg-dark text-white">
      {/* ── Left panel ── */}
      <div className="hidden w-[420px] shrink-0 border-r border-white/5 bg-secondary/50 lg:flex lg:flex-col">
        <div className="px-8 py-8"><Logo size={34}/></div>
        <div className="flex-1 px-8 py-4 space-y-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 ${i === step ? "bg-accent/15 border border-accent/30" : i < step ? "opacity-70" : "opacity-30"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold
                ${i < step ? "bg-success text-white" : i === step ? "bg-accent text-white shadow-lg shadow-accent/30" : "bg-white/5 text-white/40"}`}>
                {i < step ? <Icon.check className="h-5 w-5"/> : s.emoji}
              </div>
              <div>
                <p className={`text-sm font-bold ${i === step ? "text-white" : "text-white/70"}`}>{s.title}</p>
                <p className="text-[11px] text-white/40">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-8 pb-8">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Por que confiar em nós?</p>
            <div className="mt-3 space-y-2.5">
              {["LGPD compliant","Dados criptografados AES-256","Nunca vendemos seus dados","7 dias de garantia"].map(t=>(
                <div key={t} className="flex items-center gap-2 text-xs text-white/70">
                  <Icon.check className="h-3.5 w-3.5 text-success shrink-0"/>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 lg:hidden">
          <Logo size={30}/>
          <span className="text-xs text-white/40">Etapa {step + 1}/{STEPS.length}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-white/5">
          <div className="h-1 gold-gradient transition-all duration-700" style={{width: `${((step + 1) / STEPS.length) * 100}%`}}/>
        </div>

        <main className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-10 sm:px-12">
          <div className="w-full max-w-lg animate-fade-up">
            <p className="text-3xl mb-1">{STEPS[step].emoji}</p>
            <h1 className="text-3xl font-extrabold">{STEPS[step].title}</h1>
            <p className="mt-2 text-sm text-white/55 mb-8">{STEPS[step].subtitle}</p>

            {/* STEP 0 – Auth */}
            {step === 0 && (
              <div className="space-y-3">
                {[
                  { label: "Continuar com Google",  icon: "globe"   as IconName, color: "#4285F4" },
                  { label: "Continuar com Discord", icon: "discord" as IconName, color: "#5865F2" },
                  { label: "Continuar com Apple",   icon: "star"    as IconName, color: "#000" },
                ].map(p => {
                  const C = Icon[p.icon];
                  return (
                    <button key={p.label} onClick={()=>{ setEmail("user@demo.com"); next(); }}
                      className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-secondary/60 px-5 py-3.5 text-sm font-semibold transition hover:border-white/25 hover:bg-secondary">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{background: `${p.color}30`}}>
                        <C className="h-4 w-4" style={{color: p.color}}/>
                      </div>
                      {p.label}
                    </button>
                  );
                })}
                <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-white/8"/><span className="text-xs text-white/40">ou com email</span><div className="h-px flex-1 bg-white/8"/></div>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"
                  className="w-full rounded-xl border border-white/12 bg-secondary/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:bg-secondary"/>
                <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Crie uma senha forte"
                  className="w-full rounded-xl border border-white/12 bg-secondary/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:bg-secondary"/>
                <p className="text-center text-xs text-white/40">
                  Já tem conta? <Link to="/login" className="text-accent-light hover:underline">Entrar</Link>
                </p>
              </div>
            )}

            {/* STEP 1 – Name */}
            {step === 1 && (
              <div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex: Clodoaldo Silva"
                  className="w-full rounded-xl border border-white/12 bg-secondary/60 px-4 py-4 text-xl font-bold outline-none transition focus:border-accent focus:bg-secondary"/>
                <p className="mt-3 text-xs text-white/40">Seu nome completo é usado para calcular os números de Expressão, Alma e Personalidade no mapa Pitagórico.</p>
              </div>
            )}

            {/* STEP 2 – Birthdate */}
            {step === 2 && (
              <div>
                <div className="grid grid-cols-3 gap-3">
                  {[["Dia","day",day,setDay,"DD"],["Mês","month",month,setMonth,"MM"],["Ano","year",year,setYear,"AAAA"]].map(([l,k,v,fn,ph])=>(
                    <div key={k as string}>
                      <label className="mb-1.5 block text-xs font-bold text-white/50">{l as string}</label>
                      <input value={v as string} onChange={e=>(fn as any)(e.target.value)} placeholder={ph as string} maxLength={k==="year"?4:2}
                        className="w-full rounded-xl border border-white/12 bg-secondary/60 px-4 py-3.5 text-center text-2xl font-extrabold outline-none transition focus:border-accent focus:bg-secondary"/>
                    </div>
                  ))}
                </div>
                {day && month && year.length===4 && (
                  <div className="mt-4 animate-scale-in rounded-xl border border-gold/30 bg-gold/8 p-4 text-center">
                    <p className="text-xs text-white/50">Número de Destino calculado</p>
                    <p className="text-4xl font-extrabold text-gold mt-1">{destino}</p>
                    <p className="text-sm font-bold text-white/70 mt-0.5">Arquétipo: {arch.name}</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 – Goals */}
            {step === 3 && (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {GOALS.map(g=>{
                  const C=Icon[g.icon]; const sel=goals.includes(g.label);
                  return (
                    <button key={g.label} onClick={()=>toggleItem(goals,setGoals,g.label,3)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left text-sm font-semibold transition
                        ${sel?`${g.color} border-current`:"border-white/10 bg-secondary/40 text-white/70 hover:border-white/25 hover:bg-secondary/70"}`}>
                      <C className={`h-5 w-5 shrink-0 ${sel?"":"text-white/40"}`}/>
                      <span>{g.label}</span>
                      {sel&&<Icon.check className="ml-auto h-4 w-4 shrink-0"/>}
                    </button>
                  );
                })}
                <p className="sm:col-span-2 text-center text-[11px] text-white/35">Selecionados: {goals.length}/3</p>
              </div>
            )}

            {/* STEP 4 – Pillars */}
            {step === 4 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {PILLARS.map(p=>{
                  const C=Icon[p.icon]; const sel=pillars.includes(p.key);
                  return (
                    <button key={p.key} onClick={()=>toggleItem(pillars,setPillars,p.key)}
                      className={`overflow-hidden rounded-2xl border-2 text-left transition ${sel?"border-accent":"border-white/10 hover:border-white/25"}`}>
                      <div className={`flex items-center gap-3 bg-gradient-to-br ${p.color} p-4`}>
                        <C className="h-6 w-6 text-white"/><span className="text-lg font-extrabold text-white">{p.key}</span>
                        {sel&&<Icon.check className="ml-auto h-5 w-5 text-white"/>}
                      </div>
                      <div className="px-4 py-3 bg-secondary/40"><p className="text-sm text-white/65">{p.desc}</p></div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 5 – Result */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-secondary to-gold/5 p-7 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl gold-gradient shadow-xl shadow-gold/30 text-4xl font-extrabold text-dark">{destino}</div>
                  <h2 className="mt-4 text-2xl font-extrabold">Número de Destino: <span className="text-gold">{destino}</span></h2>
                  <p className="mt-1 text-white/70">Arquétipo: <span className="font-bold text-accent">{arch.name}</span></p>
                  <p className="mt-3 text-sm text-white/55 max-w-xs mx-auto">{arch.desc}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {arch.traits.map(t=><span key={t} className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-light">{t}</span>)}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {l:"Vision Score inicial", v:"412"},
                    {l:"Fase",                 v:"Descoberta"},
                    {l:"Próxima missão",       v:"3 metas"},
                  ].map(s=>(
                    <div key={s.l} className="rounded-2xl border border-white/8 bg-secondary/40 p-3.5 text-center">
                      <p className="text-[10px] text-white/40">{s.l}</p>
                      <p className="mt-1 text-lg font-extrabold text-white">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-accent/25 bg-accent/8 p-4">
                  <div className="flex gap-2.5 items-start">
                    <Icon.sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5"/>
                    <p className="text-sm text-white/75">
                      <span className="font-bold text-white">Vision AI™ analisou seu perfil: </span>
                      {name ? `Olá ${name.split(" ")[0]}! ` : ""}Com o número {destino} e arquétipo {arch.name}, seu maior potencial está em {goals[0] || "crescimento pessoal"}. Prepare-se para uma jornada transformadora.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
                className="flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <Icon.chevronDown className="-rotate-90 h-4 w-4"/> Voltar
              </button>
              <button onClick={next} disabled={!canNext()}
                className="gold-gradient flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-extrabold text-dark shadow-xl shadow-gold/25 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? "Entrar no Dashboard" : "Continuar"}
                <Icon.arrowRight className="h-4 w-4"/>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
