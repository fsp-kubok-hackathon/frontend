'use client';
import { TicketsTable } from '@/components/tickets-table';
import { useTickets } from '@/hooks/useTickets';

function EmployeeMainPage() {
  const { data, isLoading } = useTickets();
  return (
    <div className="flex min-h-full items-center flex-col min-w-full mt-20">
      <h1 className="text-4xl font-bold">Мои командировки</h1>
      <div className="w-2/4">
        <TicketsTable />
      </div>
    </div>
  );
}

export default EmployeeMainPage;
