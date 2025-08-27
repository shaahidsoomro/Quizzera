export const metadata = {
  title: 'Teacher Certification Exams – Quizzera Blog',
  description: 'CTET, TET (India) and Educators (Pakistan) guides and model papers.',
}

export default function Page(){
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Teacher Certification Exams</h1>
      <ul className="mt-6 list-disc pl-6 text-zinc-300">
        <li><a className="text-indigo-400 hover:underline" href="/blog/ctet-2025-preparation">CTET 2025 Preparation – Syllabus & Model Papers</a></li>
        <li><a className="text-indigo-400 hover:underline" href="/blog/educators-jobs-2025-mcqs">Educators Jobs 2025 – Test Preparation with MCQs</a></li>
      </ul>
    </main>
  )
}
