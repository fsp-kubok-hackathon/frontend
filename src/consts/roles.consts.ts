export enum ROLES {
  EMPLOYEE = 'EMPLOYEE',
  ACCOUNTANT = 'ACCOUNTANT',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
  [ROLES.EMPLOYEE]: 'Сотрудник',
  [ROLES.ACCOUNTANT]: 'Бухгалтер',
};
