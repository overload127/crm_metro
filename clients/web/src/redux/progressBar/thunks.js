import {
  setStartBarInit,
  setEndBarInit,
  setStepBarInit,
  setFailBarInit,
} from './actions';


export const startBarInit = () => async (dispatch) => {
  dispatch(setStartBarInit());
};

export const endBarInit = () => async (dispatch) => {
  dispatch(setEndBarInit());
};

export const nextStepBarInit = () => async (dispatch) => {
  dispatch(setStepBarInit());
};

export const failBarInit = () => async (dispatch) => {
  dispatch(setFailBarInit());
};