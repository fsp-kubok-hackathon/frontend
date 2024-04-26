'use client';
import React from 'react';
import ReceiptUpload from '@/components/receipt-upload';
import { Button } from '@/components/ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReceiptUploadFormSchema } from '@/lib/forms/upload.form';
import { FormField } from '@/components/ui/form';
import ReportingRangepicker from '@/components/reporting-rangepicker';

export default function Upload() {
  const form = useForm({
    resolver: zodResolver(ReceiptUploadFormSchema),
  });

  // Отслеживаем содержимое receipts
  const [receipts, dates] = form.watch(['receipts', 'dates']);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    // TODO:
  };

  const isSubmitDisabled =
    !receipts || receipts.length === 0 || !dates || !dates.from || !dates.to;

  return (
    <>
      <div className="flex min-h-screen items-center justify-center flex-col p-20">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <h1 className="text-4xl font-bold">Загрузка отчетности</h1>
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => {
                return <ReportingRangepicker {...field} />;
              }}
            />
            <FormField
              control={form.control}
              name="receipts"
              render={({ field }) => {
                return <ReceiptUpload {...field} />;
              }}
            />
            <Button type="submit" disabled={isSubmitDisabled}>
              Отправить
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
