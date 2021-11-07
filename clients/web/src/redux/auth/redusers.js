import {
  AUTH_SET_IS_AUTH_LOGIN,
  AUTH_SET_IS_AUTH_LOGOUT,
  AUTH_SET_PROCESS_AUTH_START,
  AUTH_SET_PROCESS_AUTH_END,
} from './actions';


const defaultState = {
  isAuth: Boolean(localStorage.getItem('token')),
  processAuth: false,
  nextUrl: '/',
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SET_IS_AUTH_LOGIN:
      return {
        ...state, isAuth: true,
      };
    case AUTH_SET_IS_AUTH_LOGOUT:
      return {
        ...state, isAuth: false,
      };
    case AUTH_SET_PROCESS_AUTH_START:
      return {
        ...state, processAuth: true,
      };
    case AUTH_SET_PROCESS_AUTH_END:
      return {
        ...state, processAuth: false,
      };
    default:
      return state;
  }
};


export default authReduser;