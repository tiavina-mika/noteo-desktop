import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";

import appReducer from './slices/app';
import notesReducer from './slices/notes';

const rootReducer = combineReducers({
    app: appReducer,
    notes: notesReducer,
})

export const makeStore = wrapMakeStore(() => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      // the nextReduxCookieMiddleware should be defined first
      nextReduxCookieMiddleware({
        // get the dispatched state (store) from dispatch in server side props in client (useSelector)
        // accessed via useSelector(state => state.app.app.message) instead oi useSelector(state => state.app.message)
        subtrees: [],
        // subtrees: ["app.message", "app.loading"],
      })
    ),
    // preloadedState,
    devTools: true,
  })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });