import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Users, CreditCard, BarChart3, Mail } from 'lucide-react';

function KpiGrid({ kpi }) {
  const cards = [
    { label: 'Active subscriptions', value: kpi.activeCount ?? 0, caption: 'Plan growth', icon: BarChart3 },
    { label: 'Members joined', value: kpi.membersJoined ?? 0, caption: 'Growing your groups', icon: Users },
    { label: 'Monthly intake (MYR)', value: (kpi.monthlyIntake ?? 0).toFixed ? (kpi.monthlyIntake).toFixed(2) : kpi.monthlyIntake, caption: 'Paid by members', icon: CreditCard },
    { label: 'Pending invites', value: kpi.pendingInvites ?? 0, caption: 'Follow up', icon: Mail },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{c.label}</div>
            {c.icon ? <c.icon className="size-4 text-muted-foreground" /> : null}
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">{c.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{c.caption}</div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard({ kpi = {} }) {
  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6">
        <KpiGrid kpi={kpi} />
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">Charts and data will appear here.</div>
      </div>
    </AuthenticatedLayout>
  );
}
