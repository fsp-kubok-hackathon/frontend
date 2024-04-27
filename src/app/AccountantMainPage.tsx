'use client';
import { TicketsTable } from '@/components/tickets-table';

function AccountantMainPage() {
  return (
    <div className="flex min-h-full min-w-full items-center flex-col mt-20">
      <h1 className="text-4xl font-bold">Все тикеты</h1>
      <div className="w-2/4">
        <TicketsTable all={true} />
      </div>
    </div>
  );
}

export default AccountantMainPage;
