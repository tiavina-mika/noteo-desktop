import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import PageLayout from '../components/layout/PageLayout';
import { getNotesFromRecycleBin, RECYCLE_BIN_NOTE } from '../controllers/note';
import { Note as NoteType} from '../types/notes';
import Note from '../containers/notes/Note';
import Masonry from '../components/Masonry';
import ActionsDrawer from '../components/ActionsDrawer';
import { useMutation } from '@apollo/client';
import RestoreNoteDialog from '../containers/recycleBin/RestoreNoteDialog';
import { useRouter } from 'next/router';

type Props = {
  notes: NoteType[];
}
const RecycleBin = ({ notes }: Props) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [selectedNoteIdsIds, setSelectedNotesIds] = useState<string[]>([]);

  const route = useRouter();

  const [moveNoteFromRecycleBin, { loading: moveNoteFromRecycleBinLoading, error: moveNoteFromRecycleBinError }] = useMutation(RECYCLE_BIN_NOTE);

  const toggleSelectMode = () => setSelectMode(!selectMode);

  const handleSelectNote = (id: string, checked: boolean) => {
    // add the checked notes to the selected cards
    if (checked) {
      setSelectedNotesIds((prev) => [...prev,id]);
      return;
    }

    // remove the unchecked notes to the selected cards
    const newSelectedNotesIds = selectedNoteIdsIds.filter((noteId: string) => noteId !== id);
    setSelectedNotesIds(newSelectedNotesIds);
  }

  const handleDeleteAll = () => {
    // set the deleted field to true for the given notes by its id
    const values = { ids: selectedNoteIdsIds, value: true };
    console.log('values: ', values);
    // moveNotesToRecycleBin({
    //   variables: { values }, 
    // });

    // if (!moveNotesToRecycleBinLoading) {
    //   setSelectedCards([]);
    // }
  };

  const handleNoteSelect = (id: string) => {
    // toggleOpenRestoreDialog()
    setSelectedNoteId(id);
  };

  const handleCloseRestoreDialog = () => {
    setSelectedNoteId('');
  };

  const handleRestoreNote = () => {
    moveNoteFromRecycleBin({ variables: { id: selectedNoteId, value: false }}); // deleted true
    route.push('/notes/edit/' + selectedNoteId);
    if (!moveNoteFromRecycleBinLoading) return;
    handleCloseRestoreDialog();
  };

  const onCloseActionsDrawer = () => {
    setSelectedNotesIds([]);
    toggleSelectMode();
  };

  return (
    <PageLayout withBackButton elevate={false} title="Recycle Bin" loading={moveNoteFromRecycleBinLoading}>
      <Masonry>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onClick={() => handleNoteSelect(note.id)}
            toggleSelectMode={toggleSelectMode}
            selectMode={selectMode}
            onSelect={handleSelectNote}
          />
        ))}        
      </Masonry>
      <ActionsDrawer
        open={selectedNoteIdsIds.length > 0}
        onClose={onCloseActionsDrawer}
        actions={[
          {
            label: 'Delete definitely',
            icon: <DeleteOutlineIcon />,
            onClick: handleDeleteAll,
          }
        ]}
      />
      <RestoreNoteDialog
        open={!!selectedNoteId}
        onOk={handleRestoreNote}
        onClose={handleCloseRestoreDialog}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesFromRecycleBin();

  return {
    props: {
      notes,
    }
  };
};

export default RecycleBin;
