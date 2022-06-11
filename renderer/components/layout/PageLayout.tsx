import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
import Loading from '../Loading';

const sx = {
  backButton: (theme) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  }),
  actions: (theme) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  })
};

type Props = {
  title?: string;
  children: React.ReactNode;
  bodySx?: any;
  withBackButton?: boolean;
  loading?: boolean;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  pageTitle?: string;
  elevate?: boolean;
}

const PageLayout = ({
  title, children, bodySx, leftActions,
  pageTitle = "Noteo",
  withBackButton = true,
  loading, rightActions,
  elevate = false,
}: Props) => {
  const route = useRouter();

  const goBack = () => route.back();

  const elevateStyles = elevate ? {} : { boxShadow: 'none'};

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {loading && <Loading type="progress" />}
      <AppBar position="static" color="transparent" sx={{ ...elevateStyles }}>
        <Toolbar>
          {leftActions && leftActions}
          {withBackButton && (
            <IconButton aria-label="keybord-back-space" onClick={goBack} sx={sx.backButton}>
              <KeyboardBackspaceIcon />
            </IconButton>
          )}
          {title && (
            <Typography variant='h5' color="text.primary" sx={{ flex: 1, textAlign: 'center' }}>
              {title}
            </Typography>
          )}
          {rightActions && rightActions}
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" px={10}>
        <Box pt={5} sx={bodySx}>
          {children}        
        </Box>
      </Box>
    </Fragment>
  );
};

export default PageLayout;

