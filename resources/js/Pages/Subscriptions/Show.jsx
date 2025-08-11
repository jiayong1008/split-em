import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Show({ auth, subscription, joinUrl }) {
  const { data, setData, post, processing, errors } = useForm({ emails: [''] });

  const addEmail = () => setData('emails', [...data.emails, '']);
  const updateEmail = (idx, value) => setData('emails', data.emails.map((e, i) => (i === idx ? value : e)));
  const submit = (e) => {
    e.preventDefault();
    post(route('subscriptions.invite', subscription.id));
  };

  const perMember = (Number(subscription.monthly_price) / Math.max(1, subscription.total_slots)).toFixed(2);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={subscription.name} />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{subscription.name}</h1>
              <div className="text-gray-500">MYR {subscription.monthly_price} / month • {subscription.members.length} / {subscription.total_slots} joined • MYR {perMember} per member</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{subscription.status}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">
            <div className="font-medium">Invite via link / QR</div>
            <div className="flex items-center gap-2">
              <input readOnly value={joinUrl} className="flex-1 border rounded px-3 py-2" />
              <button onClick={() => navigator.clipboard.writeText(joinUrl)} className="px-3 py-2 bg-gray-900 text-white rounded">Copy</button>
            </div>
            <div className="flex items-center justify-center py-4">
              <QRCodeCanvas value={joinUrl} size={160} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="font-medium mb-3">Invite by email</div>
            <form onSubmit={submit} className="space-y-3">
              {data.emails.map((email, idx) => (
                <input key={idx} type="email" placeholder="friend@example.com" className="w-full border rounded px-3 py-2" value={email} onChange={(e) => updateEmail(idx, e.target.value)} />
              ))}
              {errors.emails && <div className="text-sm text-red-600">{errors.emails}</div>}
              <div className="flex items-center gap-2">
                <button type="button" onClick={addEmail} className="px-3 py-2 border rounded">Add</button>
                <button disabled={processing} className="px-3 py-2 bg-indigo-600 text-white rounded">Send Invites</button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="font-medium mb-2">Members</div>
          <div className="divide-y">
            {subscription.members.length === 0 && <div className="text-gray-500">No members yet.</div>}
            {subscription.members.map((m) => (
              <div key={m.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.email}</div>
                  <div className="text-xs text-gray-500">{m.status}</div>
                </div>
                {(m.status === 'joined' || m.status === 'invited') && (
                  <Link href={route('payments.checkout', [subscription.id, m.id])} className="px-3 py-2 bg-emerald-600 text-white rounded">Pay {perMember}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


