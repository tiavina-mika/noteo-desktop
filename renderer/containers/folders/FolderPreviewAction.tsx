import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Folder } from '../../types/folders';
import { DELETE_FOLDER } from '../../controllers/folder';
import { Fragment, MouseEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import FolderDialogForm from './FolderDialogForm';

const ITEM_HEIGHT = 48;

type Props = {
  folder: Folder;
}

type Option = {
  label: string;
  onClick: () => void;
}

const FolderPreviewAction = ({ folder }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFolderFormDialog, setOpenFolderFormDialog] = useState(false);

  const open = Boolean(anchorEl);
  const route = useRouter();

  const [deleteFolder, { loading: deleteFolderLoading, error: deleteFolderError }] = useMutation(DELETE_FOLDER);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    deleteFolder({ variables: { id: folder.id }});
    handleClose();

    if (deleteFolderLoading) return;
    route.push('/home');
  };

  const handleFolderFormClickOpen = () => {
    setOpenFolderFormDialog(true);
  };

  const handleFolderFormClose = () => {
    setOpenFolderFormDialog(false);
  };

  const options: Option[] = [
    {
      label: 'Rename',
      onClick: handleFolderFormClickOpen,
    },
    {
      label: 'Delete',
      onClick: onDelete,
    }
  ];


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
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="folder-preview-menu"
        MenuListProps={{
          'aria-labelledby': 'folder-preview-button',
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
        {options.map((option) => (
          <MenuItem
            key={option.label}
            // selected={option === 'Pyxis'}
            onClick={option.onClick}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <FolderDialogForm
        onClose={handleFolderFormClose}
        open={openFolderFormDialog}
        folder={folder}
      />
    </Fragment>
  );
};

export default FolderPreviewAction;

