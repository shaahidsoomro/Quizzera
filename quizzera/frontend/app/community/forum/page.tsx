import { API_BASE } from '../../../lib/api'
export const dynamic = 'force-dynamic'
async function fetchThreads(){const r=await fetch(`${API_BASE}/forum`,{cache:'no-store'}); if(!r.ok) return []; return r.json();}
export default async function Page(){const data=await fetchThreads();return(<main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold">Forum</h1><ul className="mt-6 space-y-3">{data.map((t:any)=>(<li key={t.id} className="rounded border border-white/10 p-3">{t.title}</li>))}</ul></main>)}
