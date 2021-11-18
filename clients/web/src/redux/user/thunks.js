import {
  toast
} from 'react-toastify';
import UserService from '../../api/UserService';
import {
  setStartLoadingUser,
  setEndLoadingUser,
  setDataUser,
  setAnonymUser,
} from './actions';

import {
  // Начинаю загрузку сайта в этом редаксе, а завершаю в другом
  // Плохая идея но не представляю как обойти
  startBarInit,
  nextStepBarInit,
  failBarInit,
} from '../progressBar/thunks';


export const loadUserProfile = () => async (dispatch) => {
  dispatch(startBarInit());
  dispatch(setStartLoadingUser());

  await UserService.getUserProfileMe()
    .then(response => {
      dispatch(setDataUser(
        response.data.user__id,
        response.data.user__first_name,
        response.data.id,
        response.data.okolotok__id,
        response.data.okolotok__name));

      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
      toast.error('Не удалось загрузить текущего пользователя. Попробуйте позже или обратитесь к администратору.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(setDataUser(-1, 'anonim', null, ''));
    });

  dispatch(setEndLoadingUser());
};

export const loadAnonymUser = () => async (dispatch) => {
  dispatch(setAnonymUser());
};