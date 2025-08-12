import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Join({ auth, subscription }) {
  const { data, setData, post, processing, errors } = useForm({ email: '' });
  const submit = (e) => {
    e.preventDefault();
    post(route('join.subscription.confirm', subscription.join_token));
  };
  const perMember = (Number(subscription.monthly_price) / Math.max(1, subscription.total_slots)).toFixed(2);
  return (
    <GuestLayout>
      <Head title={`Join ${subscription.name}`} />
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
        <div>
          <div className="text-lg font-semibold">Join {subscription.name}</div>
          <div className="text-gray-500">MYR {perMember} per member • {subscription.members_count} / {subscription.total_slots} joined</div>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Your email</label>
            <input type="email" className="w-full border rounded px-3 py-2" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
          </div>
          <button disabled={processing} className="w-full px-4 py-2 bg-indigo-600 text-white rounded">Continue to pay</button>
        </form>
        <div className="text-xs text-gray-500">
          You may log in or register to link your account later.
        </div>
      </div>
    </GuestLayout>
  );
}



