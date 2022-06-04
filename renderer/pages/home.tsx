import React from 'react';
import Head from 'next/head';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs'

import Link from '../components/Link';
import { AppState } from '../store/store';
import { Box, Card, CardContent, CardHeader, Grid, styled } from '@mui/material';
import { truncateString } from '../utils/utils';

const notes = [
  {
    id: 1,
    title: 'Eiusmod tempor incididunt',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    updatedAt: dayjs().format('DD MMMM YYYY')
  },
  {
    id: 2,
    title: 'Quis nostrud exercitation',
    content: 'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    updatedAt: dayjs().add(5, 'day').subtract(1, 'year').format('DD MMMM YYYY')
  },
  {
    id: 3,
    title: 'sunt in culpa qui officia',
    content: 'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim',
    updatedAt: dayjs().subtract(2, 'month').format('DD MMMM YYYY')
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderRadius: 14,
  textAlign: 'left',
}));

const Home = ({ notes }) => {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Noteo</title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          <Link href="/notes/add">
            Add new note
          </Link>
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {notes.map((note) => (
            <Grid item xs={6} sm={6} md={4} lg={3} justifyContent="center">
              <CustomCard key={note.id} sx={{ alignSelf: 'stretch' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom fontWeight="bold">
                    {note.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {truncateString(note.content, 100)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={3}>
                    {note.updatedAt}
                  </Typography>
                </CardContent>
              </CustomCard> 
            </Grid> 
          ))}
        </Grid>
      </div>
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
