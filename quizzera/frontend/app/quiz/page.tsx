"use client";
import { useState } from 'react'

async function startExam() {
  const token = localStorage.getItem('token')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/1/start`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Failed to start exam')
  return data
}

export default function QuizPage() {
  const [mcqs, setMcqs] = useState<any[]>([])
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const started = mcqs.length > 0

  async function handleStart() {
    setLoading(true)
    setError(null)
    try {
      const data = await startExam()
      setMcqs(data.mcqs || [])
      setIdx(0)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const current = mcqs[idx]

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      {!started ? (
        <div className="mt-6 space-y-4">
          <button onClick={handleStart} className="rounded bg-indigo-500 px-6 py-3" disabled={loading}>
            {loading ? 'Starting...' : 'Start Exam'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : current ? (
        <div className="mt-6 space-y-4">
          <p className="text-lg">{current.question}</p>
          <div className="grid gap-2">
            {Object.entries(current.options).map(([key, label]: [string, any]) => (
              <button key={key} className="rounded bg-white/10 px-4 py-2 text-left hover:bg-white/20" onClick={() => alert(`Correct answer: ${current.correct_key}`)}>
                {key}. {String(label)}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button disabled={idx === 0} onClick={() => setIdx(i => i - 1)} className="rounded bg-white/10 px-4 py-2 disabled:opacity-50">Prev</button>
            <button disabled={idx >= mcqs.length - 1} onClick={() => setIdx(i => i + 1)} className="rounded bg-white/10 px-4 py-2 disabled:opacity-50">Next</button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-zinc-300">No MCQs available.</p>
      )}
    </main>
  )
}