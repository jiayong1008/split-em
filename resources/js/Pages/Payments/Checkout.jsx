import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Checkout({ auth, subscription, member, payment, airwallex }) {
  const amount = Number(payment.amount).toFixed(2);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Checkout" />
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
        <div className="text-lg font-semibold">Pay MYR {amount}</div>
        <div className="text-gray-500 text-sm">Subscription: {subscription.name}</div>

        <div className="p-4 border rounded">
          <div className="text-sm mb-2">Payment form (Airwallex) placeholder</div>
          <div className="text-xs text-gray-500">We'll integrate Airwallex Elements/API once keys are set.</div>
          <div className="mt-3 text-xs">Region: {airwallex?.region || 'ap-sg'}</div>
        </div>

        <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded" disabled>
          Pay with Airwallex
        </button>
        <div className="text-xs text-gray-500">Setup your Airwallex keys in .env to enable live checkout.</div>
      </div>
    </AuthenticatedLayout>
  );
}



