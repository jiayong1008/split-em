import { Head, Link } from '@inertiajs/react';

export default function Landing({ auth }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Head title="Split'em – Share Subscriptions" />
      {/* Gradient background + animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[28rem] rounded-full bg-gradient-to-tr from-indigo-300/40 to-violet-300/40 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-gradient-to-tr from-sky-300/40 to-indigo-300/40 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-indigo-600" />
            <div className="text-xl font-semibold">Split'em</div>
          </div>
          <nav className="flex items-center gap-2">
            {auth?.user ? (
              <>
                <Link href={route('subscriptions.index')} className="px-3 py-2 text-sm font-medium hover:opacity-80">Dashboard</Link>
                <Link href={route('logout')} method="post" as="button" className="px-3 py-2 text-sm font-medium hover:opacity-80">Logout</Link>
              </>
            ) : (
              <>
                <Link href={route('login')} className="px-3 py-2 text-sm font-medium hover:opacity-80">Log in</Link>
                <Link href={route('register')} className="btn-primary text-sm">Register</Link>
              </>
            )}
          </nav>
        </header>

        <main className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-300">Made for Malaysia</div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Share subscriptions with friends, the easy way.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Create a group, invite friends via link or QR, and pay your share securely with Airwallex (MY).</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={auth?.user ? route('subscriptions.create') : route('register')} className="btn-primary">Get Started</Link>
              <Link href={route('subscriptions.index')} className="btn-outline">View Dashboard</Link>
            </div>
            <div className="text-xs text-gray-500">Simple, transparent, and fast.</div>
          </div>
          <div className="card animate-fadeInUp" style={{ animationDelay: '.1s' }}>
            <div className="font-medium mb-4">How it works</div>
            <ol className="space-y-4 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>Create a subscription group</li>
              <li>Share invite link or QR</li>
              <li>Friends join and pay their share</li>
              <li>Activate once everyone’s in</li>
            </ol>
          </div>
        </main>
      </div>
    </div>
  );
}


