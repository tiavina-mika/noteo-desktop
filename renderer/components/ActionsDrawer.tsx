import React, { ReactNode } from 'react';

import {
  Box, Button, AppBar as MUIAppBar, Stack, Typography, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IActions {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}
type Props = {
  onClose: () => void;
  actions: IActions[];
  open?: boolean;
}
const ActionsDrawer = ({ onClose, actions, open }: Props) => {
  if (!open) return;

  return (
    <MUIAppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, backgroundColor: '#fff' }}>
      <Box display="flex" justifyContent="center" p={1.5}>
        <Stack direction="row" spacing={2.8}>
          {actions.map((action, index) => (
            <Button type="button" onClick={action.onClick} variant="text" sx={{ textTransform: 'capitalize'}} key={index}>
              <Stack direction="column" alignItems="center">
                {action.icon}
                <Typography>
                  {action.label}
                </Typography>
              </Stack>              
            </Button>           
          ))}
        </Stack>          
      </Box>
      <IconButton sx={{ position: 'absolute', right: 20, bottom: 20 }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MUIAppBar>
  );
};

export default ActionsDrawer;
