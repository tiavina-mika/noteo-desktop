import React from 'react';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { Box, CardContent, Stack } from '@mui/material';

import { truncateString } from '../../utils/utils';
import { Folder } from '../../types/folders';
import Card from '../../components/Card';
import { useRouter } from 'next/router';

type Props = {
  folder: Folder;
}

const Folder = ({ folder }: Props) => {
  const route = useRouter();
  
  const handleCardClick = () => {
    route.push('/folders/' + folder.id);
  };

  return (
      <Card sx={{ alignSelf: 'stretch', height: 75 }} onClick={handleCardClick}>
        <CardContent>
        <Stack
          direction="row"
          spacing={2}
        >
          <Box>
            <FolderIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
              {truncateString(folder.name, 30)}
            </Typography>
            {/* <Typography variant="body1" color="text.secondary" mt={3}>
              {dayjs(folder.updatedAt).format('DD MMMM YYYY')}
            </Typography> */}            
          </Box>
        </Stack>
        </CardContent>
      </Card> 
  );
};

export default Folder;
