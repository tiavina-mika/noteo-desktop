import { z } from "zod";

import { noteSchema } from "../utils/validations";

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

