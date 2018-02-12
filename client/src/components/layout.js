import React from 'react';
import Header from './header';

const Layout = (props) => (<div>
  <Header />
  {props.children}
</div>)

export default Layout;
