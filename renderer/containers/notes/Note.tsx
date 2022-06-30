import React, { ChangeEvent, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';

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

  const handleMouseEnter = () => {
    if (selectMode) return;
    if (!toggleSelectMode) return;
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
    <Card
      sx={{ alignSelf: 'stretch', position: 'relative' }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onCheck={handleSelect(note.id)}
      withCheckbox={selectMode}
    >
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
