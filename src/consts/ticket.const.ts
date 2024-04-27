export enum TICKET_STATUSES {
  PENDING = 'PENDING',
  OK = 'OK',
  FAILED = 'FAILED',
}

export const LOCAL_TICKET_STATUSES: Record<TICKET_STATUSES, string> = {
  [TICKET_STATUSES.OK]: 'ОК',
  [TICKET_STATUSES.PENDING]: 'В обработке',
  [TICKET_STATUSES.FAILED]: 'Необходима доработка',
};
