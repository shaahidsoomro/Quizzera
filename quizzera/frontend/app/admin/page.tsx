"use client";
import { useState } from 'react'
import { API_BASE } from '../../lib/api'

export default function AdminPage() {
  const [msg, setMsg] = useState<string | null>(null)

  async function upload(formData: FormData) {
    setMsg('Uploading...')
    const file = formData.get('file') as File | null
    if (!file) { setMsg('Choose a CSV file'); return }
    const token = localStorage.getItem('token')
    const body = new FormData()
    body.set('file', file)
    const res = await fetch(`${API_BASE}/mcqs/import`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body
    })
    const data = await res.json()
    if (!res.ok) { setMsg(data.detail || 'Import failed'); return }
    setMsg(`Imported ${data.created} MCQs`)
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="mt-6 space-y-4">
        <a className="text-indigo-400 hover:underline" href={`${API_BASE}/export/mcqs_template.csv`}>
          Download MCQs CSV Template
        </a>
        <form action={upload} className="grid gap-3">
          <input type="file" name="file" accept=".csv" className="rounded bg-white/10 px-4 py-3" />
          <button className="rounded bg-indigo-500 px-6 py-3 w-fit">Upload CSV</button>
          {msg && <p className="text-sm text-zinc-300">{msg}</p>}
        </form>
      </div>
    </main>
  )
}