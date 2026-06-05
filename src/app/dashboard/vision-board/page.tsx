"use client";
import { useState } from "react";
import { PageHeader, Card, Btn, Badge } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";

const boards = [
  { t: "Liberdade financeira", color: "from-emerald-400 to-teal-600", items: 12, cat: "Wealth", icon: "wallet" as IconName },
  { t: "Casa dos sonhos", color: "from-amber-400 to-orange-600", items: 8, cat: "Lifestyle", icon: "heart" as IconName },
  { t: "Viagens 2026", color: "from-sky-400 to-indigo-600", items: 18, cat: "Lifestyle", icon: "globe" as IconName },
  { t: "Meu negócio 7 dígitos", color: "from-purple-400 to-fuchsia-600", items: 24, cat: "Business", icon: "briefcase" as IconName },
  { t: "Saúde e forma ideal", color: "from-rose-400 to-pink-600", items: 10, cat: "Lifestyle", icon: "heart" as IconName },
  { t: "Legado familiar", color: "from-slate-400 to-slate-700", items: 7, cat: "Legacy", icon: "shield" as IconName },
  { t: "Livro publicado", color: "from-yellow-400 to-amber-600", items: 5, cat: "Legacy", icon: "book" as IconName },
  { t: "Mente elevada", color: "from-cyan-400 to-blue-600", items: 14, cat: "Growth", icon: "sparkles" as IconName },
];

const pinImages = [
  { t: "Renda extra: 7 ideias provadas", c: "from-amber-500 to-orange-600", h: "tall", likes: "1.2k" },
  { t: "Rotina matinal do Visionário", c: "from-emerald-500 to-teal-600", h: "short", likes: "842" },
  { t: "Home office perfeito em 2026", c: "from-slate-500 to-slate-700", h: "medium", likes: "567" },
  { t: "Mentalidade milionária", c: "from-gold to-amber-600", h: "tall", likes: "2.1k" },
  { t: "Mapa numerológico completo", c: "from-violet-500 to-purple-700", h: "short", likes: "924" },
  { t: "Planejamento financeiro anual", c: "from-blue-500 to-indigo-600", h: "medium", likes: "432" },
  { t: "Livros que mudaram minha vida", c: "from-rose-500 to-pink-600", h: "short", likes: "1.5k" },
  { t: "Legado: o que importa no fim", c: "from-emerald-600 to-slate-700", h: "tall", likes: "3.2k" },
];

export default function VisionBoardPage() {
  const [tab, setTab] = useState("Boards");

  return (
    <>
      <PageHeader
        title="Vision Board"
        subtitle="Materialize seus sonhos com imagens, metas e inspirações."
        action={<div className="flex gap-2"><Btn variant="secondary" icon="bolt">Adicionar pin</Btn><Btn variant="gold" icon="folder">Novo board</Btn></div>}
      />

      <div className="mb-5 flex items-center gap-2">
        {["Boards", "Pins", "Metas do board", "IA: inspirações"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-accent text-white" : "text-slate-600 hover:bg-white"}`}>{t}</button>
        ))}
      </div>

      {tab === "Boards" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boards.map((b) => {
            const C = Icon[b.icon];
            return (
              <div key={b.t} className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
                <div className={`relative flex h-40 items-end bg-gradient-to-br ${b.color} p-5`}>
                  <C className="absolute right-4 top-4 h-10 w-10 text-white/70" />
                  <div>
                    <Badge color="gold">{b.cat}</Badge>
                    <h3 className="mt-2 text-lg font-extrabold text-white">{b.t}</h3>
                    <p className="text-xs text-white/80">{b.items} cards</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs">
                  <span className="font-semibold text-slate-600">Visualizar board →</span>
                  <span className="text-slate-400">Atualizado ontem</span>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100"><Icon.folder className="h-6 w-6 text-slate-400" /></div>
            <p className="font-bold text-slate-600">Criar board</p>
            <p className="text-xs text-slate-400">Pinterest-style + Notion</p>
          </div>
        </div>
      )}

      {tab === "Pins" && (
        <div className="columns-2 gap-4 sm:columns-3 xl:columns-4 [column-fill:_balance]">
          {pinImages.map((p, i) => (
            <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
              <div className={`flex items-center justify-center bg-gradient-to-br ${p.c} ${p.h === "tall" ? "h-72" : p.h === "short" ? "h-40" : "h-56"}`}>
                <Icon.sparkles className="h-12 w-12 text-white/70" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-800">{p.t}</h3>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{p.likes} curtidas</span>
                  <Icon.heart className="h-4 w-4 text-danger" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Metas do board" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Casa própria em 2028", "Renda passiva R$ 5k/mês", "50 livros em 2026", "Maratona 42km", "30 países visitados", "Publicar primeiro livro"].map((m, idx) => (
            <Card key={m}>
              <h3 className="text-lg font-bold text-slate-800">{m}</h3>
              <div className="mt-3"><span className="text-xs font-bold text-slate-400">Progresso</span><div className="mt-2 h-3 w-full rounded-full bg-slate-100"><div className="h-3 rounded-full bg-gradient-to-r from-accent to-gold" style={{ width: `${[45,72,30,55,25,60][idx]}%` }} /></div></div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400"><Icon.calendar className="h-4 w-4" /> Prazo: dezembro 2026</div>
            </Card>
          ))}
        </div>
      )}

      {tab === "IA: inspirações" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10"><Icon.sparkles className="h-5 w-5 text-accent" /></div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Vision AI™ — Sugestões para o seu board</h3>
              <div className="mt-4 space-y-3">
                {[
                  "Adicione uma imagem do seu escritório dos sonhos — isso reforça o arquétipo Construtor.",
                  "Preencha o board 'Legado familiar' com 7 cartões — é o seu pilar mais fraco hoje.",
                  "Crie uma pasta 'Eu em 5 anos' e escreva uma carta para si mesmo.",
                  "Adicione 3 símbolos de prosperidade no topo do board de riqueza.",
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-accent/5 p-4 text-sm text-slate-600">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
