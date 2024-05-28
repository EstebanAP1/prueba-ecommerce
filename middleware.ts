import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/register')) {
    const token = req.cookies.get('AuthToken')
    if (token) return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
  }

  if (pathname.startsWith('/login')) {
    const token = req.cookies.get('AuthToken')
    if (!token) {
      const tokenFromUrl = req.nextUrl.searchParams.get('token')
      if (tokenFromUrl) {
        const res = NextResponse.redirect(new URL('/', req.url))
        res.cookies.set('AuthToken', tokenFromUrl, {
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7
        })
        console.log(res.url)
        console.log(res.cookies.get('AuthToken'))
        return res
      }
    }
    if (token) return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
  }
}
export const config = {
  matcher: ['/login', '/register']
}
