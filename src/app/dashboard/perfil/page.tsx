"use client";
import { PageHeader, Card, Progress, Btn } from "../../../components/ui";
import { Icon } from "../../../components/icons";

const achievements = [
  { t: "Primeiro Login", e: "🎯", date: "Jan/26" },
  { t: "Streak 7 dias", e: "🔥", date: "Jan/26" },
  { t: "Vision Builder", e: "🏗️", date: "Fev/26" },
  { t: "Top 10 do mês", e: "⭐", date: "Mar/26" },
  { t: "Mentor 2.0", e: "🧙", date: "Abr/26" },
  { t: "R$ 100k", e: "💰", date: "Maio/26" },
  { t: "Leitor 50 livros", e: "📚", date: "Jun/26" },
  { t: "Legacy Founder", e: "👑", date: "—" },
];

const journey = ["Descoberta", "Organização", "Construção", "Expansão", "Prosperidade", "Legado"];

export default function PublicProfilePage() {
  return (
    <>
      <PageHeader
        title="Perfil Público"
        subtitle="Compartilhe sua jornada com o mundo."
        action={<div className="flex gap-2"><Btn variant="secondary" icon="edit">Editar perfil</Btn><Btn variant="gold" icon="external">Copiar link público</Btn></div>}
      />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-48 bg-gradient-to-br from-accent via-accent-light to-gold">
          <div className="absolute right-4 top-4 flex gap-2"><Btn variant="ghost" icon="message">Mensagem</Btn><Btn variant="gold" icon="users">Seguir</Btn></div>
        </div>
        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-accent to-accent-light text-4xl font-extrabold text-white shadow-xl">CS</div>
          <div className="pt-16">
            <div className="flex flex-wrap items-end gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900">Clodoaldo Silva</h1>
              <span className="mb-1 text-gold-gradient text-sm font-bold">@clodoaldo</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Fundador do Vision Legacy™ · Construindo um império de valor e impacto.</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Empreendedor(a)", "Investidor(a)", "Palestrante", "Mentor(a)", "Autor(a)"].map((t) => (
                <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{t}</span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              {[
                { l: "Vision Score", v: "726" },
                { l: "Arquétipo", v: "Visionário" },
                { l: "Nível", v: "14" },
                { l: "Membros", v: "1.2k" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">{s.l}</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Card title="Mapa de Evolução">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {journey.map((j, i) => (
                <div key={j} className="flex flex-col items-center gap-1">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full font-extrabold ${i <= 2 ? "bg-accent text-white" : "bg-slate-100 text-slate-400"}`}>{i + 1}</div>
                  <span className={`text-xs font-semibold ${i <= 2 ? "text-slate-700" : "text-slate-400"}`}>{j}</span>
                </div>
              ))}
            </div>
            <div className="mt-4"><Progress value={65} /></div>
            <p className="mt-2 text-sm font-semibold text-accent">Construção — 65% concluído</p>
          </Card>

          <Card title="Conquistas recentes">
            <div className="grid gap-2 sm:grid-cols-2">
              {achievements.map((a) => (
                <div key={a.t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-2xl">{a.e}</div>
                  <div className="flex-1"><p className="font-bold text-slate-800">{a.t}</p><p className="text-xs text-slate-400">{a.date}</p></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Sobre">
            <p className="text-sm text-slate-600">Construo negócios digitais, lidero comunidades e acredito que autoconhecimento é o melhor investimento do mundo. Vision Legacy™ é minha forma de compartilhar isso com milhões de pessoas.</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2"><Icon.globe className="h-4 w-4 text-slate-400" /> Brasil · Global</div>
              <div className="flex gap-2"><Icon.heart className="h-4 w-4 text-slate-400" /> Empreendedorismo, IA, Investimentos</div>
              <div className="flex gap-2"><Icon.calendar className="h-4 w-4 text-slate-400" /> Na plataforma desde Jan/2026</div>
            </div>
          </Card>

          <Card title="Pilares">
            <div className="space-y-3">
              {[
                { k: "Identity", v: 85, c: "#7c5cfc" }, { k: "Growth", v: 70, c: "#9a80ff" },
                { k: "Business", v: 65, c: "#d4af37" }, { k: "Wealth", v: 75, c: "#ff5c7a" },
                { k: "Legacy", v: 90, c: "#00c896" },
              ].map((p) => (
                <div key={p.k}>
                  <div className="mb-1 flex justify-between text-xs font-semibold"><span className="text-slate-600">{p.k}</span><span style={{ color: p.c }}>{p.v}%</span></div>
                  <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full" style={{ width: `${p.v}%`, background: p.c }} /></div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Estatísticas">
            <div className="space-y-3 text-sm">
              {[
                { l: "Metas concluídas", v: 18 }, { l: "Cursos terminados", v: 6 },
                { l: "Dias ativos", v: 142 }, { l: "XP acumulado", v: "18.4k" },
                { l: "Cargo Discord", v: "Vision Elite" },
              ].map((s) => (
                <div key={s.l} className="flex justify-between border-b border-slate-100 pb-2 last:border-0"><span className="text-slate-500">{s.l}</span><span className="font-bold text-slate-800">{s.v}</span></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
