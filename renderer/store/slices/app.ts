import { AppReducer } from './../../types/app';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState: AppReducer = {
	loading: false,
	error: null,
	message: null,
	appSnackBar: { open: false, type: "", message: "", duration: 0 }
};

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state: AppReducer) => {
      state.loading = true;
    },
    endLoading: (state: AppReducer) => {
      state.loading = false;
    },
    setError: (state: AppReducer, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMessage: (state: AppReducer, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    closeError: (state: AppReducer) => {
      state.error = null;
    },
    closeMessage: (state: AppReducer) => {
      state.message = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            ...action.payload.notes,
        };
    },
  },
});

export const {
  startLoading, endLoading, setError, closeError, closeMessage,
  setMessage,
} = app.actions;

export default app.reducer;