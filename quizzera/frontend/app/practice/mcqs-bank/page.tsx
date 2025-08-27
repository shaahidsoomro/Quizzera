export const metadata = {
  title: 'MCQs Bank – Quizzera | 1M+ MCQs for FPSC, PPSC, UPSC, IELTS',
  description: 'Browse 1M+ verified MCQs by exam, subject, topic, and difficulty. Pakistan & India exam prep for BPS-16 to BPS-21 and more.',
  alternates: { canonical: 'https://quizzera.pk/practice/mcqs-bank' },
  openGraph: {
    title: 'MCQs Bank – Quizzera',
    description: '1M+ verified MCQs across FPSC, PPSC, UPSC, SSC, IELTS, Teaching.',
    url: 'https://quizzera.pk/practice/mcqs-bank',
    siteName: 'Quizzera', type: 'website'
  }
}

async function fetchMcqs(){const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mcqs`,{next:{revalidate:30}}); if(!r.ok) return []; return r.json();}
export default async function Page(){const data=await fetchMcqs();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">MCQs Bank</h1><ul className="mt-6 space-y-3">{data.map((m:any)=>(<li key={m.id} className="rounded border border-white/10 p-3"><div className="font-medium">{m.question}</div><div className="mt-2 text-sm text-zinc-300">{m.exam} · {m.subject} · {m.topic} · {m.difficulty}</div></li>))}</ul></main>)}
