import { setError } from "../slices/app"
import { AppDispatch, AppThunk } from "../store"

export const showError = (errorOrMessage: any): AppThunk => {
	return (dispatch: AppDispatch) => {
		try {
			console.error(errorOrMessage);
			dispatch(setError(errorOrMessage.message));
		} catch (error) {
			console.error(error.message);
		}
	};
};
