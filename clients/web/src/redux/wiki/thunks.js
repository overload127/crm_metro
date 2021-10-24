import {
  toast
} from 'react-toastify';
import WikiService from '../../api/WikiService';
import {
  setStartLoadingData,
  setEndLoadingData,
  setStartLoadingTechCards,
  setEndLoadingTechCards,
  setDataTechCards,
  setStartLoadingStations,
  setEndLoadingStations,
  setDataStations,
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
  dispatch(setEndLoadingData());
};

export const temp = "temp";