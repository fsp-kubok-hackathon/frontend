const REFRESH_TOKEN = 'refreshToken';

import Cookies from 'js-cookie';

export class RefreshTokenService {
  static get(): string | null {
    const token = Cookies.get(REFRESH_TOKEN);
    return token || null;
  }

  static set(value: string) {
    Cookies.set(REFRESH_TOKEN, value, {
      domain: 'localhost',
      expires: 1,
      sameSite: 'strict',
    });
  }

  static remove() {
    Cookies.remove(REFRESH_TOKEN);
  }
}
