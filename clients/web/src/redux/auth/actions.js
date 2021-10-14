export const AUTH_SET_IS_AUTH_LOGIN = 'AUTH_SET_IS_AUTH';
export const AUTH_SET_IS_AUTH_LOGOUT = 'AUTH_SET_IS_AUTH_LOGOUT';
export const AUTH_SET_PROCESS_AUTH_START = 'AUTH_SET_PROCESS_AUTH_START';
export const AUTH_SET_PROCESS_AUTH_END = 'AUTH_SET_PROCESS_AUTH_END';


export const setIsAuthLogin = () => ({
  type: AUTH_SET_IS_AUTH_LOGIN,
});

export const setIsAuthLogout = () => ({
  type: AUTH_SET_IS_AUTH_LOGOUT,
});

export const setProcessAuthStart = () => ({
  type: AUTH_SET_PROCESS_AUTH_START,
});

export const setProcessAuthEnd = () => ({
  type: AUTH_SET_PROCESS_AUTH_END,
});