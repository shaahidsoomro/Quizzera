"use client";
import { useState } from 'react'

export default function RegisterPage(){
  const [msg,setMsg]=useState<string|null>(null)
  async function submit(formData:FormData){
    setMsg('Registering...')
    const body={
      username:String(formData.get('username')||''),
      email:String(formData.get('email')||''),
      password:String(formData.get('password')||''),
    }
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    const data=await res.json();
    if(!res.ok){ setMsg(data.detail||'Failed'); return; }
    setMsg('Registered! You can login now.')
  }
  return (
    <main className="mx-auto max-w-sm px-6 py-12">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form action={submit} className="mt-6 grid gap-3">
        <input name="username" placeholder="Username" required className="rounded bg-white/10 px-4 py-3" />
        <input name="email" type="email" placeholder="Email" required className="rounded bg-white/10 px-4 py-3" />
        <input name="password" type="password" placeholder="Password" required className="rounded bg-white/10 px-4 py-3" />
        <button className="rounded bg-indigo-500 px-6 py-3">Create account</button>
        {msg && <p className="text-sm text-zinc-300">{msg}</p>}
      </form>
    </main>
  )
}
