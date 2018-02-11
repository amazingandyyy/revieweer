import React from 'react';

const CenterCard121 = (props) => (
  <div className='centercard121'>
  <div className='row'>
    <div className='col-xs-12 col-sm-1 col-md-3 col-xl-4'></div>
      <div className='col-sm-10 col-md-6 col-xl-4'>
        {props.children}
      </div>
    <div className='col-xs-12 col-sm-1 col-md-3 col-xl-4'></div>
  </div>
  </div>
)

export default CenterCard121;