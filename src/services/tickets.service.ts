import { api } from '@/api/axios.config';
import { TicketsDto } from '@/lib/dto/tickets.dto';

export class TicketsService {
  static async get(): Promise<TicketsDto> {
    await new Promise((r) => setTimeout(r, 2000));
    return [
      {
        id: 'm5gr84i9',
        status: 'success',
        date: '2023-04-01',
        author: 'Ken',
      },
      {
        id: '3u1reuv4',
        status: 'success',
        date: '2023-04-02',
        author: 'Abe',
      },
      {
        id: 'derv1ws0',
        status: 'processing',
        date: '2023-04-03',
        author: 'Monserrat',
      },
      {
        id: '5kma53ae',
        status: 'success',
        date: '2023-04-04',
        author: 'Silas',
      },
      {
        id: 'bhqecj4p',
        status: 'failed',
        date: '2023-04-05',
        author: 'Carmella',
      },
      {
        id: 'm5gr84i9',
        status: 'success',
        date: '2023-04-01',
        author: 'Ken',
      },
      {
        id: '3u1reuv4',
        status: 'success',
        date: '2023-04-02',
        author: 'Abe',
      },
      {
        id: 'derv1ws0',
        status: 'processing',
        date: '2023-04-03',
        author: 'Monserrat',
      },
      {
        id: '5kma53ae',
        status: 'success',
        date: '2023-04-04',
        author: 'Silas',
      },
      {
        id: 'bhqecj4p',
        status: 'failed',
        date: '2023-04-05',
        author: 'Carmella',
      },
      {
        id: 'm5gr84i9',
        status: 'success',
        date: '2023-04-01',
        author: 'Ken',
      },
      {
        id: '3u1reuv4',
        status: 'success',
        date: '2023-04-02',
        author: 'Abe',
      },
      {
        id: 'derv1ws0',
        status: 'processing',
        date: '2023-04-03',
        author: 'Monserrat',
      },
      {
        id: '5kma53ae',
        status: 'success',
        date: '2023-04-04',
        author: 'Silas',
      },
      {
        id: 'bhqecj4p',
        status: 'failed',
        date: '2023-04-05',
        author: 'Carmella',
      },
    ];
    // const response = await api.get<ProfileDto>('/account');
    // return response.data;
  }
}
