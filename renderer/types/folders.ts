import { z } from "zod";

import { folderSchema } from "../utils/validations";

export type Folder = {
  __typename: 'Folder',
  id?: string;
  name?: string;
  updatedAt?: string;
}

export type FoldersReducer = {
  Folder: Folder;
  Folders: Folder[];
}

export type FolderInput = z.infer<typeof folderSchema>;

export interface EditFolderInput {
  id: any;
  values: FolderInput;
};

