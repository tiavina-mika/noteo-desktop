import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styled from '@emotion/styled';
import { DialogContentText, DialogTitle } from '@mui/material';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    width: 400
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
}

const RestoreNoteDialog = ({
  open, onClose, onOk,
}: Props) =>  {
  return (
    <BootstrapDialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        Restore note
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Impossible to open this note.
          Restore it to edit the content.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="button" onClick={onOk} variant="contained">Restore</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default RestoreNoteDialog;
