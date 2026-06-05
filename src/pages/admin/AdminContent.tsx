import { AdminLayout } from "../../components/AdminLayout";
import { AdminPageHeader, Card, Btn, Badge, Progress } from "../../components/ui";
import { Icon, type IconName } from "../../components/icons";

function MiniStat({ title, value, icon, color = "#7c5cfc" }: { title: string; value: string; icon: IconName; color?: string }) {
  const C = Icon[icon];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-secondary/50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}22` }}><C className="h-5 w-5" style={{ color }} /></div>
      <div><p className="text-xs text-white/50">{title}</p><p className="text-xl font-extrabold">{value}</p></div>
    </div>
  );
}

/* ============================================
   ADMIN UNIVERSIDADE
   ============================================ */
const adminCourses = [
  { t: "Mindset Milionário", instructor: "Clodoaldo Silva", students: 1248, lessons: 24, status: "Publicado", price: "R$ 197" },
  { t: "IA Aplicada a Negócios", instructor: "Vision Team", students: 856, lessons: 32, status: "Publicado", price: "R$ 297" },
  { t: "Numerologia Avançada", instructor: "Maria Espiritualidade", students: 2103, lessons: 18, status: "Publicado", price: "R$ 147" },
  { t: "Liberdade Financeira", instructor: "Pedro Investidor", students: 1872, lessons: 28, status: "Publicado", price: "R$ 247" },
  { t: "Liderança Visionária", instructor: "Ana Mentora", students: 645, lessons: 20, status: "Rascunho", price: "R$ 197" },
  { t: "Vision OS — Em produção", instructor: "Vision Team", students: 0, lessons: 8, status: "Em produção", price: "—" },
];

export function AdminUniversidadePage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Universidade" subtitle="Gestão de cursos, trilhas e conteúdo educacional." action={<Btn variant="gold" icon="layers">Novo curso</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Cursos" value="42" icon="book" color="#7c5cfc" />
        <MiniStat title="Alunos totais" value="14.823" icon="users" color="#00c896" />
        <MiniStat title="Horas de conteúdo" value="384h" icon="bolt" color="#d4af37" />
        <MiniStat title="Certificados emitidos" value="2.156" icon="award" color="#3b82f6" />
      </div>

      <Card title="Todos os cursos" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Curso</th>
              <th className="pb-3 text-left font-medium">Instrutor</th>
              <th className="pb-3 text-right font-medium">Aulas</th>
              <th className="pb-3 text-right font-medium">Alunos</th>
              <th className="pb-3 text-right font-medium">Preço</th>
              <th className="pb-3 text-center font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {adminCourses.map(c => (
                <tr key={c.t} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3"><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20"><Icon.play className="h-4 w-4 text-accent" /></div><span className="font-semibold">{c.t}</span></div></td>
                  <td className="text-white/70">{c.instructor}</td>
                  <td className="text-right text-white/70">{c.lessons}</td>
                  <td className="text-right font-bold">{c.students.toLocaleString("pt-BR")}</td>
                  <td className="text-right font-semibold text-gold">{c.price}</td>
                  <td className="text-center"><Badge color={c.status === "Publicado" ? "success" : c.status === "Rascunho" ? "slate" : "gold"}>{c.status}</Badge></td>
                  <td className="text-right"><div className="flex justify-end gap-1">
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
                    <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-accent"><Icon.external className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN BLOG
   ============================================ */
export function AdminBlogPage() {
  const posts = [
    { t: "10 hábitos dos visionários", author: "Clodoaldo Silva", views: 12482, status: "Publicado", date: "23/05" },
    { t: "Como a numerologia ajuda nos negócios", author: "Maria E.", views: 8421, status: "Publicado", date: "21/05" },
    { t: "Guia completo de BYOK para IA", author: "Vision Team", views: 6315, status: "Publicado", date: "19/05" },
    { t: "Patrimônio inteligente em 2026", author: "Pedro Investidor", views: 5128, status: "Publicado", date: "15/05" },
    { t: "Construindo legado familiar", author: "Ana Mentora", views: 0, status: "Rascunho", date: "—" },
  ];
  return (
    <AdminLayout>
      <AdminPageHeader title="Blog" subtitle="Conteúdo editorial e SEO." action={<Btn variant="gold" icon="doc">Novo post</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Posts publicados" value="86" icon="doc" color="#7c5cfc" />
        <MiniStat title="Visualizações (mês)" value="184k" icon="globe" color="#00c896" />
        <MiniStat title="Tempo médio" value="4m 32s" icon="bolt" color="#d4af37" />
        <MiniStat title="Inscritos newsletter" value="8.421" icon="bell" color="#3b82f6" />
      </div>

      <Card title="Posts" className="mt-5" dark>
        <div className="space-y-2">
          {posts.map(p => (
            <div key={p.t} className="flex items-center gap-3 rounded-xl border border-white/5 p-3 hover:bg-white/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20"><Icon.doc className="h-5 w-5 text-accent" /></div>
              <div className="flex-1">
                <p className="font-semibold">{p.t}</p>
                <p className="text-xs text-white/40">{p.author} · {p.date} · {p.views.toLocaleString("pt-BR")} views</p>
              </div>
              <Badge color={p.status === "Publicado" ? "success" : "slate"}>{p.status}</Badge>
              <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN RAG / BIBLIOTECA
   ============================================ */
export function AdminRAGPage() {
  const docs = [
    { name: "Livro: Mindset Milionário.pdf", size: "8.2 MB", chunks: 1284, status: "Indexado", date: "12/05" },
    { name: "Apostila Numerologia Pitagórica.pdf", size: "4.6 MB", chunks: 824, status: "Indexado", date: "08/05" },
    { name: "Vision Method Whitepaper.docx", size: "1.2 MB", chunks: 156, status: "Indexado", date: "05/05" },
    { name: "Manual de Hábitos.md", size: "342 KB", chunks: 82, status: "Indexado", date: "01/05" },
    { name: "Pesquisa Mercado 2026.pdf", size: "12.4 MB", chunks: 0, status: "Processando", date: "Hoje" },
  ];
  return (
    <AdminLayout>
      <AdminPageHeader title="Biblioteca (RAG Engine)" subtitle="Base de conhecimento que alimenta a Vision AI." action={
        <div className="flex gap-2"><Btn variant="secondary" icon="database">Reindexar tudo</Btn><Btn variant="gold" icon="doc">Upload documento</Btn></div>
      } />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Documentos" value="184" icon="doc" color="#7c5cfc" />
        <MiniStat title="Chunks indexados" value="42.318" icon="layers" color="#00c896" />
        <MiniStat title="Tamanho do índice" value="2.4 GB" icon="database" color="#d4af37" />
        <MiniStat title="Queries (30d)" value="186k" icon="search" color="#3b82f6" />
      </div>

      <Card title="Pipeline de processamento" className="mt-5" dark>
        <div className="grid gap-3 md:grid-cols-5">
          {["Upload","Chunking","Embedding","Vector Store","Retrieval"].map((s, i) => (
            <div key={s} className="rounded-xl border border-white/8 bg-dark p-3 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/20"><span className="font-bold text-accent">{i+1}</span></div>
              <p className="text-sm font-semibold">{s}</p>
              <p className="mt-1 text-[10px] text-white/40">{["Ingestão","Divisão","Vetorização","Armazenamento","Busca"][i]}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Documentos" className="mt-5" dark>
        <div className="space-y-2">
          {docs.map(d => (
            <div key={d.name} className="flex items-center gap-3 rounded-xl border border-white/5 p-3 hover:bg-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20"><Icon.doc className="h-5 w-5 text-accent" /></div>
              <div className="flex-1">
                <p className="font-semibold">{d.name}</p>
                <p className="text-xs text-white/40">{d.size} · {d.chunks.toLocaleString("pt-BR")} chunks · {d.date}</p>
              </div>
              <Badge color={d.status === "Indexado" ? "success" : "gold"}>{d.status}</Badge>
              <button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-danger"><Icon.ban className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN CURSOS (igual Universidade, mais focado)
   ============================================ */
export function AdminCursosPage() {
  return <AdminUniversidadePage />;
}

/* ============================================
   ADMIN CERTIFICAÇÕES
   ============================================ */
const certs = [
  { name: "Vision Explorer", level: 1, holders: 8421, color: "from-slate-400 to-slate-500" },
  { name: "Vision Builder", level: 2, holders: 3214, color: "from-blue-400 to-blue-500" },
  { name: "Vision Strategist", level: 3, holders: 1248, color: "from-accent to-violet-500" },
  { name: "Vision Master", level: 4, holders: 412, color: "from-emerald-400 to-emerald-500" },
  { name: "Vision Legacy", level: 5, holders: 87, color: "from-gold to-amber-500" },
];

export function AdminCertificacoesPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Certificações" subtitle="5 níveis · 2.156 certificados emitidos." action={<Btn variant="gold" icon="award">Nova certificação</Btn>} />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {certs.map(c => (
          <Card key={c.name} dark className="!p-0 overflow-hidden">
            <div className={`flex h-32 flex-col items-center justify-center bg-gradient-to-br ${c.color}`}>
              <Icon.award className="h-10 w-10 text-white" />
              <p className="mt-2 text-xs font-bold text-white/80">NÍVEL {c.level}</p>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-bold">{c.name}</h3>
              <p className="mt-1 text-2xl font-extrabold text-accent">{c.holders.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-white/40">portadores</p>
              <Btn variant="secondary" className="mt-3 w-full justify-center">Configurar</Btn>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Critérios e regras" className="mt-5" dark>
        <div className="space-y-3">
          {[
            { c: "Vision Explorer", r: "Cadastro + Onboarding completo + 5 hábitos ativos" },
            { c: "Vision Builder", r: "Vision Score 400+ · 30 dias ativos · 3 cursos concluídos" },
            { c: "Vision Strategist", r: "Vision Score 600+ · BMC + SWOT preenchidos · 60 dias ativos" },
            { c: "Vision Master", r: "Vision Score 800+ · 6 cursos · 1 mentoria · 6 meses ativos" },
            { c: "Vision Legacy", r: "Vision Score 950+ · Todas as trilhas · 12 meses ativos · contribuição comunidade" },
          ].map(x => (
            <div key={x.c} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <Icon.award className="h-5 w-5 text-gold" />
              <div className="flex-1"><p className="font-semibold">{x.c}</p><p className="text-xs text-white/50">{x.r}</p></div>
              <Btn variant="ghost" icon="edit">Editar</Btn>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN MISSÕES
   ============================================ */
const missionsData = [
  { name: "Meditar 10 minutos", type: "Diária", xp: 50, completions: 8423, status: "Ativa" },
  { name: "Ler 10 páginas", type: "Diária", xp: 50, completions: 7218, status: "Ativa" },
  { name: "Treinar 45 min", type: "Diária", xp: 80, completions: 5621, status: "Ativa" },
  { name: "Publicar um win", type: "Semanal", xp: 200, completions: 1842, status: "Ativa" },
  { name: "Concluir um curso", type: "Mensal", xp: 500, completions: 412, status: "Ativa" },
  { name: "Vision Day Marathon", type: "Especial", xp: 1000, completions: 86, status: "Inativa" },
];

export function AdminMissoesPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Missões" subtitle="Engaje seus usuários com desafios diários, semanais e especiais." action={<Btn variant="gold" icon="target">Nova missão</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Missões ativas" value="42" icon="target" color="#7c5cfc" />
        <MiniStat title="Conclusões hoje" value="3.214" icon="checkCircle" color="#00c896" />
        <MiniStat title="XP distribuído" value="186k" icon="bolt" color="#d4af37" />
        <MiniStat title="Engajamento médio" value="68%" icon="flame" color="#ff5c7a" />
      </div>

      <Card title="Catálogo de missões" className="mt-5" dark>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-xs text-white/40">
              <th className="pb-3 text-left font-medium">Missão</th>
              <th className="pb-3 text-left font-medium">Tipo</th>
              <th className="pb-3 text-right font-medium">XP</th>
              <th className="pb-3 text-right font-medium">Conclusões</th>
              <th className="pb-3 text-center font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Ações</th>
            </tr></thead>
            <tbody>
              {missionsData.map(m => (
                <tr key={m.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 font-semibold">{m.name}</td>
                  <td><Badge color={m.type === "Diária" ? "accent" : m.type === "Semanal" ? "blue" : m.type === "Mensal" ? "success" : "gold"}>{m.type}</Badge></td>
                  <td className="text-right font-bold text-gold">+{m.xp}</td>
                  <td className="text-right">{m.completions.toLocaleString("pt-BR")}</td>
                  <td className="text-center"><Badge color={m.status === "Ativa" ? "success" : "slate"}>{m.status}</Badge></td>
                  <td className="text-right"><button className="rounded p-1 text-white/40 hover:bg-white/5 hover:text-white"><Icon.edit className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ============================================
   ADMIN GAMIFICAÇÃO
   ============================================ */
const badges = [
  { n: "Primeiro Login", e: "🎯", rarity: "Comum", holders: 18432 },
  { n: "Streak 7 dias", e: "🔥", rarity: "Comum", holders: 8214 },
  { n: "Vision Builder", e: "🏗️", rarity: "Raro", holders: 3214 },
  { n: "Master 100 cursos", e: "🎓", rarity: "Épico", holders: 124 },
  { n: "Legacy Founder", e: "👑", rarity: "Lendário", holders: 12 },
  { n: "Top 10 do mês", e: "⭐", rarity: "Épico", holders: 240 },
];

export function AdminGamificacaoPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Gamificação" subtitle="XP, badges, conquistas e níveis." action={<Btn variant="gold" icon="bolt">Nova badge</Btn>} />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat title="Badges criadas" value="84" icon="award" color="#7c5cfc" />
        <MiniStat title="Níveis configurados" value="20" icon="trending" color="#00c896" />
        <MiniStat title="XP total distribuído" value="18.4M" icon="bolt" color="#d4af37" />
        <MiniStat title="Moedas em circulação" value="1.2M VC" icon="dollar" color="#ff5c7a" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {badges.map(b => (
          <Card key={b.n} dark>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-gold/20 text-3xl">{b.e}</div>
              <div className="flex-1">
                <p className="font-bold">{b.n}</p>
                <Badge color={b.rarity === "Lendário" ? "gold" : b.rarity === "Épico" ? "accent" : b.rarity === "Raro" ? "blue" : "slate"}>{b.rarity}</Badge>
                <p className="mt-1 text-xs text-white/40">{b.holders.toLocaleString("pt-BR")} portadores</p>
              </div>
              <button className="text-white/40 hover:text-white"><Icon.edit className="h-4 w-4" /></button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Configuração de níveis" className="mt-5" dark>
        <div className="space-y-2">
          {[1,5,10,15,20].map(n => (
            <div key={n} className="flex items-center gap-3 rounded-xl border border-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gold-gradient font-extrabold text-dark">{n}</div>
              <div className="flex-1">
                <p className="font-semibold">Nível {n} — {["Iniciante","Aprendiz","Construtor","Visionário","Lendário"][[1,5,10,15,20].indexOf(n)]}</p>
                <Progress value={n * 5} color="#d4af37" />
              </div>
              <span className="text-sm text-white/60">{(n * 1000).toLocaleString("pt-BR")} XP necessário</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
