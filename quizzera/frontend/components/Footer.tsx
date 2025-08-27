import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h4 className="font-semibold">Practice</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li><Link href="/practice/mcqs-bank">MCQs Bank</Link></li>
            <li><Link href="/practice/past-papers">Past Papers</Link></li>
            <li><Link href="/practice/mock-exams">Mock Exams</Link></li>
            <li><Link href="/practice/quizzes">Quizzes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Mentorship</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li><Link href="/mentorship/mentoring">1:1 Mentoring</Link></li>
            <li><Link href="/mentorship/study-plans">Study Plans</Link></li>
            <li><Link href="/mentorship/live-sessions">Live Sessions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Analytics</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li><Link href="/analytics/progress">Progress Dashboard</Link></li>
            <li><Link href="/analytics/leaderboard">Leaderboard</Link></li>
            <li><Link href="/analytics/reports">Reports</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Resources & Community</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li><Link href="/resources/books">Books</Link></li>
            <li><Link href="/resources/notes">Notes</Link></li>
            <li><Link href="/resources/blogs">Blogs</Link></li>
            <li><Link href="/resources/podcasts">Podcasts</Link></li>
            <li><Link href="/resources/youtube-lectures">YouTube Lectures</Link></li>
            <li><Link href="/community/forum">Forum</Link></li>
            <li><Link href="/community/discussions">Discussions</Link></li>
            <li><Link href="/community/study-groups">Study Groups</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-4 text-xs text-zinc-400 md:flex-row">
          <div className="space-x-3">
            <Link href="/about/faq">FAQ</Link>
            <span>|</span>
            <Link href="/about/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/about/privacy">Privacy Policy</Link>
          </div>
          <div>
            © 2025 Quizzera — Pakistan’s No.1 Govt Jobs & Competitive Exam Prep (BPS-16–BPS-21). All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}