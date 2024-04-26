import { format as baseFormat } from 'date-fns';
import { ru } from 'date-fns/locale';

export function format(date: Date, formatStr = 'PP') {
  return baseFormat(date, formatStr, {
    locale: ru,
  });
}
