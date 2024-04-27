'use client';

import Link from 'next/link';
import Image from 'next/image';
import UserHeaderCard from './UserHeaderCard';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { FileCheck, Menu } from 'lucide-react';

type Props = {
  className?: string;
};

function Header({ className }: Props) {
  return (
    <>
      <header className={cn('', className)}>
        <nav className="hidden md:flex justify-between py-2 md:px-12 lg:px-48 border border-b-1 items-center space-x-12">
          <Link href={'/'} className="flex-none flex items-center space-x-4">
            {/* <Image src="/Vector.png" alt="logo" width={20} height={20} /> */}
            <p className="flex items-center gap-2 font-black text-white text-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md">
              <FileCheck size={21} strokeWidth={3.4} />
              <span> ОтчетЭксперт</span>
            </p>
          </Link>
          <div className="flex-none">
            <UserHeaderCard />
          </div>
        </nav>{' '}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href={'/'}
                className="flex-none flex items-center space-x-4"
              >
                <Image src="/Vector.png" alt="logo" width={20} height={20} />
                <p className="text-2xl">
                  <span>ОтчетЭксперт</span>
                </p>
              </Link>
              <div className="flex-none">
                <UserHeaderCard />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}

export default Header;
