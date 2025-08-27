export const metadata = {
  title: 'Books – Quizzera | Best Resources for FPSC, UPSC, IELTS',
  description: 'Recommended books for Pakistan and India exam preparation including FPSC, PPSC, UPSC, SSC, and IELTS.',
  alternates: { canonical: 'https://quizzera.pk/resources/books' },
  openGraph: { title: 'Books – Quizzera', description: 'Curated books for exam prep.', url: 'https://quizzera.pk/resources/books', siteName: 'Quizzera', type: 'website' }
}

async function fetchItems(){const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/resources/books`,{next:{revalidate:60}}); if(!r.ok) return []; return r.json();}
export default async function Page(){const items=await fetchItems();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">Books</h1><ul className="mt-6 space-y-2">{items.map((i:any)=>(<li key={i.id}><a className="text-indigo-400 hover:underline" href={i.url}>{i.title}</a></li>))}</ul></main>)}
