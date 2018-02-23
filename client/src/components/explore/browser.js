import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';

class Browser extends Component {
  componentDidMount(){
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <h1>Browse</h1>
          </div>
          {this.renderList(this.props.products)}
        </div>
      </div>
    )
  }
  renderList(products) {
    if(products){
      return products.map(p=>(
        <div key={p.productId} className='col-sm-12 col-md-6'>
          {p.details.seller}
        </div>
      ))
    }
    return (<div><i className='fa fa-spin fa-spinner'></i></div>);
  }
}

function mapStateToProps({product}) {
  console.log(product);
  return {
    products: product.items
  }
}

export default connect(mapStateToProps, {fetchProducts})(Browser);