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
            <div className='claims bubble-tag'>
              <div>{20+Math.floor(Math.random()*50)} claims</div>
            </div>
            <div className='reviews bubble-tag'>
              <div>{5+Math.floor(Math.random()*20)} reviews</div>
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

function mapStateToProps(props) {
  return {
    reviews: props.case.ownReviews
  }
}

Browser.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, {fetchProducts})(Browser);