import { z } from '@/lib/zod';

export const ReportUploadForm = z.object({
  report: z.any(),
});
