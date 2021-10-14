import {
  AUTH_SET_IS_AUTH,
  AUTH_SET_NEXT_URL,
} from './actions';


const defaultState = {
  user: {},
  isAuth: Boolean(localStorage.getItem('token')),
  nextUrl: '/',
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SET_IS_AUTH:
      return {
        ...state, isAuth: action.value,
      };
    case AUTH_SET_NEXT_URL:
      return {
        ...state, nextUrl: action.url,
      };
    default:
      return state;
  }
};


export default authReduser;