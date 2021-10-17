import {
  toast
} from 'react-toastify';
import WikiService from '../../api/WikiService';
import {
  setStartLoadingData,
  setEndLoadingData,
  setStartLoadingTP,
  setEndLoadingTP,
  setDataTP,
  setStartLoadingStation,
  setEndLoadingStation,
  setDataStation,
} from './actions';


export const loadWikiData = () => (dispatch) => {
  dispatch(setStartLoadingData());
  dispatch(setStartLoadingTP());

  WikiService.getTP()
    .then(response => {
      dispatch(setDataTP(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [Техпроцессы] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingTP());
  dispatch(setStartLoadingStation());

  WikiService.getStation()
    .then(response => {
      dispatch(setDataStation(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [Станции] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingStation());
  dispatch(setEndLoadingData());
};

export const temp = "temp";