'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useReciepts } from '@/hooks/useReciepts';
import { useTicket } from '@/hooks/useTicket';
import { cn, datef, fio, ticketStatus } from '@/lib/utils';
import { CalendarDays, Download, FileCheck, FileUp } from 'lucide-react';
import { UploadReport } from './UploadReport';
import RoleRequired from '@/components/utils/RoleRequired';
import { ROLES } from '@/consts/roles.consts';
import TicketCard from '@/components/ticket/ticket-card';
import { S3_HOST } from '@/consts/config.consts';
import ExpensesNotification from '@/components/expenses-notification';
import { useItems } from '@/hooks/useItems';
import { CategoriesTable } from '@/components/categories-table';
import { moneyFormatter } from '@/lib/formatter';
import { Badge } from '@/components/ui/badge';
import { StatusColors } from '@/consts/status-colors.consts';
import { TICKET_STATUSES } from '@/consts/ticket.const';

type Props = {
  params: {
    id: string;
  };
};

function PeriodCard({
  isLoading,
  startDate,
  endDate,
  className,
}: {
  isLoading: boolean;
  startDate?: string;
  endDate?: string;
  className?: string;
}) {
  return (
    <TicketCard className={cn(className, 'row-start-2')} title="Период">
      {isLoading ? (
        <Skeleton className="w-[60px] h-4" />
      ) : (
        <div>
          <div className="flex justify-around text-muted-foreground pb-4">
            <div>От</div>
            <div>До</div>
          </div>
          <div className="flex justify-around gap-x-4">
            <Card className="flex items-center gap-x-3 py-3 px-3">
              <div>
                <CalendarDays />
              </div>
              <div>{startDate ? datef(startDate, 'dd.MM.yyyy') : ''}</div>
            </Card>
            <div className="flex items-center">-</div>
            <Card className="flex items-center gap-x-3 py-3 px-3">
              <div>
                <CalendarDays />
              </div>
              <div>{datef(endDate || '', 'dd.MM.yyyy')}</div>
            </Card>
          </div>
        </div>
      )}
    </TicketCard>
  );
}

export function Ticket({ params: { id } }: Props) {
  const { data, isLoading } = useTicket(id);
  const { data: reciepts, isLoading: recieptsIsLoading } = useReciepts(id);

  const { data: items } = useItems(id);

  const periodCardsProps = {
    isLoading,
    ...(data || {}),
  };
  return (
    <main className="flex min-h-full min-w-full flex-col items-center">
      <div className="w-3/5 mt-20">
        <RoleRequired roles={[ROLES.EMPLOYEE]}>
          {items && items.length !== 0 && (
            <ExpensesNotification ticketId={id} items={items} />
          )}
        </RoleRequired>
      </div>
      <div className="w-3/5 grid grid-cols-1 md:grid-cols-5 gap-4 mt-5">
        <TicketCard title="ФИО" className="md:col-span-2">
          {isLoading ? (
            <Skeleton className="w-[200px] h-4" />
          ) : (
            <p className="text-xl">
              {data?.user.lastName} {data?.user.firstName}{' '}
              {data?.user.middleName}
            </p>
          )}
        </TicketCard>
        <Card className="md:col-start-3">
          <CardContent className="w-full h-full p-6">
            <Button variant="ghost" className="w-full h-full flex gap-4">
              <div>
                <Download height={36} width={36} />
              </div>
              <div className="text-lg">
                <p>Выгрузить</p>
                <p>отчет</p>
              </div>
            </Button>
          </CardContent>
        </Card>
        <TicketCard className="md:col-start-4" title="Статус">
          {isLoading ? (
            <Skeleton className="w-[60px] h-4" />
          ) : (
            <p>
              {data && (
                <Badge
                  className={cn(StatusColors[data.status as TICKET_STATUSES])}
                >
                  {ticketStatus(data.status)}
                </Badge>
              )}
            </p>
          )}
        </TicketCard>
        <TicketCard className="md:col-start-5" title="Создан">
          {isLoading ? (
            <Skeleton className="w-[60px] h-4" />
          ) : (
            <p>{data && datef(data.createdAt, 'dd.MM.yyyy')}</p>
          )}
        </TicketCard>
        <RoleRequired roles={[ROLES.EMPLOYEE]}>
          <PeriodCard className="md:col-span-5 " {...periodCardsProps} />
        </RoleRequired>
        <RoleRequired roles={[ROLES.ACCOUNTANT]}>
          <PeriodCard className="md:col-span-3" {...periodCardsProps} />
        </RoleRequired>
        <RoleRequired roles={[ROLES.ACCOUNTANT]}>
          <TicketCard
            className="md:col-span-2 md:col-start-4 md:row-start-2"
            title="Выписка"
          >
            <div className="py-8">
              {data?.report ? (
                <Button variant="link" className="flex gap-x-4">
                  <FileCheck height={36} width={36} />
                  <Link
                    className="text-2xl font-normal"
                    href={`${S3_HOST}/${data.report.fileName}`}
                  >
                    Скачать
                  </Link>
                </Button>
              ) : (
                <UploadReport ticketId={id}>
                  <Button variant="link" className="flex gap-x-4">
                    <FileUp height={36} width={36} />
                    <p className="text-2xl font-normal">Загрузить</p>
                  </Button>
                </UploadReport>
              )}
            </div>
          </TicketCard>
        </RoleRequired>
      </div>
      <div className="w-3/5 mt-20">
        <CategoriesTable categories={[]} />
      </div>
      <div className="w-3/5 mt-20">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="">Фото</TableHead>
              <TableHead className="text-right">Итог</TableHead>
              <TableHead className="text-center">Дата оплаты</TableHead>
              <TableHead className="text-center">Дата загрузки</TableHead>
              <TableHead className="text-right">Загружено</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading && reciepts ? (
            <Skeleton className="w-full h-12" />
          ) : (
            <TableBody>
              {reciepts?.map((r) => {
                let imageLink = new URL(r.imageLink);

                return (
                  <TableRow key={r.createdAt}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={imageLink.toString().split('?')[0]}
                        width="64"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {moneyFormatter.format(Number(r.totalAmount) / 100)}
                    </TableCell>
                    <TableCell align="center">
                      {datef(r.paidAt, 'dd.MM.yyyy')}
                    </TableCell>
                    <TableCell align="center">
                      {datef(r.createdAt, 'dd.MM.yyyy')}
                    </TableCell>
                    <TableCell align="right">
                      {data && fio(data.user)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </main>
  );
}
