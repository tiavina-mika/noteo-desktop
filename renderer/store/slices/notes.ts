import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Note, NoteInput, NotesReducer } from "../../types/notes";

interface EditInput {
  id: any;
  values: NoteInput;
};

export const notes = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    note: null,
  } as NotesReducer,
  reducers: {
    // createNote: (state, action: PayloadAction<Note>) => {
    //   state.note = action.payload;
    //   state.notes = [...state.notes, action.payload];
    // },
    createNote: (state, action: PayloadAction<Note>) => {
      state.note = action.payload;
      state.notes = [...state.notes, action.payload];
    },
    editNote: (state, action: PayloadAction<EditInput>) => {
      const newNotes = [...state.notes];
      newNotes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            ...action.payload.values
          };
        }
        return note;
      })
      state.notes = newNotes;
    },
    getNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    loadNotes: (state, action: PayloadAction<Note[]>) => {
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

export const {
  createNote, getNotes, loadNotes,
  editNote,
} = notes.actions;

export default notes.reducer;