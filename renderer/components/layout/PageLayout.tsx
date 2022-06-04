import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import NoteForm from '../../containers/notes/NoteForm';
import { useRouter } from 'next/router';

const sx = {
  button: (theme) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  })
};

type Props = {
  title: string;
  children: React.ReactNode;
  bodySx: any;
}

const PageLayout = ({ title, children, bodySx }: Props) => {
  const route = useRouter();

  const goBack = () => route.back();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" alignSelf="stretch">
        <Box display="flex" alignSelf="stretch" pt={1.2}>
          <IconButton aria-label="keybord-back-space" onClick={goBack} sx={sx.button}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant='h5' color="text.primary" sx={{ flex: 1, textAlign: 'center' }}>
            {title}
          </Typography>
        </Box>
        <Box pt={5} sx={bodySx}>
          {children}        
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;

