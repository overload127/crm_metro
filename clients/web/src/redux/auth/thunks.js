import {
  toast
} from 'react-toastify';
import AuthService from '../../api/AuthService';
import {
  setIsAuthLogin,
  setIsAuthLogout
} from './actions';


export const login = (username, password) => (dispatch) => {
  AuthService.login(username, password)
    .then(response => {
      localStorage.setItem('token', response.data.auth_token);
      dispatch(setIsAuthLogin());
    })
    .catch(() => {
      toast.error('Неправильный логин или пароль.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
};


export const logout = () => (dispatch) => {
  AuthService.logout()
    .then(() => {
      localStorage.setItem('token', '');
    })
    .catch(() => {
      localStorage.setItem('token', '');
    });
  dispatch(setIsAuthLogout());
};