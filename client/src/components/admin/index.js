import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Launch from './launch';
import Insight from './insight';

export default function Admin(props) {
  return <div className='admin-component'>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand" to='/admin'><b>Insight</b></Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/insight/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/insight/reviews">Reviews</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/launch/search">Launch</Link>
            </li>
          </ul>
        </div>
    </nav>

    <Switch>
      <Route path='/admin/insight' component= {Insight} />
      <Route path='/admin/launch' component= {Launch} />
    </Switch>
  </div>
}