import { ROLES } from '@/consts/roles.consts';
import { z } from '@/lib/zod';

const email = z.string().email()

const password = z
  .string()
  .min(8, { message: 'Пароль должен быть длиной от 8 символов' });

export const SignInForm = z.object({
  login: email,
  password,
});

export const SignUpForm = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  email,
  password,
  role: z.nativeEnum(ROLES),
});
