export const metadata = {
  title: 'Contact Quizzera – Pakistan & India’s No.1 Exam Prep Platform',
  description: 'Get in touch with Quizzera. Reach our team for support, partnerships, and queries about FPSC, UPSC, IELTS & Teacher exam preparation.',
}

import ContactForm from '../../../components/ContactForm'

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <ContactForm />
    </main>
  )
}