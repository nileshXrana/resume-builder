import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

    // const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
    // const res = await fetch("/app/api/auth/session");
    // const session = await res.json();

    // if (!session.user && isProtectedRoute) {
    //     const loginUrl = new URL('/signin', request.url)
    //     return NextResponse.redirect(loginUrl)
    // }

    // return NextResponse.redirect(new URL('/', request.url))

}


export const config = {
    matcher: ['/dashboard/:path*'],
};
