import { z } from '@/lib/zod';

export const SignInForm = z.object({
  login: z
    .string()
    .min(2, { message: 'Логин должен быть длиной от 2 символов' }),

  password: z
    .string()
    .min(8, { message: 'Пароль должен быть длиной от 8 символов' }),
});

export const SignUpForm = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен быть длиной от 8 символов' }),
});
