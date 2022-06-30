import React, { Fragment, ReactNode, useContext, useMemo, useState } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/router';

import PageLayout from '../components/layout/PageLayout';
import { getNotesByUser, NOTES, MANY_RECYCLE_BIN_NOTES } from '../controllers/note';
import { getUserFoldersWithNotesCount, FOLDERS_WITH_NOTES_COUNT } from '../controllers/folder';
import { Note as INote, NoteListInput } from '../types/notes';
import { Folder as IFolder, FolderListInput } from '../types/folders';
import FloatingButtonActions from '../components/FloatingButtonActions';
import Folder from '../containers/folders/Folder';
import Note from '../containers/notes/Note';
import { useLazyQuery, useMutation } from '@apollo/client';
import HomeAppBar from '../containers/home/HomeAppBar';
import Masonry from '../components/Masonry';
import ActionsDrawer from '../components/ActionsDrawer';
import EmptyNotes from '../containers/notes/EmptyNotes';
import withSession from '../middleware/withSession';
import { AppContext } from '../components/providers/AppProvider';
import { setRequestHeader } from '../utils/utils';
import { DEFAULT_SORT } from '../utils/constants';
import FullScreenDialog from '../components/FullScreenDialog';
import NoteForm from '../containers/notes/NoteForm';

interface ISelectedCard {
  id: string;
  type: 'note' | 'folder';
}

type Props = {
  notes: INote[];
  folders: IFolder[];
  notesInput: Pick<NoteListInput, 'page' | 'perPage' | 'withFolder' | 'sort'>;
  foldersInput: Pick<FolderListInput, 'page' | 'perPage' | 'sort'>;
}

const Home = ({
  notes, folders, notesInput,
  foldersInput,
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
  const [getNotesByUserQuery, { loading: newNotesLoading, data: newNotesData }] = useLazyQuery(
    NOTES,
    {
      variables: { options: { ...notesInput }},
      context: setRequestHeader({ sessionToken }),
      fetchPolicy: 'network-only' // do not check cache first
    },
  );

  const [getFoldersQuery, { loading: foldersLoading, error: foldersError, data: newFoldersData }] = useLazyQuery(
    FOLDERS_WITH_NOTES_COUNT,
    {
      variables: { options: { ...foldersInput }},
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
  const handleDeleteAll = async () => {
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

  const folderList: IFolder[] = useMemo(() => {
    // after the folder list is updated (client side)
    if (newFoldersData) {
      return newFoldersData.getUserFoldersWithNotesCount.data;
    }

    // the folders list from server side (by default)
    return folders;
  }, [newFoldersData, newFoldersData, notes]);

  return (
    <PageLayout
      withBackButton={false}
      loading={newNotesLoading || foldersLoading || moveNotesToRecycleBinLoading}
      leftActions={<HomeAppBar reloadFolders={getFoldersQuery} />}
      elevate={false}
      bodySx={{ alignSelf: 'stretch' }}
    >
        {[...folderList, ...noteList].length > 0
          ? (
            <Masonry>
              <Fragment>
                {folderList.map((folder: IFolder): ReactNode => (
                  <Folder key={folder.id} folder={folder} />
                ))}
                {noteList.map((note: INote): ReactNode => (
                  <Note
                    key={note.id}
                    note={note}
                    onClick={() => handleNoteClick(note.id)}
                    toggleSelectMode={toggleSelectMode}
                    selectMode={selectMode}
                    onSelect={handleSelectNote}
                  />
                ))}
              </Fragment>
            </Masonry>
          ): (
            <EmptyNotes />
          )
        }
        <ActionsDrawer
          open={selectedCards.length > 0}
          onClose={onCloseActionsDrawer}
          actions={[
            {
              label: 'Delete',
              icon: <DeleteOutlineIcon />,
              onClick: handleDeleteAll,
            }
          ]}
        />
      <FloatingButtonActions onAddClick={toggleOpenNoteCreationDialog} />
      <FullScreenDialog
        open={openNoteCreationDialog}
        toggle={toggleOpenNoteCreationDialog}
        title="Add a note"
      >
        <NoteForm onSubmit={onNoteCreated}/>
      </FullScreenDialog>
    </PageLayout>
  );
};

export const getServerSideProps = withSession(async ({ sessionToken }) => {
  const noteResult = await getNotesByUser({ withFolder: false, sessionToken })
  const folderResult = await getUserFoldersWithNotesCount({ sessionToken });

  return {
    props: {
      notes: noteResult?.data || [],
      folders: folderResult?.data || [],
      notesInput: {
        page: noteResult.currentPage,
        perPage: noteResult.perPage,
        withFolder: false,
        sort: DEFAULT_SORT
      },
      foldersInput: {
        page: folderResult.currentPage,
        perPage: folderResult.perPage,
        sort: DEFAULT_SORT
      }
    }
  };
});

export default Home;
