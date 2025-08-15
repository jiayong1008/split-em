import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SectionCards } from '@/components/section-cards';

export default function Dashboard() {
  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6">
        <SectionCards />
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          Charts and data will appear here.
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
