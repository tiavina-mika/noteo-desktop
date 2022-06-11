import { forwardRef, ReactElement, ReactNode, Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  title?: string;
  children: ReactNode;
  open?: boolean;
  toggle?: () => void;
  primaryButtonText?: string;
  onPrimaryButtonAction?: () => void;
  formId?: string;
}
const FullScreenDialog = ({
  title, open, toggle, children,
  onPrimaryButtonAction,
  primaryButtonText = 'Save',
  formId,
}: Props) => {
  const handlePrimaryButtonAction = () => {
    onPrimaryButtonAction && onPrimaryButtonAction();
    toggle();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }} color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggle}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
         {onPrimaryButtonAction && (
           <Button autoFocus color="primary" onClick={handlePrimaryButtonAction} variant="contained">
              {primaryButtonText}
          </Button>
         )}
         {formId && (
            <Button type="submit" form={formId} color="primary" variant="contained">
              {primaryButtonText}
            </Button>
         )}
        </Toolbar>
      </AppBar>
      <Box px={6} py={4}>
        {children}
      </Box>
    </Dialog>
  );
}

export default FullScreenDialog;
