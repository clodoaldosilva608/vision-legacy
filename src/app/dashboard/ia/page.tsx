"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Card, Btn, Badge, Progress } from "../../../components/ui";
import { Icon, type IconName } from "../../../components/icons";

const conversations = [
  { id: 1, title: "Plano de carreira 2026", time: "Agora", active: true },
  { id: 2, title: "Análise do meu Business Model", time: "Ontem" },
  { id: 3, title: "Estratégia de investimentos", time: "2 dias" },
  { id: 4, title: "Rotina matinal de alta performance", time: "5 dias" },
  { id: 5, title: "Análise do meu arquétipo", time: "1 semana" },
];

const initialMessages = [
  { role: "ai", text: "Olá Clodoaldo! Sou sua Vision AI™. Como posso te ajudar hoje?" },
  { role: "user", text: "Quero criar um plano estratégico para 2026 focado em crescimento de receita." },
  { role: "ai", text: "Perfeito! Com base no seu Vision Score (726) e arquétipo Visionário, sugiro 4 pilares:\n\n1. **Diversificação de receita** — 3 novas fontes\n2. **Automação com IA** — reduzir 40% do tempo operacional\n3. **Comunidade premium** — lançar mastermind R$ 5k/mês\n4. **Investimentos passivos** — 25% da renda em ativos\n\nQuer que eu detalhe cada pilar com OKRs trimestrais?" },
  { role: "user", text: "Sim, comece pelo pilar 1." },
];

export default function IAPage() {
  const { profile, updateProfile } = useAuthStore();
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState(profile?.ai_provider || "Gemini Pro");
  const [messages, setMessages] = useState(initialMessages);

  // Sync state when profile loads
  useEffect(() => {
    if (profile?.ai_provider) {
      setProvider(profile.ai_provider);
    }
  }, [profile?.ai_provider]);

  const handleProviderChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value;
    setProvider(newProvider);
    await updateProfile({ ai_provider: newProvider });
  };

  const send = () => {
    if (!input.trim()) return;
    const msg = input;
    setMessages(m => [...m, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: `Ótima pergunta sobre "${msg}". Com base no seu Vision Score 726 e arquétipo Visionário, a Vision AI™ recomenda focar em ações de alto impacto e alavancagem. Posso aprofundar com um plano de 90 dias?` }]);
    }, 900);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
            <Icon.sparkles className="h-6 w-6 text-accent" /> Vision AI™
          </h1>
          <p className="text-sm text-slate-500">Sua mentora pessoal de IA</p>
        </div>
        <div className="flex gap-2">
          <select value={provider} onChange={handleProviderChange} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold">
            <option>Gemini Pro</option><option>GPT-4o</option><option>Claude 3.5</option><option>DeepSeek V3</option>
          </select>
          <Btn variant="secondary" icon="settings">BYOK</Btn>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <Btn variant="primary" icon="message" className="mb-4 w-full justify-center">Nova conversa</Btn>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Conversas</p>
          <div className="space-y-1">
            {conversations.map(c => (
              <button key={c.id} className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition ${c.active ? "bg-accent/10 text-accent" : "hover:bg-slate-100 text-slate-600"}`}>
                <Icon.message className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{c.title}</span>
                <span className="shrink-0 text-[10px] text-slate-400">{c.time}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-gradient-to-br from-accent/10 to-gold/10 p-3">
            <p className="text-xs font-bold text-slate-700">Memory Engine</p>
            <p className="mt-1 text-[11px] text-slate-500">142 lembranças ativas</p>
            <div className="mt-2"><Progress value={68} /></div>
            <p className="mt-2 text-[11px] text-slate-500">Contexto: 68% utilizado</p>
          </div>
        </Card>

        <Card className="flex h-[640px] flex-col lg:col-span-3">
          <div className="-mt-1 mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="font-bold text-slate-800">Plano de carreira 2026</p>
              <p className="text-xs text-slate-400">Modelo: {provider} • RAG ativo • 24 mensagens</p>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Icon.doc className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Icon.edit className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent"><Icon.sparkles className="h-4 w-4 text-white" /></div>}
                <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-tr-sm bg-accent text-white" : "rounded-tl-sm bg-slate-100 text-slate-700"}`}>
                  {m.text}
                </div>
                {m.role === "user" && <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-accent to-accent-light" />}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 p-2">
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Pergunte sobre metas, negócios, finanças, hábitos..." className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none" rows={2} />
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <div className="flex gap-1">
                {["doc", "hash", "bolt"].map(ic => { const C = Icon[ic as IconName]; return <button key={ic} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><C className="h-4 w-4" /></button>; })}
              </div>
              <button onClick={send} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white">Enviar <Icon.send className="h-4 w-4" /></button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
