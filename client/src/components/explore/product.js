import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getOneproduct,startOneReview } from '../../actions';
import { Image, CenterCard121 } from '../utils';

class Product extends Component {
  componentDidMount(){
    const {productId} = this.context.router.route.match.params;
    if(!productId) return this.context.router.history.push('/explore');
    this.props.getOneproduct(productId);
    window.scrollTo(0,0);
  }
  componentWillUpdate(){
    window.scrollTo(0,0);
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
    const {details, benefits, isAdmin, productId,product_Id} = this.props;
    if(details && benefits){
      return <div>
        <div className='text-center'>
            <Image src={details.imageURL} style={{'width': '40%', 'margin':'auto', 'paddingTop': '20px', 'paddingBottom': '20px'}} className='card-img-top'/>
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
                <li className="list-group-item">
                  <button onClick={this.createOneNewReview.bind(this,product_Id)} className='btn btn-lg btn-success btn-block'>Unlock This Review</button>
                </li>
                {isAdmin && <li className="list-group-item">
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
  createOneNewReview(productId){
    this.props.startOneReview(productId);
  }
}

Product.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({ auth,product,profile }) {
  const {item} = product;
  if(item){
    return {
      productId: item.productId,
      product_Id: item._id,
      details: item.details,
      benefits: item.benefits,
      isAdmin: auth.isAdmin,
      currenUser: profile
    }
  }else{
    return {
      product: null,
      isAdmin: auth.isAdmin.isAdmin,
      currenUser: profile
    }
  }
}

export default connect(mapStateToProps, {getOneproduct,startOneReview})(Product);