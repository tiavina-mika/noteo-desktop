import {
  Box, Snackbar,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

import TextField from '../../components/form/TextField';
import { noteSchema } from '../../utils/validations';
import { Note, NoteInput } from '../../types/notes';
import { useRouter } from 'next/router';
import { ADD_NOTE, EDIT_NOTE } from '../../controllers/note';
import { useMutation } from '@apollo/client';

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
  const route = useRouter();

  const [updateNote, { loading: updateNoteLoading, error: updateNoteError }] = useMutation(EDIT_NOTE);
  const [createNote, { loading: createNoteLoading, error: createNoteError }] = useMutation(ADD_NOTE);

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

  const onSubmitHandler: SubmitHandler<NoteInput> = async (values) => {
    if (note) {
      updateNote({ variables: { id: note.id, values }});
    } else {
      createNote({ variables: { values }});
    }

    if (updateNoteError || createNoteError) return;

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
          loading={note ? updateNoteLoading : createNoteLoading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Save
        </LoadingButton>
      </Box>
      <Snackbar
        open={!!updateNoteError}
        autoHideDuration={6000}
        message={updateNoteError?.message}
      />
    </FormProvider>
  );
};

export default NoteForm;

