import {
  Box, Snackbar,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { LoadingButton } from '@mui/lab';

import TextField from '../../components/form/TextField';
import { noteSchema } from '../../utils/validations';
import { Note, NoteInput, NoteInputData } from '../../types/notes';
import { useRouter } from 'next/router';
import { ADD_NOTE, EDIT_NOTE } from '../../controllers/note';
import { useMutation } from '@apollo/client';
import { Folder } from '../../types/folders';
import { AppContext } from '../../components/providers/AppProvider';
import { setRequestHeader } from '../../utils/utils';
import { PATH_NAMES } from '../../utils/constants';

const getInitialValues = (data) => {
  if (!data) return {
    title: '',
    content: '',
  };

  return {
    title: data.title,
    content: data.content,
  };
};

type Props = {
  note?: Note;
  folder?: Folder;
  formId?: string;
  onSubmit?: () => void;
}

const NoteForm = ({
  note, folder, formId, onSubmit
}: Props) => {
  const route = useRouter();
	const { sessionToken } = useContext(AppContext);

  const [updateNote, { loading: updateNoteLoading, error: updateNoteError }] = useMutation(EDIT_NOTE, { context: setRequestHeader({ sessionToken }) });
  const [createNote, { loading: createNoteLoading, error: createNoteError }] = useMutation(ADD_NOTE, { context: setRequestHeader({ sessionToken }) });

  const form = useForm<NoteInput>({
    defaultValues: getInitialValues(note),
    resolver: zodResolver(noteSchema),
  });

  const {
    handleSubmit,
  } = form;

  const onSubmitHandler: SubmitHandler<NoteInput> = async (values) => {
    let result
    if (note) {
      result = await updateNote({ variables: { id: note.id, values }});
    } else {
      const newValues: NoteInputData = { ...values };
      if (folder) {
        newValues.folder = folder.id;
      }

      result = await createNote({ variables: { values: newValues }});
    }

    if (!result) return;
    if (updateNoteLoading || createNoteLoading) return;
  
    if (onSubmit) {
      onSubmit();
      return;
    }

    if (folder) {
      route.push(PATH_NAMES.folders + '/' + folder.id);
      return;
    }
  
    route.push(PATH_NAMES.home);
  };

  return (
    <FormProvider {...form}>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
        id={formId || 'note-form'}
      >
        <TextField
          sx={{ mb: 2 }}
          name="title"
          label='Title'
          fullWidth
        />

        <TextField
          sx={{ mb: 2 }}
          name="content"
          label='Content'
          fullWidth
          multiline
          rows={6}
        />

        {/* use the local id if no id is defined */}
        {!formId && (
          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={note ? updateNoteLoading : createNoteLoading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Save
          </LoadingButton>
        )}
      </Box>
      <Snackbar
        open={!!updateNoteError || !!createNoteError}
        autoHideDuration={6000}
        message={updateNoteError?.message || createNoteError?.message}
      />
    </FormProvider>
  );
};

export default NoteForm;

