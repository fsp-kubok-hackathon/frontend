import { api } from '@/api/axios.config';
import { TicketsDto } from '@/lib/dto/tickets.dto';
import { UploadTicketDto } from '@/lib/types/upload-ticket.dto';
import { formatISO } from 'date-fns';

export class TicketsService {
  static async upload({ dates, receipts }: UploadTicketDto): Promise<any> {
    const formData = new FormData();

    formData.append('startDate', formatISO(dates.from));
    formData.append('endDate', formatISO(dates.to));

    receipts.forEach((f, i) => {
      formData.append(`file${i}`, f);
    });

    await api.post('/tickets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async get(): Promise<TicketsDto> {
    const response = await api.get<TicketsDto>('/account/tickets');
    return response.data;
  }
}
