'use client';

import { SearchInput } from '@/components/ticket/search-input';
import PaginationControls from '@/components/tickets-paginations';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

interface Ticket {
  id: string;
  status: string;
  date: string;
  user: string;
}

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

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  // const { data, error } = useTickets(searchQuery);
  const start = 0;
  const end = 10;
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <p className="text-4xl font-bold m-20">Все тикеты</p>

      <div className="w-2/3 flex flex-row justify-between mb-5">
        <SearchInput onChange={setSearchQuery} />
        <Button>Фильтры</Button>
      </div>
      <div className="w-2/3 mb-5">
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
      <div className="w-2/3 flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <p className="">Строк на странице</p>
          <Select>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <PaginationControls
            hasNextPage={end < tickets.length}
            hasPrevPage={start > 0}
          />
        </div>
      </div>
    </main>
  );
}
