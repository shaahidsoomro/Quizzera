export const metadata = {
  title: 'FAQs – Quizzera Competitive Exam Prep | FPSC, UPSC, IELTS, Teaching Exams',
  description: 'Find answers to frequently asked questions about Quizzera. From FPSC & PPSC in Pakistan to UPSC & SSC in India, plus IELTS & Teacher exams – everything explained.',
}
import JsonLd from '../../../components/JsonLd'

const faqs = [
  { q: 'How to prepare for FPSC BPS-16 to BPS-21?', a: 'Use MCQs Bank, Past Papers, and Mock Exams with analytics on Quizzera.' },
  { q: 'Does Quizzera cover UPSC/SSC/IELTS?', a: 'Yes, Quizzera covers Pakistan and India exams plus IELTS and Teacher certifications.' },
]

function faqJsonLd(){
  return {
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity: faqs.map((f)=>({
      '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a }
    }))
  }
}

export default function Page(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd data={faqJsonLd()} />
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <ul className="mt-6 space-y-4">
        {faqs.map((f,idx)=>(<li key={idx}><div className="font-medium">{f.q}</div><div className="text-sm text-zinc-300">{f.a}</div></li>))}
      </ul>
    </main>
  )
}
