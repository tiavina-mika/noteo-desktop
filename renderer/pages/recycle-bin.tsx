import React, { useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import PageLayout from '../components/layout/PageLayout';
import { getNotesFromRecycleBin, RECYCLE_BIN_NOTE, DELETE_NOTES, NOTES_FROM_RECYCLE_BIN } from '../controllers/note';
import { Note as NoteType} from '../types/notes';
import Note from '../containers/notes/Note';
import Masonry from '../components/Masonry';
import ActionsDrawer from '../components/ActionsDrawer';
import { useMutation, useQuery } from '@apollo/client';
import RestoreNoteDialog from '../containers/recycleBin/RestoreNoteDialog';
import { useRouter } from 'next/router';
import EmptyNotes from '../containers/notes/EmptyNotes';

type Props = {
  notes: NoteType[];
}
const RecycleBin = ({ notes }: Props) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [selectedNoteIds, setSelectedNotesIds] = useState<string[]>([]);
  const [isNotesDeleted, setIsNotesDeleted] = useState<boolean>(false);

  const route = useRouter();

  const [restoreNoteFromRecycleBin, { loading: restoreNoteFromRecycleBinLoading, error: restoreNoteFromRecycleBinError }] = useMutation(RECYCLE_BIN_NOTE);
  const [
    deleteSelectedNotes,
    { loading: deleteSelectedNotesLoading, error: deleteSelectedNotesError, data: deletedNotesData }
  ] = useMutation(DELETE_NOTES);
  const {
    data: newNotesData, error: notesError, loading: notesLoading,
  } = useQuery(
    NOTES_FROM_RECYCLE_BIN,
    { skip: !deletedNotesData?.deleteNotes }
  );

  const toggleSelectMode = () => setSelectMode(!selectMode);

  const handleSelectNote = (id: string, checked: boolean) => {
    // add the checked notes to the selected cards
    setIsNotesDeleted(false);
    if (checked) {
      setSelectedNotesIds((prev) => [...prev,id]);
      return;
    }

    // remove the unchecked notes to the selected cards
    const newSelectedNotesIds = selectedNoteIds.filter((noteId: string) => noteId !== id);
    setSelectedNotesIds(newSelectedNotesIds);
  }

  const handleDeleteSelectedNotes = () => {
    // set the deleted field to true for the given notes by its id
    deleteSelectedNotes({ variables: { ids: selectedNoteIds }}); // deleted true

    // deleteSelectedNotes({
    //   variables: { values }, 
    // });

    if (!deleteSelectedNotesLoading) {
      setSelectedNotesIds([]);
      setIsNotesDeleted(true);
    }
  };

  const handleNoteSelect = (id: string) => {
    // toggleOpenRestoreDialog()
    setSelectedNoteId(id);
  };

  const handleCloseRestoreDialog = () => {
    setSelectedNoteId('');
  };

  const handleRestoreNote = () => {
    restoreNoteFromRecycleBin({ variables: { id: selectedNoteId, value: false }}); // deleted true
    route.push('/notes/edit/' + selectedNoteId);
    if (!restoreNoteFromRecycleBinLoading) return;
    handleCloseRestoreDialog();
  };

  const onCloseActionsDrawer = () => {
    setSelectedNotesIds([]);
    toggleSelectMode();
  };

  const noteList = useMemo(() => {
    if (isNotesDeleted && newNotesData) {
      return newNotesData.getNotesFromRecycleBin;
    }

    return notes;
  }, [newNotesData, newNotesData, notes]);

  return (
    <PageLayout withBackButton elevate={false} title="Recycle Bin" loading={restoreNoteFromRecycleBinLoading || notesLoading}>
        {noteList.length > 0
          ? (
            <Masonry>
              {noteList.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    onClick={() => handleNoteSelect(note.id)}
                    toggleSelectMode={toggleSelectMode}
                    selectMode={selectMode}
                    onSelect={handleSelectNote}
                  />
                )) }      
            </Masonry>
          ): (
            <EmptyNotes />
          )}  
      <ActionsDrawer
        open={selectedNoteIds.length > 0}
        onClose={onCloseActionsDrawer}
        actions={[
          {
            label: 'Delete definitely',
            icon: <DeleteOutlineIcon />,
            onClick: handleDeleteSelectedNotes,
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
