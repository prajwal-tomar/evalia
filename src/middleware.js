// src/middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Debugging logs
    console.log('Session:', session);
    console.log('Current URL:', req.nextUrl.pathname);

    // If there's no session and the user is trying to access a protected route, redirect to login
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If there's a session and the user is trying to access the login page, redirect to dashboard
    if (session && req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'], // Match both dashboard and login routes
};
