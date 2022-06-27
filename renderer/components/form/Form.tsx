import { ReactNode } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';

type Props = {
  id?: string;
  onSubmit?: () => void;
  form?: any;
  loading?: boolean;
  children?: ReactNode;
  primaryButtonText?: string;
  error?: string;
}

const Form = ({
  id, onSubmit, form, loading,
  children, primaryButtonText = 'Save',
  error,
  ...formProps
}: Props) => {

  const formComponent = (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
      id={id}
      {...formProps}
    >
      {error && <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert>}
      {children}
      
      {/* use the local id if no id is defined */}
      {!id && (
        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          {primaryButtonText}
        </LoadingButton>
      )}
    </Box>
  );

  if (!form) return formComponent;

  return (
    <FormProvider {...form}>
      {formComponent}
    </FormProvider>
  );
};

export default Form;

