import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Img from 'react-image';

import { fetchProducts } from '../../actions';
import { CenterCard121,SquareLoader,CircleLoader } from '../utils';
import {timeAgo} from '../../services';

class Browser extends Component {
  componentDidMount(){
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className='browser-component'>
        <CenterCard121>
        <div className='product-list'>
          {this.renderList(this.props.products)}
        </div>
        </CenterCard121>
      </div>
    )
  }
  goTo(productId){
    this.context.router.history.push(`pd/${productId}`);
  }
  renderList(products) {
    if(products){
      return products.map(p=>(
        <div onClick={this.goTo.bind(this,p.productId)} key={p.productId} className='product-item'>
          {this.renderHeader(p)}
          <div className='product-body'>
            <div className='title'>{p.details.title}</div>
          </div>
          <div className='product-image'>
            {this.renderImage(p)}
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
      ))
    }
    return (<SquareLoader style={{'margin': '100px auto'}}/>);
  }
  renderImage(p){
      return <Img 
        src={p.details.imageURL} 
        loader={
          <CircleLoader />
        }/>
  }
  renderHeader(p){
    return (
      <div className='product-header'>
      <div className='left-part'>
      <div className='avatar'>
        <i className='fab fa-amazon'></i>
      </div>
      </div>
      <div className='right-part'>
        <div className='seller'>{p.details.seller}</div>
        <div className='site-location'>{`amazon.com`}</div>
      </div>
    </div>
    )
  }
  calcDiscounts(price, cashback){
    const toPay = price - cashback;
    return ((1-(toPay/price))*100).toFixed(0);
  }
}

function mapStateToProps({product}) {
  console.log('items', product.items);
  return {
    products: product.items
  }
}

Browser.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, {fetchProducts})(Browser);