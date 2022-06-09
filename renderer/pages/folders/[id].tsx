import { Box, Grid, Typography } from '@mui/material';

import PageLayout from '../../components/layout/PageLayout';
import { Folder } from '../../types/folders';
import { getFolderById } from '../../controllers/folder';
import FolderPreviewAction from '../../containers/folders/FolderPreviewAction';
import { getNotesByFolderId } from '../../controllers/note';
import { Note } from '../../types/notes';
import NoteComponent from '../../containers/notes/Note';
import FloatingButtonActions from '../../components/FloatingButtonActions';
import NoNote from '../../containers/notes/NoNote';

type Props = {
  folder: Folder;
  notes: Note[];
}
const FolderPreview = ({ folder, notes }: Props) => {
  return (
    <PageLayout
      bodySx={{ flex:1, alignSelf: 'stretch', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
      actions={<FolderPreviewAction folder={folder} />}
    >
      <Typography variant="h1" sx={{ fontSize: 22 }} color="text.primary">
        {folder.name}
      </Typography>
      <Box display="flex" flexDirection="column" alignSelf="stretch" alignItems="center" mt={2}>
        {notes.length > 0
          ? (
            <Grid container spacing={2} justifyContent="center">
              {notes.map((note) => (
                <NoteComponent key={note.id} note={note} />
              ))}
            </Grid>
          ) : (
            <NoNote />
          )}
      </Box>
      <FloatingButtonActions addUrl={'/folders/notes/' + folder.id} />
    </PageLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const [
    { folder },
    { notes },
  ] = await Promise.all([
    await getFolderById(params.id),
    await getNotesByFolderId(params.id),
  ]);

  return {
    props: {
      folder,
      notes,
    },
  };
};

export default FolderPreview;

