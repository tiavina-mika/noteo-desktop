import React from 'react';

import PageLayout from '../components/layout/PageLayout';
import { getNotesFromRecycleBin } from '../controllers/note';
import { Note as NoteType} from '../types/notes';
import ListContainer from '../containers/ListContainer';

type Props = {
  notes: NoteType[];
}
const RecycleBin = ({ notes }: Props) => {
  return (
    <PageLayout withBackButton>
      <ListContainer notes={notes} />
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const { notes } = await getNotesFromRecycleBin();

  return {
    props: {
      notes,
    }
  };
};

export default RecycleBin;
