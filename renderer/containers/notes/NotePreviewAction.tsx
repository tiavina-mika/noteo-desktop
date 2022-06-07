import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Note } from '../../types/notes';
import { DELETE_NOTE, getNoteById } from '../../controllers/note';
import { Fragment, MouseEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;

type Props = {
  note: Note;
}

type Option = {
  label: string;
  onClick: () => void;
}

const NotePreviewAction = ({ note }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const route = useRouter();

  const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] = useMutation(DELETE_NOTE);


  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    deleteNote({ variables: { id: note.id }});
    handleClose();
    route.push('/home');
  };

  const options: Option[] = [
    {
      label: 'Delete',
      onClick: onDelete,
    }
  ];


  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="note-preview-button"
        aria-controls={open ? 'note-preview-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="note-preview-menu"
        MenuListProps={{
          'aria-labelledby': 'note-preview-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            // selected={option === 'Pyxis'}
            onClick={option.onClick}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default NotePreviewAction;

