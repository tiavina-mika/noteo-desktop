import NoteForm from '../../../containers/notes/NoteForm';
import PageLayout from '../../../components/layout/PageLayout';
import { Note } from '../../../types/notes';
import { gql } from '@apollo/client';
import { notes } from '../../../utils/data';
import client from '../../../apollo-client';

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

export const getServerSideProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
    query GetNoteById($id: String!) {
      getNoteById(id: $id) {
        id
        title
        content
      }
    }
    `,
    variables: {
      id: params.id,
    }
  });

  return {
    props: {
      note: data.getNoteById,
    }
  };
};

export default Edit;

