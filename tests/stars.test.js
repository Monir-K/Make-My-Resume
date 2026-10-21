import assert from 'node:assert/strict'
import test from 'node:test'
import { onRequestGet, onRequestPost } from '../functions/api/stars.js'

class MockD1Database {
  stars = new Set()

  prepare(sql) {
    let values = []
    const statement = {
      bind: (...parameters) => {
        values = parameters
        return statement
      },
      first: async () => {
        if (sql.includes('COUNT(*)')) return { total: this.stars.size }
        if (sql.includes('SELECT 1')) return this.stars.has(values[0]) ? { starred: 1 } : null
        throw new Error(`Unexpected query: ${sql}`)
      },
      run: async () => {
        if (sql.includes('INSERT OR IGNORE')) this.stars.add(values[0])
        return { success: true }
      },
    }
    return statement
  }
}

const createRequest = (method, cookie = '', origin = 'https://resume.example') => new Request('https://resume.example/api/stars', {
  method,
  headers: {
    ...(cookie ? { Cookie: cookie } : {}),
    ...(origin ? { Origin: origin } : {}),
  },
})

const cookieFrom = (response) => response.headers.get('Set-Cookie').split(';')[0]

test('one browser can star once and another browser receives the shared total', async () => {
  const database = new MockD1Database()
  const firstVisit = await onRequestGet({ request: createRequest('GET'), env: { STARS_DB: database } })
  const firstVisitorCookie = cookieFrom(firstVisit)

  assert.deepEqual(await firstVisit.json(), { count: 0, starred: false })
  assert.match(firstVisit.headers.get('Set-Cookie'), /HttpOnly/)
  assert.match(firstVisit.headers.get('Set-Cookie'), /Secure/)

  const firstStar = await onRequestPost({ request: createRequest('POST', firstVisitorCookie), env: { STARS_DB: database } })
  assert.deepEqual(await firstStar.json(), { count: 1, starred: true })

  const repeatedStar = await onRequestPost({ request: createRequest('POST', firstVisitorCookie), env: { STARS_DB: database } })
  assert.deepEqual(await repeatedStar.json(), { count: 1, starred: true })

  const secondVisitor = await onRequestGet({ request: createRequest('GET'), env: { STARS_DB: database } })
  assert.deepEqual(await secondVisitor.json(), { count: 1, starred: false })
})

test('rejects cross-origin star submissions', async () => {
  const response = await onRequestPost({
    request: createRequest('POST', '', 'https://attacker.example'),
    env: { STARS_DB: new MockD1Database() },
  })

  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), { error: 'Cross-origin requests are not allowed.' })
})

test('reports missing D1 configuration without throwing', async () => {
  const response = await onRequestGet({ request: createRequest('GET'), env: {} })

  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { error: 'Star voting is not configured yet.' })
})

test('supports the lowercase stars_db Cloudflare binding name', async () => {
  const database = new MockD1Database()
  const response = await onRequestGet({ request: createRequest('GET'), env: { stars_db: database } })

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { count: 0, starred: false })
})