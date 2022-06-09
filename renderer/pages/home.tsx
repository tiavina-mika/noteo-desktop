import React, { Fragment } from 'react';
import Head from 'next/head';

import { Box, Grid } from '@mui/material';
import Note from '../containers/notes/Note';
import PageLayout from '../components/layout/PageLayout';
import { getNotesWithoutFolder } from '../controllers/note';
import { getFolders } from '../controllers/folder';
import { Note as NoteType} from '../types/notes';
import { Folder as FolderType } from '../types/folders';
import AppBar from '../containers/home/AppBar';
import Folder from '../containers/folders/Folder';
import FloatingButtonActions from '../components/FloatingButtonActions';

type Props = {
  notes: NoteType[];
  folders: FolderType[];
}
const Home = ({ notes, folders }: Props) => {
  return (
    <PageLayout withBackButton={false}>
      <Head>
        <title>Noteo</title>
      </Head>
      <AppBar />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center">
          <Fragment>
            {folders.map((folder) => (
              <Folder key={folder.id} folder={folder} />
            ))}
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </Fragment>
        </Grid>
      </Box>
      <FloatingButtonActions addUrl="/notes/add" />
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesWithoutFolder();
  const { folders } = await getFolders();

  return {
    props: {
      notes,
      folders,
    }
  };
};

export default Home;
