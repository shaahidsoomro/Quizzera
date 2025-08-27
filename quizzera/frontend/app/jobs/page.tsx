import JsonLd from '../../components/JsonLd'
import { API_BASE } from '../../lib/api'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Government Jobs – Quizzera | FPSC, PPSC, BPS-16 to BPS-21',
  description: 'Latest government jobs and notifications from FPSC, PPSC, SPSC, KPPSC, BPSC. Structured JobPosting and apply links.',
  alternates: { canonical: 'https://quizzera.pk/jobs' },
  openGraph: { title: 'Government Jobs – Quizzera', description: 'Latest jobs and notices with apply links.', url: 'https://quizzera.pk/jobs', siteName: 'Quizzera', type: 'website' },
}

async function fetchJobs(){
  const r = await fetch(`${API_BASE}/jobs`, { cache: 'no-store' })
  if(!r.ok) return []
  return r.json()
}

function jobPostingJsonLd(items:any[]){
  return items.slice(0,10).map(j=>({
    '@context':'https://schema.org',
    '@type':'JobPosting',
    title: j.title,
    hiringOrganization: { '@type':'Organization', name: j.department || 'Government of Pakistan' },
    employmentType: 'FULL_TIME',
    validThrough: j.deadline || undefined,
    url: j.apply_link || 'https://quizzera.pk/jobs',
    description: (j.requirements_json && j.requirements_json.summary) || 'Government job via FPSC/PPSC',
    jobLocationType: 'ON_SITE',
  }))
}

export default async function Page(){
  const jobs = await fetchJobs()
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jobPostingJsonLd(jobs)} />
      <h1 className="text-3xl font-semibold">Government Jobs</h1>
      <ul className="mt-6 space-y-3">
        {jobs.map((j:any)=>(
          <li key={j.id} className="rounded border border-white/10 p-4">
            <div className="font-medium">{j.title}</div>
            <div className="text-sm text-zinc-400">Dept: {j.department||'—'} · BPS: {j.bps_scale||'—'} · Deadline: {j.deadline||'—'}</div>
            {j.apply_link && <a className="text-indigo-400 hover:underline" href={j.apply_link}>Apply</a>}
          </li>
        ))}
      </ul>
    </main>
  )
}
