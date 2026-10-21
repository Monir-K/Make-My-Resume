const COOKIE_NAME = 'resume_star_visitor'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  })

const getCookieValue = (request, name) => {
  const cookieHeader = request.headers.get('Cookie') || ''
  const cookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))
  return cookie ? cookie.slice(name.length + 1) : ''
}

const createVisitorToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const hashVisitorToken = async (token) => {
  const data = new TextEncoder().encode(token)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const getVisitor = (request) => {
  const existingToken = getCookieValue(request, COOKIE_NAME)
  const token = /^[a-f0-9]{64}$/.test(existingToken) ? existingToken : createVisitorToken()
  const cookie = `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`
  return { token, cookie }
}

const getStarState = async (database, visitorHash) => {
  const [countResult, existingStar] = await Promise.all([
    database.prepare('SELECT COUNT(*) AS total FROM stars').first(),
    database.prepare('SELECT 1 AS starred FROM stars WHERE visitor_hash = ?').bind(visitorHash).first(),
  ])

  return { count: Number(countResult?.total || 0), starred: Boolean(existingStar) }
}

const missingDatabase = () => jsonResponse({ error: 'Star voting is not configured yet.' }, 503)
const getDatabase = (env) => env.STARS_DB || env.stars_db

export const onRequestGet = async ({ request, env }) => {
  const database = getDatabase(env)
  if (!database) return missingDatabase()

  try {
    const visitor = getVisitor(request)
    const visitorHash = await hashVisitorToken(visitor.token)
    const state = await getStarState(database, visitorHash)
    return jsonResponse(state, 200, { 'Set-Cookie': visitor.cookie })
  } catch {
    return jsonResponse({ error: 'Star count is temporarily unavailable.' }, 503)
  }
}

export const onRequestPost = async ({ request, env }) => {
  const database = getDatabase(env)
  if (!database) return missingDatabase()

  const origin = request.headers.get('Origin')
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: 'Cross-origin requests are not allowed.' }, 403)
  }

  try {
    const visitor = getVisitor(request)
    const visitorHash = await hashVisitorToken(visitor.token)
    await database
      .prepare('INSERT OR IGNORE INTO stars (visitor_hash) VALUES (?)')
      .bind(visitorHash)
      .run()
    const state = await getStarState(database, visitorHash)
    return jsonResponse(state, 200, { 'Set-Cookie': visitor.cookie })
  } catch {
    return jsonResponse({ error: 'Your star could not be saved. Please try again.' }, 503)
  }
}