import { api } from '@/api/axios.config';
import { AccessTokenService } from './access-token';
import {
  AuthResponseDto,
  ProfileDto,
  SignInDto,
  SignUpDto,
} from '@/lib/dto/auth.dto';
import { User } from '@/lib/types/user';

export class AuthService {
  static async signIn({ login, password }: SignInDto) {
    const response = await api.post<AuthResponseDto>('/auth/sign-in', {
      login,
      password,
    });

    if (response.status === 200) {
      AccessTokenService.set(response.data.accessToken);
    }
  }

  static async signUp({
    email,
    password,
    firstName,
    lastName,
    middleName,
  }: SignUpDto) {
    const response = await api.post<AuthResponseDto>('/auth/sign-up', {
      email,
      password,
      firstName,
      lastName,
      middleName,
    });

    if (response.status === 200) {
      AccessTokenService.set(response.data.accessToken);
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
    const response = await api.get<AuthResponseDto>('/auth/refresh');
    if (response.status === 200) {
      AccessTokenService.set(response.data.accessToken);
    }
    return response.data;
  }
}
