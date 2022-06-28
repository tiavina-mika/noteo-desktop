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
  const [selectedCards, setSelectedCards] = useState<ISelectedCard[]>([]);
  const [isNotesDeleted, setIsNotesDeleted] = useState<boolean>(false);

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

  const handleNoteSelect = (id: string) => {
    route.push('/notes/edit/' + id)
  }

  const toggleSelectMode = () => setSelectMode(!selectMode);

  const handleSelectNote = (id: string, checked: boolean) => {
    // add the checked notes to the selected cards
    setIsNotesDeleted(false);
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
    const notes: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type === 'note');
    const notesIds: string[] = notes.map((note: ISelectedCard): string => note.id);

    const result = await moveManyUserNotesToRecycleBin({
      variables: { ids: notesIds, value: true },
    });
  
    if (!moveNotesToRecycleBinLoading) {
      setIsNotesDeleted(true);
      setSelectedCards([]);
    }

    if (!result) return;
    getNotesByUserQuery()
  };

  const onCloseActionsDrawer = () => {
    setSelectedCards([]);
    toggleSelectMode();
  };

  // server side or updated client side note list
  const noteList: INote[] = useMemo(() => {
    if (isNotesDeleted && newNotesData) {
      return newNotesData.getNotesByUser.data;
    }

    return notes;
  }, [newNotesData, newNotesData, notes]);

  // server side or updated client side folder list
  const folderList: IFolder[] = useMemo(() => {
    if (newFoldersData) {
      return newFoldersData.getUserFoldersWithNotesCount.data;
    }

    return folders;
  }, [newFoldersData, newFoldersData, notes]);

  return (
    <PageLayout
      withBackButton={false}
      loading={newNotesLoading || foldersLoading}
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
                    onClick={() => handleNoteSelect(note.id)}
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
      <FloatingButtonActions addUrl="/notes/add" />
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
