import React from 'react';
import Head from 'next/head';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'

import Link from '../components/Link';
import { AppState } from '../store/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

const Home = () => {
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
      </div>
    </React.Fragment>
  );
};

export default Home;
