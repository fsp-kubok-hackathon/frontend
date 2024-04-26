'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTicket } from '@/hooks/useTicket';
import { datef, rangeDate, ticketStatus } from '@/lib/utils';
import { ArrowDownToLine, BookOpenCheck } from 'lucide-react';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

const ticket = {
  id: '423432',
  status: 'closed',
  date: '04/02/2024',
  user: 'Евтеев Н. А.',
};

export function Ticket({ params: { id } }: Props) {
  const { data, isLoading } = useTicket(id);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        Ошибка при запросе данных
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-3/5 grid grid-cols-1 md:grid-cols-5 gap-2 mt-20">
        <div className="md:col-span-2">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>ФИО</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.user}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-start-3">
          <Card className="h-[130px]">
            <CardContent className="w-full h-full p-6">
              <Button variant="ghost" className="w-full h-full">
                <ArrowDownToLine className="mr-2" />
                Выгрузить
                <br />
                отчет
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-start-4">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Статус</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticketStatus(data.status)}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-start-5">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Создан</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{datef(data.createdAt, 'dd.MM.yyyy HH:mm:ss')}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3 row-start-2">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Период</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{rangeDate(data)}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 md:col-start-4 md:row-start-2">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Выписка</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="link">
                <BookOpenCheck className="mr-2" />
                Открыть
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-5 md:row-start-3">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ИД</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Загружено</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell className="text-right">{ticket.user}</TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}