import React from 'react';
import Head from 'next/head';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from '../lib/theme';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const Layout = styled(Box)(({ theme }) => ({
  backgroundColor: grey[200],
  ...theme.typography.body2,
  // padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  minHeight: '100vh',
}));

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StyledEngineProvider>        
    </React.Fragment>
  );
};

export default MyApp;
// export default wrapper.withRedux(MyApp);
