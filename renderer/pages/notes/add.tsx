import {
  Box,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import TextField from '../../components/form/TextField';

const noteSchema = object({
  title: string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
})

type NoteInput = TypeOf<typeof noteSchema>;

const Add = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
  });

  const {
    formState: { errors, isSubmitSuccessful },
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
    <Box display="flex" flexDirection="column" alignItems="center" pt={5}>
      <Box sx={{ maxWidth: '60vw' }} display="flex" flexDirection="column" alignItems="center">
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
          Add new note
        </Typography>
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
      </Box>
    </Box>
  );
};

export default Add;

