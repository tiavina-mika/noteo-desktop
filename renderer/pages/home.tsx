import React from 'react';
import Head from 'next/head';
import AddIcon from '@mui/icons-material/Add';

import { Box, Fab, Grid } from '@mui/material';
import Note from '../containers/notes/Note';
import { useRouter } from 'next/router';
import PageLayout from '../components/layout/PageLayout';
import client from '../apollo-client';
import { gql } from '@apollo/client';

const Home = ({ notes }) => {
  const route = useRouter();

  const goToNoteCreation = () => route.push('/notes/add');

  return (
    <PageLayout withBackButton={false}>
      <Head>
        <title>Noteo</title>
      </Head>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center">
          {notes.map((note) => (
            <Note key={note._id} note={note} />
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
  const { data } = await client.query({
    query: gql`
      query Notes {
        getNotes {
          id
          title
          content
          updatedAt
        }
      }
    `,
  });
  console.log('data: ', data);

  return {
    props: {
      notes: data.getNotes,
    }
  };
};

export default Home;
