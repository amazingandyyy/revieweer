import React from 'react';
import {Link} from 'react-router-dom';

export default function Admin(props) {
  return <div className='admin-component'>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand" to='/admin'><b>ADMIN</b></Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin/insight">Insight</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{'cursor': 'pointer'}} onClick={go}>Launch</a>
            </li>
          </ul>
        </div>
    </nav>
    {props.children}
  </div>
}

function go(){
  window.location = '/#admin/launch/search'
}