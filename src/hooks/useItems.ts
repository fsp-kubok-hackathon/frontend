import { ReportService } from '@/services/report.service';
import { useQuery } from '@tanstack/react-query';

export function useItems(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['items', id],
    queryFn: () => ReportService.getItems({ ticketId: id }),
  });

  return { data, isLoading };
}
