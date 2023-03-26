import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

  // Basic Auth example taken from https://github.com/vercel/examples/tree/main/edge-functions/basic-auth-password
  const yourBasicAuth = process.env.BASIC_AUTH
  if (!yourBasicAuth) {
    return NextResponse.next()
  }
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl
  // console.log('basicAuth:', basicAuth)
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    if(atob(authValue) === yourBasicAuth) {
      return NextResponse.next()
    }
  }
  return new NextResponse(
    JSON.stringify({
      success:false,
      message: 'auth failed'
    }),
    {status: 401, headers: { 'WWW-authenticate':'Basic realm="Secure Area"'}}
  )
}

export const config = {
  matcher: '/:path*',
}