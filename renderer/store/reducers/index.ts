import { combineReducers } from "redux";

import appReducer from "./app";
import notesReducer from "./notes";

export default combineReducers({
  app: appReducer,
  notes: notesReducer,
});