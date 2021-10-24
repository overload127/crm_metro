export const WIKI_SET_START_LOADING_DATA = 'WIKI_SET_START_LOADING_DATA';
export const WIKI_SET_END_LOADING_DATA = 'WIKI_SET_END_LOADING_DATA';
export const WIKI_SET_START_LOADING_TECH_CARDS = 'WIKI_SET_START_LOADING_TECH_CARDS';
export const WIKI_SET_END_LOADING_TECH_CARDS = 'WIKI_SET_END_LOADING_TECH_CARDS';
export const WIKI_SET_DATA_TECH_CARDS = 'WIKI_SET_DATA_TECH_CARDS';
export const WIKI_SET_START_LOADING_STATIONS = 'WIKI_SET_START_LOADING_STATIONS';
export const WIKI_SET_END_LOADING_STATIONS = 'WIKI_SET_END_LOADING_STATIONS';
export const WIKI_SET_DATA_STATIONS = 'WIKI_SET_DATA_STATIONS';


export const setStartLoadingData = () => ({
  type: WIKI_SET_START_LOADING_DATA,
});

export const setEndLoadingData = () => ({
  type: WIKI_SET_END_LOADING_DATA,
});

export const setStartLoadingTechCards = () => ({
  type: WIKI_SET_START_LOADING_TECH_CARDS,
});

export const setEndLoadingTechCards = () => ({
  type: WIKI_SET_END_LOADING_TECH_CARDS,
});

export const setDataTechCards = (data) => ({
  type: WIKI_SET_DATA_TECH_CARDS,
  data,
});

export const setStartLoadingStations = () => ({
  type: WIKI_SET_START_LOADING_STATIONS,
});

export const setEndLoadingStations = () => ({
  type: WIKI_SET_END_LOADING_STATIONS,
});

export const setDataStations = (data) => ({
  type: WIKI_SET_DATA_STATIONS,
  data,
});