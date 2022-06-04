import NoteForm from '../../../containers/notes/NoteForm';
import PageLayout from '../../../components/layout/PageLayout';
import { notes } from '../../../utils/data';
import { Note } from '../../../types/notes';

type Props = {
  note: Note;
}
const Edit = ({ note }: Props) => {
  return (
    <PageLayout bodySx={{ maxWidth: '60vw' }} title={"Edit " + note.title}>
      <NoteForm note={note} />        
    </PageLayout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      note: notes.find((note: Note) => note.id === +params.id),
    }
  };
};

export default Edit;

