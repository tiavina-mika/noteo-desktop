import cookie from 'cookie';

import { COOKIES, SESSION_TOKEN_NAME } from "./constants";

export const setClientCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }

  if (!document) return;
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export const getClientCookie = (cookieName: string) => {
  const name = cookieName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

/**
 * add or update cookie
 * @param {*} res
 * @param {*} cookie
 */
 export const setCookie = (res, cookie) => {
  const maxAge = 31536000;

  const sessionCookie = cookie.serialize(SESSION_TOKEN_NAME, cookie, {
    httpOnly: false,
    secure: true,
    sameSite: 'strict',
    maxAge,
    path: '/',
  });


  res.setHeader(
    'Set-Cookie',
    [sessionCookie],
  );
};

/**
 * clear all cookies
 * @param {*} res
 */
export const clearCookies = (res, cookiesName: string[] = COOKIES) => {
  res.setHeader(
    'Set-Cookie',
    cookiesName.map((name: string) => {
      return cookie.serialize(name, '', {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      });
    }),
  );
};