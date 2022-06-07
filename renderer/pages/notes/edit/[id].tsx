import NoteForm from '../../../containers/notes/NoteForm';
import PageLayout from '../../../components/layout/PageLayout';
import { Note } from '../../../types/notes';
import { getNoteById } from '../../../controllers/note';
import NotePreviewAction from '../../../containers/notes/NotePreviewAction';

type Props = {
  note: Note;
}
const Edit = ({ note }: Props) => {
  return (
    <PageLayout
      bodySx={{ maxWidth: '60vw' }}
      title={"Edit " + note.title}
      actions={<NotePreviewAction note={note} />}
    >
      <NoteForm note={note} />        
    </PageLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { note } = await getNoteById(params.id)

  return {
    props: {
      note,
    },
  };
};

export default Edit;

