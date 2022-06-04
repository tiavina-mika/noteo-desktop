import {
  Box,
  Typography,
} from '@mui/material';
import NoteForm from '../../containers/notes/NoteForm';

const Add = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt={5}>
      <Box sx={{ maxWidth: '60vw' }} display="flex" flexDirection="column" alignItems="center">
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
          Add new note
        </Typography>
        <NoteForm />
      </Box>
    </Box>
  );
};

export default Add;

