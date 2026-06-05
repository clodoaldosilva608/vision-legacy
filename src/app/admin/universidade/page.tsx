import { AdminLayout } from "../../../../components/AdminLayout";
import { AdminPageHeader } from "../../../../components/ui";
import { Icon } from "../../../../components/icons";

export default function UniversidadeAdminPage() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Universidade" subtitle="Gestão de cursos, módulos e certificações." />
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10"><Icon.book className="h-8 w-8 text-accent" /></div>
        <h2 className="mt-4 text-xl font-extrabold text-white">Em desenvolvimento</h2>
        <p className="mt-2 max-w-sm text-sm text-white/50">Este módulo admin estará disponível em breve com gestão completa de cursos e trilhas.</p>
      </div>
    </AdminLayout>
  );
}
