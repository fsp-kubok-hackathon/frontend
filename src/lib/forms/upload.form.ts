import { z } from '@/lib/zod';

const DateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),  
});

export const ReceiptUploadFormSchema = z.object({
  dates: DateRangeSchema,
  receipts: z.array(z.instanceof(File))
});
