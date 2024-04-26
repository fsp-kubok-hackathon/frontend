import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDownToLine, BookOpenCheck } from 'lucide-react';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: 'Тикет ' + id,
  };
}

const ticket = {
  id: '423432',
  status: 'closed',
  date: '04/02/2024',
  user: 'Евтеев Н. А.',
};

export default function Page({ params: { id } }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-3/5 grid grid-cols-5 grid-rows-3 gap-2 mt-20">
        <div className="col-span-2">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>ФИО</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.user}</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-start-3">
          <Card className="h-[130px]">
            <CardContent>
              <Button variant="link">
                <ArrowDownToLine className="mr-2" />
                Выгрузить
                <br />
                отчет
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-start-4">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Статус</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.status}</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-start-5">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Создан</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.date}</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 row-start-2">
          <Card className="h-[130px]">
            <CardHeader>
              <CardTitle>Период</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.date}</p>
              <Input type="date"/>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 col-start-4 row-start-2">
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
        <div className="col-span-5 row-start-3">
          <Table className='w-full'>
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
