async function fetchArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kb`, { next: { revalidate: 30 } })
  if (!res.ok) return []
  return res.json()
}

export default async function KBPage() {
  const articles = await fetchArticles()
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Knowledge Base</h1>
      <ul className="mt-6 space-y-2">
        {articles.map((a: any) => (
          <li key={a.id}><a className="text-indigo-400 hover:underline" href={`/kb/${a.slug}`}>{a.title}</a></li>
        ))}
      </ul>
    </main>
  )
}