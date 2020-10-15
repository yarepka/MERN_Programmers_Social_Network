import {
  PROFILE_LOAD_PAGE_REQUEST,
  PROFILE_LOAD_PAGE_SUCCESS,
  PROFILE_LOAD_PAGE_FAIL,
  PROFILE_LOAD_PAGE_RESET,
  PROFILE_LOAD_SINGLE_SUCCESS,
  PROFILE_LOAD_SINGLE_FAIL,
  PROFILE_LOAD_SINGLE_RESET,
  PROFILE_LOAD_REPOS_SUCCESS,
  PROFILE_LOAD_REPOS_FAIL,
  PROFILE_LOAD_REPOS_RESET,
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
} from '../actions/types';

export const profileLoadPageReducer = (
  state = {
    hasMore: true,
    loading: true,
    loadingPage: false,
    profiles: [],
    page: 0,
    date: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE_LOAD_PAGE_REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case PROFILE_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        profiles: state.profiles.concat(payload.profiles),
        hasMore: payload.profiles.length > 0 ? true : false,
        loading: false,
        date: payload.date,
        page: payload.page,
        loadingPage: false,
      };
    case PROFILE_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        loadingPage: false,
      };
    case PROFILE_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        loadingPage: false,
        profiles: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};

export const profileSingleReducer = (state = { loading: true }, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE_LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case PROFILE_LOAD_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PROFILE_LOAD_SINGLE_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const profileReposReducer = (state = { loading: true }, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE_LOAD_REPOS_SUCCESS:
      return {
        loading: false,
        repos: payload,
      };
    case PROFILE_LOAD_REPOS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case PROFILE_LOAD_REPOS_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const profileCurrentReducer = (state = { loading: true }, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE_CREATE_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
    case PROFILE_ADD_EDUCATION_SUCCESS:
    case PROFILE_ADD_EXPERIENCE_SUCCESS:
    case PROFILE_DELETE_CURRENT_EXPERIENCE_SUCCESS:
    case PROFILE_DELETE_CURRENT_EDUCATION_SUCCESS:
    case PROFILE_LOAD_CURRENT_SUCCESS:
      return {
        loading: false,
        profile: payload,
      };
    case PROFILE_CREATE_FAIL:
    case PROFILE_UPDATE_FAIL:
    case PROFILE_LOAD_CURRENT_FAIL:
    case PROFILE_ADD_EDUCATION_FAIL:
    case PROFILE_ADD_EXPERIENCE_FAIL:
    case PROFILE_DELETE_CURRENT_EDUCATION_FAIL:
    case PROFILE_DELETE_CURRENT_EXPERIENCE_FAIL:
    case PROFILE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PROFILE_DELETE_SUCCESS:
      return {
        loading: true,
        deleted: true,
      };
    default:
      return state;
  }
};

// const initialState = {
//   profile: null,
//   profiles: [],
//   repos: [],
//   loading: true,
//   error: {}
// }

// export default (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case GET_PROFILE:
//     case UPDATE_PROFILE:
//       return {
//         ...state,
//         profile: payload,
//         loading: false
//       };
//     case GET_PROFILES:
//       return {
//         ...state,
//         profiles: payload,
//         loading: false
//       };
//     case PROFILE_ERROR:
//       return {
//         ...state,
//         error: payload,
//         loading: false
//       };
//     case CLEAR_PROFILE:
//       return {
//         ...state,
//         profile: null,
//         repos: [],
//         error: {}
//       };

//     case LOADING:
//       return {
//         ...state,
//         loading: true
//       };

//     case GET_REPOS:
//       return {
//         ...state,
//         repos: payload,
//         loading: false
//       };

//     default:
//       return state;
//   }
// }
