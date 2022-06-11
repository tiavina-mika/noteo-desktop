import PageLayout from '../../components/layout/PageLayout';
import { Folder } from '../../types/folders';
import { getFolderById } from '../../controllers/folder';
import FolderPreviewAction from '../../containers/folders/FolderPreviewAction';
import { getNotesByFolderId } from '../../controllers/note';
import { Note } from '../../types/notes';
import NoteComponent from '../../containers/notes/Note';
import FloatingButtonActions from '../../components/FloatingButtonActions';
import EmptyNotes from '../../containers/notes/EmptyNotes';
import Masonry from '../../components/Masonry';

type Props = {
  folder: Folder;
  notes: Note[];
}
const FolderPreview = ({ folder, notes }: Props) => {
  return (
    <PageLayout
      title={folder.name}
      rightActions={<FolderPreviewAction folder={folder} />}
    >
      {notes.length > 0
        ? (
          <Masonry>
            {notes.map((note) => (
              <NoteComponent key={note.id} note={note} />
            ))}
          </Masonry>
        ) : (
          <EmptyNotes />
        )}
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

