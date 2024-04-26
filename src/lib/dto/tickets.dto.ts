export type Ticket = {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  createdAt: string;
  updatedAt: string;
  date: string;
  author: string;
};

export type TicketsDto = Ticket[];
