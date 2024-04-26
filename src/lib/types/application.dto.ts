import { z } from '@/lib/zod';;
import { applicationForm } from '../forms/application.form';

export type ApplicationSendDto = z.infer<typeof applicationForm>;
