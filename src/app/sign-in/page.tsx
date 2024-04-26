import { NextPage } from 'next';
import SignIn from './SignIn';
import Header from '@/components/header';

interface Props {}

const SignInPage: NextPage<Props> = ({}) => {
  return (
    <>
      <Header />
      <SignIn />
    </>
  );
};

export default SignInPage;
