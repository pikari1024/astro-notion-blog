// Temporary edge gate: unpublished blog-ops slugs must not serve stale CDN HTML.
// Remove this file once Cloudflare edge cache for these URLs has fully expired/purged.
const BLOCKED = new Set([
  'member-book-intro-policy',
  'blog-x-kindle-instagram-role-map',
  'notion20260924',
  'kindle-publish-checklist',
])

export async function onRequest(context) {
  const url = new URL(context.request.url)
  // /posts/<slug> or /posts/<slug>/ or /posts/<slug>/index.html
  const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  // parts: ['posts', '<slug>', ...]
  const slug = parts[0] === 'posts' ? parts[1] : null
  if (slug && BLOCKED.has(slug)) {
    return new Response('Not Found', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
        'cdn-cache-control': 'no-store',
      },
    })
  }
  return context.next()
}
