import {
  Box,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import TextField from '../../components/form/TextField';
import { noteSchema } from '../../utils/validations';
import { NoteInput } from '../../types/notes';

const NoteForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
  });

  const {
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<NoteInput> = (values) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          name="title"
          label='Title'
          fullWidth
          required
        />

        <TextField
          sx={{ mb: 2 }}
          name="content"
          label='Content'
          fullWidth
          required
          multiline
          rows={6}
        />

        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Save
        </LoadingButton>
      </Box>          
    </FormProvider>
  );
};

export default NoteForm;

