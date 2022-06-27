import { z } from "zod";

import { folderSchema } from "../utils/validations";
import { IPaginationInput } from "./app";
import { IRequestHeadersParams } from "./request";
import { IResponsePaging } from "./response";

export type Folder = {
  __typename: 'Folder',
  id?: string;
  name?: string;
  updatedAt?: string;
  notesCount?: number;
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

export interface FolderListInput extends IPaginationInput, IRequestHeadersParams {}

export interface FoldersResult extends IResponsePaging {
  data: Folder[],
}

