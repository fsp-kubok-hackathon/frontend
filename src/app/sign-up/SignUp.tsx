'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthService } from '@/services/auth.service';
import { toast } from 'sonner';
import { z } from '@/lib/zod';
import { SignUpDto } from '@/lib/dto/auth.dto';
import { SignUpForm } from '@/lib/forms/auth.form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { PAGES } from '@/consts/pages.consts';
import { LOCAL_ROLES, ROLES } from '@/consts/roles.consts';

export default function SignUp() {
  const form = useForm<z.infer<typeof SignUpForm>>({
    resolver: zodResolver(SignUpForm),
  });

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: (data: SignUpDto) => AuthService.signUp(data),
    onSuccess: () => {
      toast('Успешная регистрация');
      form.reset();
      push('/');
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const onSubmit: SubmitHandler<SignUpDto> = async (data) => {
    await mutate(data);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-20">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">Регистрация</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Вы являетесь</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите роль" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ROLES.ACCOUNTANT}>
                            {LOCAL_ROLES[ROLES.ACCOUNTANT]}
                          </SelectItem>
                          <SelectItem value={ROLES.EMPLOYEE}>
                            {LOCAL_ROLES[ROLES.EMPLOYEE]}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
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
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input placeholder="Иванов" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отчество</FormLabel>
                      <FormControl>
                        <Input placeholder="Иванович" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Зарегистрироваться
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full">
              <span>Есть аккаунт? </span>
              <Link href={PAGES.SIGN_IN} className="underline">
                Войти
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
