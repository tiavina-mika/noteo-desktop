import React from 'react';
import Head from 'next/head';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'

import Link from '../components/Link';
import { AppState, wrapper } from '../store/store';
import { setMessage, startLoading } from '../store/slices/app';

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
  const loading = useSelector((state: AppState): boolean => state.app.loading);
  const message = useSelector((state: AppState): string => state.app.message);
  console.log('message: ', message);
  console.log('loading: ', loading);

  if (loading) {
    return <Typography variant="h4" gutterBottom>...Loading</Typography>
  }
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

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      try {
        dispatch(startLoading())
        dispatch(setMessage('hello'))
        return { props: {} }
      } catch (e) {
        return { props: {} }
      }
    }
);

export default Home;
