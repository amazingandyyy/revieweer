import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getOneproduct} from '../../actions';
import CenterCard121 from '../centerCard121';

class Product extends Component {
  componentDidMount(){
    const {id} = this.context.router.route.match.params;
    if(!id) return this.context.router.history.push('/explore');
    this.props.getOneproduct(id);
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
    const {details, benefits} = this.props;
    if(details && benefits){
      return <div>
        <div className='text-center'>
            <img style={{'width': '70%', 'margin':'auto'}} className='card-img-top' src={details.imageURL} alt={details.title}/>
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
                    {benefits.notes}
                </li>
                <li className="list-group-item">
                    <label><b>Rewards:</b></label>
                    <br/>
                    ${benefits.rewards}
                </li>
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

function mapStateToProps({product}) {
  const {item} = product;
  if(item){
    return {
      details: item.details,
      benefits: item.benefits
    }
  }else{
    return {
      product: null
    }
  }
}

export default connect(mapStateToProps, {getOneproduct})(Product);