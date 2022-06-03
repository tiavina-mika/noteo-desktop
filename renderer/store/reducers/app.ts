import {
  CLOSE_APP_SNACKBAR, CLOSE_ERROR, CLOSE_MESSAGE, ERROR,
  ERROR_MESSAGE, LOADING_END, LOADING_START, MESSAGE, SUCCESS_MESSAGE,
} from "../types/appActions";

const initialState = {
	loading: false,
	error: null,
	message: null,
	appSnackBar: { open: false, type: "", message: "", duration: 0 }
};

const app = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_START:
			return {
				...state,
				loading: true
			}
		case LOADING_END:
			return {
				...state,
				loading: false
			}
		case ERROR:
			return {
				...state,
				error: action.message
			}
		case MESSAGE:
			return {
				...state,
				message: action.message
			}
		case CLOSE_ERROR:
			return {
				...state,
				error: null
			}
		case CLOSE_MESSAGE:
			return {
				...state,
				message: null
			}
		case SUCCESS_MESSAGE:
		case ERROR_MESSAGE:
		case CLOSE_APP_SNACKBAR:
			return {
				...state,
				appSnackBar: action.appSnackBar
			}
		default:
			return {
				...state
			}
	}
}

export default app;
