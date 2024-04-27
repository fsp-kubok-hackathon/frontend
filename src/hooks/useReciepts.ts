import { TicketsService } from '@/services/tickets.service';
import { useQuery } from '@tanstack/react-query';

export function useReciepts(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['reciepts', id],
    queryFn: () => TicketsService.getRecieptsById(id),
  });

  return { data, isLoading };
}
