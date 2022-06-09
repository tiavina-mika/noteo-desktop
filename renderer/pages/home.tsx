import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { getNotesWithoutFolder } from '../controllers/note';
import { getFolders } from '../controllers/folder';
import { Note as NoteType} from '../types/notes';
import { Folder as FolderType } from '../types/folders';
import AppBar from '../containers/home/AppBar';
import FloatingButtonActions from '../components/FloatingButtonActions';
import ListContainer from '../containers/ListContainer';

type Props = {
  notes: NoteType[];
  folders: FolderType[];
}
const Home = ({ notes, folders }: Props) => {
  return (
    <PageLayout withBackButton={false}>
      <AppBar />
      <ListContainer folders={folders} notes={notes} />
      <FloatingButtonActions addUrl="/notes/add" />
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesWithoutFolder();
  const { folders } = await getFolders();

  return {
    props: {
      notes,
      folders,
    }
  };
};

export default Home;
