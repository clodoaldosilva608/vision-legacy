"use client";
import { Card, PageHeader, Btn, StatBox } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const reportData = ["Jan","Fev","Mar","Abr","Mai","Jun"].map((m, i) => ({
  m, score: [320, 380, 450, 520, 620, 726][i], habitos: [60, 65, 72, 78, 84, 86][i], metas: [3, 5, 6, 8, 11, 12][i]
}));

export default function RelatoriosPage() {
  return (
    <>
      <PageHeader title="Relatórios" subtitle="Análise completa da sua evolução pessoal." action={<Btn variant="gold" icon="doc">Exportar PDF</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Vision Score" value="726" change="+126 pts em 6 meses" icon="trending" color="#7c5cfc" />
        <StatBox label="Hábitos médios" value="86%" change="+26% em 6 meses" icon="repeat" color="#00c896" />
        <StatBox label="Metas concluídas" value="12" change="+9 em 6 meses" icon="target" color="#d4af37" />
        <StatBox label="Patrimônio" value="+R$ 88k" change="evolução 6m" icon="wallet" color="#3b82f6" />
      </div>

      <Card title="Evolução semestral" className="mt-5">
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="score" fill="#7c5cfc" radius={[6,6,0,0]} name="Vision Score" />
              <Bar dataKey="habitos" fill="#00c896" radius={[6,6,0,0]} name="Hábitos %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Card title="Insights da IA — Últimos 30 dias">
          <ul className="space-y-3">
            {[
              "Você manteve 86% de aderência aos hábitos — recorde pessoal.",
              "Sua produtividade aumentou 23% após adotar a rotina matinal.",
              "Investiu 18% da renda — acima da meta de 15%.",
              "Reduziu tela à noite em 42% — melhor qualidade de sono.",
            ].map(i => (
              <li key={i} className="flex gap-2 text-sm text-slate-600"><Icon.checkCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />{i}</li>
            ))}
          </ul>
        </Card>
        <Card title="Pontos de atenção">
          <ul className="space-y-3">
            {[
              "Tempo de leitura caiu 12% — meta: 30 min/dia.",
              "3 metas estão sem progresso há 14+ dias.",
              "Sequência de meditação interrompida no dia 19/05.",
              "Despesas com lazer aumentaram 28% — revisar orçamento.",
            ].map(i => (
              <li key={i} className="flex gap-2 text-sm text-slate-600"><Icon.bolt className="mt-0.5 h-4 w-4 shrink-0 text-danger" />{i}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
