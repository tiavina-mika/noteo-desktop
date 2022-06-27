import AuthContainer from '../containers/auth/AuthContainer';
import SecondaryLink from '../containers/auth/SecondaryLink';
import SignUpForm from '../containers/auth/SignUpForm';
import { PATH_NAMES } from '../utils/constants';

const SignUpPage = () => {
  return (
    <AuthContainer title="Create an account">
      <SignUpForm />
      <SecondaryLink
        label="Already have an account?"
        link={PATH_NAMES.login}
        linkText="Sign In"
      />
    </AuthContainer>
  );
};

export default SignUpPage;
