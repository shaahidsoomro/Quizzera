type Props = { params: { slug: string } }

async function fetchArticle(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kb/${slug}`, { next: { revalidate: 30 } })
  if (!res.ok) return null
  return res.json()
}

export default async function KBArticlePage({ params }: Props) {
  const article = await fetchArticle(params.slug)
  if (!article) return <main className="p-6">Not found</main>
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{article.title}</h1>
      <article className="prose prose-invert mt-6" dangerouslySetInnerHTML={{ __html: article.content }} />
    </main>
  )
}