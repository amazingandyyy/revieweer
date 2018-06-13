import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchProducts } from '../../actions';
import { CenterCard121,SquareLoader } from '../utils';
import ProductLaunch from '../admin/launch/searchProduct';
import ProductPreivew from './product.preview';

class Browser extends Component {
  componentDidMount(){
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className='browser-component'>
        {this.props.isAdmin && <ProductLaunch />}
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
        <ProductPreivew data={p} onClick={this.goTo.bind(this,p.productId)} key={p.productId} />
      ))
    }
    return (<SquareLoader style={{'margin': '100px auto'}}/>);
  }
  calcDiscounts(price, cashback){
    const toPay = price - cashback;
    return ((1-(toPay/price))*100).toFixed(0);
  }
}

function mapStateToProps({product, auth}) {
  // console.log('items', product.items);
  return {
    products: product.items,
    isAdmin: auth.isAdmin
  }
}

Browser.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, {fetchProducts})(Browser);