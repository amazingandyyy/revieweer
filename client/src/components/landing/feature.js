import React from 'react';

class Feature extends React.Component {
  render() {
    return (
      <div className='feature-component'>
        {this.renderFeatures()}
      </div>)
  }
  
  renderFeatures(){
    featuresList.map(f=>{
      <div className='feature-item' key={f.title}>
        <div className='item-icon'>{f.icon}</div>
        <div className='item-description'>{f.description}</div>
        <div className='item-title'>{f.title}</div>
      </div>
    })
  }
}

const featuresList = [{
  icon: '',
  title: '',
  description: ''
}]

export default Feature;

