"use client";
import { useState } from "react";
import { Card, PageHeader, Btn, Badge } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const products = [
  { t: "Curso: Mindset Milionário", price: "R$ 197", cat: "Curso", rating: 4.9, sales: 1248, color: "from-gold to-amber-500" },
  { t: "E-book: Mentalidade Visionária", price: "R$ 47", cat: "E-book", rating: 4.8, sales: 3215, color: "from-accent to-violet-500" },
  { t: "Template: Plano de Negócios PRO", price: "R$ 89", cat: "Template", rating: 5.0, sales: 642, color: "from-emerald-500 to-teal-500" },
  { t: "Mentoria Individual 1h", price: "R$ 497", cat: "Mentoria", rating: 5.0, sales: 128, color: "from-rose-500 to-pink-500" },
  { t: "Sistema de Hábitos Notion", price: "R$ 67", cat: "Template", rating: 4.7, sales: 894, color: "from-blue-500 to-indigo-500" },
  { t: "Pacote: Roadmap de Carreira IA", price: "R$ 297", cat: "Pacote", rating: 4.9, sales: 312, color: "from-orange-500 to-amber-500" },
];

export default function MarketplacePage() {
  const [tab, setTab] = useState("Todos");
  return (
    <>
      <PageHeader title="Marketplace" subtitle="Produtos digitais selecionados para acelerar sua jornada." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="store">Meus pedidos</Btn><Btn variant="gold" icon="bolt">Vender no Marketplace</Btn></div>
      } />

      <div className="rounded-2xl bg-gradient-to-r from-accent to-violet-600 p-6 text-white">
        <Badge color="gold">⚡ Oferta da semana</Badge>
        <h2 className="mt-3 text-2xl font-extrabold">Pacote Completo Vision Builder</h2>
        <p className="mt-1 max-w-xl text-sm text-white/80">8 cursos + 12 templates + 3 mentorias por apenas R$ 997 (de R$ 2.497).</p>
        <Btn variant="gold" className="mt-4" icon="arrowRight">Aproveitar oferta</Btn>
      </div>

      <div className="mt-5 flex gap-2 border-b border-slate-200 overflow-x-auto">
        {["Todos", "Cursos", "E-books", "Templates", "Mentorias", "Pacotes"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${tab === t ? "border-accent text-accent" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <Card key={p.t} className="!p-0 overflow-hidden transition hover:shadow-xl">
            <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${p.color}`}>
              <Icon.store className="h-12 w-12 text-white/90" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge color="accent">{p.cat}</Badge>
                <span className="flex items-center gap-0.5 text-xs font-bold text-gold"><Icon.star className="h-3 w-3" />{p.rating}</span>
              </div>
              <h3 className="mt-2 font-bold text-slate-800">{p.t}</h3>
              <p className="text-xs text-slate-500">{p.sales.toLocaleString("pt-BR")} vendas</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-extrabold text-accent">{p.price}</span>
                <Btn variant="primary" icon="bolt">Comprar</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
