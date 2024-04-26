'use client';
import React from 'react';
import ReceiptUpload from '@/components/receipt-upload';
import { Button } from '@/components/ui/button';

export default function Upload() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center flex-col p-20">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">Загрузка отчетности</h1>
          <ReceiptUpload />
          <Button>Отправить</Button>
        </div>
      </div>
    </>
  );
}
