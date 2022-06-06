import { TypeOf, z } from "zod";

import { noteSchema } from "../utils/validations";

export type Note = {
  __typename: 'Note',
  id?: number;
  title?: string;
  content?: string;
  updatedAt?: string;
}

export type NotesReducer = {
  note: Note;
  notes: Note[];
}

export type NoteInput = z.infer<typeof noteSchema>;

export interface EditNoteInput {
  id: any;
  values: NoteInput;
};

