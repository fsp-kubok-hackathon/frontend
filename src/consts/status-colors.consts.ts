import { TICKET_STATUSES } from './ticket.const';

export const StatusColors: Record<TICKET_STATUSES, string> = {
  FAILED: 'bg-red-600',
  OK: 'bg-green-600',
  PENDING: 'bg-yellow-600',
};
