"use client";
import { PageHeader, Btn, Badge } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const kanbanCols = [
  { title: "Ideias", color: "bg-slate-200 text-slate-700", items: [
    { t: "Lançar curso de IA aplicada", tags: ["Business", "Educação"], priority: "Média" },
    { t: "Pesquisa de mercado LATAM", tags: ["Pesquisa"], priority: "Baixa" },
  ]},
  { title: "Planejamento", color: "bg-blue-200 text-blue-700", items: [
    { t: "Vision Legacy v2.0", tags: ["Produto"], priority: "Alta" },
    { t: "Estratégia de afiliados", tags: ["Growth"], priority: "Média" },
  ]},
  { title: "Em execução", color: "bg-accent/30 text-accent", items: [
    { t: "Universidade — 3 cursos novos", tags: ["Conteúdo"], priority: "Alta" },
    { t: "Integração Discord Bot", tags: ["Tech"], priority: "Alta" },
    { t: "Campanha de lançamento", tags: ["Marketing"], priority: "Média" },
  ]},
  { title: "Concluído", color: "bg-success/20 text-success", items: [
    { t: "MVP da plataforma", tags: ["Produto"], priority: "Alta" },
    { t: "Sistema de pagamentos", tags: ["Tech"], priority: "Alta" },
  ]},
];

export default function ProjetosPage() {
  return (
    <>
      <PageHeader title="Projetos" subtitle="Gerencie suas iniciativas com Kanban, checklists e IA." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="layers">Modo lista</Btn><Btn variant="gold" icon="folder">Novo projeto</Btn></div>
      } />

      <div className="grid gap-4 md:grid-cols-4">
        {kanbanCols.map(col => (
          <div key={col.title} className="rounded-2xl bg-slate-100 p-3">
            <div className={`mb-3 flex items-center justify-between rounded-lg px-2.5 py-1.5 ${col.color}`}>
              <span className="text-xs font-bold uppercase">{col.title}</span>
              <span className="rounded bg-white/60 px-1.5 py-0.5 text-[10px] font-bold">{col.items.length}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((it, i) => (
                <div key={i} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
                  <p className="text-sm font-semibold text-slate-700">{it.t}</p>
                  <div className="mt-2 flex flex-wrap gap-1">{it.tags.map(t => <Badge key={t} color="accent">{t}</Badge>)}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge color={it.priority === "Alta" ? "danger" : it.priority === "Média" ? "gold" : "slate"}>{it.priority}</Badge>
                    <div className="flex -space-x-1">
                      {[0,1].map(j => <div key={j} className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-accent to-accent-light" />)}
                    </div>
                  </div>
                </div>
              ))}
              <button className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-400 hover:bg-white"><Icon.bolt className="h-3 w-3" /> Adicionar card</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
