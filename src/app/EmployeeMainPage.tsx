'use client';
import { TicketsTable } from '@/components/tickets-table';

function EmployeeMainPage() {
  return (
    <div className="flex items-center justify-center p-20 flex-col">
      <h1 className="text-4xl font-bold">Мои командировки</h1>
      <TicketsTable />
    </div>
  );
}

export default EmployeeMainPage;
