import {
  WIKI_SET_START_LOADING_DATA,
  WIKI_SET_END_LOADING_DATA,
  WIKI_SET_START_LOADING_TP,
  WIKI_SET_END_LOADING_TP,
  WIKI_SET_DATA_TP,
} from './actions';

const defaultState = {
  loading: false,
  tp: {
    loading: false,
    data: [],
  }
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
    case WIKI_SET_START_LOADING_TP:
      return {
        ...state,
        tp: {
          ...state.tp,
          loading: true,
        }
      };
    case WIKI_SET_END_LOADING_TP:
      return {
        ...state,
        tp: {
          ...state.tp,
          loading: false,
        }
      };
    case WIKI_SET_DATA_TP:
      return {
        ...state,
        tp: {
          ...state.tp,
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