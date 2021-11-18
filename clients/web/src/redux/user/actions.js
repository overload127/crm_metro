// USER
export const USER_START_LOADDING_USER = 'USER_START_LOADDING_USER';
export const USER_END_LOADDING_USER = 'USER_END_LOADDING_USER';
export const USER_SET_DATA_USER = 'USER_SET_DATA_USER';
export const USER_SET_ANONYM_USER = 'USER_SET_ANONYM_USER';



export const setStartLoadingUser = () => ({
  type: USER_START_LOADDING_USER,
});

export const setEndLoadingUser = () => ({
  type: USER_END_LOADDING_USER,
});

export const setDataUser = (id, firstName, userProfileId, okolotokId, okolotokName) => ({
  type: USER_SET_DATA_USER,
  id,
  firstName,
  userProfileId,
  okolotokId,
  okolotokName,
});

export const setAnonymUser = () => ({
  type: USER_SET_ANONYM_USER,
});