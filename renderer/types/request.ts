export interface IRequestHeadersParams {
  lang?: 'fr' | 'en';
  sessionToken?: string;
}
export interface IRequestHeaders {
  'x-custom-lang': 'fr' | 'en';
  Authorization: string;
}

export interface IRequest {
  headers: IRequestHeaders
}
