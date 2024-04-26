import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PAGES } from './consts/pages.consts';

const HOST = 'http://api.mzhn.fun:4200/api';

// Helper function to check token validity
async function validateTokenAndRefresh(
  token: string,
  refreshToken: string,
  url: string,
) {
  try {
    const res = await fetch(`${HOST}/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 200) {
      return { isValid: true, newTokens: null }; // Token is valid
    } else {
      // Try to refresh the token
      const refreshRes = await fetch(`${HOST}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      const refreshData = await refreshRes.json();
      if (refreshRes.status === 200) {
        return { isValid: true, newTokens: refreshData }; // Return new token
      }
    }
    // @ts-ignore
    throw new Error(data.message || refreshData.message);
  } catch (error) {
    // @ts-ignore
    console.error('Token validation error:', error.message);
    return { isValid: false, newTokens: null }; // Token is invalid or an error occurred
  }
}

const prohibitedAuth = [PAGES.SIGN_IN, PAGES.SIGN_UP];
const needAuth = [PAGES.ROOT, PAGES.ACCOUNT];

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value!;
  const pathname = nextUrl.pathname;

  if (prohibitedAuth.includes(pathname) && token) {
    const { isValid, newTokens } = await validateTokenAndRefresh(
      token,
      refreshToken,
      nextUrl.href,
    );
    if (isValid) {
      console.log('Valid token, redirecting to home');
      if (newTokens) {
        const response = NextResponse.redirect(new URL(PAGES.ROOT, nextUrl));
        response.cookies.set('accessToken', newTokens.accessToken, {
          path: '/',
          sameSite: 'strict',
        });
        response.cookies.set('refreshToken', newTokens.refreshToken, {
          path: '/',
          sameSite: 'strict',
        });
        return response;
      }
      return NextResponse.redirect(new URL(PAGES.ROOT, nextUrl));
    }
    console.log('Invalid token, allowing access to auth pages');
  }

  if (needAuth.includes(pathname)) {
    if (!token) {
      console.log('No token, redirecting to sign-in');
      return NextResponse.redirect(new URL(PAGES.SIGN_IN, nextUrl));
    }
    const { isValid, newTokens } = await validateTokenAndRefresh(
      token,
      refreshToken,
      nextUrl.href,
    );
    if (!isValid) {
      console.log('Invalid token, redirecting to sign-in');
      return NextResponse.redirect(new URL(PAGES.SIGN_IN, nextUrl));
    }
    console.log('Valid token, access granted');
    if (newTokens) {
      const response = NextResponse.next();
      response.cookies.set('accessToken', newTokens.accessToken, {
        path: '/',
        sameSite: 'strict',
      });
      response.cookies.set('refreshToken', newTokens.refreshToken, {
        path: '/',
        sameSite: 'strict',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...prohibitedAuth, ...needAuth],
};
