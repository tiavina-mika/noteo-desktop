import { ReactNode } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import Head from '../../components/Head';

const StyledFormContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: 500
  },
}));

type Props = {
  title: string;
  pageTitle?: string;
  children: ReactNode;
}
const AuthContainer = ({
  title, children, pageTitle,
}: Props) => {
  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Head title={pageTitle || title} />
      <StyledFormContainer direction="column" justifyContent="center" alignItems="center" container>
        <Box mb={2}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Box>
        <Box p={2}>
          {children}
        </Box>        
      </StyledFormContainer>
    </Box>
  );
};

export default AuthContainer;
