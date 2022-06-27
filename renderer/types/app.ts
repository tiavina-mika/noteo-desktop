
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

export interface IPaginationInput {
  search?: string;
  availableSearch?: string[];
  page?: number;
  perPage?: number;
  sort?: string;
  availableSort?: string[];
}
