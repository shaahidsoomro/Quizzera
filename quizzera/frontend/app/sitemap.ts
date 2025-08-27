export default async function sitemap() {
  const base = 'https://quizzera.pk'
  const staticPages = [
    '',
    '/exams','/exams/fpsc','/exams/ppsc','/exams/spsc','/exams/kppsc','/exams/bpsc','/exams/css','/exams/pms','/exams/nts-ots-etea',
    '/exams-india','/ielts','/teacher-certification',
    '/practice/mcqs-bank','/practice/past-papers','/practice/mock-exams','/practice/quizzes',
    '/mentorship/mentoring','/mentorship/study-plans','/mentorship/live-sessions',
    '/analytics/progress','/analytics/leaderboard','/analytics/reports',
    '/resources/books','/resources/notes','/resources/blogs','/resources/podcasts','/resources/youtube-lectures',
    '/community/forum','/community/discussions','/community/study-groups',
    '/about','/about/contact','/about/faq','/about/terms','/about/privacy',
    '/account/login','/account/register','/account/dashboard','/account/settings'
  ]
  return staticPages.map((p)=> ({ url: `${base}${p}`, lastModified: new Date() }))
}