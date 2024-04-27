import { z } from "../zod";

export const UploadRecieptsFormSchema = z.object({
  receipts: z.array(z.instanceof(File)),
});
