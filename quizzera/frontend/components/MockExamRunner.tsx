"use client";
import { useEffect, useRef, useState } from 'react'
import { API_BASE } from '../lib/api'

export default function MockExamRunner(){
  const [attemptId,setAttemptId]=useState<number| null>(null)
  const [items,setItems]=useState<any[]>([])
  const [idx,setIdx]=useState(0)
  const [remaining,setRemaining]=useState(3600)
  const timerRef=useRef<NodeJS.Timeout| null>(null)

  useEffect(()=>{ return ()=>{ if(timerRef.current) clearInterval(timerRef.current as any)}},[])

  async function start(){
    const token=localStorage.getItem('token')
    const res=await fetch(`${API_BASE}/mock-exams/start`,{method:'POST',headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({exam_id:1})})
    const data=await res.json();
    if(!res.ok){ alert(data.detail||'Failed'); return }
    setAttemptId(data.attempt_id)
    setItems(data.items||[])
    setRemaining(3600)
    timerRef.current=setInterval(()=> setRemaining(r=> r>0? r-1: 0),1000)
  }

  async function answer(optionId:number){
    if(!attemptId) return
    const token=localStorage.getItem('token')
    await fetch(`${API_BASE}/mock-exams/answer`,{method:'POST',headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({attempt_id:attemptId,q_id:items[idx]?.q_id,payload:{option_id:optionId}})})
    setIdx(i=> Math.min(i+1, items.length-1))
  }

  async function finish(){
    if(!attemptId) return
    const token=localStorage.getItem('token')
    const res=await fetch(`${API_BASE}/mock-exams/finish`,{method:'POST',headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({attempt_id:attemptId})})
    const data=await res.json();
    alert(`Score: ${data.score}/${data.total}`)
  }

  const q=items[idx]
  return (
    <div>
      {!attemptId? (
        <button onClick={start} className="mt-6 rounded bg-indigo-500 px-6 py-3">Start Mock Exam</button>
      ): (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between text-sm text-zinc-300">
            <div>Question {idx+1} / {items.length}</div>
            <div>Time left: {Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</div>
          </div>
          {q && (
            <div className="rounded border border-white/10 p-4">
              <div className="font-medium">{q.stem}</div>
              <div className="mt-4 grid gap-2">
                {q.options.map((o:any)=> (
                  <button key={o.id} onClick={()=>answer(o.id)} className="rounded bg-white/10 px-4 py-2 text-left hover:bg-white/20">{o.label}. {o.text}</button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button disabled={idx===0} onClick={()=> setIdx(i=> i-1)} className="rounded bg-white/10 px-4 py-2 disabled:opacity-50">Prev</button>
                <button disabled={idx>=items.length-1} onClick={()=> setIdx(i=> i+1)} className="rounded bg-white/10 px-4 py-2 disabled:opacity-50">Next</button>
                <button onClick={finish} className="ml-auto rounded bg-indigo-500 px-4 py-2">Finish</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

