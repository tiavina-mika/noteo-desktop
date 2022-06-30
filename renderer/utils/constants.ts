export const APP_NAME = 'Noteo';
export const SESSION_TOKEN_NAME = '_cu';
export const COOKIES: string[] = [
  SESSION_TOKEN_NAME,
];
export const SESSION_DURATION: number = 365;

export const PATH_NAMES = {
  home: '/home',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  notesByFolder: '/folders/notes',
  folders: '/folders',
};

export const IMAGE_BANNER = {
  default: '/images/app-main-image.png',
};

export const DEFAULT_PER_PAGE: number = 30;
export const DEFAULT_SORT: string = 'updatedAt@desc';
