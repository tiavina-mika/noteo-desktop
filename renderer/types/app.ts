type AppSnackBar = {
  open: boolean,
  type: string,
  message: string,
  duration: number,
}

export type APP = {
	loading: boolean,
	error: string,
	message: string,
	appSnackBar: AppSnackBar
}
