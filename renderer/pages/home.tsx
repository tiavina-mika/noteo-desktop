import React from 'react';
import Head from 'next/head';
import AddIcon from '@mui/icons-material/Add';

import { Box, Fab, Grid } from '@mui/material';
import Note from '../containers/notes/Note';
import { useRouter } from 'next/router';
import PageLayout from '../components/layout/PageLayout';
import { getNotes } from '../controllers/note';
import { getFolders } from '../controllers/folder';
import { Note as NoteType} from '../types/notes';
import { Folder as FolderType } from '../types/folders';
import AppBar from '../containers/home/AppBar';

type Props = {
  notes: NoteType[];
  folders: FolderType[];
}
const Home = ({ notes, folders }: Props) => {
  const route = useRouter();

  const goToNoteCreation = () => route.push('/notes/add');

  return (
    <PageLayout withBackButton={false}>
      <Head>
        <title>Noteo</title>
      </Head>
      <AppBar />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Grid>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 15, right: 15}} onClick={goToNoteCreation}>
        <AddIcon />
      </Fab>
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotes();
  const { folders } = await getFolders();

  return {
    props: {
      notes,
      folders,
    }
  };
};

export default Home;
