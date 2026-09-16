const API_BASE = import.meta.env.VITE_API_URL || ''
const INTERVAL = 8 * 60 * 1000

async function ping() {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' })
    if (!res.ok) throw new Error(String(res.status))
    console.debug('[keepalive] backend healthy')
  } catch {
    console.debug('[keepalive] backend cold/offline (wakes on demand)')
  }
}

export function startKeepAlive() {
  if (typeof window === 'undefined') return
  ping()
  const id = window.setInterval(ping, INTERVAL)
  return () => window.clearInterval(id)
}