import Cookies from 'js-cookie';


export const setCookie = (name: string, value: string, expires?: number) => {
  Cookies.set(name, value, {
    // expires: expires || 3,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
