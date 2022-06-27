import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';

import TextField from '../../components/form/TextField';
import { signUpSchema } from '../../utils/validations';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../controllers/auth';
import { SignUpInput } from '../../types/auth';
import Form from '../../components/form/Form';
import { PATH_NAMES } from '../../utils/constants';
import { onError } from '../../utils/utils';

type Props = {
  formId?: string;
  onSubmit?: () => void;
}

const SignUpForm = ({
  onSubmit
}: Props) => {
  const route = useRouter();

  const [signup, { loading, error, data }] = useMutation(SIGNUP, { onError });

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
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

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    const newValues = { ...values };
    delete newValues.passwordConfirmation;

    const result = await signup({ variables: { values: newValues }});
    if (!result?.data) return;


    if (onSubmit) {
      onSubmit();
    }

    route.push(PATH_NAMES.login);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      loading={loading}
      error={error?.message}
      primaryButtonText="Create Account"
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
        name="firstName"
        label='First name'
        fullWidth
        required
      />
      <TextField
        sx={{ mb: 2 }}
        name="lastName"
        label='Last Name'
        fullWidth
      />
      <TextField
        sx={{ mb: 2 }}
        type="password"
        name="password"
        label="Password"
        fullWidth
        required
      />
      <TextField
        sx={{ mb: 2 }}
        type="password"
        name="passwordConfirmation"
        label="Confirm password"
        fullWidth
        required
      />
    </Form>
  );
};

export default SignUpForm;

