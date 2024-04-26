'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { datef, fio, rangeDate, ticketStatus } from '@/lib/utils';
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
  const { data: reciepts, isLoading: recieptsIsLoading } = useReciepts(id);

  if (isLoading || recieptsIsLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!data || !reciepts) {
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
              <p>{fio(data.user)}</p>
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
              {reciepts.map((reciept) => {
                let imageLink = new URL(reciept.imageLink);

                if (imageLink.host === 'minio:9000') {
                  imageLink.host = 'mzhn.fun:9000'
                }

                return (
                  <TableRow key={reciept.createdAt}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={imageLink.toString()}
                        width="64"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
