'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { SignInDto } from '@/lib/dto/auth.dto';
import { toast } from 'sonner';
import { z } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInForm } from '@/lib/forms/auth.form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { PAGES } from '@/consts/pages.consts';

export default function SignIn() {
  const form = useForm<z.infer<typeof SignInForm>>({
    resolver: zodResolver(SignInForm),
  });

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['signin'],
    mutationFn: (data: SignInDto) => AuthService.signIn(data),
    onSuccess: () => {
      toast('Успешная авторизация');
      form.reset();
      push('/');
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const onSubmit: SubmitHandler<SignInDto> = async (data) => {
    await mutate(data);
  };

  return (
    <>
      <div className="flex min-h-full min-w-full items-center justify-center p-20">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">Авторизация</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите пароль"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full">
              <span>Нет аккаунта? </span>
              <Link href={PAGES.SIGN_UP} className="underline">
                Зарегистрироваться
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
