"use client";
import { useState } from "react";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const courses = [
  { t: "Mindset Milionário", cat: "Wealth", duration: "8h 30m", students: 1248, rating: 4.9, p: 65, color: "from-gold to-amber-400" },
  { t: "IA Aplicada a Negócios", cat: "Business", duration: "12h 00m", students: 856, rating: 4.8, p: 30, color: "from-accent to-accent-light" },
  { t: "Numerologia Avançada", cat: "Identity", duration: "6h 15m", students: 2103, rating: 5.0, p: 100, color: "from-rose-500 to-pink-400" },
  { t: "Liberdade Financeira", cat: "Wealth", duration: "10h 45m", students: 1872, rating: 4.7, p: 0, color: "from-emerald-500 to-green-400" },
  { t: "Liderança Visionária", cat: "Growth", duration: "7h 20m", students: 645, rating: 4.9, p: 15, color: "from-blue-500 to-sky-400" },
  { t: "Construindo Legado Familiar", cat: "Legacy", duration: "9h 10m", students: 428, rating: 5.0, p: 0, color: "from-violet-500 to-purple-400" },
];

const trilhas = [
  { t: "Trilha Vision Builder", d: "Do mindset à execução estratégica.", courses: 8, hours: 42, color: "bg-accent" },
  { t: "Trilha Vision Wealth", d: "Construa sua liberdade financeira.", courses: 12, hours: 65, color: "bg-success" },
  { t: "Trilha Vision Legacy", d: "Crie um legado que atravessa gerações.", courses: 10, hours: 58, color: "bg-gold" },
];

export default function UniversidadePage() {
  const [tab, setTab] = useState("Todos os cursos");
  return (
    <>
      <PageHeader title="Universidade Vision" subtitle="Cursos, trilhas e certificações para sua evolução contínua." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="award">Meus certificados</Btn><Btn variant="gold" icon="search">Buscar curso</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Cursos em andamento" value="3" icon="book" color="#7c5cfc" />
        <StatBox label="Horas estudadas" value="64h" change="+12h este mês" icon="bolt" color="#d4af37" />
        <StatBox label="Certificações" value="5" change="próx: Vision Master" icon="award" color="#00c896" />
        <StatBox label="Ranking aluno" value="#127" change="top 2%" icon="trending" color="#3b82f6" />
      </div>

      <Card title="Trilhas de aprendizado" className="mt-5">
        <div className="grid gap-4 md:grid-cols-3">
          {trilhas.map(t => (
            <div key={t.t} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className={`${t.color} flex h-24 items-center justify-center`}>
                <Icon.layers className="h-10 w-10 text-white/80" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800">{t.t}</h3>
                <p className="mt-1 text-xs text-slate-500">{t.d}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Icon.book className="h-3 w-3" /> {t.courses} cursos</span>
                  <span className="flex items-center gap-1"><Icon.bolt className="h-3 w-3" /> {t.hours}h</span>
                </div>
                <Btn variant="secondary" className="mt-3 w-full justify-center">Iniciar trilha</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5 flex gap-2 border-b border-slate-200 overflow-x-auto">
        {["Todos os cursos", "Lifestyle", "Business", "Wealth", "Legacy", "IA"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${tab === t ? "border-accent text-accent" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => (
          <Card key={c.t} className="overflow-hidden !p-0">
            <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${c.color}`}>
              <Icon.play className="h-12 w-12 text-white/90" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge color="accent">{c.cat}</Badge>
                <span className="flex items-center gap-0.5 text-xs font-bold text-gold"><Icon.star className="h-3 w-3" />{c.rating}</span>
              </div>
              <h3 className="mt-2 font-bold text-slate-800">{c.t}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Icon.bolt className="h-3 w-3" />{c.duration}</span>
                <span className="flex items-center gap-1"><Icon.users className="h-3 w-3" />{c.students.toLocaleString("pt-BR")} alunos</span>
              </div>
              {c.p > 0 ? (
                <><div className="mt-3"><Progress value={c.p} /></div>
                <Btn variant="primary" className="mt-3 w-full justify-center">{c.p === 100 ? "Revisar curso" : `Continuar (${c.p}%)`}</Btn></>
              ) : (
                <Btn variant="secondary" className="mt-3 w-full justify-center">Começar curso</Btn>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
