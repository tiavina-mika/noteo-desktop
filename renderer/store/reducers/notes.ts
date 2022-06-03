import { LOAD_NOTE, LOAD_NOTES } from "../types/noteActions";

const initialState = {
  notes: [],
  note: [],
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES:
      return {
        ...state,
        notes: action.payload,
      };

    case LOAD_NOTE:
      return {
        ...state,
        notes: action.payload,
      };

    default:
      return state;
  }
};

export default notes;
