import React from 'react';
import {Link} from 'react-router-dom';

export default function Admin(props) {
  return <div className='admin'>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <span className="navbar-brand"><b>ADMIN</b></span>
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
    <div style={{'paddingTop': '20px'}}>
      {props.children}
    </div>
  </div>
}

function go(){
  window.location = '/#admin/launch/search'
}