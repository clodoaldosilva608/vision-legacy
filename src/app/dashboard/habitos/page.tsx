"use client";
import { PageHeader, Btn, StatBox } from "../../../components/ui";
import { Card } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const habits = [
  { name: "Meditar 10 min", days: [1,1,1,1,1,0,1,1,1,1,1,1], streak: 12, color: "#7c5cfc" },
  { name: "Treino físico", days: [1,0,1,1,1,1,0,1,1,1,1,1], streak: 8, color: "#00c896" },
  { name: "Leitura 30 min", days: [1,1,1,1,1,1,1,1,1,1,1,1], streak: 23, color: "#d4af37" },
  { name: "Beber 3L água", days: [0,1,1,0,1,1,1,1,0,1,1,1], streak: 5, color: "#3b82f6" },
  { name: "Diário de gratidão", days: [1,1,0,1,1,1,1,1,1,1,1,1], streak: 18, color: "#ff5c7a" },
  { name: "Sem açúcar refinado", days: [1,1,1,0,1,1,1,1,1,1,1,1], streak: 14, color: "#9a80ff" },
];
const days = ["S","T","Q","Q","S","S","D","S","T","Q","Q","S"];

export default function HabitosPage() {
  return (
    <>
      <PageHeader title="Hábitos" subtitle="Sistemas vencem objetivos. Construa seu sistema diário." action={<Btn variant="gold" icon="repeat">Novo hábito</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBox label="Hábitos ativos" value="9" icon="repeat" color="#7c5cfc" />
        <StatBox label="Streak máximo" value="23 dias" change="Leitura 30 min" icon="flame" color="#ff5c7a" />
        <StatBox label="Aderência semanal" value="86%" change="+4% vs semana ant." icon="trending" color="#00c896" />
        <StatBox label="XP ganho hoje" value="240" change="+3 hábitos" icon="bolt" color="#d4af37" />
      </div>

      <Card title="Tracker semanal" className="mt-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr>
              <th className="pb-2 text-left text-xs font-semibold text-slate-400">Hábito</th>
              {days.map((d, i) => <th key={i} className="pb-2 text-center text-xs font-semibold text-slate-400">{d}</th>)}
              <th className="pb-2 text-right text-xs font-semibold text-slate-400">Streak</th>
            </tr></thead>
            <tbody>
              {habits.map(h => (
                <tr key={h.name} className="border-t border-slate-100">
                  <td className="py-3 text-sm font-semibold text-slate-700">{h.name}</td>
                  {h.days.map((d, i) => (
                    <td key={i} className="py-3 text-center">
                      <div className="mx-auto h-7 w-7 rounded-md transition" style={{ background: d ? h.color : "#f1f5f9" }}>
                        {d ? <Icon.check className="mx-auto mt-1 h-5 w-5 text-white" /> : null}
                      </div>
                    </td>
                  ))}
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                      <Icon.flame className="h-3 w-3" /> {h.streak}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
