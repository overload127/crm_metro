import {
  // BLOCK CREATING
  TPWORK_START_CREATING,
  TPWORK_END_CREATING,
  // BLOCK DATA
  TPWORK_START_LOADING_DATA_FULL,
  TPWORK_END_LOADDING_DATA_FULL,
  // TPWORKS
  TPWORK_START_LOADDING_TPWORKS,
  TPWORK_END_LOADDING_TPWORKS,
  TPWORK_SET_DATA_TPWORKS,
  // DELETE PROCESS
  TPWORK_SET_START_DELETE_DATA_TPWORK,
  TPWORK_SET_FAIL_DELETE_DATA_TPWORK,
  TPWORK_DELETE_DATA_TPWORK,
} from './actions';

const defaultState = {
  isCreating: false,
  isLoading: false,
  TPWorks: {
    isLoading: false,
    data: [
      // {
      //   id: 0,
      //   datetimeStart: Date,
      //   datetimeEnd: Date,
      //   note: '',
      //   subdivision: '',
      //   stationName: '',
      //   stationShortName: '',
      //   techCardsCode: '',
      //   isDeleting,
      // }
    ],
  }
};


const TPWorkReduser = (state = defaultState, action) => {
  switch (action.type) {
    // CREATING
    case TPWORK_START_CREATING:
      return {
        ...state, isCreating: true,
      };
    case TPWORK_END_CREATING:
      return {
        ...state, isCreating: false,
      };
      // ALL DATA
    case TPWORK_START_LOADING_DATA_FULL:
      return {
        ...state, isLoading: true,
      };
    case TPWORK_END_LOADDING_DATA_FULL:
      return {
        ...state, isLoading: false,
      };
      // TPWORKS
    case TPWORK_START_LOADDING_TPWORKS:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          isLoading: true,
        },
      };
    case TPWORK_END_LOADDING_TPWORKS:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          isLoading: false,
        },
      };
    case TPWORK_SET_DATA_TPWORKS:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          data: [
            ...action.data,
          ],
        },
      };
      // DELETE PROCESS
    case TPWORK_SET_START_DELETE_DATA_TPWORK:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          data: state.TPWorks.data.map((item) => {
            if (item.id !== action.id) {
              return item;
            }
            return {
              ...item,
              isDeleting: true,
            };
          })
        },
      };
    case TPWORK_SET_FAIL_DELETE_DATA_TPWORK:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          data: state.TPWorks.data.map((item) => {
            if (item.id !== action.id) {
              return item;
            }
            return {
              ...item,
              isDeleting: false,
            };
          })
        },
      };
    case TPWORK_DELETE_DATA_TPWORK:
      return {
        ...state,
        TPWorks: {
          ...state.TPWorks,
          data: state.TPWorks.data.filter((item) => item.id !== action.id)
        },
      };
    default:
      return state;
  }
};


export default TPWorkReduser;