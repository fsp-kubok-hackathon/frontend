import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  titleSize?: string;
};

function TicketCard({ title, className, children, titleSize }: Props) {
  return (
    <CardComponent className={cn(className)}>
      <CardHeader>
        <CardTitle className={'flex justify-center font-normal'}>
          {title}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex justify-center py-4 text-xl">
        {children}
      </CardContent>
    </CardComponent>
  );
}

export default TicketCard;
