import { useLazyQuery, useMutation } from '@apollo/client';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/router';

import PageLayout from '../../components/layout/PageLayout';
import { Folder } from '../../types/folders';
import { getFolderById } from '../../controllers/folder';
import FolderPreviewAction from '../../containers/folders/FolderPreviewAction';
import { getNotesByUser, MANY_RECYCLE_BIN_NOTES, NOTES } from '../../controllers/note';
import { Note, NoteListInput } from '../../types/notes';
import NoteComponent from '../../containers/notes/Note';
import FloatingButtonActions from '../../components/FloatingButtonActions';
import EmptyNotes from '../../containers/notes/EmptyNotes';
import Masonry from '../../components/Masonry';
import withSession from '../../middleware/withSession';
import { DEFAULT_SORT, PATH_NAMES } from '../../utils/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../components/providers/AppProvider';
import { setRequestHeader } from '../../utils/utils';
import ActionsDrawer from '../../components/ActionsDrawer';

type Props = {
  folder: Folder;
  notes: Note[];
  notesInput: Pick<NoteListInput, 'page' | 'perPage' | 'withFolder' | 'sort'>;
}
const FolderPreview = ({ folder, notes, notesInput }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState<boolean>(false);

	const { sessionToken } = useContext(AppContext);

  const [
    moveManyUserNotesToRecycleBin,
    { loading: moveNotesToRecycleBinLoading, error: moveNotesToRecycleBinError, data: deletedNotes }
  ] = useMutation(MANY_RECYCLE_BIN_NOTES, { context: setRequestHeader({ sessionToken }) });

  const [getNotesByUserQuery, { loading: newNotesLoading, data: newNotesData }] = useLazyQuery(
    NOTES,
    {
      variables: { options: { ...notesInput }},
      context: setRequestHeader({ sessionToken }),
      fetchPolicy: 'network-only' // do not check cache first
    },
  );
  console.log('newNotesData: ', newNotesData);

  const route = useRouter();

  const handleNoteClick = (id: string) => {
    route.push('/notes/edit/' + id)
  }

  const handleSelectNote = (id: string, checked: boolean) => {
    // add the checked notes to the selected cards
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
      return;
    }

    // remove the unchecked notes to the selected cards
    const newSelectedNotesIds = selectedIds.filter((selectedId: string) => selectedId !== id);
    setSelectedIds(newSelectedNotesIds);
  }

  const toggleSelectMode = () => setSelectMode(!selectMode);

  // delete selected notes
  const handleDeleteSelectedNotes = async () => {
    const result = await moveManyUserNotesToRecycleBin({
      variables: { ids: selectedIds, value: true },
    });
  
    if (!moveNotesToRecycleBinLoading) {
      setSelectedIds([]);
    }

    if (!result) return;
    getNotesByUserQuery();
  };

  const onCloseActionsDrawer = () => {
    setSelectedIds([]);
    toggleSelectMode();
  };

  return (
    <PageLayout
      title={folder.name}
      rightActions={<FolderPreviewAction folder={folder} />}
      loading={newNotesLoading || moveNotesToRecycleBinLoading}
    >
      {notes.length > 0
        ? (
          <Masonry>
            {notes.map((note) => (
              <NoteComponent
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note.id)}
                toggleSelectMode={toggleSelectMode}
                selectMode={selectMode}
                onSelect={handleSelectNote}
              />
            ))}
          </Masonry>
        ) : (
          <EmptyNotes />
        )}
      <FloatingButtonActions addUrl={PATH_NAMES.notesByFolder + '/' + folder.id} />
      <ActionsDrawer
          open={selectedIds.length > 0}
          onClose={onCloseActionsDrawer}
          actions={[
            {
              label: 'Delete',
              icon: <DeleteOutlineIcon />,
              onClick: handleDeleteSelectedNotes,
            }
          ]}
        />
    </PageLayout>
  );
};

export const getServerSideProps = withSession(async ({ params, sessionToken }) => {
  const [
    folder,
    noteResult,
  ] = await Promise.all([
    await getFolderById(params.id, sessionToken),
    await getNotesByUser({ folderId: params.id, withFolder: true, sessionToken }),
  ]);

  return {
    props: {
      folder,
      notes: noteResult?.data || [],
      notesInput: {
        page: noteResult.currentPage,
        perPage: noteResult.perPage,
        withFolder: true,
        sort: DEFAULT_SORT
      },
    },
  };
});

export default FolderPreview;

