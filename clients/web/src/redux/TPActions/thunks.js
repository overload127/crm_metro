import {
  toast
} from 'react-toastify';
import TPActionsService from '../../api/TPActionsService';
import {
  setStartCreating,
  setEndCreating,
} from './actions';


export const createTPWorkToServer = (datetimeStart, datetimeEnd, station, typeWorks) => (dispatch) => {
  dispatch(setStartCreating());
  TPActionsService.createTPWork(datetimeStart, datetimeEnd, station, typeWorks)
    .then(() => {
      toast.success('Работа добавлена успешно.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch(() => {
      toast.error('Возникла ошибка при добавлении работы. Попробуйте ещё раз или обратитесь к администратору.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndCreating());
};

export const test = "test0";