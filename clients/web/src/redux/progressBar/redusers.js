import {
  PROGRESS_BAR_INIT_START,
  PROGRESS_BAR_INIT_END,
  PROGRESS_BAR_INIT_ADD_STEP,
  PROGRESS_BAR_INIT_NEXT_STEP,
  PROGRESS_BAR_INIT_FAIL,
} from './actions';


const defaultState = {
  initLodding: {
    isLoading: false,
    countStep: 7,
    currentStep: 0,
    status: 'active',
  }
};


const progressBar = (state = defaultState, action) => {
  switch (action.type) {
    case PROGRESS_BAR_INIT_START:
      return {
        ...state,
        initLodding: {
          ...state.initLodding,
          currentStep: 0,
          isLoading: true,
          status: 'active',
        }
      };
    case PROGRESS_BAR_INIT_END:
      return {
        ...state,
        initLodding: {
          ...state.initLodding,
          isLoading: false,
        }
      };
    case PROGRESS_BAR_INIT_FAIL:
      return {
        ...state,
        initLodding: {
          ...state.initLodding,
          status: 'exception',
        }
      };
    case PROGRESS_BAR_INIT_ADD_STEP:
      return {
        ...state,
        initLodding: {
          ...state.initLodding,
          countStep: state.initLodding.countStep + 1
        }
      };
    case PROGRESS_BAR_INIT_NEXT_STEP:
      return {
        ...state,
        initLodding: {
          ...state.initLodding,
          currentStep: state.initLodding.currentStep + 1
        }
      };
    default:
      return state;
  }
};


export default progressBar;