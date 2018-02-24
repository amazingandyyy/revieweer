import React from 'react';
import { SquareLoader } from '../utils';

class Feature extends React.Component {
  render() {
    return (
      <div className='feature-component container'>
        <div className='row'>
          {this.renderFeatures()}
        </div>
      </div>)
  }
  
  renderFeatures(){
    return featuresList.map(f=>(
      <div className='col-sm-12 col-md-6 feature-item' key={f.title}>
        <div className='item-icon'>
          {this.renderImage(f)}
        </div>
        <div className='item-title'>{f.title}</div>
        <div className='item-description'>{f.description}</div>
      </div>
    ))
  }
  renderImage(f){
    if(<img src={`../../assets/svgs/${f.icon}`}/>){
      return <img className='item-image' src={`../../assets/svgs/${f.icon}`}/>
    }
    return (<SquareLoader/>);
  }
}

const featuresList = [{
  icon: 'customer-1.svg',
  title: 'Explore New Products Everyday',
  description: 'At least one new product is featured on Revieweer everyday.'
},{
  icon: 'customer-2.svg',
  title: 'Get The Surprise From Amazon',
  description: 'Order the product on e-commerse sites such as Amazon.'
},{
  icon: 'customer-3.svg',
  title: 'Receive Package And Review Online',
  description: 'Take an honest review and put photos online.'
},{
  icon: 'customer-4.svg',
  title: 'Get Up To 100% cashback + Bonus',
  description: 'Get up to 100% cashback and bonus for signups before August.'
},]

export default Feature;

