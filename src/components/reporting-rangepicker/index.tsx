import { forwardRef, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from '@/lib/date-fns';
import { ru } from 'date-fns/locale';
import TicketCard from '../ticket/ticket-card';

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (dateRange: DateRange | undefined) => void;
}

const ReportingRangepicker = forwardRef(
  ({ value, onChange }: DateRangePickerProps, ref) => {
    const [date, setDate] = useState<DateRange | undefined>(value);

    const handleSelect = (newDateRange: DateRange | undefined) => {
      setDate(newDateRange);
      onChange(newDateRange);
    };

    return (
      <TicketCard title="Период">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-full justify-center font-normal text-center',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from || new Date()}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </TicketCard>
    );
  },
);

ReportingRangepicker.displayName = 'ReportingRangepicker';

export default ReportingRangepicker;
