'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ReportUploadForm } from '@/lib/forms/upload-report.form';
import { ReportService } from '@/services/report.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  ticketId: string;
  children: React.ReactNode;
};

export const UploadReport = ({ ticketId, children }: Props) => {
  const form = useForm({});

  const { mutate } = useMutation({
    mutationKey: ['uploadReport'],
    mutationFn: (data) => ReportService.upload({ file: data, ticketId }),
    onSuccess: () => {
      console.log('Success');
      toast.success(`Успешно создана заявка!`);
      form.reset();
    },
    onError: (e) => {
      toast.error(e.message);
      console.error(e);
    },
  });

  const onSubmit = async (data) => {
    console.log(data.file);
    await mutate(data.file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Загрузка выписки</DialogTitle>
          <DialogDescription>ticket id: {ticketId}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            id="report"
            type="file"
            onChange={(e) => form.setValue('file', e.target.files[0])}
          />
          <Button type="submit">Загрузить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
