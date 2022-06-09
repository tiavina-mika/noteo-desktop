import { Box, Stack, Typography } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

const NoNote = () => {
  return (
    <Box flex={1} alignSelf="stretch" mt={2}>
      <Stack sx={{ opacity: 0.6 }} alignItems="center" spacing={1}>
        <NoteAltIcon sx={{ fontSize: 40 }} />
        <Typography color="text.primary">
          No notes here yet
        </Typography>
      </Stack>            
    </Box>
  );
};


export default NoNote;

