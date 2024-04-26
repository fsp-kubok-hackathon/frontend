import { z } from '@/lib/zod';

export const ReceiptUploadFormSchema = z.object({
  receipts: z.array(z.instanceof(File))
});
