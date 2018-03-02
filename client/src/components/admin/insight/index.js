import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import ProductsInsight from './product';
import ReviewInsight from './review';

export default function Insight(props) {
  return (<div>
    <Switch>
      <Redirect exact from='/admin/insight' to='/admin/insight/products'/>
      <Route path='/admin/insight/products' component= {ProductsInsight} />
      <Route path='/admin/insight/reviews' component= {ReviewInsight} />
    </Switch>
  </div>
  )
}
