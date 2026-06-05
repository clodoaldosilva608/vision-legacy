import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Onboarding from "./pages/Onboarding";
import Pricing from "./pages/Pricing";
import VisionBoard from "./pages/user/VisionBoard";
import PublicProfile from "./pages/user/PublicProfile";
import UserSettings from "./pages/user/UserSettings";
import CommandCenter from "./pages/admin/CommandCenter";
import { SobrePage, BlogPage, AjudaPage, ComunidadePublicaPage, LoginPage, LgpdPage, NotFoundPage, RecuperarSenhaPage, ContatoPage, TermosPage, StatusPage, ConectarDiscordPage } from "./pages/PublicPages";
import { ViewSwitcher } from "./components/ViewSwitcher";

import { NumerologiaPage, IAPage, LifestylePage, BusinessHubPage } from "./pages/user/CoreModules";
import { WealthHubPage, LegacyHubPage, ProjetosPage, MetasPage, HabitosPage } from "./pages/user/WealthLegacy";
import { UniversidadePage, ComunidadePage, MarketplacePage, RelatoriosPage } from "./pages/user/Community";

import { AnalyticsPage, UsuariosPage, AssinaturasPage, ReceitasPage, IAConsumoPage } from "./pages/admin/AdminCore";
import { AdminUniversidadePage, AdminBlogPage, AdminRAGPage, AdminCursosPage, AdminCertificacoesPage, AdminMissoesPage, AdminGamificacaoPage } from "./pages/admin/AdminContent";
import { AdminNumerologiaPage, AdminArquetiposPage, AdminIAPage, AdminMarketplacePage, AdminDiscordPage, AdminCRMPage, AdminAfiliadosPage } from "./pages/admin/AdminPlatform";
import { AdminConfigPage, AdminEquipePage, AdminLogsPage, AdminNotificacoesPage, AdminBackupsPage } from "./pages/admin/AdminSystem";

export default function App() {
  return (
    <HashRouter>
      <ViewSwitcher />
      <Routes>
        {/* ─── Públicas ─── */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ajuda" element={<AjudaPage />} />
        <Route path="/comunidade" element={<ComunidadePublicaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/lgpd" element={<LgpdPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/conectar-discord" element={<ConectarDiscordPage />} />

        {/* ─── App usuário ─── */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/numerologia" element={<NumerologiaPage />} />
        <Route path="/dashboard/ia" element={<IAPage />} />
        <Route path="/dashboard/lifestyle" element={<LifestylePage />} />
        <Route path="/dashboard/business" element={<BusinessHubPage />} />
        <Route path="/dashboard/wealth" element={<WealthHubPage />} />
        <Route path="/dashboard/legacy" element={<LegacyHubPage />} />
        <Route path="/dashboard/projetos" element={<ProjetosPage />} />
        <Route path="/dashboard/metas" element={<MetasPage />} />
        <Route path="/dashboard/habitos" element={<HabitosPage />} />
        <Route path="/dashboard/universidade" element={<UniversidadePage />} />
        <Route path="/dashboard/comunidade" element={<ComunidadePage />} />
        <Route path="/dashboard/marketplace" element={<MarketplacePage />} />
        <Route path="/dashboard/vision-board" element={<VisionBoard />} />
        <Route path="/dashboard/perfil" element={<PublicProfile />} />
        <Route path="/dashboard/configuracoes" element={<UserSettings />} />
        <Route path="/dashboard/relatorios" element={<RelatoriosPage />} />

        {/* ─── Admin ─── */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/command-center" element={<CommandCenter />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/usuarios" element={<UsuariosPage />} />
        <Route path="/admin/assinaturas" element={<AssinaturasPage />} />
        <Route path="/admin/receitas" element={<ReceitasPage />} />
        <Route path="/admin/ia-consumo" element={<IAConsumoPage />} />
        <Route path="/admin/universidade" element={<AdminUniversidadePage />} />
        <Route path="/admin/blog" element={<AdminBlogPage />} />
        <Route path="/admin/rag" element={<AdminRAGPage />} />
        <Route path="/admin/cursos" element={<AdminCursosPage />} />
        <Route path="/admin/certificacoes" element={<AdminCertificacoesPage />} />
        <Route path="/admin/missoes" element={<AdminMissoesPage />} />
        <Route path="/admin/gamificacao" element={<AdminGamificacaoPage />} />
        <Route path="/admin/numerologia" element={<AdminNumerologiaPage />} />
        <Route path="/admin/arquetipos" element={<AdminArquetiposPage />} />
        <Route path="/admin/ia" element={<AdminIAPage />} />
        <Route path="/admin/marketplace" element={<AdminMarketplacePage />} />
        <Route path="/admin/discord" element={<AdminDiscordPage />} />
        <Route path="/admin/crm" element={<AdminCRMPage />} />
        <Route path="/admin/afiliados" element={<AdminAfiliadosPage />} />
        <Route path="/admin/configuracoes" element={<AdminConfigPage />} />
        <Route path="/admin/equipe" element={<AdminEquipePage />} />
        <Route path="/admin/logs" element={<AdminLogsPage />} />
        <Route path="/admin/notificacoes" element={<AdminNotificacoesPage />} />
        <Route path="/admin/backups" element={<AdminBackupsPage />} />

        {/* ─── 404 ─── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
