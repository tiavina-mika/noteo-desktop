import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';

import appReducer from './slices/app';
import notesReducer from './slices/notes';

const rootReducer = combineReducers({
    app: appReducer,
    notes: notesReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    //   getDefaultMiddleware().concat(pokemonApi.middleware),
    // preloadedState,
    devTools: true,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper = createWrapper<AppStore>(makeStore);