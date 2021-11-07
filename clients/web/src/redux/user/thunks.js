import UserService from '../../api/UserService';
import {
  setUserData,
  setProcessUserSrart,
  setProcessUserEnd,
} from './actions';


export const loadUserProfile = () => (dispatch) => {
  dispatch(setProcessUserSrart());
  UserService.getUserProfileMe()
    .then(response => {
      dispatch(setUserData(
        response.data.user__first_name,
        response.data.okolotok__id,
        response.data.okolotok__name));
    })
    .catch(() => {
      dispatch(setUserData('anonim', null, ''));
    });

  dispatch(setProcessUserEnd());
};

export const test = "test";