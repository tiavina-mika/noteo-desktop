import { TypeOf, z } from "zod";

import { noteSchema } from "../utils/validations";

export type Note = {
  title?: string;
  content?: string;
}

export type NotesReducer = {
  note: Note;
  notes: Note[];
}

export type NoteInput = z.infer<typeof noteSchema>;

