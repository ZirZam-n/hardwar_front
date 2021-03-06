import _ from 'lodash';
import produce from 'immer';
import cookie from 'js-cookie';
import {
  LOGIN_CLEAR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_CHECK,
  SET_AUTH,
  LOGOUT,
} from '../actions/auth';
import initialState from '../store/initialState';

function loginClearReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    draft.authorized = false;
    draft.errors = {};
    return draft;
  });
}

function loginSuccessReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    const { token } = action.payload;
    draft.authorized = true;
    draft.errors = {};
    cookie.set('token', token, { expires: 1 });
    return draft;
  });
}

function loginFailReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    const { errors } = action.payload;
    draft.authorized = false;
    draft.errors = errors;
    return draft;
  });
}

function loginCheckerReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    const { fields } = action.payload;
    _.forEach(fields, (value, key) => {
      if (value === '') {
        draft.errors[key] = 'فیلد خالی است.';
      }
    });
    return draft;
  });
}

function setAuthReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    const { auth } = action.payload;
    draft.authorized = auth;
    return draft;
  });
}

function logoutReducer(state = initialState.auth, action) {
  return produce(state, (draft) => {
    draft.authorized = false;
    cookie.remove('token');
    return draft;
  });
}

function authReducers(state = initialState.auth, action) {
  switch (action.type) {
    case LOGIN_CLEAR:
      return loginClearReducer(state, action);
    case LOGIN_FAIL:
      return loginFailReducer(state, action);
    case LOGIN_SUCCESS:
      return loginSuccessReducer(state, action);
    case LOGIN_CHECK:
      return loginCheckerReducer(state, action);
    case SET_AUTH:
      return setAuthReducer(state, action);
    case LOGOUT:
      return logoutReducer(state, action);
    default:
      return state;
  }
}

export default authReducers;
