import React, { ReactNode, useMemo } from 'react';

import {
  Box, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { Masonry as MUIMasonry } from '@mui/lab';

type Props = {
  children: ReactNode;
}
const Masonry = ({ children }: Props) => {
  const theme = useTheme();
  const isTablet: boolean = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isLargeDesktop: boolean = useMediaQuery(theme.breakpoints.up('xl'));

  const columns: number = useMemo(() => {
    let defaultColumns = 2;
    if (isTablet) {
      defaultColumns = 3;
    } else if (isDesktop) {
      defaultColumns = 4;
    } else if (isLargeDesktop) {
      defaultColumns = 5;
    }

    return defaultColumns;
  }, [isTablet, isDesktop])

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <MUIMasonry
        columns={columns}
        spacing={2}
        // for ssr
        defaultHeight={300}
        defaultColumns={columns}
        defaultSpacing={2}
      >
        {children}
      </MUIMasonry>
    </Box>
  );
};

export default Masonry;
