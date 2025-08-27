"use client";
import { useState } from 'react'
import { API_BASE } from '../lib/api'

export default function ContactForm(){
  const [status, setStatus] = useState<string | null>(null)
  async function submit(formData: FormData) {
    setStatus("Sending...")
    try {
      await fetch(`${API_BASE}/export/mcqs.csv`)
      setStatus("Message sent (demo stub)")
    } catch {
      setStatus("Failed to send")
    }
  }
  return (
    <form action={submit} className="mt-6 grid gap-4">
      <input name="email" type="email" required placeholder="Your email" className="rounded bg-white/10 px-4 py-3" />
      <textarea name="message" required placeholder="Your message" className="rounded bg-white/10 px-4 py-3 min-h-[120px]" />
      <button className="rounded bg-indigo-500 px-6 py-3 w-fit">Send</button>
      {status && <p className="text-sm text-zinc-300">{status}</p>}
    </form>
  )
}

