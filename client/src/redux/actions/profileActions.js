import axios from 'axios';
import { setAlert } from './alertActions';
import {
  PROFILE_LOAD_SINGLE_SUCCESS,
  PROFILE_LOAD_SINGLE_FAIL,
  PROFILE_LOAD_PAGE_REQUEST,
  PROFILE_LOAD_PAGE_SUCCESS,
  PROFILE_LOAD_PAGE_FAIL,
  PROFILE_LOAD_REPOS_SUCCESS,
  PROFILE_LOAD_REPOS_FAIL,
  PROFILE_LOAD_CURRENT_SUCCESS,
  PROFILE_LOAD_CURRENT_FAIL,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_ADD_EDUCATION_SUCCESS,
  PROFILE_ADD_EDUCATION_FAIL,
  PROFILE_ADD_EXPERIENCE_SUCCESS,
  PROFILE_ADD_EXPERIENCE_FAIL,
  PROFILE_DELETE_CURRENT_EDUCATION_SUCCESS,
  PROFILE_DELETE_CURRENT_EDUCATION_FAIL,
  PROFILE_DELETE_CURRENT_EXPERIENCE_SUCCESS,
  PROFILE_DELETE_CURRENT_EXPERIENCE_FAIL,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAIL,
} from './types';

// Load Next Page
export const loadPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_LOAD_PAGE_REQUEST });

      const {
        profileLoadPage: { date, page },
      } = getState();

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const res = await axios.get(
        `/api/profile/loadPage?page=${nextPage}&date=${currentDate}`
      );

      dispatch({
        type: PROFILE_LOAD_PAGE_SUCCESS,
        payload: {
          profiles: res.data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_LOAD_PAGE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Get profile by ID
export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
        type: PROFILE_LOAD_SINGLE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_LOAD_SINGLE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Get Github repos
export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
        type: PROFILE_LOAD_REPOS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_LOAD_REPOS_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Get current user's profile
export const getCurrentProfile = () => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const res = await axios.get('/api/profile/me', config);

      dispatch({
        type: PROFILE_LOAD_CURRENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_LOAD_CURRENT_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Delete experience
export const deleteExperience = (experienceId) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const res = await axios.delete(
        `/api/profile/experience/${experienceId}`,
        config
      );

      dispatch({
        type: PROFILE_DELETE_CURRENT_EXPERIENCE_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_DELETE_CURRENT_EXPERIENCE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Delete education
export const deleteEducation = (educationId) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const res = await axios.delete(
        `/api/profile/education/${educationId}`,
        config
      );

      dispatch({
        type: PROFILE_DELETE_CURRENT_EDUCATION_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_DELETE_CURRENT_EDUCATION_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add Education
export const addEducation = (formData, history) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const res = await axios.put('/api/profile/education', formData, config);

      dispatch({
        type: PROFILE_ADD_EDUCATION_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Education Added', 'success'));
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ADD_EDUCATION_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add Experience
export const addExperience = (formData, history) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const res = await axios.put('/api/profile/experience', formData, config);

      dispatch({
        type: PROFILE_ADD_EXPERIENCE_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Experience Added', 'success'));
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ADD_EXPERIENCE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };
      
      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: edit ? PROFILE_UPDATE_SUCCESS : PROFILE_CREATE_SUCCESS,
        payload: res.data,
      });

      setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success');

      if (!edit) {
        history.push('/dashboard');
      } else {
        history.goBack();
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: edit ? PROFILE_UPDATE_FAIL : PROFILE_CREATE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Delete account & profile & posts
export const deleteAccount = () => {
  return async (dispatch, getState) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userInfo.token,
          },
        };

        await axios.delete(`/api/profile`, config);

        dispatch({ type: PROFILE_DELETE_SUCCESS });

        setAlert('Your account has been permanantly deleted');
      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
          type: PROFILE_DELETE_FAIL,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};
