import React from 'react';
import {timeAgo} from '../../services';
import { CircleLoader } from '../utils';
import Img from 'react-image';

export default function ProductPreivew(props){
    const {data} = props;
    let p = data;
    if(p){
      return <div key={p.productId} className='product-item' {...props}>
        {renderHeader(p)}
        <div className='product-body'>
          <div className='title'>{p.details.title}</div>
        </div>
        <div className='product-image'>
          {renderImage(p)}
        </div>
        <div className='product-body product-info'>
          <div className='bubble-tag highlight'>
            <div><i className='fas fa-dollar-sign' />{p.benefits.cashback} cashback</div>
          </div>
          <div className='bubble-tag highlight-highlight'>
            <div><i className='fas fa-dollar-sign' />{p.benefits.rewards} bonus</div>
          </div>
          <div className='bubble-tag'>
            <div><i className='fas fa-unlock' />{p.reviews.length}</div>
          </div>
          <div className='createdAt'>
            <div>{timeAgo(p.createdAt)}</div>
          </div>
        </div>
      </div>
    }else{
      return <CircleLoader/>
    }
}

function renderImage(p){
  return <Img 
    src={p.details.imageURL} 
    loader={
      <CircleLoader />
    }/>
}
function renderHeader(p){
return (<div className='product-header'>
    <div className='left-part'>
    <div className='avatar'>
      <i className='fab fa-amazon'></i>
    </div>
    </div>
    <div className='right-part'>
      <div className='seller'>{p.details.seller}</div>
      <div className='site-location'>{`amazon.com`}</div>
    </div>
  </div>)
}