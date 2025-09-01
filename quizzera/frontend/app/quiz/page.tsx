"use client";
import { useState, useEffect } from 'react';

interface MCQ {
  id: number;
  question: string;
  options: Record<string, string>;
}

async function startExam() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/1/start`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || 'Failed to start exam');
  return data;
}

export default function QuizPage() {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const started = mcqs.length > 0;
  const current = mcqs[idx];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/1/result`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) {
          setScore(data.score ?? 0);
          setSubmitted(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleStart() {
    setLoading(true);
    setError(null);
    try {
      const data = await startExam();
      setMcqs(data.mcqs || []);
      setIdx(0);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function chooseOption(key: string) {
    if (!current) return;
    setAnswers(prev => ({ ...prev, [current.id]: key }));
  }

  async function submitExam() {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/1/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || 'Failed to submit exam');
      setScore(data.score ?? 0);
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

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
      ) : submitted ? (
        <div className="mt-6 space-y-4">
          <p className="text-lg">Your score: {score}{mcqs.length ? `/${mcqs.length}` : ''}</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : current ? (
        <div className="mt-6 space-y-4">
          <p className="text-lg">{current.question}</p>
          <div className="grid gap-2">
            {Object.entries(current.options).map(([key, label]) => {
              const selected = answers[current.id] === key;
              return (
                <button
                  key={key}
                  className={`rounded px-4 py-2 text-left ${selected ? 'bg-indigo-600' : 'bg-white/10 hover:bg-white/20'}`}
                  onClick={() => chooseOption(key)}
                >
                  {key}. {String(label)}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              disabled={idx === 0}
              onClick={() => setIdx(i => i - 1)}
              className="rounded bg-white/10 px-4 py-2 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={idx >= mcqs.length - 1}
              onClick={() => setIdx(i => i + 1)}
              className="rounded bg-white/10 px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
            {idx === mcqs.length - 1 && (
              <button onClick={submitExam} className="rounded bg-indigo-500 px-4 py-2" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <p className="mt-6 text-zinc-300">No MCQs available.</p>
      )}
    </main>
  );
}

