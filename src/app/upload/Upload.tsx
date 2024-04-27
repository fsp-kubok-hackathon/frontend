'use client';

import React from 'react';
import ReceiptUpload from '@/components/receipt-upload';
import { Button } from '@/components/ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReceiptUploadFormSchema } from '@/lib/forms/upload.form';
import { FormField } from '@/components/ui/form';
import ReportingRangepicker from '@/components/reporting-rangepicker';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TicketsService } from '@/services/tickets.service';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const form = useForm({
    resolver: zodResolver(ReceiptUploadFormSchema),
  });

  const [receipts, dates] = form.watch(['receipts', 'dates']);

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['uploadTicket'],
    mutationFn: TicketsService.upload,
    onSuccess: () => {
      console.log('Success');
      // form.reset();
      toast.success(`Успешно создана заявка!`);
      push('/');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    await mutate(data);
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
