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
import { API_BASE } from '../../../lib/api'
export const dynamic = 'force-dynamic'
async function fetchMcqs(){const r=await fetch(`${API_BASE}/mcqs`,{cache:'no-store'}); if(!r.ok) return []; return r.json();}
export default async function Page(){const data=await fetchMcqs();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">MCQs Bank</h1><Filters/><ul className="mt-6 space-y-3">{data.map((m:any)=>(<li key={m.id} className="rounded border border-white/10 p-3"><div className="font-medium">{m.question}</div><div className="mt-2 text-sm text-zinc-300">{m.exam} · {m.subject} · {m.topic} · {m.difficulty}</div></li>))}</ul></main>)}

function Filters(){
  return (
    <form action={(formData)=>{ const p=new URLSearchParams(); ['exam','subject','topic','difficulty'].forEach(k=>{ const v=String(formData.get(k)||''); if(v) p.set(k,v)}); window.location.search=p.toString() as any }} className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      <input name="exam" placeholder="Exam (FPSC, PPSC)" className="rounded bg-white/10 px-3 py-2" />
      <input name="subject" placeholder="Subject" className="rounded bg-white/10 px-3 py-2" />
      <input name="topic" placeholder="Topic" className="rounded bg-white/10 px-3 py-2" />
      <input name="difficulty" placeholder="Difficulty" className="rounded bg-white/10 px-3 py-2" />
      <button className="rounded bg-indigo-500 px-4 py-2">Filter</button>
    </form>
  )
}
