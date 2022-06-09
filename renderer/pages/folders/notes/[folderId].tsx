import CreateNotePage from '../../../containers/notes/CreateNotePage';
import { getFolderById } from '../../../controllers/folder';
import { Folder } from '../../../types/folders';

type Props = {
  folder: Folder;
}
const AddNoteInFolder = ({ folder }: Props) => {
  return (
    <CreateNotePage folder={folder} title={'Add note to ' + folder.name} />
  );
};

export const getServerSideProps = async ({ params }) => {
  const { folder } = await getFolderById(params.folderId)

  return {
    props: {
      folder,
    },
  };
};

export default AddNoteInFolder;
