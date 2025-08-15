import React, { useEffect, useState, useCallback } from 'react'
import { Head, useForm, router } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    monthly_price: '',
    description: '',
    total_slots: 2,
  })

  const [entered, setEntered] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    setEntered(false)
    setTimeout(() => {
      router.visit(route('subscriptions.index'))
    }, 250)
  }, [closing])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleClose])

  function submit(e) {
    e.preventDefault()
    post(route('subscriptions.store'), {
      onSuccess: () => reset('password'),
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'linear-gradient(180deg,#071021 0%,#0e1724 100%)', color: '#e6eef8', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <Head title="Create Subscription" />

      <div
        style={{
          width: '100%',
          maxWidth: 760,
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 10px 30px rgba(2,6,23,0.6)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.04)',
          transform: entered ? 'translateY(0)' : 'translateY(16px)',
          opacity: entered ? 1 : 0,
          transition: 'all .25s ease-out',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: 14,
            top: 14,
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            color: '#e6eef8',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.42L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"/></svg>
        </button>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingRight: 36 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Create Subscription</div>
            <div style={{ fontSize: 12, color: 'rgba(230,238,248,0.7)' }}>Invite people to share and split a plan.</div>
          </div>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
          {/* form card */}
          <section style={{ padding: 16, borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.008))', border: '1px solid rgba(255,255,255,0.03)' }}>
            <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
              <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                Subscription name
                <input
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="e.g., Netflix Premium"
                  style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: errors.name ? '1px solid #ff7b7b' : '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }}
                />
              </label>
              {errors.name ? <div style={{ color: '#ffb4b4', fontSize: 13 }}>{errors.name}</div> : null}

              <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                Monthly price (MYR)
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={data.monthly_price}
                  onChange={(e) => setData('monthly_price', e.target.value)}
                  placeholder="e.g., 45"
                  style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: errors.monthly_price ? '1px solid #ff7b7b' : '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }}
                />
              </label>
              {errors.monthly_price ? <div style={{ color: '#ffb4b4', fontSize: 13 }}>{errors.monthly_price}</div> : null}

              <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                Short note (optional)
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Optional details"
                  rows={3}
                  style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }}
                />
              </label>

              <label style={{ fontSize: 13, color: 'rgba(230,238,248,0.9)' }}>
                Total slots
                <input
                  type="number"
                  min={2}
                  max={10}
                  value={data.total_slots}
                  onChange={(e) => setData('total_slots', e.target.value)}
                  style={{ width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: errors.total_slots ? '1px solid #ff7b7b' : '1px solid rgba(255,255,255,0.04)', color: '#e6eef8', outline: 'none' }}
                />
              </label>
              {errors.total_slots ? <div style={{ color: '#ffb4b4', fontSize: 13 }}>{errors.total_slots}</div> : <div style={{ fontSize: 12, color: 'rgba(230,238,248,0.7)' }}>Between 2 and 10 members.</div>}

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6, justifyContent: 'flex-end' }}>
                <button type="button" onClick={handleClose} style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: 'rgba(230,238,248,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
                <button type="submit" disabled={processing} style={{ padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer' }}>{processing ? 'Creating…' : 'Create subscription'}</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}
