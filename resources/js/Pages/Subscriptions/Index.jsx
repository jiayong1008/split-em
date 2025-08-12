import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, subscriptions }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="My Subscriptions" />
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Subscriptions</h1>
          <Link
            href={route('subscriptions.create')}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y">
          {subscriptions.length === 0 && (
            <div className="p-6 text-gray-500">No subscriptions yet.</div>
          )}
          {subscriptions.map((s) => (
            <Link key={s.id} href={route('subscriptions.show', s.id)} className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-gray-500">{s.members_count} / {s.total_slots} joined</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{s.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}



