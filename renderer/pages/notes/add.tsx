import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

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

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
  });

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
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            sx={{ mb: 2 }}
            label='Title'
            fullWidth
            required
            error={!!errors['title']}
            helperText={errors['title'] ? errors['title'].message : ''}
            {...register('title')}
          />
          <TextField
            sx={{ mb: 2 }}
            label='Content'
            fullWidth
            required
            type='content'
            error={!!errors['content']}
            multiline
            rows={6}
            helperText={errors['content'] ? errors['content'].message : ''}
            {...register('content')}
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
      </Box>
    </Box>
  );
};

export default Add;

