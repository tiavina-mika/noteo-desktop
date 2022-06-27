import { IRequest, IRequestHeadersParams } from "../types/request";
import { APP_NAME } from "./constants";
import { SEO } from "./texting";

export const truncateString = (str: string, n: number): string => {
  if (str.length > n) {
    return str.substring(0, n) + ' ...';
  }

  return str;
};


 // to capitalize only first letter
 export const capitalizeFirstLetter = (string: string): string => {
  if (
    !string
    || typeof string !== 'string'
    || (string && string.trim().length === 0)
  ) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

 /**
  * head html balise title
  * @param {string} title
  * @returns {string}
  */
export const formatPageTitle = (title: string): string => {
  const appName = capitalizeFirstLetter(APP_NAME);

  if (title) {
    return title + ' - ' + appName;
  }

  return SEO.metaTitle;
};

/**
 * handle graphQL mutation error
 * @param error
 * @returns 
 */
export const onError = (error) => error;

export const setRequestHeader = ({ sessionToken, lang = 'en' }: IRequestHeadersParams): IRequest => {
  return {
    headers: {
        Authorization: sessionToken ? `Bearer ${sessionToken}` : '',
        'x-custom-lang': lang,
    }
  };
}
