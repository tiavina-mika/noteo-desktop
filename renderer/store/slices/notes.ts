import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Note, NoteInput, NotesReducer } from "../../types/notes";

export const notes = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    note: null,
  } as NotesReducer,
  reducers: {
    createNote: (state, action: PayloadAction<NoteInput>) => {
      state.note = action.payload;
      state.notes = [...state.notes, action.payload];
    },
    getNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        console.log('HYDRATE action notes', action.payload);
        // console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            // ...action.payload,
        };
    },
},
});

export const { createNote, getNotes } = notes.actions;

export default notes.reducer;