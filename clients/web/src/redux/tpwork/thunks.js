import {
  toast
} from 'react-toastify';
import moment from 'moment';
import wrapTPWork from './handlers';
import TPWorkService from '../../api/TPWorkService';
import {
  setStartCreating,
  setEndCreating,
  setStartLoadingDataFull,
  setEndLoadingDataFull,
  setStartLoadingTPWorks,
  setEndLoadingTPWorks,
  setDataTPWorks,
} from './actions';

import {
  nextStepBarInit,
  failBarInit,
} from '../progressBar/thunks';


export const loadTPWorkData = (dateStart, dateEnd, okolotokID, stationID, users, typeDU46, typeOrder, typePafu, typeJtp, techCards) => async (dispatch) => {
  dispatch(setStartLoadingTPWorks());

  await TPWorkService.getTPWorks(dateStart, dateEnd, okolotokID, stationID, users, typeDU46, typeOrder, typePafu, typeJtp, techCards)
    .then(response => {
      const wrapData = wrapTPWork(response.data);
      dispatch(setDataTPWorks(wrapData));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
      toast.error('Не удалось загрузить выполненые работы. Попробуйте позже или обратитесь к администратору.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingTPWorks());
};


export const loadTPWorkDataFull = (okolotokId) => async (dispatch) => {
  dispatch(setStartLoadingDataFull());

  const dateStart = moment().startOf('month').format('YYYY-MM-DD');
  const dateEnd = moment().endOf('month').format('YYYY-MM-DD');
  const stationId = null;
  const userProfiles = [];
  const typeDU46 = 'all';
  const typeOrder = 'all';
  const typePafu = 'all';
  const typeJtp = 'all';
  const techCards = [];

  await dispatch(loadTPWorkData(dateStart, dateEnd, okolotokId, stationId, userProfiles, typeDU46, typeOrder, typePafu, typeJtp, techCards));

  dispatch(setEndLoadingDataFull());
};


export const createTPWorkToServer = (datetimeStart, datetimeEnd, station, typeWorks, okolotok, users) => async (dispatch) => {
  dispatch(setStartCreating());
  await TPWorkService.createTPWork(datetimeStart, datetimeEnd, station, typeWorks, okolotok, users)
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
      dispatch(failBarInit());
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