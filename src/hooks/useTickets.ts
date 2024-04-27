import { TicketsService } from '@/services/tickets.service';
import { useQuery } from '@tanstack/react-query';

export function useTickets(all ?: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: all ? TicketsService.getAll : TicketsService.get,
  });

  return { data, isLoading };
}
