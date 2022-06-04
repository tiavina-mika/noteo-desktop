import NoteForm from '../../containers/notes/NoteForm';
import PageLayout from '../../components/layout/PageLayout';


const Add = () => {
  return (
    <PageLayout bodySx={{ maxWidth: '60vw' }} title="Add new note">
      <NoteForm />        
    </PageLayout>
  );
};

export default Add;

