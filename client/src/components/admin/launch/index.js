import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import SearchProduct from './searchProduct';
import LaunchPreview from './productPreview';

export default function Launch(props) {
  return (<div className='container-fluid'>
    <Switch>
      <Redirect exact from='/admin/launch' to='/admin/launch/search'/>
      <Route path='/admin/launch/search' component= {SearchProduct} />
      <Route path='/admin/launch/preview/:productPendingId' component= {LaunchPreview} />
    </Switch>
  </div>)
}