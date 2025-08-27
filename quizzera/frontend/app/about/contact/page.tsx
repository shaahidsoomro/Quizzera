"use client";
import { useState } from 'react'

export const metadata = {
  title: 'Contact Quizzera – Pakistan & India’s No.1 Exam Prep Platform',
  description: 'Get in touch with Quizzera. Reach our team for support, partnerships, and queries about FPSC, UPSC, IELTS & Teacher exam preparation.',
}

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null)

  async function submit(formData: FormData) {
    setStatus("Sending...")
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/export/mcqs.csv`)
      setStatus("Message sent (demo stub)")
    } catch (e) {
      setStatus("Failed to send")
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <form action={submit} className="mt-6 grid gap-4">
        <input name="email" type="email" required placeholder="Your email" className="rounded bg-white/10 px-4 py-3" />
        <textarea name="message" required placeholder="Your message" className="rounded bg-white/10 px-4 py-3 min-h-[120px]" />
        <button className="rounded bg-indigo-500 px-6 py-3 w-fit">Send</button>
        {status && <p className="text-sm text-zinc-300">{status}</p>}
      </form>
    </main>
  )
}