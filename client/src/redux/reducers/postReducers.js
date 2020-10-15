import {
  POST_LOAD_PAGE_REQUEST,
  POST_LOAD_PAGE_SUCCESS,
  POST_LOAD_PAGE_FAIL,
  POST_LOAD_PAGE_RESET,
  POST_LOAD_SINGLE_SUCCESS,
  POST_LOAD_SINGLE_FAIL,
  POST_LOAD_SINGLE_RESET,
  POST_ADD_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_COMMENT_REQUEST,
  POST_ADD_COMMENT_SUCCESS,
  POST_ADD_COMMENT_FAIL,
  POST_DELETE_COMMENT_FAIL,
  POST_DELETE_COMMENT_SUCCESS,
  POST_ADD_REQUEST,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_FAIL,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
} from '../actions/types';

export const postLoadPageReducer = (
  state = {
    hasMore: true,
    loading: true,
    loadingPage: false,
    loadingPost: false,
    posts: [],
    addedPosts: [],
    page: 0,
    date: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case POST_LOAD_PAGE_REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case POST_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat(payload.posts),
        hasMore: payload.posts.length > 0 ? true : false,
        loading: false,
        date: payload.date,
        page: payload.page,
        loadingPage: false,
      };
    case POST_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        loadingPage: false,
      };
    case POST_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        loadingPage: false,
        loadingPost: false,
        posts: [],
        addedPosts: [],
        page: 0,
        date: null,
      };
    case POST_ADD_REQUEST:
      return {
        ...state,
        loadingPost: true,
      };
    case POST_ADD_SUCCESS:
      return {
        ...state,
        addedPosts: [payload, ...state.addedPosts],
        loadingPost: false,
      };
    case POST_ADD_FAIL:
      return {
        ...state,
        error: payload,
        loadingPost: false,
      };
    case POST_UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        addedPosts: state.addedPosts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };
    case POST_UPDATE_LIKES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        addedPosts: state.addedPosts.filter((post) => post._id !== payload),
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case POST_DELETE_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export const postSingleReducer = (
  state = { loading: true, loadingComment: false },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case POST_LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case POST_LOAD_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_LOAD_SINGLE_RESET:
      return {
        loading: true,
        loadingComment: false,
      };
    case POST_ADD_COMMENT_REQUEST:
      return {
        ...state,
        loadingComment: true,
      };
    case POST_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loadingComment: false,
      };
    case POST_ADD_COMMENT_FAIL:
    case POST_DELETE_COMMENT_FAIL:
    case POST_DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
};

// const initialState = {
//   posts: [],
//   post: null,
//   loading: true,
//   error: {}
// }

// export default (state = initialState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case UPDATE_LIKES:
//       return {
//         ...state,
//         posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
//         loading: false
//       };
//     case DELETE_POST:
//       return {
//         ...state,
//         posts: state.posts.filter(post => post._id !== payload),
//         loading: false
//       };
//     case ADD_COMMENT:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           comments: payload
//         },
//         loading: false
//       }

//     case REMOVE_COMMENT:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           comments: state.post.comments.filter(comment => comment._id !== payload)
//         },
//         loading: false
//       }
//     default:
//       return state;
//   }
// }
