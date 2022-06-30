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
import { useNotes } from '../hooks/useNotes';
import { useFolders } from '../hooks/useFolders';

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
  const {
    notesLoading,
    moveNotesToRecycleBinLoading,
    noteList,
    selectNoteMode,
    onNoteClick: handleNoteClick,
    toggleNoteSelectMode,
    onSelectNote: handleSelectNote,
    toggleOpenNoteCreationDialog,
    openNoteCreationDialog,
    onNoteCreated,
    onDeleteSelectedNotes,
    onCloseNotesActionsDrawer,
    selectedNotesCards
  } = useNotes({ notes, notesInput });

  const {
    foldersLoading,
    deleteFoldersLoading,
    folderList,
    selectFolderMode,
    onFolderClick: handleFolderClick,
    toggleFolderSelectMode,
    onSelectFolder: handleSelectFolder,
    toggleOpenFolderCreationDialog,
    onFolderCreated,
    onDeleteSelectedFolders,
    onCloseFoldersActionsDrawer,
    selectedFoldersCards,
    reloadFoldersList
  } = useFolders({ folders, foldersInput })

  const onCloseActionDrawer = () => {
    onCloseNotesActionsDrawer();
    onCloseFoldersActionsDrawer();
  };

  const handleDeletedSelectedCards = async () => {
    await Promise.all([
      await onDeleteSelectedNotes(),
      await onDeleteSelectedFolders(),
    ]);
  };

  return (
    <PageLayout
      withBackButton={false}
      loading={notesLoading || foldersLoading || moveNotesToRecycleBinLoading || deleteFoldersLoading}
      leftActions={<HomeAppBar reloadFolders={reloadFoldersList} />}
      elevate={false}
      bodySx={{ alignSelf: 'stretch' }}
    >
        {[...folderList, ...noteList].length > 0
          ? (
            <Masonry>
              <Fragment>
                {folderList.map((folder: IFolder): ReactNode => (
                  <Folder
                    key={folder.id}
                    folder={folder}
                    onClick={() => handleFolderClick(folder.id)}
                    toggleSelectMode={toggleFolderSelectMode}
                    selectMode={selectFolderMode}
                    onSelect={handleSelectFolder}
                  />
                ))}
                {noteList.map((note: INote): ReactNode => (
                  <Note
                    key={note.id}
                    note={note}
                    onClick={() => handleNoteClick(note.id)}
                    toggleSelectMode={toggleNoteSelectMode}
                    selectMode={selectNoteMode}
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
          open={[...selectedNotesCards, ...selectedFoldersCards].length > 0}
          onClose={onCloseActionDrawer}
          actions={[
            {
              label: 'Delete',
              icon: <DeleteOutlineIcon />,
              onClick: handleDeletedSelectedCards,
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
