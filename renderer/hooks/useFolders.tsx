import { useContext, useMemo, useState } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { DELETE_MANY_FOLDERS, FOLDERS_WITH_NOTES_COUNT } from '../controllers/folder';
import { Folder as IFolder, FolderListInput } from '../types/folders';
import { AppContext } from '../components/providers/AppProvider';
import { setRequestHeader } from '../utils/utils';

interface ISelectedCard {
  id: string;
  type: 'folder' | 'note';
}

type Props = {
  folders: IFolder[];
  foldersInput: Pick<FolderListInput, 'page' | 'perPage' | 'sort'>;
  openDrawer?: boolean;
}

export const useFolders = ({
  folders,
  foldersInput,
  openDrawer,
}: Props) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [openFolderCreationDialog, setOpenFolderCreationDialog] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<ISelectedCard[]>([]);

	const { sessionToken } = useContext(AppContext);

  const [
    deleteManyFolders,
    { loading: deleteFoldersLoading, error: deleteFoldersError, data: deletedFolders }
  ] = useMutation(DELETE_MANY_FOLDERS, { context: setRequestHeader({ sessionToken }) });

  // load new folders list after deletion
  const [reloadFoldersList, { loading: foldersLoading, data: newFoldersData }] = useLazyQuery(
    FOLDERS_WITH_NOTES_COUNT,
    {
      variables: { options: { ...foldersInput }},
      context: setRequestHeader({ sessionToken }),
      fetchPolicy: 'network-only' // do not check cache first
    },
  );

  const route = useRouter();

  const handleFolderClick = (id: string) => {
    route.push('/folders/edit/' + id)
  }

  const toggleSelectMode = () => setSelectMode(!selectMode);
  const toggleOpenFolderCreationDialog = () => setOpenFolderCreationDialog(!openFolderCreationDialog);

  const handleSelectFolder = (id: string, checked: boolean) => {
    // add the checked folders to the selected cards
    if (checked) {
      setSelectedCards((prev) => [...prev, { id, type: 'folder' }]);
      return;
    }

    // remove the unchecked folders to the selected cards
    const newSelectedFolders = selectedCards.filter((card: ISelectedCard) => card.id !== id);
    setSelectedCards(newSelectedFolders);
  }

  // delete selected folders
  const handleDeleteSelected = async () => {
    // the selected folder cards, it may be a folder and folder
    const folders: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type === 'folder');
    // send only the ids to the request
    const foldersIds: string[] = folders.map((folder: ISelectedCard): string => folder.id);

    // mark deleted as true for the selected folder ids
    const result = await deleteManyFolders({
      variables: { ids: foldersIds },
    });
  
    // clear selected cards
    if (!deleteFoldersLoading) {
      setSelectedCards([]);
    }

    if (!result) return;
    // update folder list
    reloadFoldersList();
  };

  const onFolderCreated = async () => {
    // update folder list after a folder is created
    const result = await reloadFoldersList();

    if (!result) return;
    // close the creation folder dialog
    toggleOpenFolderCreationDialog();
  }

  const onCloseActionsDrawer = () => {
    // empty the selected cards (folders or/and folders)
    setSelectedCards([]);
    const otherThanFolders: ISelectedCard[] = selectedCards.filter((card: ISelectedCard) => card.type !== 'folder');
    setSelectedCards(otherThanFolders);
    // close the selected actions (delete, ...) dialog
    toggleSelectMode();
  };

  const folderList: IFolder[] = useMemo(() => {
    // after the folder list is updated (client side)
    if (newFoldersData) {
      return newFoldersData.getUserFoldersWithNotesCount.data;
    }

    // the folders list from server side (by default)
    return folders;
  }, [newFoldersData, newFoldersData, folders]);

  return {
    foldersLoading,
    deleteFoldersLoading,
    folderList,
    selectFolderMode: selectMode,
    onFolderClick: handleFolderClick,
    toggleFolderSelectMode: toggleSelectMode,
    onSelectFolder: handleSelectFolder,
    toggleOpenFolderCreationDialog,
    openFolderCreationDialog,
    onFolderCreated,
    onDeleteSelectedFolders: handleDeleteSelected,
    onCloseFoldersActionsDrawer: onCloseActionsDrawer,
    selectedFoldersCards: selectedCards,
    reloadFoldersList,
  };
};
