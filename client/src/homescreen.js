import React, { Component } from 'react';

export default class Homescreen extends Component {
  render() {
    return (
      <div className='homescreen'>
        <div className='version-info'>
          <small>version 2.1.5</small>
          <br/>
          <small>created by Revieweer&#8482; in silicon valley</small>
        </div>
      </div>
    );
  }
}