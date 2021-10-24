import {
  WIKI_SET_START_LOADING_DATA,
  WIKI_SET_END_LOADING_DATA,
  WIKI_SET_START_LOADING_TECH_CARDS,
  WIKI_SET_END_LOADING_TECH_CARDS,
  WIKI_SET_DATA_TECH_CARDS,
  WIKI_SET_START_LOADING_STATIONS,
  WIKI_SET_END_LOADING_STATIONS,
  WIKI_SET_DATA_STATIONS,
} from './actions';

const defaultState = {
  loading: false,
  techCards: {
    loading: false,
    data: [],
  },
  stations: {
    loading: false,
    data: [],
  },
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case WIKI_SET_START_LOADING_DATA:
      return {
        ...state, loading: true,
      };
    case WIKI_SET_END_LOADING_DATA:
      return {
        ...state, loading: false,
      };
    case WIKI_SET_START_LOADING_TECH_CARDS:
      return {
        ...state,
        techCards: {
          ...state.techCards,
          loading: true,
        }
      };
    case WIKI_SET_END_LOADING_TECH_CARDS:
      return {
        ...state,
        techCards: {
          ...state.techCards,
          loading: false,
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
    case WIKI_SET_START_LOADING_STATIONS:
      return {
        ...state,
        stations: {
          ...state.stations,
          loading: true,
        }
      };
    case WIKI_SET_END_LOADING_STATIONS:
      return {
        ...state,
        stations: {
          ...state.stations,
          loading: false,
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
    default:
      return state;
  }
};


export default authReduser;