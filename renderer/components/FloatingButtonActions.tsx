import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import { Fab, Stack } from '@mui/material';
import { useRouter } from 'next/router';

type Props = {
  addUrl?: string;
  onCreateClick?: () => void;
}
const FloatingButtonActions = ({ addUrl, onCreateClick }: Props) => {
  const route = useRouter();

  const goToCreation = () => {
    route.push(addUrl)
  };

  return (
    <Stack sx={{ position: 'fixed', bottom: 15, right: 15}}>
      {(onCreateClick || addUrl) && (
        <Fab color="primary" aria-label="add" onClick={onCreateClick || goToCreation}>
          <AddIcon />
        </Fab>
      )}
    </Stack>
  );
};

export default FloatingButtonActions;
