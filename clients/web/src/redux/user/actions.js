export const USER_SET_USER_DATA = 'USER_SET_USER_DATA';
export const USER_SET_PROCESS_USER_START = 'USER_SET_PROCESS_USER_START';
export const USER_SET_PROCESS_USER_END = 'USER_SET_PROCESS_USER_END';


export const setUserData = (firtName, okolotokId, okolotokName) => ({
  type: USER_SET_USER_DATA,
  firtName,
  okolotokId,
  okolotokName,
});

export const setProcessUserSrart = () => ({
  type: USER_SET_PROCESS_USER_START,
});

export const setProcessUserEnd = () => ({
  type: USER_SET_PROCESS_USER_END,
});