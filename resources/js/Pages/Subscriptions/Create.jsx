// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Create({ auth }) {
//   const { data, setData, post, processing, errors } = useForm({
//     name: '',
//     description: '',
//     monthly_price: '',
//     total_slots: 2,
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     post(route('subscriptions.store'));
//   };

//   return (
//     <AuthenticatedLayout user={auth.user}>
//       <Head title="Create Subscription" />
//       <div className="max-w-xl mx-auto p-6">
//         <form onSubmit={submit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <div className="space-y-1">
//             <label className="text-sm">Name</label>
//             <input className="w-full border rounded px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} />
//             {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
//           </div>
//           <div className="space-y-1">
//             <label className="text-sm">Description</label>
//             <textarea className="w-full border rounded px-3 py-2" value={data.description} onChange={(e) => setData('description', e.target.value)} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <label className="text-sm">Monthly Price (MYR)</label>
//               <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={data.monthly_price} onChange={(e) => setData('monthly_price', e.target.value)} />
//               {errors.monthly_price && <div className="text-sm text-red-600">{errors.monthly_price}</div>}
//             </div>
//             <div className="space-y-1">
//               <label className="text-sm">Total Slots</label>
//               <input type="number" min={2} max={10} className="w-full border rounded px-3 py-2" value={data.total_slots} onChange={(e) => setData('total_slots', e.target.value)} />
//               {errors.total_slots && <div className="text-sm text-red-600">{errors.total_slots}</div>}
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button disabled={processing} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create</button>
//             <Link href={route('subscriptions.index')} className="px-4 py-2 text-gray-600">Cancel</Link>
//           </div>
//         </form>
//       </div>
//     </AuthenticatedLayout>
//   );
// }



// Subscription Create UI — Preview-safe, self-contained React component
// This file intentionally avoids importing @inertiajs/react or any shadcn/ui
// components so it can run in the canvas preview without provider errors.
//
// Integration notes (for your Laravel + Inertia app):
// - Replace the local Head stub with: import { Head } from '@inertiajs/react' and remove the stub.
// - Replace Link anchors with Inertia's Link when wiring real routes.
// - Replace the local input/button UI with shadcn components if desired.
// - Suggested file location when moving into your project:
//     /resources/js/Pages/Subscriptions/CreateSubscription.jsx

import React, { useState } from 'react'

// Safe Head stub: sets document.title when available (no Inertia provider required)
function HeadStub({ title }) {
  if (typeof document !== 'undefined' && title) {
    try { document.title = title } catch (e) {}
  }
  return null
}

// Lightweight Link stub for preview (simple anchor)
function LinkStub({ href = '#', children, className = '', style = {}, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) onClick(e)
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}

export default function CreateSubscriptionPreview() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(null)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!price || Number(price) <= 0) e.price = 'Enter a valid price'
    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    setErrors({})
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setLoading(true)
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 700))
    setLoading(false)
    const payload = { name: name.trim(), price: Number(price), description: description.trim() }
    console.log('Simulated create payload:', payload)
    setSaved(payload)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'linear-gradient(180deg,#071021 0%,#0e1724 100%)', color: '#e6eef8', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <HeadStub title="Create Subscription — Preview" />

      <div style={{ width: '100%', maxWidth: 760, borderRadius: 16, padding: 20, boxShadow: '0 10px 30px rgba(2,6,23,0.6)', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.04)' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(230,238,248,0.7)' }}>Preview Mode</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Create Subscription</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <LinkStub href="#" style={{ color: 'rgba(230,238,248,0.86)', textDecoration: 'underline', fontSize: 13 }}>Back to list</LinkStub>
          </div>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
          {/* form card */}
          <section style={{ padding: 16, borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.008))', border: '1px solid rgba(255,255,255,0.03)' }}>
            {saved ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontWeight: 700, color: '#b7f2d0' }}>Success — Subscription created</div>
                <div style={{ color: 'rgba(230,238,248,0.9)' }}><strong>Name:</strong> {saved.name}</div>
                <div style={{ color: 'rgba(230,238,248,0.9)' }}><strong>Price (MYR):</strong> {saved.price}</div>
                {saved.description ? <div style={{ color: 'rgba(230,238,248,0.8)' }}><strong>Note:</strong> {saved.description}</div> : null}
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={() => { setSaved(null); setName(''); setPrice(''); setDescription('') }} style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', color: 'white', border: '1px solid rgba(255,255,255,0.06)' }}>Create another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
                <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                  Subscription name
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Netflix Premium" style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: errors.name ? '1px solid #ff7b7b' : '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }} />
                </label>
                {errors.name && <div style={{ color: '#ffb4b4', fontSize: 13 }}>{errors.name}</div>}

                <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                  Price (MYR)
                  <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 45" type="number" style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: errors.price ? '1px solid #ff7b7b' : '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }} />
                </label>
                {errors.price && <div style={{ color: '#ffb4b4', fontSize: 13 }}>{errors.price}</div>}

                <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                  Short note (optional)
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional details" rows={3} style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }} />
                </label>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
                  <button type="submit" disabled={loading} style={{ padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer' }}>{loading ? 'Creating...' : 'Create subscription'}</button>

                  <button type="button" onClick={() => { setName(''); setPrice(''); setDescription(''); setErrors({}) }} style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: 'rgba(230,238,248,0.9)', border: '1px solid rgba(255,255,255,0.04)' }}>Reset</button>
                </div>
              </form>
            )}
          </section>

          {/* side tips (responsive) */}
          <aside style={{ padding: 12, borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.008))', border: '1px solid rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Pro tips</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li style={{ marginBottom: 6, color: 'rgba(230,238,248,0.9)' }}>Use a clear name so invitees recognise the service.</li>
              <li style={{ marginBottom: 6, color: 'rgba(230,238,248,0.9)' }}>Price is per month — keep it simple for MVP.</li>
              <li style={{ color: 'rgba(230,238,248,0.9)' }}>You can edit details later in the dashboard.</li>
            </ul>
          </aside>
        </main>

      </div>
    </div>
  )
}
