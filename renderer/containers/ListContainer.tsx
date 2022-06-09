import React, { Fragment } from 'react';
import { Box, Grid } from '@mui/material';

import Note from './notes/Note';
import { Note as NoteType} from '../types/notes';
import { Folder as FolderType } from '../types/folders';
import Folder from './folders/Folder';

type Props = {
  notes: NoteType[];
  folders?: FolderType[];
}
const ListContainer = ({
  notes, folders
}: Props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={2} justifyContent="center">
        <Fragment>
          {folders && folders.map((folder) => (
            <Folder key={folder.id} folder={folder} />
          ))}
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Fragment>
      </Grid>
    </Box>
  );
};

export default ListContainer;
