import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import { Fab, Stack } from '@mui/material';
import { useRouter } from 'next/router';

type Props = {
  addUrl?: string;
}
const FloatingButtonActions = ({ addUrl }: Props) => {
  const route = useRouter();

  const goToCreation = () => route.push(addUrl);

  return (
    <Stack sx={{ position: 'fixed', bottom: 15, right: 15}}>
      {addUrl && (
        <Fab color="primary" aria-label="add" onClick={goToCreation}>
          <AddIcon />
        </Fab>
      )}
    </Stack>
  );
};

export default FloatingButtonActions;
