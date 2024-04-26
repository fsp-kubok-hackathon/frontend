import { Role } from '@/lib/types/role.dto';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { useRoles } from '@/hooks/dashboard/useRoles';
import { localDate } from '@/lib/utils';
import { DataTable } from '../tables.consts';
import { LOCAL_ROLES } from '../roles.consts';

export const ROLE_COLUMNS: ColumnDef<Role>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.ROLES}/${cell.getValue()}`}
        className="hover:underline"
      >
        {cell.getValue().substring(0, 13)}...
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Роль',
    cell: (cell) => <p>{LOCAL_ROLES[cell.getValue()] || cell.getValue()}</p>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан ',
    cell: (cell) => <p>{localDate(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Обновлён',
    cell: (cell) => <p>{cell.getValue() ? localDate(cell.getValue()) : '-'}</p>,
  },
];

export const ROLE_TABLE: DataTable<Role> = {
  title: 'Роли',
  columns: ROLE_COLUMNS,
  // @ts-ignore
  useData: useRoles,
};
