import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    const token = req.cookies.get('AuthToken')
    if (token) return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/login', '/register']
}
