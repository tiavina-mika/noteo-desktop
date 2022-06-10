import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent, Grid } from '@mui/material';

import { truncateString } from '../../utils/utils';
import { notes } from '../../utils/data';
import { Note } from '../../types/notes';
import dayjs from 'dayjs';
import Card from '../../components/Card';

type Props = {
  note: Note;
  onClick?: (id: string) => void;
}

const Note = ({ note, onClick }: Props) => {
  return (
    <Grid item xs={6} sm={6} md={4} lg={3} justifyContent="center">
      <Card sx={{ alignSelf: 'stretch' }} onClick={onClick}>
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
      </Card> 
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
