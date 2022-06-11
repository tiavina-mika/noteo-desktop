import PageLayout from "../../components/layout/PageLayout";
import { Folder } from "../../types/folders";
import NoteForm from "./NoteForm";

type Props = {
  title?: string;
  folder?: Folder;
}
const CreateNotePage = ({ title = 'Add new note', folder }: Props) => {
  return (
    <PageLayout bodySx={{ maxWidth: '60vw' }} title={title} fullWidth={false}>
      <NoteForm folder={folder} />        
    </PageLayout>
  );
};

export default CreateNotePage;