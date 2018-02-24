import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { Route, Switch, HashRouter } from 'react-router-dom';
import reduxMiddlewares from './redux/middlewares';

import Layout from './components/layout';
import Landing from './components/landing';
import Explore from './components/explore/browser';
import Product from './components/explore/product';
import ProductEdit from './components/explore/product.edit';
import Account from './components/account';
import Signin from './components/auth/signin';
import SignupWithEmail from './components/auth/signupWithEmail';
import SignupVerification from './components/auth/signupVerification';
import Signout from './components/auth/signout';
import Admin from './components/admin';
import Insight from './components/admin/insight';
import Launch from './components/admin/launch';
import SearchProduct from './components/admin/forms/searchProduct';
import LaunchPreview from './components/admin/forms/productPreview';
import RequireAdmin from './components/admin/requireAdmin';
import RequireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import {serverConnect} from './actions';

import './style/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const store = createStore(
  reducers,
  applyMiddleware(
    reduxMiddlewares,
    loadingBarMiddleware()
  )
);
serverConnect()(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType='noslash'>
      <Switch>
        <Layout>
          <Route exact path='/' component= {Landing} />

          <Route path='/explore' component= {Explore} />
          
          <Route path='/pd/:productId' component= {Product} />
          <Route path='/edit/pd/:productId' component= {ProductEdit} />
          
          <Route path='/signup' component= {SignupWithEmail} />
          <Route path='/account' component= {RequireAuth(Account)} />
          <Route path='/signupVerification' component= {SignupVerification} />
          <Route path='/signin' component= {Signin} />
          <Route path='/signout' component= {Signout} />

          <Route path='/admin' component= {RequireAdmin(Admin)} />
          <Route path='/admin/insight' component= {Insight} />
          
          <Route path='/admin/launch' component= {Launch} />
          <Route path='/admin/launch/search' component= {SearchProduct} />
          <Route path='/admin/launch/preview/:productPendingId' component= {LaunchPreview} />
        </Layout>
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));