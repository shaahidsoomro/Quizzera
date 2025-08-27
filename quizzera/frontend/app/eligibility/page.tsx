export const metadata = {
  title: 'Eligibility Checker – Quizzera | Govt Jobs (BPS-16–BPS-21)',
  description: 'Check your eligibility for Pakistan government jobs by age, degree, domicile, and experience.',
}

import EligibilityForm from '../../components/EligibilityForm'

export default function Page(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Eligibility Checker</h1>
      <EligibilityForm />
    </main>
  )
}
