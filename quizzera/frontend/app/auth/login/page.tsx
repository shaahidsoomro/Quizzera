"use client";
import { useState } from 'react'
import { API_BASE } from '../../../lib/api'

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null)

  async function login(formData: FormData) {
    setMessage("Logging in...")
    const body = new URLSearchParams()
    body.set('username', String(formData.get('email') || ''))
    body.set('password', String(formData.get('password') || ''))
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.access_token)
      setMessage('Logged in!')
    } catch (e: any) {
      setMessage(e.message)
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-12">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form action={login} className="mt-6 grid gap-3">
        <input name="email" type="email" placeholder="Email" required className="rounded bg-white/10 px-4 py-3" />
        <input name="password" type="password" placeholder="Password" required className="rounded bg-white/10 px-4 py-3" />
        <button className="rounded bg-indigo-500 px-6 py-3">Login</button>
        {message && <p className="text-sm text-zinc-300">{message}</p>}
      </form>
    </main>
  )
}