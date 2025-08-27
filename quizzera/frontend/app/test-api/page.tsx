"use client";
import { useState } from 'react'

export default function TestApiPage() {
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testApiConnection = async () => {
    setResults([])
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
    
    addResult(`Testing connection to: ${apiUrl}`)
    
    try {
      // Test 1: Basic connectivity
      addResult('Testing basic connectivity...')
      const res1 = await fetch(`${apiUrl}/`)
      addResult(`Root endpoint status: ${res1.status}`)
      
      if (res1.ok) {
        const data1 = await res1.json()
        addResult(`Root response: ${JSON.stringify(data1)}`)
      } else {
        const text1 = await res1.text()
        addResult(`Root error: ${text1.substring(0, 100)}`)
      }
      
      // Test 2: Auth endpoint
      addResult('Testing auth endpoint...')
      const res2 = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=test@example.com&password=test'
      })
      addResult(`Auth endpoint status: ${res2.status}`)
      
      const contentType = res2.headers.get('content-type')
      addResult(`Content-Type: ${contentType}`)
      
      if (contentType && contentType.includes('application/json')) {
        const data2 = await res2.json()
        addResult(`Auth response: ${JSON.stringify(data2)}`)
      } else {
        const text2 = await res2.text()
        addResult(`Auth error (non-JSON): ${text2.substring(0, 200)}`)
      }
      
    } catch (error: any) {
      addResult(`Connection error: ${error.message}`)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">API Connection Test</h1>
      
      <button 
        onClick={testApiConnection}
        className="rounded bg-indigo-500 px-4 py-3 mb-6"
      >
        Test API Connection
      </button>
      
      <div className="bg-gray-800 rounded p-4">
        <h2 className="text-lg font-medium mb-2">Results:</h2>
        <div className="space-y-1 text-sm">
          {results.map((result, index) => (
            <div key={index} className="text-green-300">{result}</div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-zinc-400">
        <p>Environment Variables:</p>
        <p>NEXT_PUBLIC_API_BASE_URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</p>
      </div>
    </main>
  )
}