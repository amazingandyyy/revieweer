import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar'

import { serverReducer as server } from './redux/server';
import { authReducer as auth } from './redux/auth';
import { profileReducer as profile } from './redux/profile';
import { signinReducer as signin } from './redux/signin';
import { signupWithEmailReducer as signupWithEmail } from './redux/signupWithEmail';
import { signupVerificationReducer as signupVerification } from './redux/signupVerification';
import { adminReducer as adminDashboard } from './redux/admin';
import { productReducer as product } from './redux/product';

export default combineReducers({
  loadingBar: loadingBarReducer,
  form,
  server,
  auth,
  signin,
  profile,
  signupWithEmail,
  signupVerification,
  adminDashboard,
  product
});