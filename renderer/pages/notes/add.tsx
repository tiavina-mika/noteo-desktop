import CreateNotePage from '../../containers/notes/CreateNotePage';
import withSession from '../../middleware/withSession';

const Add = () => {
  return (
    <CreateNotePage />
  );
};

export const getServerSideProps = withSession(async () => {
  return {
    props: {},
  };
});

export default Add;
