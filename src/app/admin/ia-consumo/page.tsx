"use client";
import { AdminLayout } from "../../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge } from "../../../components/ui";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const providers = [
  { name: "Gemini Pro", calls: 124583, tokens: "18.4M", cost: "R$ 1.245", up: 14.2, color: "#4285F4" },
  { name: "OpenAI GPT-4o", calls: 84231, tokens: "12.8M", cost: "R$ 982", up: 8.4, color: "#10A37F" },
  { name: "Claude 3.5 Sonnet", calls: 32412, tokens: "8.2M", cost: "R$ 678", up: 24.1, color: "#D97757" },
  { name: "DeepSeek V3", calls: 15214, tokens: "5.8M", cost: "R$ 124", up: 42.3, color: "#7c5cfc" },
  { name: "OpenRouter", calls: 4231, tokens: "1.2M", cost: "R$ 89", up: 6.2, color: "#9a80ff" },
];

export default function IAConsumoPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="IA & Consumo" subtitle="Monitoramento de uso, custos e performance dos provedores." action={<Btn variant="gold" icon="settings">Configurar providers</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Mensagens (30d)", v: "256.432", d: "+14.2%", c: "#7c5cfc" },
          { t: "Tokens consumidos", v: "45.2M", d: "+18.7%", c: "#d4af37" },
          { t: "Usuários ativos IA", v: "6.125", d: "+11.3%", c: "#00c896" },
          { t: "Custo estimado", v: "R$ 3.456", d: "+9.8%", c: "#ff5c7a" },
        ].map(s => (
          <div key={s.t} className="rounded-2xl border border-white/8 bg-secondary/50 p-4">
            <p className="text-xs font-medium text-white/50">{s.t}</p>
            <p className="mt-2 text-2xl font-extrabold">{s.v}</p>
            <p className="text-xs font-semibold" style={{ color: s.c }}>{s.d} <span className="text-white/40">vs anterior</span></p>
          </div>
        ))}
      </div>

      <Card title="Provedores de IA" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Provedor</th>
              <th className="pb-3 text-right font-medium">Chamadas</th>
              <th className="pb-3 text-right font-medium">Tokens</th>
              <th className="pb-3 text-right font-medium">Custo</th>
              <th className="pb-3 text-right font-medium">Variação</th>
              <th className="pb-3 text-center font-medium">Status</th>
            </tr></thead>
            <tbody>
              {providers.map(p => (
                <tr key={p.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: p.color }} />{p.name}</div></td>
                  <td className="text-right font-semibold">{p.calls.toLocaleString("pt-BR")}</td>
                  <td className="text-right text-white/70">{p.tokens}</td>
                  <td className="text-right font-bold">{p.cost}</td>
                  <td className="text-right font-bold text-success">+{p.up}%</td>
                  <td className="text-center"><Badge color="success">Online</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Consumo diário de tokens (30 dias)" className="mt-5" dark>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={Array.from({length:30},(_,i) => ({ d:`${i+1}`, v: 800+Math.round(Math.abs(Math.sin(i/2))*1200) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}k`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Bar dataKey="v" fill="#7c5cfc" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AdminLayout>
  );
}
