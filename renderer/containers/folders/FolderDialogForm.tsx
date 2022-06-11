import React, { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import TextField from '../../components/form/TextField';
import { Folder, FolderInput } from '../../types/folders';
import { zodResolver } from '@hookform/resolvers/zod';
import { folderSchema } from '../../utils/validations';
import { ADD_FOLDER, EDIT_FOLDER } from '../../controllers/folder';
import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { DialogTitle } from '@mui/material';

const getInitialValues = (data) => {
  if (!data) {
    return {
      name: 'Folder without name'
    };
  };

  return {
    name: data.name,
  };
};
const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    width: 400
  },
}));

type Props = {
  folder?: Folder;
  open: boolean;
  onClose: () => void;
  updateFoldersList?: (value?: boolean) => void;
}

const FolderDialogForm = ({
  folder, open, onClose,
  updateFoldersList,
}: Props) =>  {
  const [updateFolder, { loading: updateFolderLoading, error: updateFolderError }] = useMutation(EDIT_FOLDER);
  const [createFolder, { loading: createFolderLoading, error: createFolderError, data: createdFolderData }] = useMutation(ADD_FOLDER);

  const form = useForm<FolderInput>({
    defaultValues: getInitialValues(folder),
    resolver: zodResolver(folderSchema),
  });

  const {
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = form;

  useMemo(() => {
    if (createdFolderData) {
      updateFoldersList && updateFoldersList();
    }
  }, [createdFolderData])

  useEffect(() => {
  if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit =async (values) => {
    if (folder) {
      updateFolder({ variables: { id: folder.id, values }});
    } else {
      createFolder({ variables: { values }});
    }

    if (updateFolderError || createFolderError) return;
    if (createFolderLoading || updateFolderLoading) return;

    onClose();
  };

  return (
    <BootstrapDialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        New folder
      </DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            id="folder-dialog-form"
          >
            <TextField
              name="name"
              fullWidth
              required
            />
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="folder-dialog-form" variant="contained">Ok</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default FolderDialogForm;
