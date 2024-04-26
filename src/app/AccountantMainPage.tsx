"use client";
import { TicketsTable } from "@/components/tickets-table";

function AccountantMainPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-20 flex-col">
      <h1 className="text-4xl font-bold">Все тикеты</h1>
      {/* TODO */}
      <TicketsTable />
    </div>
  );
}

export default AccountantMainPage;
