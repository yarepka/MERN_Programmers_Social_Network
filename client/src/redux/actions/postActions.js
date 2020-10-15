import axios from 'axios';
import { setAlert } from './alertActions';
import {
  POST_LOAD_PAGE_REQUEST,
  POST_LOAD_PAGE_SUCCESS,
  POST_LOAD_PAGE_FAIL,
  POST_LOAD_SINGLE_SUCCESS,
  POST_LOAD_SINGLE_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_COMMENT_REQUEST,
  POST_ADD_COMMENT_SUCCESS,
  POST_ADD_COMMENT_FAIL,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_FAIL,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_FAIL,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
} from '../actions/types';

// Load Next Page
export const loadPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: POST_LOAD_PAGE_REQUEST });

      const {
        postLoadPage: { date, page },
      } = getState();

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime();

      const res = await axios.get(
        `/api/posts/loadPage?page=${nextPage}&date=${currentDate}`,
        config
      );

      dispatch({
        type: POST_LOAD_PAGE_SUCCESS,
        payload: {
          posts: res.data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POST_LOAD_PAGE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add post
export const addPost = (formData) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    };

    try {
      const res = await axios.post(`/api/posts`, formData, config);

      dispatch({
        type: POST_ADD_SUCCESS,
        payload: res.data,
      });

      setAlert('Post Created', 'success');
    } catch (err) {
      dispatch({
        type: POST_ADD_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Get post by id
export const getPost = (postId) => {
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

      const res = await axios.get(`/api/posts/${postId}`, config);

      dispatch({
        type: POST_LOAD_SINGLE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_LOAD_SINGLE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add comment
export const addComment = (postId, formData) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_ADD_COMMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    };

    try {
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      dispatch({
        type: POST_ADD_COMMENT_SUCCESS,
        payload: res.data,
      });

      setAlert('Comment Added', 'success');
    } catch (err) {
      dispatch({
        type: POST_ADD_COMMENT_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Delete comment
export const deleteComment = (postId, commentId) => {
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

      await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);

      dispatch({
        type: POST_DELETE_COMMENT_SUCCESS,
        payload: commentId,
      });

      setAlert('Comment Deleted', 'success');
    } catch (err) {
      dispatch({
        type: POST_DELETE_COMMENT_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add like
export const addLike = (postId) => {
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

      const res = await axios.put(`/api/posts/like/${postId}`, {}, config);

      dispatch({
        type: POST_UPDATE_LIKES_SUCCESS,
        payload: {
          postId,
          likes: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_UPDATE_LIKES_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Remove like
export const removeLike = (postId) => {
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

      const res = await axios.put(`/api/posts/unlike/${postId}`, {}, config);

      dispatch({
        type: POST_UPDATE_LIKES_SUCCESS,
        payload: {
          postId,
          likes: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_UPDATE_LIKES_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Delete post
export const deletePost = (postId) => {
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

      await axios.delete(`/api/posts/${postId}`, config);

      dispatch({
        type: POST_DELETE_SUCCESS,
        payload: postId,
      });

      setAlert('Post Removed', 'success');
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_DELETE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
