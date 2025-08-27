export const metadata = {
  title: 'India Government Exams Prep – Quizzera Blog',
  description: 'UPSC strategies, SSC CGL & CHSL tips, and State PSC roadmaps.',
}

export default function Page(){
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">India Government Exams Prep</h1>
      <ul className="mt-6 list-disc pl-6 text-zinc-300">
        <li><a className="text-indigo-400 hover:underline" href="/blog/upsc-2025-strategy">UPSC 2025 Preparation Strategy – Crack IAS in First Attempt</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/ssc-cgl-2025-smart-plan">SSC CGL 2025 – Tier I & II Smart Preparation Plan</a></li>
      </ul>
    </main>
  )
}
