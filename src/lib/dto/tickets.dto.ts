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

export type TicketDto = {
  id: string,
  userId: string,
  user: {
    id: string,
    handle: string,
    email: string,
    role: string,
    lastName: string,
    firstName: string,
    middleName: string,
    password: string,
    createdAt: string,
    updatedAt: string | null
}
  startDate: string,
  endDate: string,
  status: string,
  report: {
    id: string,
    fileName: string,
    addedBy: {},
    createdAt: string,
    updatedAt: string
  },
  createdAt: string,
  updatedAt: string
};

export type TicketsDto = Ticket[];
