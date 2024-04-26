type Ticket = {
  id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  date: string;
  author: string;
};

export type TicketsDto = Ticket[];
