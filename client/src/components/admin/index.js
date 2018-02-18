import React from 'react';
import {Link} from 'react-router-dom';

export default function Admin(props) {
  return <div style={{'marginTop': '60px'}}>
      <nav className="navbar navbar-expand fixed-top navbar-light bg-light">
        <span className="navbar-brand" href="/">Admin</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin/insight">Insight</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/launch">Launch</Link>
            </li>
          </ul>
        </div>
    </nav>
    <div>
      {props.children}
    </div>
  </div>
}