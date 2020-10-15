import axios from 'axios';

import { setAlert } from './alertActions';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  PROFILE_LOAD_CURRENT_RESET,
} from './types';

// Register User
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { name, email, password };

    try {
      let res = await axios.post('/api/users', body, config);

      dispatch({
        type: USER_REGISTER_SUCCESS,
      });

      const token = res.data.token;
      config.headers['x-auth-token'] = token;
      res = await axios.get('/api/auth', config);

      const userInfo = {
        ...res.data,
        token,
      };

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfo,
      });

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (err) {
      console.error(err);

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({ type: USER_REGISTER_FAIL, payload: errors });
    }
  };
};

// Login user
export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { email, password };

    try {
      let res = await axios.post('/api/auth', body, config);

      const token = res.data.token;
      config.headers['x-auth-token'] = token;

      res = await axios.get('/api/auth', config);

      const userInfo = {
        ...res.data,
        token,
      };

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfo,
      });

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (err) {
      console.error(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: USER_LOGIN_FAIL,
        payload: errors,
      });
    }
  };
};

// Logout
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: PROFILE_LOAD_CURRENT_RESET });
  };
};
