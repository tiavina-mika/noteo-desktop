import CreateNotePage from '../../../containers/notes/CreateNotePage';
import { getFolderById } from '../../../controllers/folder';
import withSession from '../../../middleware/withSession';
import { Folder } from '../../../types/folders';

type Props = {
  folder: Folder;
}
const AddNoteInFolder = ({ folder }: Props) => {
  return (
    <CreateNotePage folder={folder} title={'Add note to ' + folder.name} />
  );
};

export const getServerSideProps = withSession(async ({ params, sessionToken }) => {
  const folder = await getFolderById(params.folderId, sessionToken);

  return {
    props: {
      folder,
    },
  };
});

export default AddNoteInFolder;
