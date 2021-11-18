import {
  toast
} from 'react-toastify';
import AuthService from '../../api/AuthService';
import {
  setIsAuthLogin,
  setIsAuthLogout,
  setProcessAuthStart,
  setProcessAuthEnd,
} from './actions';

import {
  loadAnonymUser
} from '../user/thunks';


export const login = (username, password, capcha) => (dispatch) => {
  dispatch(setProcessAuthStart());
  AuthService.login(username, password, capcha)
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

  // Задержка для того, что бы приложение успело обновиться и не вывело сообщение о том,
  // что страница логин доступна только не авторизованным пользователям
  setTimeout(() => dispatch(setProcessAuthEnd()), 2000);
};


export const logout = () => (dispatch) => {
  AuthService.logout()
    .then(() => {
      localStorage.setItem('token', '');
    })
    .catch(() => {
      localStorage.setItem('token', '');
    });

  toast.info('Вы успешно вышли из системы.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch(loadAnonymUser());
  dispatch(setIsAuthLogout());
};