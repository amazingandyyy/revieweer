import React from 'react';
import Navbar from './navbar';

const Layout = (props) => (<div>
  {props.children}
  <Navbar />
</div>)

export default Layout;
