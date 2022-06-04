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

const Test = () => {
  const classes = useStyles({});
  const loading = useSelector<AppState, boolean>((state) => state.app.loading);
  const message = useSelector<AppState, string>((state) => state.app.message);
  const messageFromServerStore = useSelector<any, string>((state) => state.app.app.message);

  console.log(' -------- messageFromServerStore: ', messageFromServerStore); // hello
  console.log(' -------- message: ', message); // null
  console.log(' ---------- loading: ', loading); // false

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
  ({ dispatch, getState }) =>
    async () => {
      try {
        dispatch(startLoading())
        dispatch(setMessage('hello'))
        const ssrState = getState();
        console.log('ssrState: ', ssrState);
        return { props: {} }
      } catch (e) {
        return { props: {} }
      }
    }
);

export default Test;
