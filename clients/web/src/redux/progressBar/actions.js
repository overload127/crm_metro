// USER
export const PROGRESS_BAR_INIT_START = 'PROGRESS_BAR_INIT_START';
export const PROGRESS_BAR_INIT_END = 'PROGRESS_BAR_INIT_END';
export const PROGRESS_BAR_INIT_ADD_STEP = 'PROGRESS_BAR_INIT_ADD_STEP';
export const PROGRESS_BAR_INIT_NEXT_STEP = 'PROGRESS_BAR_INIT_NEXT_STEP';
export const PROGRESS_BAR_INIT_FAIL = 'PROGRESS_BAR_INIT_FAIL';


export const setStartBarInit = () => ({
  type: PROGRESS_BAR_INIT_START,
});

export const setEndBarInit = () => ({
  type: PROGRESS_BAR_INIT_END,
});

export const addStepBarInit = () => ({
  type: PROGRESS_BAR_INIT_ADD_STEP,
});

export const setStepBarInit = () => ({
  type: PROGRESS_BAR_INIT_NEXT_STEP,
});

export const setFailBarInit = () => ({
  type: PROGRESS_BAR_INIT_FAIL,
});