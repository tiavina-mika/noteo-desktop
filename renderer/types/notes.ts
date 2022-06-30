import { z } from "zod";

import { noteSchema } from "../utils/validations";
import { IPaginationInput } from "./app";
import { IRequestHeadersParams } from "./request";
import { IResponsePaging } from "./response";

export interface Note {
  __typename: 'Note',
  id?: string;
  title?: string;
  content?: string;
  updatedAt?: string;
  folder?: string;
}

export type NotesReducer = {
  note: Note;
  notes: Note[];
}

export type NoteInput = z.infer<typeof noteSchema>;
export type NoteInputData = NoteInput & Pick<Note, 'folder'>;

export interface EditNoteInput {
  id: any;
  values: NoteInput;
};

export interface NoteListInput extends IPaginationInput, IRequestHeadersParams {
  withFolder?: boolean;
  folderId?: string;
}

export interface NotesResult extends IResponsePaging {
  data: Note[],
}

