import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../actions/types';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, errors: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, errors: payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
