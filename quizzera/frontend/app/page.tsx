import Link from 'next/link'
import JsonLd from '../components/JsonLd'

export const metadata = {
  title: 'Quizzera: Pakistan Govt Jobs (BPS-16–BPS-21) Competitive Exam Platform',
  description: 'Prepare for FPSC, PPSC, SPSC, KPPSC, BPSC, NTS/OTS/ETEA with MCQs, Past Papers, Mock Exams, Syllabus mapping, Notifications, Jobs, Mentorship, and Analytics.',
  alternates: { canonical: 'https://quizzera.pk/' },
  openGraph: {
    title: 'Quizzera – Pakistan Govt Jobs (BPS-16–BPS-21) Exam Prep',
    description: 'MCQs, Past Papers, Mock Exams, Jobs & Notifications. Pakistan’s No.1 Exam Prep.',
    url: 'https://quizzera.pk/',
    siteName: 'Quizzera',
    locale: 'en_PK',
    type: 'website',
  },
}

function jsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Quizzera',
      url: 'https://quizzera.pk',
      sameAs: ['https://twitter.com', 'https://facebook.com'],
      logo: 'https://quizzera.pk/logo.png'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Quizzera',
      url: 'https://quizzera.pk',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://quizzera.pk/search?q={query}',
        'query-input': 'required name=query'
      }
    }
  ]
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={jsonLd()} />
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Pakistan’s No.1 Govt Jobs Prep (BPS-16–BPS-21)</h1>
        <p className="mt-6 text-lg text-zinc-300">
          FPSC · PPSC · SPSC · KPPSC · BPSC · NTS/OTS/ETEA — MCQs, Past Papers, Mock Exams, Jobs & Notifications.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link className="rounded bg-indigo-500 px-6 py-3 hover:bg-indigo-400" href="/practice/mock-exams">Start a Mock Exam</Link>
          <Link className="rounded bg-white/10 px-6 py-3 hover:bg-white/20" href="/practice/mcqs-bank">Practice MCQs</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Exam Bodies</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { href: '/exams/fpsc', label: 'FPSC' },
            { href: '/exams/ppsc', label: 'PPSC' },
            { href: '/exams/spsc', label: 'SPSC' },
            { href: '/exams/kppsc', label: 'KPPSC' },
            { href: '/exams/bpsc', label: 'BPSC' },
            { href: '/exams/css', label: 'CSS' },
            { href: '/exams/pms', label: 'PMS' },
            { href: '/exams/nts-ots-etea', label: 'NTS/OTS/ETEA' },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="rounded border border-white/10 p-6 text-center hover:bg-white/5">{x.label}</Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Practice Preview</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link href="/practice/mcqs-bank" className="rounded border border-white/10 p-6 hover:bg-white/5">MCQs Bank</Link>
          <Link href="/practice/past-papers" className="rounded border border-white/10 p-6 hover:bg-white/5">Past Papers</Link>
          <Link href="/practice/mock-exams" className="rounded border border-white/10 p-6 hover:bg-white/5">Mock Exams</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Latest Notifications</h2>
        <Notifications />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded border border-white/10 p-6 text-center">
          <h3 className="text-xl font-semibold">Mentorship</h3>
          <p className="mt-2 text-zinc-300">1:1 guidance and curated study plans from experienced mentors.</p>
          <Link href="/mentorship/mentoring" className="mt-4 inline-block rounded bg-indigo-500 px-6 py-3">Meet Mentors</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Social Proof</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3 text-sm text-zinc-300">
          <li className="rounded border border-white/10 p-4">“Cleared BPS-17 first attempt with Quizzera’s mocks.”</li>
          <li className="rounded border border-white/10 p-4">“Accurate FPSC-style MCQs and timely notifications.”</li>
          <li className="rounded border border-white/10 p-4">“Best Pakistan-focused exam prep platform I’ve used.”</li>
        </ul>
      </section>
    </main>
  )
}

async function fetchNotifications(){
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications`, { next: { revalidate: 300 } })
  if(!r.ok) return []
  return r.json()
}

async function Notifications(){
  const items = await fetchNotifications()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.slice(0,5).map((n:any)=>(
        <div key={n.id} className="rounded border border-white/10 p-4">
          <div className="font-medium">{n.title}</div>
          <div className="text-xs text-zinc-400">Deadline: {n.deadline || '—'}</div>
        </div>
      ))}
    </div>
  )
}