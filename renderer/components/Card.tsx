import React, { Fragment, ReactNode } from 'react';
import { Card as MUICard, styled } from '@mui/material';

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
  onClick?: (id?: any) => void;
  onMouseEnter?: (id?: any) => void;
  onMouseOut?: (id?: any) => void;
}

const Card = ({
  children, sx, onClick, onMouseEnter, onMouseOut,
}: Props) => {
  return (
      <CustomCard
        sx={sx}
        onClick={onClick}
        onMouseOver={onMouseEnter}
        onMouseLeave={onMouseOut}
      >
        {children}
      </CustomCard>       
  );
};

export default Card;
