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

  return (
    <div>
      <div className="flex items-center gap-4 flex-col md:flex-row h-12">
        {isLoading ? (
          <Skeleton className="w-[150px] h-6" />
        ) : (
          <>
            {user && (
              <div>
                <p className="text-center md:text-right">
                  {user.lastName} {user.firstName} {user.middleName}
                </p>
                <p className="text-muted-foreground text-center md:text-right">
                  {user.handle} / {LOCAL_ROLES[user.role as ROLES] || user.role}
                </p>
              </div>
            )}
          </>
        )}

        {!isLoading && (
          <>
            {!user ? (
              <Link href={PAGES.SIGN_IN}>
                <Button>Вход</Button>
              </Link>
            ) : (
              <>
                {/** start НЕ ТРОГАТЬ */}
                <RoleRequired roles={[ROLES.EMPLOYEE, ROLES.ACCOUNTANT]}>
                  <Link href={PAGES.ACCOUNT}>
                    <Button>Личный кабинет</Button>
                  </Link>
                </RoleRequired>
                {/** end НЕ ТРОГАТЬ */}
                <Button onClick={() => logout()}>Выход</Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
