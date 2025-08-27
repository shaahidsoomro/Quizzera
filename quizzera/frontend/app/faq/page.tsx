"use client";
import { useState } from 'react'

const faqs = [
  { q: 'How do I start an exam?', a: 'Login, pick an exam, and click Start.' },
  { q: 'Can I retake an exam?', a: 'One attempt per user by default (configurable).' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-6 divide-y divide-white/10 rounded bg-white/5">
        {faqs.map((item, idx) => (
          <div key={idx} className="p-4">
            <button className="w-full text-left" onClick={() => setOpen(open === idx ? null : idx)}>
              <span className="font-medium">{item.q}</span>
            </button>
            {open === idx && <p className="mt-2 text-sm text-zinc-300">{item.a}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}