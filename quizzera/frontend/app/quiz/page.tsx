"use client";
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { API_BASE } from '../../lib/api'

async function fetchMcqs() {
  const res = await fetch(`${API_BASE}/mcqs`)
  if (!res.ok) throw new Error('Failed to load MCQs')
  return res.json()
}

export default function QuizPage() {
  const { data, isLoading } = useQuery({ queryKey: ['mcqs'], queryFn: fetchMcqs })
  const [idx, setIdx] = useState(0)

  if (isLoading) return <p className="p-6">Loading...</p>
  const mcqs = data || []
  const current = mcqs[idx]

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      {current ? (
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