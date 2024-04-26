'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface User {
  lastname: string;
  firstname: string;
  middlename: string;
  email: string;
  role: string;
}

export default function Page() {
  const [isEdit, setEdit] = useState<boolean>(false);

  const user: User = {
    firstname: 'Никита',
    middlename: 'Алексеевич',
    lastname: 'Рязанов',
    email: 'hwndrer@mail.ru',
    role: 'team-лидер',
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="mt-20">
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-3 items-center">
          <Avatar className="bg-slate-500"></Avatar>
          <p>{user.email}</p>
        </CardContent>
      </Card>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Детальная информация</CardTitle>
        </CardHeader>
        {isEdit ? (
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <form>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Фамилия</Label>
                  <Input
                    id="lastname"
                    placeholder="Name of your project"
                    value={user.lastname}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">Имя</Label>
                  <Input
                    id="firstname"
                    placeholder="Name of your project"
                    value={user.firstname}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="middlename">Отчество</Label>
                  <Input
                    id="middlename"
                    placeholder="Name of your project"
                    value={user.middlename}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Эл. почта</Label>
                  <Input
                    id="email"
                    placeholder="Name of your project"
                    value={user.email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Роль</Label>
                  <Input
                    id="role"
                    placeholder="Name of your project"
                    value={user.role}
                  />
                </div>
              </form>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-2  items-center">
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Фамилия</p>
              <p>{user.lastname}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Имя</p>
              <p>{user.firstname}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Отчество</p>
              <p>{user.middlename}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Эл. почта</p>
              <p>{user.email}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Роль</p>
              <p>{user.role}</p>
            </div>
          </CardContent>
        )}
        <CardFooter className="flex flex-col items-center">
          <Button
            onClick={() => {
              setEdit(isEdit ? false : true);
            }}
          >
            Изменить
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
