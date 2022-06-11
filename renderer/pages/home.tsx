import React, { Fragment, useState } from 'react';

import { Box, Button, Drawer, Grid, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/router';

import PageLayout from '../components/layout/PageLayout';
import { getNotesWithoutFolder, NOTES_WITHOUT_FOLDER, RECYCLE_BIN_NOTES } from '../controllers/note';
import { getFolders } from '../controllers/folder';
import { Note as NoteType} from '../types/notes';
import { Folder as FolderType } from '../types/folders';
import AppBar from '../containers/home/AppBar';
import FloatingButtonActions from '../components/FloatingButtonActions';
import Folder from '../containers/folders/Folder';
import Note from '../containers/notes/Note';
import { useMutation, useQuery } from '@apollo/client';
import { Masonry } from '@mui/lab';

interface ISelectedCard {
  id: string;
  type: 'note' | 'folder';
}
type Props = {
  notes: NoteType[];
  folders: FolderType[];
}
const Home = ({ notes, folders }: Props) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<ISelectedCard[]>([]);

  const [moveNotesToRecycleBin, { loading: moveNotesToRecycleBinLoading, error: moveNotesToRecycleBinError, data }] = useMutation(RECYCLE_BIN_NOTES);
  const { data: newNotesData, error: notesError, loading: notesLoading } = useQuery(NOTES_WITHOUT_FOLDER, { skip: !data?.moveNotesToRecycleBin });

  const route = useRouter();

  const handleNoteSelect = (id: string) => {
    route.push('/notes/edit/' + id)
  }

  const toggleSelectMode = () => setSelectMode(!selectMode);

  const handleSelectNote = (id: string, checked: boolean) => {
    // add the checked notes to the selected cards
    if (checked) {
      setSelectedCards((prev) => [...prev, { id, type: 'note' }]);
      return;
    }

    // remove the unchecked notes to the selected cards
    const newSelectedNotes = selectedCards.filter((card: ISelectedCard) => card.id !== id);
    setSelectedCards(newSelectedNotes);
  }

  const handleDeleteAll = () => {
    const notes: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type === 'note');
    const notesIds: string[] = notes.map((note: ISelectedCard): string => note.id);

    // set the deleted field to true for the given notes by its id
    const values = { ids: notesIds, value: true };
    moveNotesToRecycleBin({
      variables: { values }, 
    });

    if (!moveNotesToRecycleBinLoading) {
      setSelectedCards([]);
    }
  };

  return (
    <PageLayout withBackButton={false} loading={notesLoading}>
      <AppBar />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Masonry
          columns={3}
          spacing={2}
          // for ssr
          defaultHeight={300}
          defaultColumns={3}
          defaultSpacing={2}
        >
          <Fragment>
            {folders.map((folder) => (
              <Folder key={folder.id} folder={folder} />
            ))}
            {(newNotesData?.getNotesWithoutFolder || notes).map((note) => (
              <Note
                key={note.id}
                note={note}
                onClick={() => handleNoteSelect(note.id)}
                toggleSelectMode={toggleSelectMode}
                selectMode={selectMode}
                onSelect={handleSelectNote}
              />
            ))}
          </Fragment>
        </Masonry>
      </Box>
      <Drawer
        anchor="bottom"
        open={selectedCards.length > 0}
      >
        <Box display="flex" justifyContent="center" p={1.5}>
          <Stack direction="row" spacing={2.8}>
            <Button type="button" onClick={handleDeleteAll} variant="text" sx={{ textTransform: 'capitalize'}}>
              <Stack direction="column" alignItems="center">
                <DeleteOutlineIcon />
                <Typography>
                  Delete
                </Typography>
              </Stack>              
            </Button>
          </Stack>          
        </Box>
      </Drawer>
      <FloatingButtonActions addUrl="/notes/add" />
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesWithoutFolder();
  const { folders } = await getFolders();

  return {
    props: {
      notes,
      folders,
    }
  };
};

export default Home;
