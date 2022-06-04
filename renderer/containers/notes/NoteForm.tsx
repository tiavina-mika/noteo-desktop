import {
  Box,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import TextField from '../../components/form/TextField';
import { noteSchema } from '../../utils/validations';
import { Note, NoteInput } from '../../types/notes';
import { notes } from '../../utils/data';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const getInitialValues = (data) => {
  if (!data) return {};

  return {
    title: data.title,
    content: data.content,
  };
};

type Props = {
  note?: Note;
}

const NoteForm = ({ note }: Props) => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const form = useForm<NoteInput>({
    defaultValues: getInitialValues(note),
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
    if (note) {
      //
    }
    notes.push({
      id: notes[notes.length -1].id++,
      updatedAt: dayjs().format('DD MMMM YYYY'),
      ...values
    });

    route.push('/home');
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

