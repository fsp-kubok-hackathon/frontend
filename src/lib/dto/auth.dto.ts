import { z } from '@/lib/zod';
import { SignInForm, SignUpForm } from '../forms/auth.form';

export type SignInDto = z.infer<typeof SignInForm>;

export type SignUpDto = z.infer<typeof SignUpForm>;

export type AuthResponseDto = {
  accessToken: string;
};

export type ProfileDto = {
  id: string;
  handle: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  avatarLink: string | null;
  role: string;
};
