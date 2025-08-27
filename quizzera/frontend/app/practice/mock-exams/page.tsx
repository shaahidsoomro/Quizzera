import MockExamRunner from '../../../components/MockExamRunner'

export const metadata = {
  title: 'Mock Exams – Quizzera | Timed Tests with Negative Marking',
  description: 'Run FPSC-style timed mock exams with auto-scoring and analytics. Pakistan & India exam prep.',
  alternates: { canonical: 'https://quizzera.pk/practice/mock-exams' },
  openGraph: {
    title: 'Mock Exams – Quizzera',
    description: 'Timed tests, one-question view, auto-scoring and analytics.',
    url: 'https://quizzera.pk/practice/mock-exams',
    siteName: 'Quizzera', type: 'website'
  }
}

export default function Page(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Mock Exams</h1>
      <MockExamRunner />
    </main>
  )
}
