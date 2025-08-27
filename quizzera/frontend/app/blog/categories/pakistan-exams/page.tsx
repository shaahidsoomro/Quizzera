export const metadata = {
  title: 'Pakistan Government Jobs Prep – Quizzera Blog',
  description: 'FPSC, PPSC, CSS, BPS-16 to BPS-21 strategies, past papers, and study plans.',
}

export default function Page(){
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Pakistan Government Jobs Prep</h1>
      <ul className="mt-6 list-disc pl-6 text-zinc-300">
        <li><a className="text-indigo-400 hover:underline" href="/blog/how-to-prepare-css-2025">How to Prepare for CSS 2025 – Ultimate Study Plan</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/top-100-ppsc-mcqs-gk">Top 100 PPSC MCQs for General Knowledge</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/fpsc-inspector-guide-2025">FPSC Inspector Jobs Guide 2025 – Salary & Test Pattern</a></li>
      </ul>
    </main>
  )
}
