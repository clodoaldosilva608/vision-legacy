import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserLayout } from "../components/UserLayout";
import { Icon, type IconName } from "../components/icons";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

/* ─── Data ─────────────────────────────────────────── */
const scoreHistory = [280,320,360,400,420,460,500,545,590,640,690,726].map((v,i)=>({x:i,v}));
const evoData = [
  {d:"23/04",v:300},{d:"30/04",v:380},{d:"07/05",v:470},{d:"14/05",v:520},{d:"21/05",v:726},
];
const miniBars = Array.from({length:12},(_,i)=>({x:i,v:10+Math.round(Math.abs(Math.sin(i)*30))}));
const pillars = [
  {name:"Identity",value:85,color:"#7c5cfc"},
  {name:"Growth",  value:70,color:"#9a80ff"},
  {name:"Business",value:65,color:"#d4af37"},
  {name:"Wealth",  value:75,color:"#ff5c7a"},
  {name:"Legacy",  value:90,color:"#00c896"},
];
const numerology = [
  {label:"Expressão",  value:11,pos:"top"   },
  {label:"Alma",       value:7, pos:"left"  },
  {label:"Personalid.",value:22,pos:"right" },
  {label:"Maturidade", value:3, pos:"bl"    },
  {label:"Destino",    value:5, pos:"bottom"},
  {label:"Ciclo",      value:9, pos:"br"    },
];
const missions:[{icon:IconName;name:string;xp:number;done:boolean}] = [
  {icon:"target",  name:"Meditar 10 min",      xp:50, done:true },
  {icon:"book",    name:"Ler 10 páginas",       xp:50, done:true },
  {icon:"flame",   name:"Treinar 45 min",       xp:80, done:false},
  {icon:"wallet",  name:"Registrar despesas",   xp:50, done:false},
  {icon:"sparkles",name:"Sessão Vision AI",     xp:100,done:false},
] as any;
const journey = ["Descoberta","Organização","Construção","Expansão","Prosperidade","Legado"];
const aiSuggestions = [
  "Analisar meu momento atual",
  "Criar plano de ação 90 dias",
  "Avaliar meus objetivos",
  "Dar um conselho estratégico",
];
const recentActivity = [
  {icon:"checkCircle" as IconName, text:"Meta 'R$ 50k MRR' atualizada", time:"5 min", color:"#00c896"},
  {icon:"flame"       as IconName, text:"Streak de 12 dias mantido!", time:"1h",  color:"#f59e0b"},
  {icon:"sparkles"    as IconName, text:"Nova sessão com Vision AI",    time:"2h",  color:"#7c5cfc"},
  {icon:"award"       as IconName, text:"Badge 'Leitor Mestre' desbloqueado", time:"1d", color:"#d4af37"},
  {icon:"discord"     as IconName, text:"Evento Discord: Mastermind VIP", time:"1d", color:"#5865F2"},
];

/* ─── Animated counter ──────────────────────────────── */
function AnimatedNumber({target, prefix="", suffix=""}: {target:number;prefix?:string;suffix?:string}) {
  const [val, setVal] = useState(0);
  useEffect(()=>{
    const start = Date.now();
    const dur = 1200;
    const raf = () => {
      const t = Math.min((Date.now()-start)/dur, 1);
      const ease = 1 - Math.pow(1-t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  },[target]);
  return <>{prefix}{val.toLocaleString("pt-BR")}{suffix}</>;
}

/* ─── Score Ring ────────────────────────────────────── */
function ScoreRing({value, max=1000}: {value:number;max?:number}) {
  const r = 52, c = 2*Math.PI*r;
  const pct = value/max;
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90 score-ring" width={128} height={128}>
        <circle cx={64} cy={64} r={r} fill="none" stroke="rgba(124,92,252,.12)" strokeWidth={10}/>
        <circle cx={64} cy={64} r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth={10}
          strokeDasharray={c} strokeDashoffset={c*(1-pct)} strokeLinecap="round"
          style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)"}}/>
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9a80ff"/>
            <stop offset="50%" stopColor="#7c5cfc"/>
            <stop offset="100%" stopColor="#d4af37"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col items-center">
        <span className="vision-score text-3xl font-extrabold tabular">{value}</span>
        <span className="text-[10px] font-semibold text-slate-400">/ {max}</span>
      </div>
    </div>
  );
}

/* ─── Mini Sparkline ────────────────────────────────── */
function Sparkline({data, color="#7c5cfc"}: {data:{v:number}[];color?:string}) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── KPI Card ──────────────────────────────────────── */
function KpiCard({title,value,sub,change,positive=true,children,accent=false}:{
  title:string;value:React.ReactNode;sub?:string;change?:string;positive?:boolean;children?:React.ReactNode;accent?:boolean
}) {
  return (
    <div className={`card-hover relative overflow-hidden rounded-2xl border p-5 transition
      ${accent ? "border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/60" : "border-slate-200 bg-white"}`}>
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <p className="text-[28px] font-extrabold leading-none text-slate-900">{value}</p>
          {sub && <p className="mt-1 text-xs font-bold text-accent">{sub}</p>}
          {change && (
            <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${positive ? "text-success" : "text-danger"}`}>
              {positive ? <Icon.arrowUp className="h-3 w-3"/> : <Icon.trendingDown className="h-3 w-3"/>} {change}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── Tooltip custom ─────────────────────────────────── */
const ChartTip = ({active,payload,label}:any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-xl">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="text-sm font-bold text-accent">{payload[0].value}</p>
    </div>
  );
};

/* ─── Main ───────────────────────────────────────────── */
export default function Dashboard() {
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<{r:"ai"|"user";t:string}[]>([
    {r:"ai",t:"Olá Clodoaldo! 👋 Sou a Vision AI™. Como posso te ajudar hoje na sua jornada de crescimento?"}
  ]);
  const [missionsDone, setMissionsDone] = useState<Set<number>>(new Set([0,1]));
  const [greeting] = useState(()=>{
    const h = new Date().getHours();
    return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite";
  });

  const sendAI = (text: string) => {
    if (!text.trim()) return;
    const msg = text;
    setAiMessages(m=>[...m,{r:"user",t:msg}]);
    setAiInput("");
    setTimeout(()=>{
      setAiMessages(m=>[...m,{r:"ai",t:`Com base no seu Vision Score de 726 e arquétipo Visionário, aqui está minha análise sobre "${msg}":\n\nRecomendo focar nos 3 pilares mais impactantes para você agora: Strategy, Intelligence e Opportunity — parte do VISION METHOD™. Posso detalhar um plano de ação?`}]);
    }, 900);
  };

  const toggleMission = (i:number) => {
    setMissionsDone(s=>{const n=new Set(s); n.has(i)?n.delete(i):n.add(i); return n;});
  };

  return (
    <UserLayout>
      {/* ── Header ── */}
      <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {greeting}, Clodoaldo! <span className="animate-bounce-subtle inline-block">👋</span>
          </h1>
          <p className="text-sm text-slate-500">Continue sua jornada e transforme sua visão em legado.</p>
        </div>
        <div className="flex items-center gap-2 animate-fade-up delay-200">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <Icon.calendar className="h-4 w-4 text-accent"/>
            {new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}
          </div>
          <Link to="/dashboard/vision-board" className="gold-gradient flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-dark shadow-sm">
            <Icon.layers className="h-4 w-4"/> Vision Board
          </Link>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Vision Score" value={<AnimatedNumber target={726}/>} sub="Visionário" change="+8.5% este mês">
          <Sparkline data={scoreHistory} color="#7c5cfc"/>
        </KpiCard>
        <KpiCard title="Sequência Atual" value={<><AnimatedNumber target={12}/><span className="text-base font-medium text-slate-400"> dias</span></>} change="Melhor: 28 dias">
          <div className="h-10 w-24">
            <ResponsiveContainer>
              <BarChart data={miniBars}><Bar dataKey="v" fill="#c4b5fd" radius={3}/></BarChart>
            </ResponsiveContainer>
          </div>
        </KpiCard>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 card-hover">
          <p className="text-xs font-semibold text-slate-500">Missões Concluídas</p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-[28px] font-extrabold leading-none text-slate-900"><AnimatedNumber target={48}/></p>
              <p className="mt-1 text-xs text-slate-400">este mês</p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-success">
                <Icon.arrowUp className="h-3 w-3"/> +20% vs mês ant.
              </p>
            </div>
            <div className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="#7c5cfc" strokeWidth="4"
                  strokeDasharray="94" strokeDashoffset="28" strokeLinecap="round"
                  style={{transition:"stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)"}}/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-accent">70%</span>
            </div>
          </div>
        </div>
        <KpiCard title="Patrimônio Total" value="R$ 288k" change="+8.3% este mês">
          <div className="h-10 w-24">
            <ResponsiveContainer>
              <AreaChart data={scoreHistory}>
                <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00c896" stopOpacity={.4}/><stop offset="1" stopColor="#00c896" stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="v" stroke="#00c896" fill="url(#wg)" strokeWidth={2} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </KpiCard>
      </div>

      {/* ── Main grid ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-12">

        {/* Numerology map */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-4 card-hover">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Mapa Numerológico</h3>
              <p className="text-xs text-slate-400">Ciclo Atual: 8 — Poder e Realização</p>
            </div>
            <Link to="/dashboard/numerologia" className="text-xs font-semibold text-accent hover:underline">Ver completo →</Link>
          </div>
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-12 animate-spin-slow rounded-full border border-dashed border-slate-200/60"/>
            <div className="absolute inset-6 rounded-full border border-dashed border-accent/10"/>
            <div className="animate-glow-ring flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-accent/20 shadow-inner">
              <span className="text-5xl font-extrabold text-gold">8</span>
            </div>
            {numerology.map((n)=>{
              const pos:Record<string,string> = {
                top:   "left-1/2 top-0 -translate-x-1/2",
                left:  "left-0  top-1/3 -translate-y-1/2",
                right: "right-0 top-1/3 -translate-y-1/2",
                bl:    "bottom-4 left-2",
                bottom:"bottom-0 left-1/2 -translate-x-1/2",
                br:    "bottom-4 right-2",
              };
              return (
                <div key={n.label} className={`absolute flex flex-col items-center ${pos[n.pos]}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-white shadow-lg shadow-accent/30 transition hover:scale-110">
                    {n.value}
                  </div>
                  <span className="mt-1 text-[9px] font-semibold text-slate-400">{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Mentor chat */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-5">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-lg shadow-accent/30">
              <Icon.sparkles className="h-5 w-5 text-white"/>
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Vision AI™</p>
              <p className="flex items-center gap-1 text-[11px] text-slate-400">
                <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success"/>Online
              </p>
            </div>
            <Link to="/dashboard/ia" className="text-xs font-semibold text-accent">Abrir chat →</Link>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-52 pr-1">
            {aiMessages.map((m,i)=>(
              <div key={i} className={`flex gap-2 animate-fade-up ${m.r==="user"?"justify-end":""}`}>
                {m.r==="ai"&&<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10"><Icon.sparkles className="h-4 w-4 text-accent"/></div>}
                <div className={`max-w-xs rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line
                  ${m.r==="user"?"chat-bubble-user bg-accent text-white":"chat-bubble-ai bg-slate-100 text-slate-700"}`}>{m.t}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {aiSuggestions.map(s=>(
                <button key={s} onClick={()=>sendAI(s)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:border-accent hover:text-accent">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition">
              <input value={aiInput} onChange={e=>setAiInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&sendAI(aiInput)}
                placeholder="Digite sua mensagem..." className="flex-1 bg-transparent text-sm outline-none"/>
              <button onClick={()=>sendAI(aiInput)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white transition hover:bg-accent-light">
                <Icon.send className="h-4 w-4"/>
              </button>
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-4 xl:col-span-3">
          {/* Journey */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Jornada</h3>
              <span className="text-xs font-bold text-accent">Fase 3/6</span>
            </div>
            <div className="space-y-2">
              {journey.map((j,i)=>(
                <div key={j} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition
                  ${i===2?"bg-accent/10 border border-accent/30":""}`}>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold
                    ${i<3?"bg-accent text-white shadow shadow-accent/30":i===2?"border-2 border-accent text-accent":"bg-slate-100 text-slate-400"}`}>
                    {i<3?<Icon.check className="h-3 w-3"/>:i+1}
                  </div>
                  <span className={`text-sm font-medium ${i<=2?"text-slate-700":i===3?"text-accent font-bold":"text-slate-400"}`}>{j}</span>
                  {i===2&&<span className="ml-auto text-[9px] font-bold text-accent">65%</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Discord */}
          <div className="rounded-2xl border border-[#5865F2]/30 bg-[#5865F2]/8 p-4">
            <div className="flex items-center gap-2">
              <Icon.discord className="h-5 w-5 text-[#5865F2]"/>
              <span className="text-sm font-bold text-slate-800">Discord</span>
              <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success"/>Online
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Clodoaldo#1984 • Vision Pro</p>
            <p className="mt-2 text-xs text-slate-600">📅 Mastermind hoje às <b>20h</b> — 84 confirmados</p>
            <button className="mt-2 w-full rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 py-1.5 text-xs font-bold text-[#5865F2] hover:bg-[#5865F2]/20 transition">
              Ver comunidade
            </button>
          </div>
        </div>
      </div>

      {/* ── Missions ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Missões do Dia</h3>
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
              {missionsDone.size}/{missions.length} concluídas
            </span>
          </div>
          <div className="mb-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-gradient-to-r from-accent to-gold transition-all duration-700"
              style={{width:`${(missionsDone.size/missions.length)*100}%`}}/>
          </div>
          <div className="space-y-2">
            {missions.map((m,i)=>{
              const C=Icon[m.icon]; const done=missionsDone.has(i);
              return (
                <button key={m.name} onClick={()=>toggleMission(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition
                    ${done?"border-success/30 bg-success/5":"border-slate-200 hover:border-accent/30 hover:bg-accent/5"}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition
                    ${done?"bg-success text-white":"bg-slate-100 text-slate-500"}`}>
                    {done?<Icon.check className="h-4 w-4"/>:<C className="h-4 w-4"/>}
                  </div>
                  <span className={`flex-1 text-sm font-semibold ${done?"text-slate-400 line-through":"text-slate-700"}`}>{m.name}</span>
                  <span className={`text-xs font-bold ${done?"text-success":"text-slate-400"}`}>+{m.xp} XP</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pillar donut */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Distribuição dos Pilares</h3>
            <ScoreRing value={726}/>
          </div>
          <div className="space-y-2.5">
            {pillars.map(p=>(
              <div key={p.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">{p.name}</span>
                  <span className="font-bold" style={{color:p.color}}>{p.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="progress-animated h-2 rounded-full transition-all" style={{width:`${p.value}%`,background:p.color}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atividade recente */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-3">
          <h3 className="mb-4 font-bold text-slate-800">Atividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((a,i)=>{
              const C=Icon[a.icon];
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{background:`${a.color}1a`}}>
                    <C className="h-4 w-4" style={{color:a.color}}/>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-tight text-slate-700">{a.text}</p>
                    <p className="text-[10px] text-slate-400">{a.time} atrás</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 card-hover">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Evolução do Vision Score</h3>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <option>30 dias</option><option>90 dias</option><option>6 meses</option>
            </select>
          </div>
          <div className="h-52">
            <ResponsiveContainer>
              <AreaChart data={evoData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0"   stopColor="#7c5cfc" stopOpacity={.35}/>
                    <stop offset="1"   stopColor="#7c5cfc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} width={36}/>
                <Tooltip content={<ChartTip/>}/>
                <Area type="monotone" dataKey="v" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#g1)" dot={{fill:"#7c5cfc",r:4}} activeDot={{r:6,stroke:"#fff",strokeWidth:2}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Archetype + quick links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 card-hover">
            <h3 className="mb-2 font-bold text-slate-800">Arquétipo Dominante</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-accent">Visionário</h4>
                <p className="mt-1 text-xs text-slate-500">Você enxerga o futuro, pensa grande e inspira.</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {["Intuitivo","Inovador","Inspirador"].map(t=>(
                    <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">{t}</span>
                  ))}
                </div>
              </div>
              <img src="/images/archetype.png" alt="Arquétipo" className="h-28 w-20 object-contain"/>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 font-bold text-slate-800">Acesso rápido</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                {to:"/dashboard/numerologia", icon:"hash"     as IconName, l:"Numerologia", c:"bg-accent/10 text-accent"},
                {to:"/dashboard/ia",           icon:"sparkles" as IconName, l:"Vision AI",   c:"bg-violet-100 text-violet-600"},
                {to:"/dashboard/wealth",       icon:"wallet"   as IconName, l:"Patrimônio",  c:"bg-gold/10 text-gold"},
                {to:"/dashboard/business",     icon:"briefcase"as IconName, l:"Business",    c:"bg-blue-100 text-blue-600"},
                {to:"/dashboard/habitos",      icon:"repeat"   as IconName, l:"Hábitos",     c:"bg-emerald-100 text-emerald-600"},
                {to:"/dashboard/universidade", icon:"book"     as IconName, l:"Cursos",      c:"bg-rose-100 text-rose-600"},
              ].map(({to,icon,l,c})=>{
                const C=Icon[icon];
                return (
                  <Link key={l} to={to}
                    className={`flex flex-col items-center gap-1.5 rounded-xl p-2.5 text-center transition hover:scale-105 ${c.split(" ")[0]}`}>
                    <C className={`h-5 w-5 ${c.split(" ")[1]}`}/>
                    <span className={`text-[11px] font-bold ${c.split(" ")[1]}`}>{l}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom quick info ── */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {icon:"hash"as IconName,      l:"Numerologia",  d:"Descubra seu código",   to:"/dashboard/numerologia",  c:"#7c5cfc"},
          {icon:"sparkles"as IconName,  l:"IA Mentora",   d:"Converse com sua IA",   to:"/dashboard/ia",            c:"#9a80ff"},
          {icon:"folder"as IconName,    l:"Projetos",     d:"Tire ideias do papel",  to:"/dashboard/projetos",     c:"#3b82f6"},
          {icon:"shield"as IconName,    l:"Legacy",       d:"Deixe seu legado",      to:"/dashboard/legacy",       c:"#00c896"},
        ].map(q=>{
          const C=Icon[q.icon];
          return (
            <Link key={q.l} to={q.to}
              className="card-hover flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-accent/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{background:`${q.c}1a`}}>
                <C className="h-5 w-5" style={{color:q.c}}/>
              </div>
              <div><p className="text-sm font-bold text-slate-800">{q.l}</p><p className="text-xs text-slate-400">{q.d}</p></div>
            </Link>
          );
        })}
      </div>
    </UserLayout>
  );
}
