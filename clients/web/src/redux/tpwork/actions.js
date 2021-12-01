// BLOCK CREATING
export const TPWORK_START_CREATING = 'TPWORK_START_CREATING';
export const TPWORK_END_CREATING = 'TPWORK_END_CREATING';
// BLOCK DATA
export const TPWORK_START_LOADING_DATA_FULL = 'TPWORK_START_LOADING_DATA_FULL';
export const TPWORK_END_LOADDING_DATA_FULL = 'TPWORK_END_LOADDING_DATA_FULL';
// TPWORKS
export const TPWORK_START_LOADDING_TPWORKS = 'TPWORK_START_LOADDING_TPWORKS';
export const TPWORK_END_LOADDING_TPWORKS = 'TPWORK_END_LOADDING_TPWORKS';
export const TPWORK_SET_DATA_TPWORKS = 'TPWORK_SET_DATA_TPWORKS';
// DELETE PROCESS
export const TPWORK_SET_START_DELETE_DATA_TPWORK = 'TPWORK_SET_START_DELETE_DATA_TPWORK';
export const TPWORK_SET_FAIL_DELETE_DATA_TPWORK = 'TPWORK_SET_FAIL_DELETE_DATA_TPWORK';
export const TPWORK_DELETE_DATA_TPWORK = 'TPWORK_DELETE_DATA_TPWORK';


export const setStartCreating = () => ({
  type: TPWORK_START_CREATING,
});

export const setEndCreating = () => ({
  type: TPWORK_END_CREATING,
});

export const setStartLoadingDataFull = () => ({
  type: TPWORK_START_LOADING_DATA_FULL,
});

export const setEndLoadingDataFull = () => ({
  type: TPWORK_END_LOADDING_DATA_FULL,
});

export const setStartLoadingTPWorks = () => ({
  type: TPWORK_START_LOADDING_TPWORKS,
});

export const setEndLoadingTPWorks = () => ({
  type: TPWORK_END_LOADDING_TPWORKS,
});

export const setDataTPWorks = (data) => ({
  type: TPWORK_SET_DATA_TPWORKS,
  data,
});

export const setStartDeleteDataTPWork = (id) => ({
  type: TPWORK_SET_START_DELETE_DATA_TPWORK,
  id,
});

export const setFailDeleteDataTPWork = (id) => ({
  type: TPWORK_SET_FAIL_DELETE_DATA_TPWORK,
  id,
});

export const deleteDataTPWork = (id) => ({
  type: TPWORK_DELETE_DATA_TPWORK,
  id,
});