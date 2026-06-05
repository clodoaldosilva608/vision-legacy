"use client";
import { Card, PageHeader, Btn, Badge, Progress, StatBox } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const metas = [
  { t: "Atingir R$ 50k MRR", cat: "Negócio", p: 72, due: "Dez/2026", color: "#7c5cfc" },
  { t: "Publicar livro de IA aplicada", cat: "Legado", p: 35, due: "Ago/2026", color: "#d4af37" },
  { t: "Investir R$ 200k em ações", cat: "Patrimônio", p: 88, due: "Nov/2026", color: "#00c896" },
  { t: "Correr maratona 42km", cat: "Saúde", p: 55, due: "Out/2026", color: "#ff5c7a" },
  { t: "Aprender espanhol fluente", cat: "Aprendizado", p: 42, due: "Dez/2026", color: "#3b82f6" },
  { t: "Construir holding familiar", cat: "Família", p: 25, due: "Mar/2027", color: "#9a80ff" },
];

export default function MetasPage() {
  return (
    <>
      <PageHeader title="Metas" subtitle="Sistema SMART de metas alinhadas ao seu Vision Method™." action={<Btn variant="gold" icon="target">Nova meta</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Metas ativas" value="12" change="3 prioritárias" icon="target" color="#7c5cfc" />
        <StatBox label="Concluídas no ano" value="18" change="+30% vs ano passado" icon="checkCircle" color="#00c896" />
        <StatBox label="Progresso médio" value="56%" change="ritmo saudável" icon="trending" color="#d4af37" />
        <StatBox label="Próx. vencimento" value="14 dias" change="Meta: maratona" icon="flame" color="#ff5c7a" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metas.map(m => (
          <Card key={m.t}>
            <div className="flex items-start justify-between">
              <Badge color="accent">{m.cat}</Badge>
              <button className="text-slate-400 hover:text-slate-700"><Icon.edit className="h-4 w-4" /></button>
            </div>
            <h3 className="mt-3 font-bold text-slate-800">{m.t}</h3>
            <p className="mt-1 text-xs text-slate-500">Prazo: {m.due}</p>
            <div className="mt-4 flex items-center gap-2">
              <Progress value={m.p} color={m.color} />
              <span className="text-sm font-bold" style={{ color: m.color }}>{m.p}%</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-500"><Icon.checkCircle className="h-3 w-3 text-success" /> 4 marcos</span>
              <span className="flex items-center gap-1 text-slate-500"><Icon.message className="h-3 w-3" /> 12 notas</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
