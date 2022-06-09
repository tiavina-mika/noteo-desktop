import React, { Fragment, ReactNode } from 'react';
import { Card as MUICard, styled } from '@mui/material';
import Link from 'next/link';

const CustomCard = styled(MUICard)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderRadius: 14,
  textAlign: 'left',
  '&:hover': {
    cursor: 'pointer',
  },
}));

type Props = {
  children: ReactNode;
  sx: any;
  url?: string;
}

const Card = ({ children, sx, url }: Props) => {
  const Container = url ? Link : Fragment;
  const props = url ? { href: url } : { };

  return (
    <Container {...props}>
      <CustomCard sx={sx}>
        {children}
      </CustomCard>       
    </Container>

  );
};

export default Card;
