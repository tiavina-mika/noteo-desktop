import React, { ChangeEvent, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CardContent, Grid, Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { truncateString } from '../../utils/utils';
import { notes } from '../../utils/data';
import { Note } from '../../types/notes';
import dayjs from 'dayjs';
import Card from '../../components/Card';

type Props = {
  note: Note;
  onClick?: (id: string) => void;
  toggleSelectMode?: () => void;
  selectMode?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
}

const Note = ({
  note, onClick, onSelect,
  toggleSelectMode, selectMode, 
}: Props) => {
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShowCheckbox(true);
    toggleSelectMode();
  }

  const handleMouseOut = () => {
    // setShowCheckbox(false);
  }

  const handleSelect = (id: string) => (e: ChangeEvent<HTMLInputElement>) =>  {
    e.stopPropagation();
    onSelect(id, e.target.checked);
  }

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} justifyContent="center" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
      <Card sx={{ alignSelf: 'stretch', position: 'relative' }} onClick={onClick} >
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
          {(selectMode || showCheckbox) && (
            <Checkbox
              inputProps={{ 'aria-label': 'Checkbox ' + note.id }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              onChange={handleSelect(note.id)}
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
              }}
            />
          )}
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
