import React from 'react';

export default function Logo(props){
  return (
      <img src='/assets/logo-sm.png' style={{'margin': '10px auto', 'transform': 'scale(0.6)'}} {...props}/>
  );
}
