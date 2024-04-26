import { NextPage } from 'next';
import SignUp from './SignUp';
import Header from '@/components/header';

interface Props {}

const SignUpPage: NextPage<Props> = ({}) => {
  return (
    <>
      <Header />
      <SignUp />
    </>
  );
};

export default SignUpPage;
