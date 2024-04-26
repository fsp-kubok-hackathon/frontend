import RoleRequired from '@/components/utils/RoleRequired';
import AccountantMainPage from './AccountantMainPage';
import EmployeeMainPage from './EmployeeMainPage';
import { ROLES } from '@/consts/roles.consts';

export default function Home() {
  return (
    <>
      <RoleRequired roles={[ROLES.EMPLOYEE]}>
        <EmployeeMainPage />
      </RoleRequired>
      <RoleRequired roles={[ROLES.ACCOUNTANT]}>
        <AccountantMainPage />
      </RoleRequired>
    </>
  );
}
