import React from 'react';
import Typography from '@mui/material/Typography';

import { Card, CardContent, Grid, styled } from '@mui/material';
import { truncateString } from '../../utils/utils';
import { notes } from '../../utils/data';
import { Note } from '../../types/notes';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderRadius: 14,
  textAlign: 'left',
}));

type Props = {
  note: Note;
}

const Note = ({ note }: Props) => {
  const route = useRouter();

  const goToEdit = () => route.push('/notes/edit/' + note.id);

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} justifyContent="center" onClick={goToEdit}>
      <CustomCard sx={{ alignSelf: 'stretch' }}>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom fontWeight="bold">
            {note.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {truncateString(note.content, 100)}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={3}>
            {dayjs(note.updatedAt).format('DD MMMM YYYY')}
          </Typography>
        </CardContent>
      </CustomCard> 
    </Grid>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      notes,
    }
  };
};

export default Note;
