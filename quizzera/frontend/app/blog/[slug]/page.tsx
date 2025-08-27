import JsonLd from '../../../components/JsonLd'

type Props = { params: { slug: string } }

async function fetchArticle(slug: string){
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kb/${slug}`, { next: { revalidate: 300 } })
  if(!r.ok) return null
  return r.json()
}

export async function generateMetadata({ params }: Props){
  const art = await fetchArticle(params.slug)
  if(!art) return { title: 'Article – Quizzera', description: 'Exam preparation insights and updates.' }
  return {
    title: `${art.title} – Quizzera Blog`,
    description: (art.content?.replace(/<[^>]+>/g,'').slice(0,150) || 'Exam preparation insights and updates.')
  }
}

function articleJsonLd(art: any){
  return {
    '@context':'https://schema.org',
    '@type':'Article',
    headline: art.title,
    datePublished: art.created_at || undefined,
    author: { '@type':'Organization', name:'Quizzera' },
  }
}

export default async function Page({ params }: Props){
  const art = await fetchArticle(params.slug)
  if(!art) return (<main className="p-6">Not found</main>)
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd data={articleJsonLd(art)} />
      <h1 className="text-3xl font-semibold">{art.title}</h1>
      <article className="prose prose-invert mt-6" dangerouslySetInnerHTML={{ __html: art.content }} />
    </main>
  )
}
