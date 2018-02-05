import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { serverReducer as server } from './redux/server';
import { authReducer as auth } from './redux/auth';
import { profileReducer as profile } from './redux/profile';
import { signinReducer as signin } from './redux/signin';

export default combineReducers({
  form,
  server,
  auth,
  signin,
  profile
});