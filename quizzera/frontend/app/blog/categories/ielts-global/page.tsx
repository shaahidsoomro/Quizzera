export const metadata = {
  title: 'IELTS & International Exams – Quizzera Blog',
  description: 'IELTS Writing Task 2 samples, speaking questions, GRE/TOEFL strategies.',
}

export default function Page(){
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">IELTS & International Exams</h1>
      <ul className="mt-6 list-disc pl-6 text-zinc-300">
        <li><a className="text-indigo-400 hover:underline" href="/blog/ielts-speaking-2025-questions">IELTS Speaking 2025 – 50 Most Common Questions</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/ielts-writing-task2-band9">Best IELTS Writing Task 2 Templates for Band 9</a></li>
      </ul>
    </main>
  )
}
