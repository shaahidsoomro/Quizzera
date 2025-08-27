import { API_BASE } from '../../../lib/api'
export const dynamic = 'force-dynamic'
async function fetchLB(){const r=await fetch(`${API_BASE}/analytics/leaderboard`,{cache:'no-store'}); if(!r.ok) return []; return r.json();}
export default async function Page(){const data=await fetchLB();return(<main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-semibold">Leaderboard</h1><ol className="mt-6 space-y-2 list-decimal pl-6">{data.map((r:any,idx:number)=>(<li key={idx}>User {r.user_id}: {r.score}</li>))}</ol></main>)}
