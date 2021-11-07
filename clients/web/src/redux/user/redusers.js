import {
  USER_SET_USER_DATA,
  USER_SET_PROCESS_USER_START,
  USER_SET_PROCESS_USER_END,
} from './actions';


const defaultState = {
  user: {
    firtName: 'anonim',
    okolotok: {
      id: null,
      name: '',
    },
  },
  isLoading: false,
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case USER_SET_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          firtName: action.firtName,
          okolotok: {
            ...state.user.okolotok,
            id: action.okolotokId,
            name: action.okolotokName,
          }
        }
      };
    case USER_SET_PROCESS_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SET_PROCESS_USER_END:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};


export default authReduser;