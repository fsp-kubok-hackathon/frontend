export enum ROLES {
  EMPLOYEE = 'employee',
  ACCOUNTANT = 'accountant',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
  [ROLES.EMPLOYEE]: 'Сотрудник',
  [ROLES.ACCOUNTANT]: 'Бухгалтер',
};
