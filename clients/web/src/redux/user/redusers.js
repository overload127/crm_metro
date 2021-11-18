import {
  // USER
  USER_START_LOADDING_USER,
  USER_END_LOADDING_USER,
  USER_SET_DATA_USER,
  USER_SET_ANONYM_USER,
} from './actions';


const defaultState = {
  id: -1,
  firstName: 'anonim',
  userProfileId: -1,
  okolotok: {
    id: -1,
    name: '',
  },
  isLoading: false,
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case USER_START_LOADDING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case USER_END_LOADDING_USER:
      return {
        ...state,
        isLoading: false,
      };
    case USER_SET_DATA_USER:
      return {
        ...state,
        id: action.id,
          firstName: action.firstName,
          userProfileId: action.userProfileId,
          okolotok: {
            ...state.okolotok,
            id: action.okolotokId,
            name: action.okolotokName,
          }
      };
    case USER_SET_ANONYM_USER:
      return {
        ...defaultState
      };
    default:
      return state;
  }
};


export default authReduser;