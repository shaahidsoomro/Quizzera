export const metadata = {
  title: 'Past Papers – Quizzera | FPSC, PPSC, UPSC & more',
  description: 'Download and practice past papers for Pakistan and India exams, including FPSC, PPSC, UPSC, SSC, and more.',
  alternates: { canonical: 'https://quizzera.pk/practice/past-papers' },
  openGraph: {
    title: 'Past Papers – Quizzera',
    description: 'Practice past papers for FPSC, PPSC, UPSC, SSC and more.',
    url: 'https://quizzera.pk/practice/past-papers',
    siteName: 'Quizzera', type: 'website'
  }
}

async function fetchPapers(){const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/past-papers`,{next:{revalidate:60}}); if(!r.ok) return []; return r.json();}
export default async function Page(){const data=await fetchPapers();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">Past Papers</h1><ul className="mt-6 space-y-3">{data.map((p:any)=>(<li key={p.id} className="rounded border border-white/10 p-3">{p.year} · <a className="text-indigo-400 hover:underline" href={p.pdf_url}>PDF</a></li>))}</ul></main>)}
