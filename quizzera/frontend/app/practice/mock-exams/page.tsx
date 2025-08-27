"use client";
import { useState } from 'react'

export default function Page(){
  const [msg,setMsg]=useState<string|null>(null)
  async function start(){
    setMsg('Starting...')
    const token=localStorage.getItem('token')
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-exams/start`,{method:'POST',headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({exam_id:1})})
    const data=await res.json();
    if(!res.ok){setMsg(data.detail||'Failed');return}
    setMsg(`Attempt ${data.attempt_id} started with ${data.items.length} items`)
  }
  return (<main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-semibold">Mock Exams</h1><button onClick={start} className="mt-6 rounded bg-indigo-500 px-6 py-3">Start Mock Exam</button>{msg&&<p className="mt-4 text-sm text-zinc-300">{msg}</p>}</main>)
}
