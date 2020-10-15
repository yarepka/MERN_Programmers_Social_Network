import { combineReducers } from 'redux';

import { alertManagerReducer } from './alertReducers';
import { userLoginReducer, userRegisterReducer } from './userReducers';
import {
  profileLoadPageReducer,
  profileSingleReducer,
  profileReposReducer,
  profileCurrentReducer,
} from './profileReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileLoadPage: profileLoadPageReducer,
  profileSingle: profileSingleReducer,
  profileRepos: profileReposReducer,
  profileCurrent: profileCurrentReducer,
  alertManager: alertManagerReducer,
});
