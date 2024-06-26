'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { PAGES } from '@/consts/pages.consts';
import Link from 'next/link';
import { useTickets } from '@/hooks/useTickets';
import { Ticket, TicketExtended } from '@/lib/dto/tickets.dto';
import { cn, datef, fio, rangeDate, ticketStatus } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import RoleRequired from '../utils/RoleRequired';
import { ROLES } from '@/consts/roles.consts';
import { StatusColors } from '@/consts/status-colors.consts';
import { TICKET_STATUSES } from '@/consts/ticket.const';

export const columnsSimple: ColumnDef<Ticket>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => <></>,
    cell: ({ row }) => <></>,
  },
  {
    id: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Дата <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (row) => rangeDate(row),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Статус <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        className={cn(StatusColors[row.getValue('status') as TICKET_STATUSES])}
      >
        {ticketStatus(row.getValue('status'))}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Дата Загрузки <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => datef(row.getValue('createdAt'), 'dd.MM.yyyy'),
  },
];

export const columnsExtended: ColumnDef<TicketExtended>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => <></>,
    cell: ({ row }) => <></>,
  },
  {
    id: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Дата <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (row) => rangeDate(row),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Статус <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        className={cn(StatusColors[row.getValue('status') as TICKET_STATUSES])}
      >
        {ticketStatus(row.getValue('status'))}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Дата Загрузки <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => datef(row.getValue('createdAt'), 'dd.MM.yyyy'),
  },
  {
    accessorKey: 'user',
    header: () => <div className="text-right">Автор</div>,
    cell: ({ row }) => (
      <div className="text-right">{fio(row.getValue('user'))}</div>
    ),
  },
];

//@ts-ignore
function SimpleTicketsTable({ columns, data }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <RoleRequired roles={[ROLES.EMPLOYEE]}>
          <Link href={PAGES.UPLOAD}>
            <Button variant={'outline'}>
              <CirclePlus className="mr-2" />
              Добавить
            </Button>
          </Link>
        </RoleRequired>
        {/*
<Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {!data ? (
                        <Skeleton className="w-[100px] h-4" />
                      ) : (
                        <>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <Link
                    key={row.getValue('id')}
                    href={`/ticket/${row.getValue('id')}`}
                    legacyBehavior
                  >
                    <TableRow
                      key={row.getValue('id')}
                      data-state={row.getIsSelected() && 'selected'}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Link>
                );
              })
            ) : (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableCell key={header.id}>
                          <Skeleton className="w-[100px] h-4" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <span>0 из 0</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  all?: boolean;
};

export function TicketsTable({ all }: Props) {
  const { data } = useTickets(all);

  const columns = all ? columnsExtended : columnsSimple;

  return <SimpleTicketsTable data={data} columns={columns} />;
}
