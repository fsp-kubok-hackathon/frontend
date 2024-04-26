import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тикеты',
};

interface Ticket {
  id: string;
  status: string;
  date: string;
  user: string;
}

export default function Page() {
  const tickets: Ticket[] = [
    { id: '123523', status: 'open', date: '26/04/2024', user: 'Резанов Н. А.' },
    {
      id: '423432',
      status: 'closed',
      date: '04/02/2024',
      user: 'Евтеев Н. А.',
    },
    { id: '754745', status: 'open', date: '06/02/2024', user: 'Резанов Н. А.' },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ИД</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="text-right">Загружено</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell className="text-right">{ticket.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
