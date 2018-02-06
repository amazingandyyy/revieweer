import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Explore from './components/explore';
import Account from './components/account';
import Signin from './components/auth/signin';
import SignupWithEmail from './components/auth/signupWithEmail';
import SignupVerification from './components/auth/signupVerification';
import Signout from './components/auth/signout'
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { serverConnect } from './actions';

import '../style/style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

// if we have a token, consider the user to be signed in
serverConnect()(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App>
        <Switch>
          <Route exact path="/" component= {Welcome} />
          <Route path="/explore" component= {Explore} />
          <Route path="/account" component= {RequireAuth(Account)} />
          <Route path="/signup" component= {SignupWithEmail} />
          <Route path="/signupVerification" component= {SignupVerification} />
          <Route path="/signin" component= {Signin} />
          <Route path="/signout" component= {Signout} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
