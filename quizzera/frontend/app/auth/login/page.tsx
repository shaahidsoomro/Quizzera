"use client";
import { useState } from 'react'

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null)

  async function login(formData: FormData) {
    setMessage("Logging in...")
    const body = new URLSearchParams()
    body.set('username', String(formData.get('email') || ''))
    body.set('password', String(formData.get('password') || ''))
    
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`
    console.log('Attempting to login at:', apiUrl)
    
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      
      console.log('Response status:', res.status)
      console.log('Response headers:', Object.fromEntries(res.headers.entries()))
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, get the text response for debugging
        const textResponse = await res.text()
        console.error('Non-JSON response received:', textResponse.substring(0, 200))
        throw new Error(`Server returned ${res.status}: ${res.statusText}. Expected JSON but got ${contentType}`)
      }
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.access_token)
      setMessage('Logged in!')
    } catch (e: any) {
      console.error('Login error:', e)
      setMessage(e.message || 'An unexpected error occurred')
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-12">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form action={login} className="mt-6 grid gap-3">
        <input name="email" type="email" placeholder="Email" required className="rounded bg-white/10 px-4 py-3" />
        <input name="password" type="password" placeholder="Password" required className="rounded bg-white/10 px-4 py-3" />
        <button className="rounded bg-indigo-500 px-4 py-3">Login</button>
        {message && <p className="text-sm text-zinc-300">{message}</p>}
      </form>
      <div className="mt-4 text-xs text-zinc-400">
        <p>API URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not configured'}</p>
      </div>
    </main>
  )
}