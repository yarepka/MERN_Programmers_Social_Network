import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  LOADING
} from './types';

// Get current users profile
export const getCurrentProfile = () => {
  return async dispatch => {
    dispatch({
      type: LOADING
    });

    try {
      dispatch(loadUser());
      const res = await axios.get('/api/profile/me');

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

// Get all profiles
export const getProfiles = () => {
  return async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
      dispatch({
        type: LOADING
      });

      const res = await axios.get('api/profile');

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Get profile by ID
export const getProfileById = userId => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING
      });
      console.log(userId);
      const res = await axios.get(`/api/profile/user/${userId}`);

      console.log('res.data: ' + res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Get Github repos
export const getGithubRepos = username => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) {
        // we can't use <Redirect to="" /> in actions
        history.push('/dashboard');
      }

    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

// Add Experience
export const addExperience = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.put('/api/profile/experience', formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience Added', 'success'));
      history.push('/dashboard');
    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

// Add Education
export const addEducation = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.put('/api/profile/education', formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Education Added', 'success'));
      history.push('/dashboard');
    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Delete experience
export const deleteExperience = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

// Delete education
export const deleteEducation = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

// Delete account & profile
export const deleteAccount = id => {
  return async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete(`/api/profile`);

        dispatch({ type: CLEAR_PROFILE });

        dispatch({ type: ACCOUNT_DELETED })

        dispatch(setAlert('Your account has been permanantly deleted'));
      } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  }
};