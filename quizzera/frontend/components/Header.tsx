"use client";
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold">Quizzera</Link>
        <nav className="hidden gap-6 md:flex">
          <div className="group relative">
            <Link href="/exams">Exams</Link>
            <div className="absolute left-0 top-full hidden w-64 rounded bg-black/90 p-3 group-hover:block">
              <div className="grid gap-2">
                <Link href="/exams/css">CSS</Link>
                <Link href="/exams/pms">PMS</Link>
                <Link href="/exams/fpsc">FPSC</Link>
                <Link href="/exams/ppsc">PPSC</Link>
                <Link href="/exams/spsc">SPSC</Link>
                <Link href="/exams/kppsc">KPPSC</Link>
                <Link href="/exams/bpsc">BPSC</Link>
                <Link href="/exams/nts-ots-etea">NTS/OTS/ETEA</Link>
              </div>
            </div>
          </div>
          <div className="group relative">
            <button>Account</button>
            <div className="absolute left-0 top-full hidden w-64 rounded bg-black/90 p-3 group-hover:block">
              <div className="grid gap-2">
                <Link href="/account/login">Login</Link>
                <Link href="/account/register">Register</Link>
                <Link href="/account/dashboard">Dashboard</Link>
                <Link href="/account/settings">Settings</Link>
              </div>
            </div>
          </div>
          <div className="group relative">
            <Link href="/about">About</Link>
            <div className="absolute left-0 top-full hidden w-64 rounded bg-black/90 p-3 group-hover:block">
              <div className="grid gap-2">
                <Link href="/about">About Us</Link>
                <Link href="/about/contact">Contact</Link>
                <Link href="/about/faq">FAQ</Link>
              </div>
            </div>
          </div>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>Menu</button>
      </div>
      {open && (
        <div className="border-t border-white/10 p-4 md:hidden">
          <div className="grid gap-2">
            <Link href="/exams">Exams</Link>
            <Link href="/account/login">Login</Link>
            <Link href="/account/register">Register</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      )}
    </header>
  )
}