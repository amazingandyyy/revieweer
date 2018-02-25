import React from 'react';

export default function User(props) {
  return <div className='user-component'>
    <div style={{'paddingTop': '20px'}}>
      {props.children}
    </div>
  </div>
}