import { format as baseFormat } from 'date-fns';
import { ru } from 'date-fns/locale';

import { isValid } from 'date-fns';

export function format(date: Date, formatStr = 'PP') {
  if (!isValid(date)) {
    date = new Date();
  }

  return baseFormat(date, formatStr, {
    locale: ru,
  });
}
