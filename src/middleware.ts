import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  if(!request.cookies.has("session")){
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}