export const WIKI_SET_START_LOADING_DATA = 'WIKI_SET_START_LOADING_DATA';
export const WIKI_SET_END_LOADING_DATA = 'WIKI_SET_END_LOADING_DATA';
export const WIKI_SET_START_LOADING_TP = 'WIKI_SET_START_LOADING_TP';
export const WIKI_SET_END_LOADING_TP = 'WIKI_SET_END_LOADING_TP';
export const WIKI_SET_DATA_TP = 'WIKI_SET_DATA_TP';
export const WIKI_SET_START_LOADING_STATION = 'WIKI_SET_START_LOADING_STATION';
export const WIKI_SET_END_LOADING_STATION = 'WIKI_SET_END_LOADING_STATION';
export const WIKI_SET_DATA_STATION = 'WIKI_SET_DATA_STATION';


export const setStartLoadingData = () => ({
  type: WIKI_SET_START_LOADING_DATA,
});

export const setEndLoadingData = () => ({
  type: WIKI_SET_END_LOADING_DATA,
});

export const setStartLoadingTP = () => ({
  type: WIKI_SET_START_LOADING_TP,
});

export const setEndLoadingTP = () => ({
  type: WIKI_SET_END_LOADING_TP,
});

export const setDataTP = (data) => ({
  type: WIKI_SET_DATA_TP,
  data,
});

export const setStartLoadingStation = () => ({
  type: WIKI_SET_START_LOADING_STATION,
});

export const setEndLoadingStation = () => ({
  type: WIKI_SET_END_LOADING_STATION,
});

export const setDataStation = (data) => ({
  type: WIKI_SET_DATA_STATION,
  data,
});