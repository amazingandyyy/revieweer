import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import OwnProfile from './profile';
import Settings from './settings';
import Reviews from './reviews';

export default function User(props) {
  return <div className='user-component'>
    <Switch>
      <Redirect exact from='/user' to='/user/profile'/>
      <Route path='/user/profile' component= {OwnProfile} />
      <Route path='/user/settings' component= {Settings} />
      <Route path='/user/reviews' component= {Reviews} />
    </Switch>
  </div>
}