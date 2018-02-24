import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getOneproduct } from '../../actions';
import CenterCard121 from '../centerCard121';

class Product extends Component {
  componentDidMount(){
    const {productId} = this.context.router.route.match.params;
    if(!productId) return this.context.router.history.push('/explore');
    this.props.getOneproduct(productId);
  }
  render() {
    return (
      <CenterCard121>
          <div className='card' style={{'marginBottom': '50px'}}>
              <h4 className='card-header'>
                  Product
              </h4>
              {this.renderProduct()}
          </div>
      </CenterCard121>
    );
  }
  renderProduct(){
    const {details, benefits, isAdmin, productId} = this.props;
    if(details && benefits){
      return <div>
        <div className='text-center'>
            <img style={{'width': '40%', 'margin':'auto', 'paddingBottom': '20px'}} className='card-img-top' src={details.imageURL} alt={details.title}/>
            <ul className="list-group list-group-flush text-left">
                <li className="list-group-item">
                    <label><b>Title:</b></label>
                    <br/>
                    {details.title}
                </li>
                <li className="list-group-item">
                    <label><b>Seller:</b></label>
                    <br/>
                    {details.seller}
                </li>
                <li className="list-group-item">
                    <label><b>Price:</b></label>
                    <br/>
                    ${details.price}
                </li>
                <li className="list-group-item">
                    <label><b>Cashback:</b></label>
                    <br/>
                    ${benefits.cashback}
                </li>
                <li className="list-group-item">
                    <label><b>Notes:</b></label>
                    <br/>
                    {benefits.notes || 'None'}
                </li>
                <li className="list-group-item">
                    <label><b>Rewards:</b></label>
                    <br/>
                    ${benefits.rewards}
                </li>
                {isAdmin&&<li className="list-group-item">
                  <Link to={`/edit/pd/${productId}`} className='btn btn-lg btn-light btn-block'>Edit This Item</Link>
                </li>}
            </ul>
        </div>
      </div>
    }else{
      return <div className='text-center'>
        <div>No Product</div>
      </div>
    }
  }
}

Product.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({auth,product}) {
  const {item} = product;
  if(item){
    return {
      productId: item.productId,
      details: item.details,
      benefits: item.benefits,
      isAdmin: auth.isAdmin
    }
  }else{
    return {
      product: null,
      isAdmin: auth.isAdmin
    }
  }
}

export default connect(mapStateToProps, {getOneproduct})(Product);