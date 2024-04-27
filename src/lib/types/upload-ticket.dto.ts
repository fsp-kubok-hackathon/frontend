import { z } from '@/lib/zod';
import { ReceiptUploadFormSchema } from '../forms/upload.form';
import { UploadRecieptsFormSchema } from '../forms/upload-reciepts.form';

export type UploadTicketDto = z.infer<typeof ReceiptUploadFormSchema>;

export type UploadToExistsDto = z.infer<typeof UploadRecieptsFormSchema> & {
  ticketId: string;
};
