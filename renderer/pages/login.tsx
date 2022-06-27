import AuthContainer from '../containers/auth/AuthContainer';
import LoginForm from '../containers/auth/LoginForm';
import SecondaryLink from '../containers/auth/SecondaryLink';
import { PATH_NAMES } from '../utils/constants';

const LoginPage = () => {
  return (
    <AuthContainer title="Login">
      <LoginForm />
      <SecondaryLink
        label="Not registrated yet?"
        link={PATH_NAMES.signup}
        linkText="Create an account"
      />
    </AuthContainer>
  );
};

export default LoginPage;
