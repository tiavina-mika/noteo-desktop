import React, { ReactNode } from 'react';
import { Card as MUICard, Checkbox, styled } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
  onCheck?: (value?: any) => void;
  withCheckbox?: boolean;
}

const Card = ({
  children, sx, onClick, onMouseEnter, onMouseOut,
  onCheck, withCheckbox,
}: Props) => {
  return (
      <CustomCard
        sx={sx}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
      >
        {children}
        {withCheckbox && (
          <Checkbox
            inputProps={{ 'aria-label': 'Card checkbox' }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            onChange={onCheck}
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}
          />
        )}
      </CustomCard>       
  );
};

export default Card;
