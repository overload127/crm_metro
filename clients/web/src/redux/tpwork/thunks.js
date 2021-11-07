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


export const loadTPWorkData = (dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, techCards) => (dispatch) => {
  dispatch(setStartLoadingTPWorks());

  TPWorkService.getTPWorks(dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, techCards)
    .then(response => {
      const wrapData = wrapTPWork(response.data);
      console.log(wrapData);
      dispatch(setDataTPWorks(wrapData));
    })
    .catch(() => {
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


export const loadTPWorkDataFull = () => (dispatch) => {
  dispatch(setStartLoadingDataFull());

  const dateStart = moment().startOf('month').format('YYYY-MM-DD');
  const dateEnd = moment().endOf('month').format('YYYY-MM-DD');
  const okolotokID = null;
  const stationID = null;
  const userProfiles = [];
  const typeDU46 = 'all';
  const typeOrder = 'all';
  const techCards = [];

  dispatch(loadTPWorkData(dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, techCards));

  dispatch(setEndLoadingDataFull());
};


export const createTPWorkToServer = (datetimeStart, datetimeEnd, station, typeWorks) => (dispatch) => {
  dispatch(setStartCreating());
  TPWorkService.createTPWork(datetimeStart, datetimeEnd, station, typeWorks)
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