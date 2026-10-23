// TEMPORARY (added 2026-10-24): return 404 for unpublished posts.
// Why: Cloudflare Pages "asset preservation" keeps old HTML for removed pages
// (cache-control: public, s-maxage=604800, x-robots-tag: noindex) per data center
// for up to 7 days and serves it instead of a 404. Zone purge cannot clear it.
// A Function runs before the asset server, so this bypasses the preserved copy.
// Invocation is limited to these slugs via public/_routes.json.
// SAFE TO REMOVE after 2026-10-31 (together with public/_routes.json).
const BLOCKED = new Set([
  'member-book-intro-policy',
  'kindle-publish-checklist',
  'blog-x-kindle-instagram-role-map',
  'notion20260924',
])

export async function onRequest(context) {
  const parts = new URL(context.request.url).pathname.split('/').filter(Boolean)
  if (parts[0] === 'posts' && BLOCKED.has(parts[1])) {
    return new Response('Not Found', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
        'x-robots-tag': 'noindex',
      },
    })
  }
  return context.next()
}
