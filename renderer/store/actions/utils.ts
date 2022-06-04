import { AppDispatch } from './../store';
import { endLoading, startLoading } from "../slices/app"
import { AppThunk, AppState } from "../store"
import { showError } from "./app"

/**
 * returns a thunk
 * @param {Promise<Promise>} longPromiseCreatorOrPromise signature if creator: (dispatch : Function) : Promise
 */
 export const actionWithLoader = (longPromiseCreatorOrPromise): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
      dispatch(startLoading)
      try {
          if (typeof longPromiseCreatorOrPromise === "function") {
              await longPromiseCreatorOrPromise(dispatch, getState)
          } else {
              await longPromiseCreatorOrPromise
          }
      } catch (error) {
          showError(error)(dispatch, getState, ''); // the 3rd extra argument is required
      } finally {
          dispatch(endLoading)
      }

      return Promise.resolve()
  }
}