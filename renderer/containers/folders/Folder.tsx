import React, { ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { Box, CardContent, Stack, useMediaQuery } from '@mui/material';

import { truncateString } from '../../utils/utils';
import { Folder } from '../../types/folders';
import Card from '../../components/Card';
import { useRouter } from 'next/router';

type Props = {
  folder: Folder;
  onClick?: (id: string) => void;
  toggleSelectMode?: () => void;
  selectMode?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
}

const Folder = ({
  folder, onClick, onSelect,
  toggleSelectMode, selectMode,
 }: Props) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const route = useRouter();
  
  // const handleCardClick = () => {
  //   route.push('/folders/' + folder.id);
  // };

  const handleMouseEnter = () => {
    console.log(" -------- handleMouseEnter ");
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
        sx={{ alignSelf: 'stretch', height: 95, position: 'relative' }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onCheck={handleSelect(folder.id)}
        withCheckbox={selectMode}
      >
        <CardContent>
        <Stack
          direction="row"
          spacing={2}
        >
          <Box display="flex" alignItems="center">
            <FolderIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              {truncateString(folder.name, isMobile ? 10 : 30)}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={0} pt={0}>
              {folder.notesCount}
            </Typography>
          </Box>
        </Stack>
        </CardContent>
      </Card> 
  );
};

export default Folder;
