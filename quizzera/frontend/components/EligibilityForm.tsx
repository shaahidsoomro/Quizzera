"use client";
import { useState } from 'react'
import { API_BASE } from '../lib/api'

export default function EligibilityForm(){
  const [result,setResult]=useState<any>(null)
  async function submit(formData:FormData){
    const payload={
      age: Number(formData.get('age')||0),
      degree: String(formData.get('degree')||''),
      domicile: String(formData.get('domicile')||''),
      experience: Number(formData.get('experience')||0),
    }
    const res=await fetch(`${API_BASE}/eligibility/check`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    const data=await res.json();
    setResult(data)
  }
  return (
    <div>
      <form action={submit} className="mt-6 grid gap-3">
        <input name="age" type="number" placeholder="Age" className="rounded bg-white/10 px-4 py-3" />
        <input name="degree" placeholder="Degree (e.g., Bachelor)" className="rounded bg-white/10 px-4 py-3" />
        <input name="domicile" placeholder="Domicile (Province)" className="rounded bg-white/10 px-4 py-3" />
        <input name="experience" type="number" placeholder="Experience (years)" className="rounded bg-white/10 px-4 py-3" />
        <button className="rounded bg-indigo-500 px-6 py-3 w-fit">Check</button>
      </form>
      {result && (
        <div className="mt-6 rounded border border-white/10 p-4">
          <div className="font-medium">Decision: {result.decision}</div>
          {result.reasons?.length>0 && <ul className="mt-2 list-disc pl-6 text-sm text-zinc-300">{result.reasons.map((r:string,idx:number)=>(<li key={idx}>{r}</li>))}</ul>}
        </div>
      )}
    </div>
  )
}

