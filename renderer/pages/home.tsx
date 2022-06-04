import React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import Link from '../components/Link';
import { Box, Fab, Grid } from '@mui/material';
import { notes } from '../utils/data';
import Note from '../containers/notes/Note';
import { useRouter } from 'next/router';

const Home = ({ notes }) => {
  const route = useRouter();

  const goToNoteCreation = () => route.push('/notes/add');

  return (
    <React.Fragment>
      <Head>
        <title>Noteo</title>
      </Head>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          <Link href="/notes/add">
            Add new note
          </Link>
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Grid>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 15, right: 15}} onClick={goToNoteCreation}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      notes,
    }
  };
};

export default Home;
