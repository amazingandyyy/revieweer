import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Layout from './components/layout';
import Welcome from './components/welcome';
import Explore from './components/explore';
import Account from './components/account';
import Signin from './components/auth/signin';
import SignupWithEmail from './components/auth/signupWithEmail';
import SignupVerification from './components/auth/signupVerification';
import Signout from './components/auth/signout';
import Admin from './components/admin';
import Insight from './components/admin/insight';
import Launch from './components/admin/launch';
import RequireAdmin from './components/admin/requireAdmin';
import Homescreen from './homescreen';
import RequireAuth from './components/auth/requireAuth';
import reducers from './reducers';

import './style/style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
        <Switch>
          <Route exact path="/homescreen" component= {Homescreen} />
          <Layout>
            <Route exact path="/" component= {Welcome} />
            <Route path="/explore" component= {Explore} />
            <Route path="/account" component= {RequireAuth(Account)} />
            <Route path="/signup" component= {SignupWithEmail} />
            <Route path="/signupVerification" component= {SignupVerification} />
            <Route path="/signin" component= {Signin} />
            <Route path="/signout" component= {Signout} />
            <Route path="/admin" component= {RequireAdmin(Admin)} />
            <Route path="/admin/insight" component= {Insight} />
            <Route path="/admin/launch" component= {Launch} />
          </Layout>

        </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
