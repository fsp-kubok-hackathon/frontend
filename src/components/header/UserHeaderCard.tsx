'use client';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { Skeleton } from '@/components/ui/skeleton';
import RoleRequired from '../utils/RoleRequired';
import { LOCAL_ROLES, ROLES } from '@/consts/roles.consts';
import { PAGES } from '@/consts/pages.consts';

export default function UserHeaderCard() {
  const { user, isLoading, loggedOut } = useProfile();
  const { logout } = useLogout();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end space-y-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (loggedOut) {
    return (
      <Link href={PAGES.SIGN_IN}>
        <Button>Вход</Button>
      </Link>
    );
  }

  return (
    <div>
      {user && (
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="">
            {/* <p className="text-right">{fio(user)}</p> */}
            <p className="text-center md:text-right">
              {user.lastName} {user.firstName} {user.middleName}
            </p>
            <p className="text-muted-foreground text-center md:text-right">
              @{user.handle} / {LOCAL_ROLES[user.role as ROLES] || user.role}
            </p>
          </div>

          <RoleRequired roles={[ROLES.EMPLOYEE, ROLES.ACCOUNTANT]}>
            <Link href={PAGES.ACCOUNT}>
              <Button>Личный кабинет</Button>
            </Link>
          </RoleRequired>

          <Button onClick={() => logout()}>Выход</Button>
        </div>
      )}
    </div>
  );
}
