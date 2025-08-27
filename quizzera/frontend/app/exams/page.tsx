export const metadata = {
  title: 'FPSC & PPSC Preparation – Quizzera Pakistan’s No.1 Exam Prep Website',
  description: 'Prepare for FPSC, PPSC, NTS, ETEA & other government exams in Pakistan. Quizzera provides 1M+ MCQs, past papers & smart quizzes for BPS-16 to BPS-21 jobs.',
}

async function getExams(){ const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams`,{next:{revalidate:60}}); if(!r.ok) return []; return r.json(); }
export default async function Exams(){ const data=await getExams(); return (<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">Exams</h1><div className="mt-6 grid gap-4">{data.map((b:any)=> (<section key={b.id}><h2 className="text-xl font-medium">{b.name}</h2><ul className="mt-2 list-disc pl-6">{b.exams.map((e:any)=> (<li key={e.id}><a className="text-indigo-400 hover:underline" href={`/exams/${e.slug}`}>{e.title}</a></li>))}</ul></section>))}</div></main>); }