export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://quizzera.pk/sitemap.xml',
    host: 'https://quizzera.pk',
  }
}