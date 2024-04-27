import { TicketsService } from '@/services/tickets.service';
import { useQuery } from '@tanstack/react-query';

export function useTicket(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => TicketsService.getById(id),
  });

  return { data, isLoading };
}
