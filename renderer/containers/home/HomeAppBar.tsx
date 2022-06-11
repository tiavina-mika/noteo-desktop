import { Fragment, MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import FolderDialogForm from '../folders/FolderDialogForm';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;

// type Props = {
//   folder: Folder;
// }

// type Option = {
//   label: string;
//   onClick: () => void;
// }

const HomeAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFolderFormDialog, setOpenFolderFormDialog] = useState(false);

  const route = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const options: Option[] = [
  //   {
  //     label: 'Delete',
  //     onClick: onDelete,
  //   }
  // ];

  const handleFolderFormClickOpen = () => {
    setOpenFolderFormDialog(true);
  };

  const handleFolderFormClose = () => {
    setOpenFolderFormDialog(false);
  };

  const goToRecycleBin = () => {
    route.push('/recycle-bin');
  };


  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="folder-preview-button"
        aria-controls={open ? 'folder-preview-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="note-preview-menu"
        MenuListProps={{
          'aria-labelledby': 'note-preview-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {/* {options.map((option) => (
          <MenuItem
            key={option.label}
            // selected={option === 'Pyxis'}
            onClick={option.onClick}>
            {option.label}
          </MenuItem>
        ))} */}
          <MenuItem
            onClick={goToRecycleBin}
          >
            Recycle Bin
          </MenuItem>
          <MenuItem
            onClick={handleFolderFormClickOpen}
          >
            New Folder
          </MenuItem>
      </Menu>
      <FolderDialogForm
        onClose={handleFolderFormClose}
        open={openFolderFormDialog}
      />
    </Fragment>
  );
};

export default HomeAppBar;

