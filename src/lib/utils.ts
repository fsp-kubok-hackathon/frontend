import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parseISO } from 'date-fns';
import { format } from '@/lib/date-fns';
import { LOCAL_TICKET_STATUSES, TICKET_STATUSES } from '@/consts/ticket.const';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fio({
  lastName,
  firstName,
  middleName,
}: {
  lastName: string;
  firstName: string;
  middleName: string;
}) {
  return [
    lastName,
    firstName.charAt(0).toUpperCase() + '.',
    middleName.charAt(0).toUpperCase() + '.',
  ].join(' ');
}

export const datef = (dateString: string, formatString = 'dd.MM.yyyy') => {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, formatString);
};

export const rangeDate = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return datef(startDate) + ' - ' + datef(endDate);
};

export const ticketStatus = (value: string) => {
  return LOCAL_TICKET_STATUSES[value as TICKET_STATUSES];
};
