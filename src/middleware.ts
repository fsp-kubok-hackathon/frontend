import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PAGES } from './consts/pages.consts';

// Helper function to check token validity
async function validateToken(token: string, url: string) {
  try {
    const res = await fetch('http://api.mzhn.fun:4200/api/account', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 200) {
      return true; // Token is valid
    }
    throw new Error(data.message);
  } catch (error) {
    // @ts-ignore
    console.error('Token validation error:', error.message);
    return false; // Token is invalid or an error occurred
  }
}

const prohibitedAuth = [PAGES.SIGN_IN, PAGES.SIGN_UP];
const needAuth = [PAGES.ROOT, PAGES.ACCOUNT];

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get('accessToken')?.value;
  const pathname = nextUrl.pathname;

  // Check if path is prohibited for authenticated users
  if (prohibitedAuth.includes(pathname) && token) {
    const isValidToken = await validateToken(token, nextUrl.href);
    if (isValidToken) {
      console.log('Valid token, redirecting to home');
      return NextResponse.redirect(new URL(PAGES.ROOT, nextUrl));
    }
    console.log('Invalid token, allowing access to auth pages');
  }

  // Check if path requires authentication
  if (needAuth.includes(pathname) && !token) {
    console.log('No token, redirecting to sign-in');
    return NextResponse.redirect(new URL(PAGES.SIGN_IN, nextUrl));
  } else if (needAuth.includes(pathname) && token) {
    const isValidToken = await validateToken(token, nextUrl.href);
    if (!isValidToken) {
      console.log('Invalid token, redirecting to sign-in');
      return NextResponse.redirect(new URL(PAGES.SIGN_IN, nextUrl));
    }
    console.log('Valid token, access granted');
  }

  // Continue with the request for all other paths
  return NextResponse.next();
}

export const config = {
  matcher: [...prohibitedAuth, ...needAuth],
};