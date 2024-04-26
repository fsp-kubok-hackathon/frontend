import { z } from '@/lib/zod';;
import { ReceiptUploadFormSchema } from '../forms/upload.form';

export type UploadTicketDto = z.infer<typeof ReceiptUploadFormSchema>;