import {
  WIKI_SET_START_LOADING_DATA,
  WIKI_SET_END_LOADING_DATA,
  // TECH_CARDS
  WIKI_SET_START_LOADING_TECH_CARDS,
  WIKI_SET_END_LOADING_TECH_CARDS,
  WIKI_SET_DATA_TECH_CARDS,
  // STATIONS
  WIKI_SET_START_LOADING_STATIONS,
  WIKI_SET_END_LOADING_STATIONS,
  WIKI_SET_DATA_STATIONS,
  // DEVICE_FOR_WORK
  WIKI_SET_START_LOADING_DEVICES_FOR_WORK,
  WIKI_SET_END_LOADING_DEVICES_FOR_WORK,
  WIKI_SET_DATA_DEVICES_FOR_WORK,
  // OKOLOTOK
  WIKI_SET_START_LOADING_OKOLOTOKS,
  WIKI_SET_END_LOADING_OKOLOTOKS,
  WIKI_SET_DATA_OKOLOTOKS,
  // OKOLOTOK
  WIKI_SET_START_LOADING_USERS,
  WIKI_SET_END_LOADING_USERS,
  WIKI_SET_DATA_USERS,
} from './actions';


const defaultState = {
  loading: false,
  techCards: {
    isLoading: false,
    data: [],
  },
  stations: {
    isLoading: false,
    data: [],
  },
  deviceForWork: {
    isLoading: false,
    data: [],
  },
  okolotok: {
    isLoading: false,
    data: [],
  },
  users: {
    isLoading: false,
    data: [],
  },
};


const wikiReduser = (state = defaultState, action) => {
  switch (action.type) {
    case WIKI_SET_START_LOADING_DATA:
      return {
        ...state, isLoading: true,
      };
    case WIKI_SET_END_LOADING_DATA:
      return {
        ...state, isLoading: false,
      };

      // TECH_CARDS
    case WIKI_SET_START_LOADING_TECH_CARDS:
      return {
        ...state,
        techCards: {
          ...state.techCards,
          isLoading: true,
        }
      };
    case WIKI_SET_END_LOADING_TECH_CARDS:
      return {
        ...state,
        techCards: {
          ...state.techCards,
          isLoading: false,
        }
      };
    case WIKI_SET_DATA_TECH_CARDS:
      return {
        ...state,
        techCards: {
          ...state.techCards,
          data: [
            ...action.data,
          ],
        }
      };

      // STATIONS
    case WIKI_SET_START_LOADING_STATIONS:
      return {
        ...state,
        stations: {
          ...state.stations,
          isLoading: true,
        }
      };
    case WIKI_SET_END_LOADING_STATIONS:
      return {
        ...state,
        stations: {
          ...state.stations,
          isLoading: false,
        }
      };
    case WIKI_SET_DATA_STATIONS:
      return {
        ...state,
        stations: {
          ...state.stations,
          data: [
            ...action.data,
          ],
        }
      };

      // DEVICES_FOR_WORK
    case WIKI_SET_START_LOADING_DEVICES_FOR_WORK:
      return {
        ...state,
        deviceForWork: {
          ...state.deviceForWork,
          isLoading: true,
        }
      };
    case WIKI_SET_END_LOADING_DEVICES_FOR_WORK:
      return {
        ...state,
        deviceForWork: {
          ...state.deviceForWork,
          isLoading: false,
        }
      };
    case WIKI_SET_DATA_DEVICES_FOR_WORK:
      return {
        ...state,
        deviceForWork: {
          ...state.deviceForWork,
          data: [
            ...action.data,
          ],
        }
      };

      // OKOLOTOKS
    case WIKI_SET_START_LOADING_OKOLOTOKS:
      return {
        ...state,
        okolotok: {
          ...state.okolotok,
          isLoading: true,
        }
      };
    case WIKI_SET_END_LOADING_OKOLOTOKS:
      return {
        ...state,
        okolotok: {
          ...state.okolotok,
          isLoading: false,
        }
      };
    case WIKI_SET_DATA_OKOLOTOKS:
      return {
        ...state,
        okolotok: {
          ...state.okolotok,
          data: [
            ...action.data,
          ],
        }
      };

      // USERS
    case WIKI_SET_START_LOADING_USERS:
      return {
        ...state,
        users: {
          ...state.okolotok,
          isLoading: true,
        }
      };
    case WIKI_SET_END_LOADING_USERS:
      return {
        ...state,
        users: {
          ...state.okolotok,
          isLoading: false,
        }
      };
    case WIKI_SET_DATA_USERS:
      return {
        ...state,
        users: {
          ...state.okolotok,
          data: [
            ...action.data,
          ],
        }
      };

    default:
      return state;
  }
};


export default wikiReduser;