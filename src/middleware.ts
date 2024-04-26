import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ROLES } from './consts/roles.consts';
import { PAGES } from './consts/pages.consts';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const token = cookies.get('accessToken');

  const isDashboardPage = url.includes(PAGES.DASHBOARD);
  const isAuthPage = url.includes(PAGES.SIGN_IN);

  if (isDashboardPage && !token) {
    console.log('no token');
    return NextResponse.redirect(new URL('/', url));
  }

  if (isAuthPage) {
    if (token) {
      console.log('already logged in');
      return NextResponse.redirect(new URL('/', url));
    }

    return NextResponse.next();
  }

  if (isDashboardPage) {
    try {
      const res = await fetch('http://localhost:4200/api/account', {
        headers: { Authorization: `Bearer ${token?.value}` },
      });

      const data = await res.json();

      if (![ROLES.ADMIN, ROLES.MODERATOR].includes(data.role)) {
        console.log('forbidden');
        return NextResponse.redirect(new URL('/', url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/auth', url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
