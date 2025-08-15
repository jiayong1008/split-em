import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function SubCard({ sub }) {
  return (
    <Link href={route('subscriptions.show', sub.id)} className="group rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="text-base font-medium truncate">{sub.name}</div>
        <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize">{sub.status}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {sub.members_count} / {sub.total_slots} joined
      </div>
    </Link>
  );
}

function AddCard() {
  return (
    <Link href={route('subscriptions.create')} className="flex h-full items-center justify-center rounded-xl border border-dashed bg-background p-4 text-sm text-muted-foreground transition hover:bg-accent/40">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border">+</span>
      <span className="ml-2">Create subscription</span>
    </Link>
  );
}

export default function Index({ auth, subscriptions = [] }) {
  const page = usePage();
  const user = page?.props?.auth?.user;
  const Shell = ({ children }) => (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Subscriptions</h2>}>{children}</AuthenticatedLayout>
  );

  // Public-friendly variant (when not logged in)
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Head title="Subscriptions" />
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Popular plans</h1>
            <Link href={route('login')} className="rounded-lg border bg-background px-3 py-2 text-sm transition hover:bg-accent/40">Sign in</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((s) => <SubCard key={s.id} sub={s} />)}
            <AddCard />
          </div>
        </div>
      </div>
    );
  }

  // Authed grid
  return (
    <Shell>
      <Head title="My Subscriptions" />
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Subscriptions</h1>
          <Link href={route('subscriptions.create')} className="rounded-lg border bg-background px-3 py-2 text-sm transition hover:bg-accent/40">Create</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">You don’t have any subscriptions yet.</div>
          ) : (
            subscriptions.map((s) => <SubCard key={s.id} sub={s} />)
          )}
          <AddCard />
        </div>
      </div>
    </Shell>
  );
}



