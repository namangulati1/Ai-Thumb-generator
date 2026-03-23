import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Simple in‑memory rate limiting (replace with Redis in production)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10 // 10 requests per minute per IP

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
  const now = Date.now()

  // Rate limiting for API routes
  if (path.startsWith('/api/')) {
    const key = `rate-limit:${ip}:${path}`
    const record = rateLimit.get(key)

    if (record) {
      if (now < record.resetAt) {
        if (record.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          )
        }
        record.count++
      } else {
        // Reset window
        rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
      }
    } else {
      rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    }

    // Clean up old entries (optional)
    if (Math.random() < 0.01) {
      for (const [k, v] of rateLimit.entries()) {
        if (now > v.resetAt) rateLimit.delete(k)
      }
    }
  }

  // Security headers
  const response = NextResponse.next()
  const headers = response.headers

  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY')
  // Enable XSS protection
  headers.set('X-XSS-Protection', '1; mode=block')
  // Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff')
  // Referrer policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  // CSP (simplified)
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )

  // Protect API routes (except auth) with token validation
  if (path.startsWith('/api/') && !path.includes('/auth/') && !path.includes('/stripe/webhook')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}