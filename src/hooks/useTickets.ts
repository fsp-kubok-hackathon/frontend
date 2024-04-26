import { TicketsService } from '@/services/tickets.service';
import { useQuery } from '@tanstack/react-query';

export function useTickets() {
  const { data, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: TicketsService.get,
  });

  return { data, isLoading };
}
