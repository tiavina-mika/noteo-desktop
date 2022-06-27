import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import TextField from '../../components/form/TextField';
import { loginSchema } from '../../utils/validations';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../controllers/auth';
import { LoginInput } from '../../types/auth';
import Form from '../../components/form/Form';
import { setClientCookie } from '../../utils/cookies';
import { PATH_NAMES, SESSION_DURATION, SESSION_TOKEN_NAME } from '../../utils/constants';
import { onError } from '../../utils/utils';

type Props = {
  formId?: string;
  onSubmit?: () => void;
}

const LoginForm = ({
  onSubmit
}: Props) => {
  const route = useRouter();

  const [login, { loading, error, data }] = useMutation(LOGIN, { onError });

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = form;

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    login({ variables: { values }});

    if (data) {
      setClientCookie(SESSION_TOKEN_NAME, data.login.token, SESSION_DURATION)
    }

    if (error || loading) return;
  
    if (onSubmit) {
      onSubmit();
      return;
    }
  
    route.push(PATH_NAMES.home);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      loading={loading}
      error={error?.message}
      primaryButtonText="Login"
    >
      <TextField
        sx={{ mb: 2 }}
        name="email"
        label='Email'
        type="email"
        fullWidth
        required
      />
      <TextField
        sx={{ mb: 2 }}
        name="password"
        label="Password"
        type="password"
        fullWidth
        required
      />
    </Form>
  );
};

export default LoginForm;

