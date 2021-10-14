export const AUTH_SET_IS_AUTH = 'AUTH_SET_IS_AUTH';
export const AUTH_SET_NEXT_URL = 'AUTH_SET_NEXT_URL';


export const setIsAuth = (value) => ({
  type: AUTH_SET_IS_AUTH,
  value,
});

export const setIsAuthLogin = () => ({
  ...setIsAuth(true),
});

export const setIsAuthLogout = () => ({
  ...setIsAuth(false),
});

export const setNextUrl = (url) => ({
  type: AUTH_SET_NEXT_URL,
  url,
});