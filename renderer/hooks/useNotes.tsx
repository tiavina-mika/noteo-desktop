import { useContext, useMemo, useState } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { NOTES, MANY_RECYCLE_BIN_NOTES } from '../controllers/note';
import { Note as INote, NoteListInput } from '../types/notes';
import { AppContext } from '../components/providers/AppProvider';
import { setRequestHeader } from '../utils/utils';

interface ISelectedCard {
  id: string;
  type: 'note' | 'folder';
}

type Props = {
  notes: INote[];
  notesInput: Pick<NoteListInput, 'page' | 'perPage' | 'withFolder' | 'sort'>;
  openDrawer?: boolean;
}

export const useNotes = ({
  notes,
  notesInput,
  openDrawer,
}: Props) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [openNoteCreationDialog, setOpenNoteCreationDialog] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<ISelectedCard[]>([]);

	const { sessionToken } = useContext(AppContext);

  const [
    moveManyUserNotesToRecycleBin,
    { loading: moveNotesToRecycleBinLoading, error: moveNotesToRecycleBinError, data: deletedNotes }
  ] = useMutation(MANY_RECYCLE_BIN_NOTES, { context: setRequestHeader({ sessionToken }) });

  // load new notes list after deletion
  const [getNotesByUserQuery, { loading: notesLoading, data: newNotesData }] = useLazyQuery(
    NOTES,
    {
      variables: { options: { ...notesInput }},
      context: setRequestHeader({ sessionToken }),
      fetchPolicy: 'network-only' // do not check cache first
    },
  );

  const route = useRouter();

  const handleNoteClick = (id: string) => {
    route.push('/notes/edit/' + id)
  }

  const toggleSelectMode = () => setSelectMode(!selectMode);
  const toggleOpenNoteCreationDialog = () => setOpenNoteCreationDialog(!openNoteCreationDialog);

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

  // delete selected notes
  const handleDeleteSelected = async () => {
    // the selected note cards, it may be a folder and note
    const notes: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type === 'note');
    // send only the ids to the request
    const notesIds: string[] = notes.map((note: ISelectedCard): string => note.id);

    // mark deleted as true for the selected note ids
    const result = await moveManyUserNotesToRecycleBin({
      variables: { ids: notesIds, value: true },
    });
  
    // clear selected cards
    if (!moveNotesToRecycleBinLoading) {
      setSelectedCards([]);
    }

    if (!result) return;
    // update note list
    getNotesByUserQuery();
  };

  const onNoteCreated = async () => {
    // update note list after a note is created
    const result = await getNotesByUserQuery();

    if (!result) return;
    // close the creation note dialog
    toggleOpenNoteCreationDialog();
  }

  const onCloseActionsDrawer = () => {
    // empty the selected cards (notes or/and folders)
    setSelectedCards([]);
    const otherThanNotes: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type !== 'note');
    setSelectedCards(otherThanNotes);
    // close the selected actions (delete, ...) dialog
    toggleSelectMode();
  };

  const noteList: INote[] = useMemo(() => {
    // after the note list is updated (client side)
    if (newNotesData) {
      return newNotesData.getNotesByUser.data;
    }

    // the notes list from server side (by default)
    return notes;
  }, [newNotesData, newNotesData, notes]);

  return {
    notesLoading,
    moveNotesToRecycleBinLoading,
    noteList,
    selectNoteMode: selectMode,
    onNoteClick: handleNoteClick,
    toggleNoteSelectMode: toggleSelectMode,
    onSelectNote: handleSelectNote,
    toggleOpenNoteCreationDialog,
    openNoteCreationDialog,
    onNoteCreated,
    onDeleteSelectedNotes: handleDeleteSelected,
    onCloseNotesActionsDrawer: onCloseActionsDrawer,
    selectedNotesCards: selectedCards,
  };
};
