'use client';

import TicketCard from '@/components/ticket/ticket-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';

export default function Page() {
  const [isEdit, setEdit] = useState<boolean>(false);

  const { user } = useProfile();

  return (
    <main className="flex min-h-full min-w-full flex-col items-center mt-20">
      <div>
        <TicketCard title="Профиль">
          <div className="flex items-center gap-x-5">
            <Avatar>
              <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
            </Avatar>
            {!user ? (
              <Skeleton className="w-[100px] h-4" />
            ) : (
              <p className="text-lg">{user?.email}</p>
            )}
          </div>
        </TicketCard>
        <TicketCard title="Детальная информация" className="mt-5">
          <div className="flex flex-col gap-y-2  items-center text-lg">
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Фамилия</p>
              {!user ? (
                <Skeleton className="w-[150px] h-7 " />
              ) : (
                <p>{user?.lastName}</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Имя</p>
              {!user ? (
                <Skeleton className="w-[150px] h-7 " />
              ) : (
                <p>{user?.firstName}</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Отчество</p>
              {!user ? (
                <Skeleton className="w-[150px] h-7 " />
              ) : (
                <p>{user?.middleName}</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Эл. почта</p>
              {!user ? (
                <Skeleton className="w-[150px] h-7 " />
              ) : (
                <p>{user?.email}</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Роль</p>
              {!user ? (
                <Skeleton className="w-[150px] h-7 " />
              ) : (
                <p>{LOCAL_ROLES[user?.role]}</p>
              )}
            </div>
          </div>
        </TicketCard>
      </div>
      {/*
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
        *
      </Card> */}
    </main>
  );
}
