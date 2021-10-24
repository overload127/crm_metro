import {
  TP_ACTIONS_START_CREATING,
  TP_ACTIONS_END_CREATING,
} from './actions';


const defaultState = {
  isCreating: false,
};


const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case TP_ACTIONS_START_CREATING:
      return {
        ...state, isCreating: true,
      };
    case TP_ACTIONS_END_CREATING:
      return {
        ...state, isCreating: false,
      };
    default:
      return state;
  }
};


export default authReduser;