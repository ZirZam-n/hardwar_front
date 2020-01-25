import _ from 'lodash';
import { pageLoadingAction } from './page';
import { profileUpdateAPI } from '../api/dashboard';

export const PROFILE_CHECK = 'PROFILE_CHECK';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAIL = 'PROFILE_FAIL';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';

export function profileClearAction() {
  return {
    type: PROFILE_CLEAR,
  };
}

export function profileCheckerAction(fields) {
  return {
    type: PROFILE_CHECK,
    payload: {
      fields,
    },
  };
}

export function profileSuccessAction() {
  return {
    type: PROFILE_SUCCESS,
  };
}

export function profileFailAction(errors) {
  return {
    type: PROFILE_FAIL,
    payload: {
      errors,
    },
  };
}

export function profileUpdateAction(fields, token) {
  return (dispatch, getState) => {
    dispatch(pageLoadingAction(true));
    dispatch(profileCheckerAction(fields));
    fields = { ...fields, ...fields.profile };
    if (_.isEmpty(getState().profile.errors)) {
      console.log(fields);
      console.log(token)
      profileUpdateAPI(fields, token).then((res) => {
        const { data } = res;
        console.log(data);
        if (data.status_code === 200) {
          dispatch(profileSuccessAction());
        } else {
          dispatch(profileFailAction(data.detail));
        }
      });
    }
    dispatch(pageLoadingAction(false));
  };
}