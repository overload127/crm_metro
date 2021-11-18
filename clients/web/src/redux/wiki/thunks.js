import {
  toast
} from 'react-toastify';
import WikiService from '../../api/WikiService';
import UserService from '../../api/UserService';
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
import {
  wrapTechCards,
  convertUsers,
  convertStations,
  convertDeviceForWork,
} from "./handlers";

import {
  nextStepBarInit,
  failBarInit,
} from '../progressBar/thunks';


export const loadWikiData = () => async (dispatch) => {
  dispatch(setStartLoadingData());
  // Что бы была анимация загрузки, ставим статус загрузки для всех данных разом.
  dispatch(setStartLoadingTechCards());
  dispatch(setStartLoadingStations());
  dispatch(setStartLoadingDeviceForWork());
  dispatch(setStartLoadingOkolotok());
  dispatch(setStartLoadingUsers());

  dispatch(setStartLoadingTechCards());

  await WikiService.getTechCards()
    .then(response => {
      const data = wrapTechCards(response.data);
      dispatch(setDataTechCards(data));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
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

  await WikiService.getStations()
    .then(response => {
      dispatch(setDataStations(convertStations(response.data)));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
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

  await WikiService.getDeviceForWork()
    .then(response => {
      dispatch(setDataDeviceForWork(convertDeviceForWork(response.data)));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
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

  await WikiService.getOkolotoks()
    .then(response => {
      dispatch(setDataOkolotok(response.data));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
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

  await UserService.getUserProfileAll()
    .then(response => {
      dispatch(setDataUsers(convertUsers(response.data)));
      dispatch(nextStepBarInit());
    })
    .catch(() => {
      dispatch(failBarInit());
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