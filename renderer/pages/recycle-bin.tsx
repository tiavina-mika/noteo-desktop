import React from 'react';

import PageLayout from '../components/layout/PageLayout';
import { getNotesFromRecycleBin } from '../controllers/note';
import { Note as NoteType} from '../types/notes';
import { Box, Grid } from '@mui/material';
import Note from '../containers/notes/Note';

type Props = {
  notes: NoteType[];
}
const RecycleBin = ({ notes }: Props) => {
  return (
    <PageLayout withBackButton>
        <Box display="flex" flexDirection="column" alignItems="center" alignSelf="stretch" flex={1}>
          <Grid container spacing={2} justifyContent="center">
            {notes.map((note) => (
              <Note key={note.id} note={note} onClick={() => {}} />
            ))}
          </Grid>
        </Box>
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesFromRecycleBin();

  return {
    props: {
      notes,
    }
  };
};

export default RecycleBin;
