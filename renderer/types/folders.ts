import { z } from "zod";

import { FolderSchema } from "../utils/validations";

export type Folder = {
  __typename: 'Folder',
  id?: number;
  name?: string;
  updatedAt?: string;
}

export type FoldersReducer = {
  Folder: Folder;
  Folders: Folder[];
}

export type FolderInput = z.infer<typeof FolderSchema>;

export interface EditFolderInput {
  id: any;
  values: FolderInput;
};

