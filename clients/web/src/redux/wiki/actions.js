export const WIKI_SET_START_LOADING_DATA = 'WIKI_SET_START_LOADING_DATA';
export const WIKI_SET_END_LOADING_DATA = 'WIKI_SET_END_LOADING_DATA';
// TECH_CARDS
export const WIKI_SET_START_LOADING_TECH_CARDS = 'WIKI_SET_START_LOADING_TECH_CARDS';
export const WIKI_SET_END_LOADING_TECH_CARDS = 'WIKI_SET_END_LOADING_TECH_CARDS';
export const WIKI_SET_DATA_TECH_CARDS = 'WIKI_SET_DATA_TECH_CARDS';
// STATIONS
export const WIKI_SET_START_LOADING_STATIONS = 'WIKI_SET_START_LOADING_STATIONS';
export const WIKI_SET_END_LOADING_STATIONS = 'WIKI_SET_END_LOADING_STATIONS';
export const WIKI_SET_DATA_STATIONS = 'WIKI_SET_DATA_STATIONS';
// DEVICE_FOR_WORK
export const WIKI_SET_START_LOADING_DEVICES_FOR_WORK = 'WIKI_SET_START_LOADING_DEVICES_FOR_WORK';
export const WIKI_SET_END_LOADING_DEVICES_FOR_WORK = 'WIKI_SET_END_LOADING_DEVICES_FOR_WORK';
export const WIKI_SET_DATA_DEVICES_FOR_WORK = 'WIKI_SET_DATA_DEVICES_FOR_WORK';
// OKOLOTOK
export const WIKI_SET_START_LOADING_OKOLOTOKS = 'WIKI_SET_START_LOADING_OKOLOTOKS';
export const WIKI_SET_END_LOADING_OKOLOTOKS = 'WIKI_SET_END_LOADING_OKOLOTOKS';
export const WIKI_SET_DATA_OKOLOTOKS = 'WIKI_SET_DATA_OKOLOTOKS';
// USERS
export const WIKI_SET_START_LOADING_USERS = 'WIKI_SET_START_LOADING_USERS';
export const WIKI_SET_END_LOADING_USERS = 'WIKI_SET_END_LOADING_USERS';
export const WIKI_SET_DATA_USERS = 'WIKI_SET_DATA_USERS';


export const setStartLoadingData = () => ({
  type: WIKI_SET_START_LOADING_DATA,
});

export const setEndLoadingData = () => ({
  type: WIKI_SET_END_LOADING_DATA,
});

/// ////////////////////////
// TECH_CARDS
/// ////////////////////////

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

/// ////////////////////////
// STATIONS
/// ////////////////////////
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

/// ////////////////////////
// DEVICES_FOR_WORK
/// ////////////////////////
export const setStartLoadingDeviceForWork = () => ({
  type: WIKI_SET_START_LOADING_DEVICES_FOR_WORK,
});

export const setEndLoadingDeviceForWork = () => ({
  type: WIKI_SET_END_LOADING_DEVICES_FOR_WORK,
});

export const setDataDeviceForWork = (data) => ({
  type: WIKI_SET_DATA_DEVICES_FOR_WORK,
  data,
});

/// ////////////////////////
// OKOLOTOKS
/// ////////////////////////
export const setStartLoadingOkolotok = () => ({
  type: WIKI_SET_START_LOADING_OKOLOTOKS,
});

export const setEndLoadingOkolotok = () => ({
  type: WIKI_SET_END_LOADING_OKOLOTOKS,
});

export const setDataOkolotok = (data) => ({
  type: WIKI_SET_DATA_OKOLOTOKS,
  data,
});

/// ////////////////////////
// USERS
/// ////////////////////////
export const setStartLoadingUsers = () => ({
  type: WIKI_SET_START_LOADING_USERS,
});

export const setEndLoadingUsers = () => ({
  type: WIKI_SET_END_LOADING_USERS,
});

export const setDataUsers = (data) => ({
  type: WIKI_SET_DATA_USERS,
  data,
});