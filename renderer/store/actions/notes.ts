import { NoteInput } from './../../types/notes';
import { AppDispatch, AppThunk } from "../store";
import { createNote } from '../slices/notes';

export const createNoteAction = (note: any): AppThunk => {
	return (dispatch: AppDispatch) => {
		try {
      dispatch(createNote(note));
		} catch (error) {
			console.error(error.message);
		}
	};
};

export const editNoteAction = (id: any, values: NoteInput): AppThunk => {
	return (dispatch: AppDispatch) => {
		try {
      dispatch(editNoteAction(id, values));
		} catch (error) {
			console.error(error.message);
		}
	};
};
