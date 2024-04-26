import { api } from '@/api/axios.config';
import { AccessTokenService } from './access-token';
import { AuthResponseDto, SignInDto, SignUpDto } from '@/lib/dto/auth.dto';
import { RefreshTokenService } from './refresh-token';

export class AuthService {
  static async signIn({ login, password }: SignInDto) {
    const response = await api.post<AuthResponseDto>('/auth/sign-in', {
      login,
      password,
    });

    if (response.status === 201) {
      AccessTokenService.set(response.data.accessToken);
      RefreshTokenService.set(response.data.refreshToken);
    }
  }

  static async signUp({
    role,
    email,
    password,
    firstName,
    lastName,
    middleName,
  }: SignUpDto) {
    const response = await api.post<AuthResponseDto>(`/auth/${role}/sign-up`, {
      handle: email,
      email,
      password,
      firstName,
      lastName,
      middleName,
    });

    if (response.status === 200) {
      AccessTokenService.set(response.data.accessToken);
      RefreshTokenService.set(response.data.refreshToken);
    }
  }

  static async logout() {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.error(error);
    }

    AccessTokenService.remove();
  }

  static async refresh() {
    const refreshToken = RefreshTokenService.get();

    const response = await api.post<AuthResponseDto>('/auth/refresh', {
      refreshToken,
    });
    if (response.status === 200) {
      AccessTokenService.set(response.data.accessToken);
      RefreshTokenService.set(response.data.refreshToken);
    }
    return response.data;
  }
}
