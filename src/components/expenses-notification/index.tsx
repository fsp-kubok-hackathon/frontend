// @ts-nocheck

import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import ReceiptUpload from '../receipt-upload';
import { FormField } from '../ui/form';
import { UploadRecieptsFormSchema } from '@/lib/forms/upload-reciepts.form';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { TicketsService } from '@/services/tickets.service';
import { toast } from 'sonner';
import { z } from '@/lib/zod';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { datef } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function ExpensesNotification({
  ticketId,
  items = [],
}: {
  ticketId: string;
  items: [];
}) {
  const form = useForm({
    resolver: zodResolver(UploadRecieptsFormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ['uploadTicket'],
    mutationFn: (data: z.infer<typeof UploadRecieptsFormSchema>) =>
      TicketsService.uploadToExists({
        ticketId,
        ...data,
      }),
    onSuccess: () => {
      console.log('Success');
      toast.success(`Успешно создана заявка!`);
      // push('/');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    await mutate(data);
    // TODO:
  };

  return (
    <div className="bg-red-400 w-full text-white text-xl rounded-md px-10">
      У вас есть неподтвержденные расходы!
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-xl underline text-white">
            Добавить
          </Button>
        </DialogTrigger>
        <DialogContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <DialogHeader>
                <DialogTitle className="text-center">
                  Непотвержденные расходы
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ScrollArea className="h-72 w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Назначение платежа</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              {datef(item.authDate, 'dd.MM.yyyy HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                              {item.sum}
                            </TableCell>
                            <TableCell>
                              {item.purpose}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <FormField
                  control={form.control}
                  name="receipts"
                  render={({ field }) => {
                    return <ReceiptUpload {...field} />;
                  }}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Отправить
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
