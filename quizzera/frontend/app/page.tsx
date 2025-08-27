import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Quizzera</h1>
        <p className="mt-6 text-lg text-zinc-300">
          The ultimate online quiz and exam platform.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link className="rounded bg-white/10 px-6 py-3 hover:bg-white/20" href="/quiz">Try a Quiz</Link>
          <Link className="rounded bg-indigo-500 px-6 py-3 hover:bg-indigo-400" href="/auth/login">Get Started</Link>
        </div>
      </section>
    </main>
  )
}