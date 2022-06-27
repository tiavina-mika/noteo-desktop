import NoteForm from '../../../containers/notes/NoteForm';
import PageLayout from '../../../components/layout/PageLayout';
import { Note } from '../../../types/notes';
import { getNoteById } from '../../../controllers/note';
import NotePreviewAction from '../../../containers/notes/NotePreviewAction';
import withSession from '../../../middleware/withSession';

type Props = {
  note: Note;
}
const Edit = ({ note }: Props) => {
  return (
    <PageLayout
      bodySx={{ maxWidth: '60vw' }}
      title={"Edit " + note.title}
      rightActions={<NotePreviewAction note={note} />}
    >
      <NoteForm note={note} />        
    </PageLayout>
  );
};

export const getServerSideProps = withSession(async ({ params, sessionToken }) => {
  const { note } = await getNoteById(params.id, sessionToken)

  return {
    props: {
      note,
    },
  };
});

export default Edit;

