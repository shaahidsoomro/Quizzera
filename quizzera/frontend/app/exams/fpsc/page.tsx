export const metadata = {
  title: 'FPSC Exam Preparation – Quizzera | MCQs, Past Papers, Mock Exams',
  description: 'Prepare for FPSC General Recruitment BPS-16 to BPS-21 with 1M+ MCQs, past papers, mock exams, and the latest MCQ policy updates.',
}

async function getRules(){const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exams/fpsc/rules`,{next:{revalidate:3600}}); if(!r.ok) return null; return r.json();}
export default async function Page(){const rules=await getRules();return(<main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-semibold">FPSC</h1><p className="mt-4 text-zinc-300">Federal Public Service Commission recruitment and mock exam rules.</p>{rules&&(<div className="mt-6 rounded border border-white/10 p-4"><h2 className="font-medium">MCQ Policy (Effective {rules.effective_date})</h2><ul className="mt-2 list-disc pl-6">{rules.schemes.map((s:any,idx:number)=>(<li key={idx}>{Array.isArray(s.bps)?`BPS-${s.bps[0]}–${s.bps[1]}`:`BPS`} {s.category?`(${s.category})`:``}: {s.papers} paper(s), {s.marks_per_paper} marks each, pass ≥ {(s.pass_threshold*100)}%, negative {rules.negative_marking}.</li>))}</ul></div>)}</main>);}