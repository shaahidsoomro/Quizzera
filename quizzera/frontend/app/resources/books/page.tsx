export const metadata = {
  title: 'Books – Quizzera | Best Resources for FPSC, UPSC, IELTS',
  description: 'Recommended books for Pakistan and India exam preparation including FPSC, PPSC, UPSC, SSC, and IELTS.',
  alternates: { canonical: 'https://quizzera.pk/resources/books' },
  openGraph: { title: 'Books – Quizzera', description: 'Curated books for exam prep.', url: 'https://quizzera.pk/resources/books', siteName: 'Quizzera', type: 'website' }
}
import { API_BASE } from '../../../lib/api'
export const dynamic = 'force-dynamic'
async function fetchItems(){const r=await fetch(`${API_BASE}/resources/books`,{cache:'no-store'}); if(!r.ok) return []; return r.json();}
export default async function Page(){const items=await fetchItems();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">Books</h1><ul className="mt-6 space-y-2">{items.map((i:any)=>(<li key={i.id}><a className="text-indigo-400 hover:underline" href={i.url}>{i.title}</a></li>))}</ul></main>)}
