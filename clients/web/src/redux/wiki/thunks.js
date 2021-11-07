import {
  toast
} from 'react-toastify';
import WikiService from '../../api/WikiService';
import {
  setStartLoadingData,
  setEndLoadingData,
  // TECH_CARDS
  setStartLoadingTechCards,
  setEndLoadingTechCards,
  setDataTechCards,
  // STATIONS
  setStartLoadingStations,
  setEndLoadingStations,
  setDataStations,
  // DEVICES_FOR_WORK
  setStartLoadingDeviceForWork,
  setEndLoadingDeviceForWork,
  setDataDeviceForWork,
  // OKOLOTOKS
  setStartLoadingOkolotok,
  setEndLoadingOkolotok,
  setDataOkolotok,
  // USERS
  setStartLoadingUsers,
  setEndLoadingUsers,
  setDataUsers,
} from './actions';


export const loadWikiData = () => (dispatch) => {
  dispatch(setStartLoadingData());
  dispatch(setStartLoadingTechCards());

  WikiService.getTechCards()
    .then(response => {
      dispatch(setDataTechCards(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [Техкарты] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingTechCards());
  dispatch(setStartLoadingStations());

  WikiService.getStations()
    .then(response => {
      dispatch(setDataStations(response.data));
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

  dispatch(setEndLoadingStations());
  dispatch(setStartLoadingDeviceForWork());

  WikiService.getDeviceForWork()
    .then(response => {
      dispatch(setDataDeviceForWork(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [инструменты] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingDeviceForWork());
  dispatch(setStartLoadingOkolotok());

  WikiService.getOkolotoks()
    .then(response => {
      dispatch(setDataOkolotok(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [Околотки] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingOkolotok());
  dispatch(setStartLoadingUsers());

  WikiService.getOkolotoks()
    .then(response => {
      dispatch(setDataUsers(response.data));
    })
    .catch(() => {
      toast.error('Не удалось загрузить данные [Пользователи] раздела wiki.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

  dispatch(setEndLoadingUsers());
  dispatch(setEndLoadingData());
};

export const temp = "temp";