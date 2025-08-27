export const metadata = {
  title: 'General Skills & Aptitude – Quizzera Blog',
  description: 'Analytical Reasoning MCQs, Current Affairs, and Everyday Science.',
}

export default function Page(){
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">General Skills & Aptitude</h1>
      <ul className="mt-6 list-disc pl-6 text-zinc-300">
        <li><a className="text-indigo-400 hover:underline" href="/blog/analytical-reasoning-mcqs">Analytical Reasoning MCQs</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/current-affairs-updates">Current Affairs Updates</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/everyday-science-basics">GK & Everyday Science</a></li>
      </ul>
    </main>
  )
}
