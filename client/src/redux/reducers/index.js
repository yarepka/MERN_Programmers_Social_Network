import { combineReducers } from 'redux';

import { alertManagerReducer } from './alertReducers';
import { userLoginReducer, userRegisterReducer } from './userReducers';
import {
  profileLoadPageReducer,
  profileSingleReducer,
  profileReposReducer,
  profileCurrentReducer,
} from './profileReducers';
import { postLoadPageReducer, postSingleReducer } from './postReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileLoadPage: profileLoadPageReducer,
  profileSingle: profileSingleReducer,
  profileRepos: profileReposReducer,
  profileCurrent: profileCurrentReducer,
  postLoadPage: postLoadPageReducer,
  postSingle: postSingleReducer,
  alertManager: alertManagerReducer,
});
