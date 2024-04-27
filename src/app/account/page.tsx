'use client';

import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';

export default function Page() {
  const [isEdit, setEdit] = useState<boolean>(false);

  const { user } = useProfile();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="mt-20">
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-3 items-center">
          <Avatar className="bg-slate-500"></Avatar>
          <p>{user?.email}</p>
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
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    placeholder="Name of your project"
                    value={user?.lastName}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    placeholder="Name of your project"
                    value={user?.firstName}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    placeholder="Name of your project"
                    value={user?.middleName}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Эл. почта</Label>
                  <Input
                    id="email"
                    placeholder="Name of your project"
                    value={user?.email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Роль</Label>
                  <Input
                    id="role"
                    placeholder="Name of your project"
                    value={user?.role}
                  />
                </div>
              </form>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-2  items-center">
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Фамилия</p>
              <p>{user?.lastName}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Имя</p>
              <p>{user?.firstName}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Отчество</p>
              <p>{user?.middleName}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Эл. почта</p>
              <p>{user?.email}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Роль</p>
              <p>{user?.role}</p>
            </div>
          </CardContent>
        )}
        {/*
          <CardFooter className="flex flex-col items-center">
          <Button
            onClick={() => {
              setEdit(isEdit ? false : true);
            }}
          >
            Изменить
          </Button>
        </CardFooter>
        */}
      </Card>
    </main>
  );
}
