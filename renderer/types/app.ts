import app from "../store/slices/app";

type AppSnackBar = {
  open: boolean,
  type: string,
  message: string,
  duration: number,
}

export interface AppReducer {
	loading: boolean;
	error: string;
	message: string;
	appSnackBar: AppSnackBar;
}
