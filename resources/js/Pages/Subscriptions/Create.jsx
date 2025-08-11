import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    monthly_price: '',
    total_slots: 2,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('subscriptions.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Create Subscription" />
      <div className="max-w-xl mx-auto p-6">
        <form onSubmit={submit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <input className="w-full border rounded px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
          </div>
          <div className="space-y-1">
            <label className="text-sm">Description</label>
            <textarea className="w-full border rounded px-3 py-2" value={data.description} onChange={(e) => setData('description', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm">Monthly Price (MYR)</label>
              <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={data.monthly_price} onChange={(e) => setData('monthly_price', e.target.value)} />
              {errors.monthly_price && <div className="text-sm text-red-600">{errors.monthly_price}</div>}
            </div>
            <div className="space-y-1">
              <label className="text-sm">Total Slots</label>
              <input type="number" min={2} max={10} className="w-full border rounded px-3 py-2" value={data.total_slots} onChange={(e) => setData('total_slots', e.target.value)} />
              {errors.total_slots && <div className="text-sm text-red-600">{errors.total_slots}</div>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button disabled={processing} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create</button>
            <Link href={route('subscriptions.index')} className="px-4 py-2 text-gray-600">Cancel</Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}


